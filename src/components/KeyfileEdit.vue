<template lang="html">
    <div class="edit-entry">
        <svg class="icon edit" data-toggle="modal" :data-target="'#_' + entry.uuid" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor" d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z" class=""></path>
        </svg>

        <svg class="icon delete" @click="deleteEntry" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M140 274c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v12c0 6.6-5.4 12-12 12H140zm364-18c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"></path>
        </svg>

        <div :id="'_' + entry.uuid" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="edit-entry">
                        <form @submit.prevent="formSubmit">
                            <h1 class="text-center mt-2 mb-0">Edit Entry</h1>
                            <h5 class="text-center"><small>{{ entry.uuid }}</small></h5>
                            <div class="container">
                                <div class="row">
                                    <div class="col-12 pb-0">
                                        <label for="e-title">Title</label>
                                        <input id="e-title" v-model="title" type="text" class="mb-0">
                                    </div>
                                    <div class="col-12 pb-0">
                                        <form @submit.prevent="addTag">
                                            <label for="e-tag">Tags</label>
                                            <input id="e-tag" v-model="tag" type="text" class="mb-0">
                                            <span v-for="tag in this.tags" class="pill">{{ tag }}</span>
                                        </form>
                                    </div>
                                    <div class="col-12 pb-0">
                                        <label for="e-username">Username</label>
                                        <input id="e-username" v-model="username" type="text" class="mb-0">
                                    </div>
                                    <div class="col-6 pb-0">
                                        <label for="e-password">Password</label>
                                        <input id="e-password" v-model="password" type="password" class="mb-0">
                                    </div>
                                    <div class="col-6 pb-0">
                                        <label for="e-confirm">Confirm Password</label>
                                        <input id="e-confirm" v-model="confirm" type="password" class="mb-0">
                                    </div>
                                    <div class="col-12 pb-0">
                                        <label for="e-url">URL</label>
                                        <input id="e-url" v-model="url" type="text" class="mb-0">
                                    </div>
                                    <div class="col-12 pb-0">
                                        <label for="e-notes">Notes</label>
                                        <textarea id="e-notes" v-model="notes" rows="6" class="mb-0"></textarea>
                                    </div>
                                    <div class="col-6 col-offset-3 pb-0">
                                        <button class="btn btn-block btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
'use strict';

export default {
    name: 'KeyfileEdit',
    props: [ 'entry' ],
    data(){
        return {
            uuid:     '',
            title:    '',
            username: '',
            password: '',
            confirm:  '',
            url:      '',
            notes:    '',
            tag:      '',
            tags:     new Set()
        }
    },
    created(){
        this.uuid     = this.entry.uuid;
        this.title    = this.entry.title;
        this.username = this.entry.username;
        this.password = this.entry.password;
        this.confirm  = this.entry.password;
        this.url      = this.entry.url;
        this.notes    = this.entry.notes;

        this.entry.tags.forEach(tag => this.tags.add(tag));
    },
    methods: {
        addTag(){
            this.tags.add(this.tag);
            this.tag = '';
        },
        formSubmit(){
            if(this.password !== this.confirm){
                alert('Passwords do not match!!!');
                return;
            }

            const data = {
                uuid:     this.uuid,
                title:    this.title,
                tags:     Array.from(this.tags),
                username: this.username,
                password: this.password,
                confirm:  this.confirm,
                url:      this.url,
                notes:    this.notes
            }

            this.$store.dispatch('keyfileEditEntry', data);
        },
        deleteEntry(){
            this.$store.dispatch('keyfileDeleteEntry', this.uuid);
        }
    }
}
</script>

<style lang="sass" scoped>
    .icon
        position: relative
        max-width: 30px

        &.edit
            color: blue
            margin-right: 8px
        &.delete
            max-width: 24px
            color: red
</style>
