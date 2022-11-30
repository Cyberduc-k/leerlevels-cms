<script setup lang="ts">
import Header from "@/components/Header.vue"
//import { state } from "@/store/index"
</script>

<template>
    <main>
        <Header />
        <section>
            <h1>Welcome to the LeerLevels user management platform {{ $store.state.stateUser.userName }}</h1>
        </section>
    </main>
</template>