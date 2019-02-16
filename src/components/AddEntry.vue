<template lang="html">
    <div id="add-entry-modal" class="modal modal-lg">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="add-entry vue">
                    <form @submit.prevent="formSubmit">
                        <h2>Add Entry</h2>

                        <div class="container">
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
                                    <form @submit.prevent="addTag">
                                        <label for="v-tag">Tags</label>
                                        <input @input="showTags" id="v-tag" v-model="tag" type="text" class="mb-0">
                                    </form>
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
'use strict';

export default {
    name: 'AddEntry',
    data(){
        return {
            type:            'entry',
            title:           '',
            tag:             '',
            username:        '',
            password:        '',
            confirmPassword: '',
            url:             '',
            notes:           '',
            passphrase:      '',
            salt:            '',
            output:          '',
            tags:            [],
            tree:            []
        }
    },
    methods: {
        formSubmit(e){
            const data = {
                type:            this.type,
                title:           this.title,
                tags:            this.tags,
                username:        this.username,
                password:        this.password,
                confirmPassword: this.confirmPassword,
                url:             this.url,
                notes:           this.notes
            };

            this.$store.dispatch('keyfileAddEntry', data);

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
        },
        showTags(){
            console.log(this.$store.getters.keyfileTags);
        },
        addTag(){
            this.tags.push(this.tag);
            this.tag = '';
        }
    },
    computed: {

    }
}
</script>

<style lang="sass" scoped>

pre
    text-align: left

</style>
