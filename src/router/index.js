import Vue from 'vue';
import Router from 'vue-router';

import Home     from '@/components/Home';
import Login    from '@/components/Login';
import Register from '@/components/Register';
import AddEntry from '@/components/AddEntry';
import UserList from '@/components/UserList';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/add-entry',
            name: 'add-entry',
            component: AddEntry
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/users',
            name: 'users',
            component: UserList
        }
    ]
})
