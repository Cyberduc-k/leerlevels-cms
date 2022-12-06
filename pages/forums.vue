<script lang="ts">
import Header from "@/components/Header.vue";
import { Forum } from "@/src/Forum"
import ForumRow from "@/components/ForumRow.vue"
import { defineComponent } from "vue"
import { get } from "@/src/requests";

export default defineComponent({
    components: {
        Header,
        ForumRow,
    },
    data: () => ({
        forums: [] as Forum[],
        page: 0,
        limit: 10,
    }),
    methods: {
        async deleteForum(id: string) {
            if (confirm(`Are you sure you wish to delete forum ${id}`)) {
                const index = this.forums.findIndex(u => u.forumId == id);
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
        },
    },
    async fetch() {
        const paginated = await get(`/forums?limit=${this.limit}&page=${this.page}`);
        this.forums = paginated.items;
    },
});
</script>

<template>
    <main>
        <Header></Header>
        <section>
            <header class="pure-g">
                <h1>Forums</h1>
                <NuxtLink class="pure-button pure-button-primary button-add" to="CreateForum">Add Forum</NuxtLink>

            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>forumId</th>
                        <th>forum Title</th>
                        <th>description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <ForumRow v-for="forum in forums" :key="forum.forumId" :forum="forum" @deleteForum="deleteForum"/>
                </tbody>
            </table>
            <div class="pure-button-group pagination" role="group">
                <button class="pure-button" @click="prevPage" :disabled="page == 0">Previous</button>
                <a class="pure-button">Page {{ page + 1 }}</a>
                <button class="pure-button" @click="nextPage" :disabled="forums.length < limit">Next</button>
            </div>
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