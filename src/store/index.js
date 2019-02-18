'use strict';

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { Keyfile }  from '../controllers/';
import * as crypto  from '../lib/crypto';

import api from '../api/';

let keyfile = window.keyfile = new Keyfile();

const store = new Vuex.Store({
    state: {
        entries: [],
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
        kefileTags(state){
            return keyfile.tags ? keyfile.tags : [];
        },
        keyfileEntries(state){
            return state.entries;
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
        setEntries(state, arr){
            state.entries = arr;
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

            await context.dispatch('keyfileSetKey', {
                pass: user.password,
                salt: user.keyfile.salt
            });

            if(typeof keyfile.data === 'string'){
                try{
                    await keyfile.decrypt();
                    context.commit('setEntries', keyfile.data);
                }
                catch(e){
                    alert('FAILED TO DECRYPT KEYFILE');
                }
            }
            else if(Array.isArray(keyfile.data)){
                context.commit('setEntries', keyfile.data);
            }
            else{
                context.commit('setEntries', []);
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
        async keyfileUpdateRemote(context){
            try{
                await context.dispatch('keyfileEncrypt');

                const salt = typeof keyfile.salt === 'string'
                    ? salt
                    : crypto.ab2hex(keyfile.salt);

                const data = keyfile.data;

                const newData = await api.updateKeyfile({ data, salt });

                keyfile.data = newData.keyfile;

                await context.dispatch('keyfileDecrypt');

                context.commit('setEntries', keyfile.data);
            }
            catch(e){
                console.error(e);
            }
        },
        async keyfileAddEntry(context, entry){
            try{
                keyfile.add(entry);

                await context.dispatch('keyfileUpdateRemote');
            }
            catch(e){
                console.error(e);
            }
        },
        async keyfileEditEntry(context, data){
            const entry = keyfile.findByUUID(data.uuid);

            entry.title    = data.title;
            entry.tags     = Array.from(data.tags);
            entry.username = data.username;
            entry.password = data.password;
            entry.url      = data.url;
            entry.notes    = data.notes;

            await context.dispatch('keyfileUpdateRemote');
        },
        async keyfileDeleteEntry(context, uuid){
            try{
                keyfile.deleteEntry(uuid);

                await context.dispatch('keyfileUpdateRemote');
            }
            catch(e){
                console.error(e);
            }
        }
    }
});

export default store;
