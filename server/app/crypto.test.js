'use strict';

const { encrypt, decrypt, deriveKey, hashPassword, verifyPassword } = require('./crypto');

const password = 'superSecr3tPassphraze',
      salt     = 'dk2lkj2090k3-s92ks,s0';

const pass2 = 'abcdasdfasdfasdefghijk',
      salt2 = 'kwoe880asdfasdfasd2d9xwnbdk';

const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';


describe('Crypto module should encrypt text', async () => {

    test('Should produce a HEX key of 32 chars from a password and salt', async () => {
        const { key } = await deriveKey(password, salt);

        expect(/^[0-9a-fA-F]{32}$/.test(key)).toBe(true);
    });

    test('Should encrypt and decrypt text', async () => {

        const { key } = await deriveKey(password, salt);

        const encrypted = encrypt(key, text);

        expect(decrypt(key, encrypted)).toEqual(text);
    });

    test('Should throw on invalid key length', async () => {
        const key = '0123456789abcdefg';

        expect(() => encrypt(key, text)).toThrow();
    });

    test('Should not decrypt text when password bad', async () => {
        const { key }  = await deriveKey(password, salt);

        const _key2 = await deriveKey(pass2, salt2);

        const key2 = _key2.key;

        const encrypted = encrypt(key, text);

        expect(decrypt(key2, encrypted)).toBe(null);

    });

});

describe('Crypto module should hash and verify passwords', () => {

    let pass1, hash1, pass2, hash2;

    beforeEach(async () => {
        pass1 = 'mySecureP4$$wor!d';
        hash1 = await hashPassword(pass1);
        pass2 = 'myAlt3rn4tIvePassw0r^d';
        hash2 = await hashPassword(pass2);
    });

    test('It should hash a password', async () => {
        expect(typeof hash1).toBe('string');
        expect(hash1 === pass1).toBe(false);
        expect(hash1.length).toBe(60);
    });

    test('It should verify a hashed password', async () => {
        expect(await verifyPassword(pass1, hash1)).toBe(true);
    });

    test('It should not verify incorrect passwords', async () => {
        expect(await verifyPassword(pass2, hash1)).toBe(false);
        expect(await verifyPassword(pass1, hash2)).toBe(false);
    });

    test('It should reject on undefined values', () => {
        expect.assertions(1);

        return expect(hashPassword(undefined)).rejects.toEqual(new Error('data and salt arguments required'));
    });

});
