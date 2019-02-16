<template lang="html">
    <div>
        <user-view />
        <keyfile-view />
        <add-entry />
        <div class="row">
            <div class="col-12 my-0 py-0 mx-0 px-0">
                <button @click="showModal" class="btn btn-primary float-left my-0">Add Entry</button>
            </div>
        </div>
    </div>
</template>

<script>
'use strict';
import UserView    from '@/components/UserView';
import KeyfileView from '@/components/KeyfileView';
import AddEntry    from '@/components/AddEntry';

export default {
    name: 'HomePage',
    data() {
        return {

        }
    },
    methods: {
        showModal(){
            window.modal('#add-entry-modal');
        }
    },
    created(){
        if(!this.$store.state.user.name){
            this.$router.push({ name: 'login' });
        }
    },
    components: {
        KeyfileView,
        AddEntry,
        UserView
    }
}

</script>

<style lang="sass" scoped>

.card
    padding: 1rem
table
    max-width: 75%
    margin: 0 auto 25px

    tr:last-child
        border-bottom: none
</style>
