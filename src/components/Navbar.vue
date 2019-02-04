
<template lang="html">
    <nav>
        <div class="container py-0">
            <router-link id="logo" to="/">
                <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M224 412c-15.5 0-28-12.5-28-28v-64c0-15.5 12.5-28 28-28s28 12.5 28 28v64c0 15.5-12.5 28-28 28zm224-172v224c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V240c0-26.5 21.5-48 48-48h32v-48C80 64.5 144.8-.2 224.4 0 304 .2 368 65.8 368 145.4V192h32c26.5 0 48 21.5 48 48zm-320-48h192v-48c0-52.9-43.1-96-96-96s-96 43.1-96 96v48zm272 48H48v224h352V240z" class=""></path>
                </svg>
                <h3>Teamcrypt</h3>
            </router-link>
            <ul>
                <li>
                    <router-link to="/login">
                        <span>Login</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/register">
                        <span>Register</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/add-entry">
                        <span>Add Entry</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/users">
                        <span>Users</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>

@import '../style/variables'

nav
    display: block
    width: 100%
    border-bottom: 1px solid

    a
        color: $gray
        text-decoration: none
        font-size: 2.2rem

    #logo
        float: left

        h3
            display: inline
        svg
            position: relative
            display: inline
            top: 8px
            max-width: 35px
            width: 35px
            margin-right: 10px

    ul
        float: right
        margin: 0
        list-style-type: none

        li
            margin: 0
            padding: 0
            float: left

            a span
                display: inline-block
                padding: 15px 18px

</style>
