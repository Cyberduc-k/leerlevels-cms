<script lang="ts">
import CreateUser from "@/components/CreateUser.vue";
import Header from "@/components/Header.vue";
import { defineComponent } from "vue"
import CreateForum from "~/components/CreateForum.vue";


export default defineComponent({
    components:{
    CreateUser,
    Header,
    CreateForum
}
});

</script>

<template>
    <main>
        <Header></Header>
        <div>
            <CreateForum />
        </div>
    </main>



</template>