'use strict';

export const api = {};

api.login = async function login(username, password){

    const url = '/login';
    const opt = {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ username, password })
    }

    try{
        let res = await fetch(url, opt);

        return res.json();
    }
    catch(e){
        throw e;
    }
}

api.getUsers = async function getUsers(){

    const url = '/users';
    const opt = {
        method: 'GET',
        mode: 'same-origin'
    }

    try{
        let res = await fetch(url, opt);

        return res.json();
    }
    catch(e){
        throw e;
    }
}
