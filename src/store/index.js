'use strict';

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { Keyfile }  from '../controllers/';
import * as crypto  from '../lib/crypto';

import api from '../api/';

let keyfile;

window.keyfile = keyfile;

const store = new Vuex.Store({
    state: {
        keyfile: '',
        user: {
            id:         '',
            uuid:       '',
            name:       '',
            email:      '',
            username:   '',
            registered: ''
        }
    },
    getters: {
        keyfile(state){
            return state.keyfile;
        }
    },
    mutations: {
        login(state, user){
            state.user.id         = user.id;
            state.user.uuid       = user.uuid;
            state.user.name       = user.name;
            state.user.email      = user.email;
            state.user.username   = user.username;
            state.user.registered = user.registered;
        },
        keyfileUpdated(state){
            try{
                const tree = keyfile.toTree(),
                      json = JSON.stringify(tree, null, 2);

                state.keyfile = json;
            }
            catch(e){
                console.error('Error: keyfile.toTree():');
                console.error(e.message);
            }
        }
    },
    actions: {
        async login(context, user){
            context.commit('login', {
                id:         user.id,
                uuid:       user.uuid,
                name:       user.name,
                email:      user.email,
                username:   user.username,
                registered: user.registered
            });

            keyfile = window.keyfile = new Keyfile(null, user.keyfile.data, user.salt);

            await context.dispatch('keyfileSetKey', { pass: user.password, salt: user.keyfile.salt });

            if(typeof keyfile.data === 'string'){
                try{
                    await keyfile.decrypt();
                    context.commit('keyfileUpdated');
                }
                catch(e){
                    alert('FAILED TO DECRYPT KEYFILE');
                }
            }
        },
        async register(context, data){
            try{
                const r = await api.register(data);

                return r;
            }
            catch(e){
                console.error(e);
            }
        },
        keyfileSetKey(context, { pass, salt }){
            salt = typeof salt === 'string'
                ? crypto.hex2ab(salt)
                : salt;

            return keyfile.setKey(pass, salt);
        },
        keyfileEncrypt(){
            return keyfile.encrypt();
        },
        keyfileDecrypt(){
            return keyfile.decrypt();
        },
        async keyfileAddEntry(context, entry){
            try{
                keyfile.add(entry);

                await context.dispatch('keyfileEncrypt');

                const salt = typeof keyfile.salt === 'string'
                    ? salt
                    : crypto.ab2hex(keyfile.salt);

                const data = keyfile.data;

                try{
                    const newData = await api.updateKeyfile({ data, salt });

                    keyfile.data = newData.keyfile;

                    await context.dispatch('keyfileDecrypt');

                    context.commit('keyfileUpdated');
                }
                catch(e){
                    console.error(e);
                }


            }
            catch(e){
                throw e;
            }
        }
    }
});

export default store;
