'use strict';

function pick(props, item){
    const obj = {};

    for(const prop in item){
        if(~props.indexOf(prop)){
            obj[prop] = item[prop];
        }
    }
    return obj;
}

module.exports = pick;
