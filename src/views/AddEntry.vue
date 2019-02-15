<template lang="html">
    <div class="add-entry vue">
        <form @submit.prevent="formSubmit">
            <h2>Add Entry</h2>

            <div class="row">
                <div class="col-12 pb-0">
                    <label for="v-type">Type</label>
                    <select id="v-type" v-model="type" class="mb-0">
                        <option value="entry" selected>Entry</option>
                        <option value="folder">Folder</option>
                    </select>
                </div>
                <div class="col-12 pb-0">
                    <label for="v-title">Title</label>
                    <input id="v-title" v-model="title" type="text" class="mb-0">
                </div>
                <div class="col-12 pb-0">
                    <label for="v-parent">Parent</label>
                    <input id="v-parent" v-model="parent" type="text" class="mb-0">
                </div>
                <div v-if="type === 'entry'" class="col-12 pb-0">
                    <label for="v-username">Username</label>
                    <input id="v-username" v-model="username" type="text" class="mb-0">
                </div>
                <div v-if="type === 'entry'" class="col-6 pb-0">
                    <label for="v-password">Password</label>
                    <input id="v-password" v-model="password" type="password" class="mb-0">
                </div>
                <div v-if="type === 'entry'" class="col-6 pb-0">
                    <label for="v-confirm-password">Confirm Password</label>
                    <input id="v-confirm-password" v-model="confirmPassword" type="password" class="mb-0">
                </div>
                <div v-if="type === 'entry'" class="col-12 pb-0">
                    <label for="v-url">URL</label>
                    <input id="v-url" v-model="url" type="text" class="mb-0">
                </div>
                <div v-if="type === 'entry'" class="col-12 pb-0">
                    <label for="v-notes">Notes</label>
                    <textarea id="v-notes" v-model="notes" rows="6" class="mb-0"></textarea>
                </div>
                <div class="col-6 col-offset-3 pb-0">
                    <button class="submit btn btn-block btn-primary">Submit</button>
                </div>
            </div>
        </form>

        <code>
            <pre>{{ keyfile }}</pre>
        </code>
    </div>
</template>

<script>
'use strict';

export default {
    data(){
        return {
            type:            'entry',
            title:           '',
            parent:          '',
            username:        '',
            password:        '',
            confirmPassword: '',
            url:             '',
            notes:           '',
            passphrase:      '',
            salt:            '',
            output:          '',
            tree:            []
        }
    },
    methods: {
        formSubmit(e){
            const data = {
                type:            this.type,
                title:           this.title,
                parent:          this.parent,
                username:        this.username,
                password:        this.password,
                confirmPassword: this.confirmPassword,
                url:             this.url,
                notes:           this.notes
            };

            this.$store.commit('addKeyfileEntry', data);

            this.reset();
        },
        reset(){
            this.title           = '';
            this.parent          = '';
            this.username        = '';
            this.password        = '';
            this.confirmPassword = '';
            this.url             = '';
            this.notes           = '';
        }
    },
    computed: {
        keyfile(){
            return this.$store.getters.keyfile;
        }
    }
}
</script>

<style lang="sass" scoped>

pre
    text-align: left

</style>
