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
        forums: [] as Forum[]/*,
        page: 0,
        limit: 10,*/
    }),
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
            if (confirm(`Are you sure you want to delete forum ${id}?`)) {
                const index = this.forums.findIndex(u => u.id == id);
                const forum = this.forums[index];
                //this.forums.splice(index, 1);

                if (!forum.isNew && confirm(`Are you sure you want to delete forum ${id}?`)) {
                    try {
                        await del(`/forums/${id}`);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        },
        /*async deleteForum(id: string) {
            if (confirm(`Are you sure you wish to delete forum ${id}?`)) {
                const index = this.forums.findIndex(u => u.id == id);
                this.forums.splice(index, 1);
            }
        },
        prevPage() {
            if (this.page > 0) {
                this.page--;
                this.$fetch();
            }
        },
        nextPage() {
            this.page++;
            this.$fetch();
        },*/
    },
    async fetch() {
        try {
            // const paginated = await get(`/forums?limit=${this.limit}&page=${this.page}`);
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
            <!-- <div class="pure-button-group pagination" role="group">
                <button class="pure-button" @click="prevPage" :disabled="page == 0">Previous</button>
                <a class="pure-button">Page {{ page + 1 }}</a>
                <button class="pure-button" @click="nextPage" :disabled="forums.length < limit">Next</button>
            </div> -->
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
