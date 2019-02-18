<template lang="html">
    <div class="edit-entry">

        <div class="icon edit" data-toggle="modal" :data-target="'#_' + entry.uuid">
            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zm-95.196 140.45L174 420.745V386h-48v-48H91.255l224.059-224.059 82.745 82.745zM126.147 468.598l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z"></path>
            </svg>
        </div>

        <div class="icon delete" @click="deleteEntry(entry.uuid)">
            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z" class=""></path>
            </svg>
        </div>

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
        deleteEntry(uuid){
            this.$store.dispatch('keyfileDeleteEntry', uuid);
        },
    }
}
</script>

<style lang="sass" scoped>
    .icon
        position: relative
        color: white
        display: inline-block
        float: left
        padding: 8px
        border-radius: 3px
        width: 35px
        height: 35px

        &.edit
            background-color: #0058ba
            margin-right: 8px
            padding: 6px
        &.delete
            background-color: #e41d1d

            svg
                position: relative
                top: -2px
</style>
