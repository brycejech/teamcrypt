'use strict';

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { Keyfile } from '../controllers/';

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
        updateUser(state, user){
            const uState = state.user;

            uState.id         = user.id;
            uState.uuid       = user.uuid;
            uState.name       = user.name;
            uState.email      = user.email;
            uState.username   = user.username;
            uState.registered = user.registered;
        },
        updateKeyfile(state, data){
            keyfile.keyfile = data.keyfile.data || [];
            state.keyfile = JSON.stringify(keyfile.toTree(), null, 2);
        },
        addKeyfileEntry(state, entry){
            keyfile.add(entry);
            state.keyfile = JSON.stringify(keyfile.toTree(), null, 2);
        }
    }
});

export default store;
