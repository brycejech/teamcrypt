<template lang="html">
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="submit">
            <div class="col-12 pb-0">
                <label for="username">Username or Email</label>
                <input id="username" v-model="username" type="text" class="mb-0" placeholder="Username or email">
            </div>
            <div class="col-12 pb-0">
                <label for="password">Password</label>
                <input id="password" v-model="password" type="password" class="mb-0" placeholder="Password">
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
            username: '',
            password: ''
        }
    },
    methods: {
        submit(){
            this.$api.login(this.username, this.password)
                .then(r => {
                    // Pass the submitted pass to $store for keyfile decryption
                    r.password = this.password;
                    this.$store.dispatch('login', r);
                    this.$store.commit('updateKeyfile', r);

                    this.$router.push({ name: 'home' });
                })
                .catch(e => console.log(e));
        }
    }
}
</script>

<style lang="sass" scoped>
</style>
