<template lang="html">
    <div class="user-list">
        <h2>Users</h2>
        <div class="row">
            <div v-for="user in users" class="col-4">
                <div class="card">
                    <table style="margin-bottom: 0">
                        <tr>
                            <th>Name:</th>
                            <td>{{ user.name }}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td>{{ user.email }}</td>
                        </tr>
                        <tr>
                            <th>Username:</th>
                            <td>{{ user.username }}</td>
                        </tr>
                        <tr>
                            <th>Registered</th>
                            <td>{{ user.registered }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
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
    .card
        margin-bottom: 2rem
</style>
