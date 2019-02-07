<template>
    <div id="app">
        <navbar />
        <div id="page-wrapper">
            <div class="container mt-3">
                <router-view/>
            </div>
        </div>

    </div>
</template>

<script>
'use strict';

import Navbar from '@/components/Navbar'

export default {
    name: 'App',
    components: {
        Navbar
    }
}
</script>

<style lang="sass">

@import 'style/variables'

#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

[class*="col-"] .row
    margin-left: -1rem
    margin-right: -1rem


input,
select,
textarea
    margin: .5rem 0
</style>
