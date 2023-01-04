<script lang="ts">
import Header from "@/components/Header.vue";
import UserRow from "@/components/UserRow.vue";
import { defineComponent } from "vue"
import { User, UserRole } from "@/src/User";
import { get, put, del } from "@/src/requests";

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
        async activateUser(id: string) {
            const index = this.users.findIndex(u => u.id == id);
            const user = this.users[index];

            if(!user.isNew && confirm(`Are you sure you wish to re-enable user ${id}?`)) {
                try {
                    /*await put(`/users/${id}`, {
                        isActive: user.isActive
                    });*/
                    //user.isActive = true;

                    const res = await put(`/users/${id}`, {
                        isActive: true
                    }).then( (res) => { return JSON.parse(res.data)});
                    user.isActive = res.isActive;


                }
                catch (e) {
                    console.error(e);
                }
            }
        },
        async deleteUser(id: string) {
            const index = this.users.findIndex(u => u.id == id);
            const user = this.users[index];

            if(user.isNew && this.users != undefined) {
                this.users.pop();
            }

            if (!user.isNew && confirm(`Are you sure you wish to delete user ${id}?`)) {
                try {
                    await del(`/users/${id}`);
                    user.isActive = false;
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
            const paginated = await get(`/users?limit=${this.limit}&page=${this.page}`).then( (paginated) => { return JSON.parse(paginated.data)});
            this.users = paginated.items;
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
                        <th id="id-column">Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <UserRow v-for="user in users" :key="user.id" :user="user" @activateUser="activateUser" @deleteUser="deleteUser"/>
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

#id-column {
    width: 150px;
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