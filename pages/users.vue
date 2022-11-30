<script lang="ts">
import Header from "@/components/Header.vue";
import UserRow from "@/components/UserRow.vue";
import { defineComponent } from "vue"
import { User } from "@/src/User";
import { get } from "@/src/requests";

export default defineComponent({
    components: {
        Header,
        UserRow,
    },
    data: () => ({
        users: [] as User[],
        page: 0,
        limit: 10,
    }),
    methods: {
        async deleteUser(id: string) {
            if (confirm(`Are you sure you wish to delete user ${id}`)) {
                const index = this.users.findIndex(u => u.id == id);
                this.users.splice(index, 1);
            }
        },
        prevPage() {
            if (this.page > 0) {
                this.page--;
                this.$fetch();
            }
        },
        nextPage() {
            this.page++;
            this.$fetch();
        },
    },
    async fetch() {
        const paginated = await get(`/users?limit=${this.limit}&page=${this.page}`);
        this.users = paginated.items;
    },
});
</script>

<template>
    <main>
        <Header />
        <section>
            <header class="pure-g">
                <h1>Users</h1>
                <NuxtLink class="pure-button pure-button-primary button-add" to="CreateUser">Add User</NuxtLink>

            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <UserRow v-for="user in users" :key="user.id" :user="user" @deleteUser="deleteUser"/>
                </tbody>
            </table>
            <div class="pure-button-group pagination" role="group">
                <button class="pure-button" @click="prevPage" :disabled="page == 0">Previous</button>
                <a class="pure-button">Page {{ page + 1 }}</a>
                <button class="pure-button" @click="nextPage" :disabled="users.length < limit">Next</button>
            </div>
        </section>
    </main>
</template>

<style scoped>
table {
    width: 100%;
}

h1 {
    display: inline-block;
}

.button-add {
    margin-left: auto;
    align-self: center;
}

.pagination {
    margin: auto;
    margin-top: 20px;
    display: inline-block;
}
</style>