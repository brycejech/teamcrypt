'use strict';

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { Keyfile } from '../controllers/';

const store = new Vuex.Store({
    state: {
        keyfile: {
            data:         '',
            lastModified: ''
        },
        user: {
            id:         '',
            uuid:       '',
            name:       '',
            email:      '',
            username:   '',
            registered: ''
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
        }
    }
});

export default store;
