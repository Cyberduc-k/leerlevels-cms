<script lang="ts">
import Header from "@/components/Header.vue"
import { defineComponent } from "vue"

export default defineComponent({
    components: {
        Header,
    },
    beforeCreate() {
        if (this.$store.state.authToken === "") {
            //this.$router.replace({ path: "/login", query: { next: "/" } });
            this.$router.push('/login');
        }
    },
});
</script>

<template>
    <main>
        <Header />
        <section>
            <h1>Welcome to the LeerLevels user management platform {{ $store.state.stateUser.userName }}</h1>
        </section>
    </main>
</template>