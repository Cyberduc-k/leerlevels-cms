<script lang="ts">
import Header from "@/components/Header.vue";
import { Forum } from "@/src/Forum"
import ForumRow from "@/components/ForumRow.vue"
import { defineComponent } from "vue"
import { get, del } from "@/src/requests";

export default defineComponent({
    components: {
        Header,
        ForumRow,
    },
    data: () => ({
        forums: [] as Forum[],
    }),
    beforeCreate() {
        if (this.$store.state.authToken === "") {
            this.$router.replace({ path: "/login", query: { next: "/" } });
        }
    },
    methods: {
      AddForum() {
            this.forums.push({
                isNew: true,
                id: "N/A",
                title: "",
                description: "",
            });
        },
        async deleteForum(id: string) {
                const index = this.forums.findIndex(u => u.id == id);
                const forum = this.forums[index];

            if(forum.isNew && this.forums != undefined) {
                this.forums.pop();
            }

            if (!forum.isNew && confirm(`Are you sure you want to delete forum ${id}?`)) {
                try {
                    await del(`/forums/${id}`);
                } catch (e) {
                    console.error(e);
                }
            }
        },
    },
    async fetch() {
        try {
            const result = await get(`/forums`).then( (result) => { return JSON.parse(result.data)});
            this.forums = result;
        } catch (e: any) {
            console.error(e);
        }
    },
});
</script>

<template>
    <main>
        <Header></Header>
        <section>
            <header class="pure-g">
                <h1>Forums</h1>
                <button class="pure-button pure-button-primary button-add" @click="AddForum">Add Forum</button>

            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <ForumRow v-for="forum in forums" :key="forum.id" :forum="forum" @deleteForum="deleteForum"/>
                </tbody>
            </table>
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