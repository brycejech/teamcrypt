<template lang="html">
    <div class="register">
        <form @submit.prevent="submit">
            <div class="col-12 pb-0">
                <input v-model="name" type="text" class="mb-0" placeholder="Name">
            </div>
            <div class="col-12 pb-0">
                <input v-model="email" type="email" class="mb-0" placeholder="Email">
            </div>
            <div class="col-12 pb-0">
                <input v-model="username" type="text" class="mb-0" placeholder="Username">
            </div>
            <div class="col-12 pb-0">
                <input v-model="password" type="password" class="mb-0" placeholder="Password">
            </div>
            <div class="col-12 pb-0">
                <input v-model="confirm" type="password" class="mb-0" placeholder="Confirm Password">
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
            const data = {
                name:     this.name,
                email:    this.email,
                username: this.username,
                password: this.password,
                confirm:  this.confirm
            }
            console.log(data);
        }
    }
}
</script>

<style lang="sass" scoped>
</style>
