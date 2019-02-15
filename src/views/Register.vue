<template lang="html">
    <div class="register">
        <h2>Register</h2>
        <form @submit.prevent="submit">
            <div class="col-12 pb-0">
                <label for="name">Name</label>
                <input id="name" v-model="name" type="text" class="mb-0" placeholder="Name">
            </div>
            <div class="col-12 pb-0">
                <label for="email">Email</label>
                <input id="email" v-model="email" type="email" class="mb-0" placeholder="Email">
            </div>
            <div class="col-12 pb-0">
                <label for="username">Username</label>
                <input id="username" v-model="username" type="text" class="mb-0" placeholder="Username">
            </div>
            <div class="col-12 pb-0">
                <label for="password">Password</label>
                <input id="password" v-model="password" type="password" class="mb-0" placeholder="Password">
            </div>
            <div class="col-12 pb-0">
                <label for="confirm">Confirm Password</label>
                <input id="confirm" v-model="confirm" type="password" class="mb-0" placeholder="Confirm Password">
            </div>
            <div class="col-4">
                <button class="btn btn-primary btn-block" type="submit" role="submit">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
'use strict';

export default {
    data() {
        return {
            name:     '',
            email:    '',
            username: '',
            password: '',
            confirm:  ''
        }
    },
    methods: {
        submit(){

            if(this.password !== this.confirm){
                return alert('Passwords do not match');
            }

            const data = {
                name:     this.name,
                email:    this.email,
                username: this.username,
                password: this.password,
                confirm:  this.confirm
            }

            fetch('/register', {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            })
            .then(r => r.json())
            .then(r => {
                console.log(r);

                this.reset();
            })
            .catch(e => {
                console.log(e);
            });
        },

        reset(){
            this.name     = '';
            this.email    = '';
            this.username = '';
            this.password = '';
            this.confirm  = '';
        }
    }
}
</script>

<style lang="sass" scoped>
</style>
