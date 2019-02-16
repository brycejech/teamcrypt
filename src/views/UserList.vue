<template lang="html">
    <div class="user-list">
        <h2>Users</h2>
        <table class="table-striped mb-0">
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
                <tr v-for="user in users">
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
export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        this.$api.getUsers()
            .then(users => this.users = users);
    }
}
</script>

<style lang="sass" scoped>
    table
        tbody
            tr:nth-child(odd)
                background-color: rgba(black, 0.05)
</style>
