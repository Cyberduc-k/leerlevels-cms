<script setup lang="ts">
</script>

<template>
    <header>
        <nav>
            <ul>
                <li><NuxtLink active-class="active" to="/users">Users</NuxtLink></li>
                <li><NuxtLink active-class="active" to="/posts">Forums Posts</NuxtLink></li>
                <li><NuxtLink active-class="active" to="/replies">Forum Replies</NuxtLink></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    width: 100vw;
    height: 50px;
    border-bottom: 1px solid black;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    float: left;
    padding: 0;
    margin: 0;
}

a {
    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    border-right: 1px solid black;
}

.active {
    background: #eee;
}
</style>
