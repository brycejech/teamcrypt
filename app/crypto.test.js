'use strict';

const { encrypt, decrypt, deriveKey } = require('./crypto');

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
