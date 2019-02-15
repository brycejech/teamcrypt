'use strict';

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { Keyfile } from '../controllers/';
import { hex2ab }  from '../lib/crypto';

const keyfile = new Keyfile();

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
        // Move this to login action
        updateKeyfile(state, data){
            keyfile.keyfile = data.keyfile.data || [];

            keyfile.setKey(data.password, hex2ab(data.keyfile.salt))
                .then(() => {
                    window.keyfile = keyfile;

                    state.keyfile = JSON.stringify(keyfile.toTree(), null, 2);
                })
                .catch(e => console.log(e));
        },
        addKeyfileEntry(state, entry){
            keyfile.add(entry);
            state.keyfile = JSON.stringify(keyfile.toTree(), null, 2);
        }
    },
    actions: {
        login(context, user){
            const data = {
                id:         user.id,
                uuid:       user.uuid,
                name:       user.name,
                email:      user.email,
                username:   user.username,
                password:   user.password,
                registered: user.registered
            }
            context.commit(user);
        }
    }
});

export default store;
