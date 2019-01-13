'use strict';

const makePublic = {};

makePublic.user = function makePublicUser(o){
    const publicProps = [
        'id', 'name', 'uuid', 'registered', 'keyfile', 'keyfileLastModified'
    ];

    return _pick(publicProps, o);
}

function _pick(props, item){
    const obj = {};

    for(const prop in item){
        if(~props.indexOf(prop)){
            obj[prop] = item[prop];
        }
    }
    return obj;
}

module.exports = makePublic;
