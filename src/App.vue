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
    
</style>
