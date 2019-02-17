<template lang="html">
    <div class="keyfile-view">
        <h3>Entries</h3>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>URL</th>
                    <th>Username</th>
                    <th>Tags</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in entries" :data-id="entry.uuid">
                    <td>{{ entry.title }}</td>
                    <td>{{ entry.url }}</td>
                    <td>{{ entry.username }}</td>
                    <td>
                        <span class="pill" v-for="tag in entry.tags">{{ tag }}</span>
                    </td>
                    <td>
                        <keyfile-edit :entry="entry" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
'use strict';

import KeyfileEdit from '@/components/KeyfileEdit';

export default {
    name: 'KeyfileView',
    data(){
        return {

        }
    },
    computed: {
        entries(){
            return this.$store.getters.keyfileEntries;
        }
    },
    methods: {
        
    },
    created(){

    },
    components: {
        KeyfileEdit
    }
}
</script>

<style lang="sass" scoped>
    table
        tr:nth-child(even)
            background-color: rgba(black, .05)
</style>
