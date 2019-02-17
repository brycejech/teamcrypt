<template>
    <div id="app">
        <navbar/>
        <div class="container mt-3">
            <router-view/>
        </div>
    </div>
</template>

<script>
'use strict';

import Navbar from '@/components/Navbar';

export default {
    name: 'App',
    components: {
        Navbar
    }
}

</script>

<style lang="sass">
    .pill
        display: inline-block
        padding: 3px
        margin-right: 3px
        background: #3F3F3F
        color: white
</style>
