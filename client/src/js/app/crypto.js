'use strict';

/*
    ==============
    PUBLIC METHODS
    ==============
*/
async function encrypt(key, iv, text){
    const algo = { name: 'AES-GCM', iv };

    try {
        const ab = await crypto.subtle.encrypt(algo, key, _encode(text));

        return _arrayBufferToHexString(ab);
    }
    catch (e) { throw e }
}

async function decrypt(key, iv, cipherText){
    const algo = { name: 'AES-GCM', iv },
          ab   = _hexStringToIntArray(cipherText)

    try{
        return _decode(await crypto.subtle.decrypt(algo, key, ab));
    }
    catch(e){ throw e }
}

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
    return crypto.subtle.importKey(
        'raw',              // format
        _encode(pw),        // keyData
        { name: 'PBKDF2' }, // algo
        false,              // extractable
        [ 'deriveKey' ]     // usages
    );
}

function genSalt(){
    return crypto.getRandomValues(new Uint8Array(16));
}

function genIV(){
    return genSalt()
}

/*
    ===============
    PRIVATE METHODS
    ===============
*/
function _encode(text){
    return (new TextEncoder()).encode(text);
}

function _decode(ab){
    return (new TextDecoder()).decode(ab);
}

function _arrayBufferToHexString(ab){
    // Convert ArrayBuffer to Uint8Array
    const intArr = new Uint8Array(ab);

    // Convert Uint8Array to Array
    // For some reason Uint8Array.map doesn't work properly
    const arr = Array.from(intArr);

    return arr.map(_intToHex).join('');
}

function _hexStringToIntArray(hex){
    const arr = hex.match(/.{2}/g)  // A1B2C3 -> ['A1', 'B2', 'C3']
                   .map(_hexToInt); // parse to ints

    return Uint8Array.from(arr);
}

function _intToHex(n){
    // Convert integer to '0' padded, 2-digit hex string
    return `0${ n.toString(16) }`.substr(-2).toUpperCase();
}

function _hexToInt(hex){
    return parseInt(hex, 16);
}

const api = {
    encrypt,
    decrypt,
    genSalt,
    genIV: genSalt,
    deriveKey,
};

export default api;