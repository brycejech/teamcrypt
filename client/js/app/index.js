'use strict';

const app = {
    encrypt,
    decrypt,
    genSalt,
    genIV: genSalt,
    deriveKey,
};

function encode(text){
    return (new TextEncoder()).encode(text);
}

function decode(ab){
    return (new TextDecoder()).decode(ab);
}

async function encrypt(key, iv, text){
    const algo = { name: 'AES-GCM', iv };

    try {
        const ab = await crypto.subtle.encrypt(algo, key, encode(text));

        return Array.from(new Uint8Array(ab)).join(',');
    }
    catch (e) { throw e }
}

async function decrypt(key, iv, cipherText){
    const algo = { name: 'AES-GCM', iv },
          ab   = Uint8Array.from(cipherText.split(',').map(parseFloat));

    try{
        return decode(await crypto.subtle.decrypt(algo, key, ab));
    }
    catch(e){ throw e }
}

function genSalt(){
    return crypto.getRandomValues(new Uint8Array(16));
}

function genIV(){ return genSalt() }

async function deriveKey(pw, salt){
    const params = {
        name: 'PBKDF2',
        hash: 'SHA-256',
        iterations: 100000,
        salt
    };

    const algo   = { name: 'AES-GCM', length: 256 },
          usages = [ 'encrypt', 'decrypt' ];

    try{
        const keyMaterial = await getKeyMaterial(pw);

        return crypto.subtle.deriveKey(params, keyMaterial, algo, false, usages);
    }
    catch(e){ throw e }
}

function getKeyMaterial(pw) {
    return window.crypto.subtle.importKey(
        'raw',              // format
        encode(pw),         // keyData
        { name: 'PBKDF2' }, // algo
        false,              // extractable
        [ 'deriveKey' ]     // usages
    );
}
