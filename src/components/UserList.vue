<template lang="html">
    <div class="user-list">
        <h2>Users</h2>
        <ul style="list-style-type: none">
            <li v-for="user in users" style="margin: 0; padding: 0">
                <div class="card">
                    <table style="margin-bottom: 0">
                        <tr>
                            <td>Name:</td>
                            <td>{{ user.name }}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{{ user.email }}</td>
                        </tr>
                        <tr>
                            <td>Username:</td>
                            <td>{{ user.username }}</td>
                        </tr>
                        <tr>
                            <td>Registered</td>
                            <td>{{ user.registered }}</td>
                        </tr>
                    </table>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        }
    },
    template: '#user-list-template',
    created() {
        fetch('/users')
            .then(r => r.json())
            .then(r => this.users = r)
            .catch(e => console.error(e));
    }
}
</script>

<style lang="sass" scoped>
    .card
        margin-bottom: 2rem
</style>
