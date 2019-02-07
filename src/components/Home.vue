<template lang="html">
    <div class="row">
        <div class="col-8 col-offset-2">
            <div v-if="user.name" class="card">
                <h3>Logged-in User</h3>
                <table class="table table-striped">
                    <tr>
                        <th>Name</th>
                        <td>{{ user.name }}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{{ user.username }}</td>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <td>{{ user.id }}</td>
                    </tr>
                    <tr>
                        <th>UUID</th>
                        <td>{{ user.uuid }}</td>
                    </tr>
                    <tr>
                        <th>Registered</th>
                        <td>{{ user.registered }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
'use strict';

export default {
    data() {
        return {
            name: 'Bryce'
        }
    },
    computed: {
        user(){
            return this.$store.state.user
        }
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
