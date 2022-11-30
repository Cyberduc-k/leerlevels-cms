<script setup lang="ts">
</script>

<template>
    <header class="heading">
        <nav class="pure-menu pure-menu-horizontal">
            <ul class="pure-menu-list">
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
                        <a class="pure-menu-link" :href="href" @click="navigate">forums</a>
                    </li>
                </NuxtLink>
            </ul>
        </nav>
    </header>
</template>

<style>
header.heading {
    border-bottom: 1px solid hsl(0, 0%, 79.6%);
}

.pure-menu-item {
    line-height: 30px;
}
</style>