<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    methods: {
        logout() {
            this.$store.commit('setToken', "");
            this.$store.commit('setAuthTokenExpiresAt', "");
            this.$store.commit('setStateUser', {});
            this.$store.commit('setRefreshToken', "");
            this.$store.commit('setRefreshTokenExpiresAt', "");

            const route = this.$route.fullPath;

            this.$router.push({ path: "/login" });
        },
    }
});
</script>

<template>
    <header class="heading">
        <nav class="pure-menu pure-menu-horizontal">
            <ul class="pure-menu-list">
                <li class="pure-menu-item">
                    <img class="leerlevels-image" src="@/assets/LeerLevels_Logo_Horizontal.svg" />
                </li>
                <NuxtLink to="/" custom v-slot="{ href, navigate, isExactActive }">
                    <li :class="{ 'pure-menu-item': true, 'pure-menu-selected': isExactActive }">
                        <a class="pure-menu-link" :href="href" @click="navigate">Home</a>
                    </li>
                </NuxtLink>
                <NuxtLink to="/users" custom v-slot="{ href, navigate, isActive }">
                    <li :class="{ 'pure-menu-item': true, 'pure-menu-selected': isActive }">
                        <a class="pure-menu-link" :href="href" @click="navigate">Users</a>
                    </li>
                </NuxtLink>
                <NuxtLink to="/forums" custom v-slot="{ href, navigate, isActive }">
                    <li :class="{ 'pure-menu-item': true, 'pure-menu-selected': isActive }">
                        <a class="pure-menu-link" :href="href" @click="navigate">Forums</a>
                    </li>
                </NuxtLink>
                <NuxtLink to="/groups" custom v-slot="{ href, navigate, isActive }">
                    <li :class="{ 'pure-menu-item': true, 'pure-menu-selected': isActive }">
                        <a class="pure-menu-link" :href="href" @click="navigate">Groups</a>
                    </li>
                </NuxtLink>
                <NuxtLink to="/targets" custom v-slot="{ href, navigate, isActive }">
                    <li :class="{ 'pure-menu-item': true, 'pure-menu-selected': isActive }">
                        <a class="pure-menu-link" :href="href" @click="navigate">Targets</a>
                    </li>
                </NuxtLink>
                <NuxtLink to="/questions" custom v-slot="{ href, navigate, isActive }">
                    <li :class="{ 'pure-menu-item': true, 'pure-menu-selected': isActive }">
                        <a class="pure-menu-link" :href="href" @click="navigate">Questions</a>
                    </li>
                </NuxtLink>
                <li class="pure-menu-item logout">
                    <button class="pure-button" @click="logout">Logout</button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style>
header.heading {
    border-bottom: 1px solid hsl(0, 0%, 79.6%);
}

header.heading .leerlevels-image {
    height: 40px;
    vertical-align: middle;
}

.pure-menu-list {
    width: 100%;
}

.pure-menu-item {
    line-height: 30px;
}

.logout {
    float: right;
    margin: 6px 0;
}
</style>