<script lang="ts">
import CreateUser from "@/components/CreateUser.vue";
import Header from "@/components/Header.vue";
import { defineComponent } from "vue"


export default defineComponent({
    components:{
        CreateUser,
        Header,
    }
});

</script>

<template>
    <main>
        <Header></Header>
        <div>
            <CreateUser/>
        </div>
    </main>



</template>