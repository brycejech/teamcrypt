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
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
'use strict';

export default {
    name: 'KeyfileView',
    computed: {
        entries(){
            return this.$store.getters.keyfileEntries;
        }
    },
    created(){

    }
}
</script>

<style lang="sass" scoped>
    table
        tr:nth-child(even)
            background-color: rgba(black, .05)
    .pill
        display: inline-block
        padding: 3px
        margin-right: 3px
        background: #3F3F3F
        color: white
</style>
