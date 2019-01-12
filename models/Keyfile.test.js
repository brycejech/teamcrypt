'use strict';

const Keyfile    = require('./Keyfile');
const { crypto } = require('../app');

describe('Keyfile should store items', () => {

    let kf;

    beforeEach( () => kf = new Keyfile(1) );

    test('When given a folder', () => {
        const entry = { type: 'folder', title: 'myFolder' };

        kf.add(entry);

        const found = kf.keyfile.filter(e => e.title === entry.title)[0];

        expect(entry.title).toBe(found.title);
    });

    test('When given an entry', () => {
        const entry = { type: 'entry', title: 'myEntry' }

        kf.add(entry);

        const found = kf.keyfile.filter(e => e.title === entry.title)[0];

        expect(entry.title).toBe(found.title);
    });

    test('Should store a child entry', () => {
        const parent = { type: 'folder', title: 'myFolder' },
              entry  = { type: 'entry',  title: 'myEntry', parent: 'myFolder' };

        kf.add(parent).add(entry);

        const found = kf.keyfile.filter(e => e.title === entry.parent)[0];

        expect(found.title).toBe(parent.title);
    });

    test('Should create a folder if parent not found', () => {
        const entry = { type: 'entry', title: 'myEntry', parent: 'myFolder' }

        kf.add(entry);

        const parent = kf.keyfile.filter(e => e.title === entry.parent)[0];

        expect(parent.type).toBe('folder');
    });
});


describe('Keyfile should find items', () => {
    let kf;

    beforeEach( () => kf = new Keyfile(1) );

    test('When given an existing item title', () => {
        const entry = { title: 'myEntry' }

        kf.add(entry);

        expect(kf.findEntry(entry.title).title).toBe(entry.title);
    });

    test('Should return undefined if not found', () => {
        expect(kf.findEntry('someTitle')).toBeUndefined();
    });

});


describe('Keyfile should handle encryption', () => {

    let kf, password, key, salt;

    beforeEach(async () => {
        kf             = new Keyfile(1);
        password       = 'mySuperSecur3P4sswor!d';
        ({ key, salt } = await crypto.deriveKey(password));
    });

    test('It should encrypt itself', () => {
        kf.encrypt(key);
        expect(kf.encrypted).toBe(true);
        expect(typeof kf.keyfile).toBe('string');
    });

    test('It should decrypt itself', () => {
        kf.encrypt(key);
        expect(kf.encrypted).toBe(true);
        expect(typeof kf.keyfile).toBe('string');

        kf.decrypt(key);
        expect(kf.encrypted).toBe(false);
        expect(typeof kf.keyfile).toBe('object');
    });

    test('It should retrieve an entry after decryption', () => {
        const entry = { title: 'myTitle' };

        kf.add(entry).encrypt(key);

        expect(kf.encrypted).toBe(true);

        kf.decrypt(key);

        const found = kf.findEntry(entry.title);

        expect(found.title).toBe(entry.title);
    });

    test('It should not allow adding items while encrypted', () => {
        kf.encrypt(key);

        expect(() => kf.add({ title: 'myTitle' })).toThrow();
    });

    test('It should throw on bad encryption key', async () => {
        kf.encrypt(key);

        ({ key } = await crypto.deriveKey('aDifferentPassword'));

        expect(() => kf.decrypt(key)).toThrow();
    });

});
