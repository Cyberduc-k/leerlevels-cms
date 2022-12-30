<script lang="ts">
import Header from "@/components/Header.vue";
import UserRow from "@/components/UserRow.vue";
import { defineComponent } from "vue"
import { User, UserRole } from "@/src/User";
import { get, del } from "@/src/requests";

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
        addUser() {
            this.users.push({
                isNew: true,
                id: "N/A",
                email: "",
                firstName: "",
                lastName: "",
                userName: "",
                isActive: true,
                role: UserRole.Student,
            });
        },
        async deleteUser(id: string) {
            const index = this.users.findIndex(u => u.id == id);
            const user = this.users[index];

            user.isActive = false;

            if (!user.isNew && confirm(`Are you sure you wish to delete user ${id}`)) {
                try {
                    await del(`/users/${id}`);
                } catch (e) {
                    console.error(e);
                }
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
        try {
            const paginated = await get(`/users?limit=${this.limit}&page=${this.page}`);
            this.users = paginated.data.items;
        } catch (e: any) {
            if (e.status === 401) {
                this.$router.replace({ path: "/login", query: { next: "/users" } });
            } else {
                console.error(e);
            }
        }
    },
});
</script>

<template>
    <main>
        <Header />
        <section>
            <header class="pure-g">
                <h1>Users</h1>
                <button class="pure-button pure-button-primary button-add" @click="addUser">Add User</button>

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