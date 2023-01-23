<script lang="ts">
import Header from "@/components/Header.vue"
import { defineComponent } from "vue"

export default defineComponent({
    components: {
        Header,
    },
    beforeCreate()
    {
        if (this.$store.state.authToken === "")
        {
            this.$router.replace({ path: "/login", query: { next: "/" } });
        }
    },
});
</script>

<template>
    <main>
        <Header />
        <section>
            <h1>Welcome to the LeerLevels user management platform {{ $store.state.stateUser.userName }}</h1>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>User management</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <NuxtLink to="/users">Users</NuxtLink>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <NuxtLink to="/groups">Groups</NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>Target management</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <NuxtLink to="/targets">Targets</NuxtLink>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <NuxtLink to="/questions">Questions</NuxtLink>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td>
                            <NuxtLink to="/sets">Sets</NuxtLink>
                        </td>
                    </tr> -->
                </tbody>
            </table>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>Forums</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <NuxtLink to="/forums">Forums</NuxtLink>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
</template>

<style scoped>
table {
    float: left;
    width: 30%;
    max-width: 300px;
    margin-right: 3em;
    margin-bottom: 1.5em;
}
</style>