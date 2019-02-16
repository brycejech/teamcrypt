'use strict';

const api = {};

export default api;

api.login = async function login(username, password){

    const url = '/api/login';
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

api.register = async function register(data){
    const url = '/api/register',
          opt = {
              method: 'POST',
              mode: 'same-origin',
              headers: {
                  'Content-Type': 'application/json; charset=utf-8'
              },
              body: JSON.stringify(data)
          }
    try{

        const r = await fetch(url, opt);

        return r.json()
    }
    catch(e){
        console.error(e);
    }
}

api.getUsers = async function getUsers(){

    const url = '/api/users';
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

api.updateKeyfile = async function updateRemoteKeyfile(keyfile){

    const url = '/api/user/keyfile',
          opt = {
              method: 'POST',
              mode: 'same-origin',
              headers: {
                  'Content-Type': 'application/json; charset=utf-8'
              },
              body: JSON.stringify({
                  data: keyfile.data,
                  salt: keyfile.salt
              })
          }

    try{
        let res = await fetch(url, opt);

        return res.json();
    }
    catch(e){ throw e }
}
