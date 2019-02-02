import Vue from 'vue'
import Router from 'vue-router'

import Login    from '@/components/Login'
import Register from '@/components/Register'
import AddEntry from '@/components/AddEntry'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
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
        }
    ]
})
