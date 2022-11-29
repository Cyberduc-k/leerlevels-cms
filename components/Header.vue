<script setup lang="ts">
</script>

<template>
    <header>
        <nav class="pure-menu pure-menu-horizontal">
            <ul class="pure-menu-list">
                <li class="pure-menu-item">
                    <NuxtLink active-class="active" class="pure-menu-link" to="/users">Users</NuxtLink>
                </li>
                <li class="pure-menu-item">
                    <NuxtLink active-class="active" class="pure-menu-link" to="/posts">Forums Posts</NuxtLink>
                </li>
                <li class="pure-menu-item">
                    <NuxtLink active-class="active" class="pure-menu-link" to="/replies">Forum Replies</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>
