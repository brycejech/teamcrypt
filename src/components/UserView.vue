<template lang="html">
    <div class="row">
        <h3>Current User</h3>
        <table v-if="user.name">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>UUID</th>
                    <th>Registered</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.uuid }}</td>
                    <td>{{ user.registered }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
'use strict';

export default {
    name: 'UserView',
    computed: {
        user(){
            return this.$store.state.user
        }
    }
}
</script>

<style lang="css" scoped>

</style>
