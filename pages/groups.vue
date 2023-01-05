<script lang="ts">
import Header from "@/components/Header.vue";
import { Group, EducationType, SchoolYear } from "@/src/Group";
import GroupRow from "@/components/GroupRow.vue";
import { defineComponent } from "vue"
import { get } from "@/src/requests";

export default defineComponent({ 
    components: {
        Header,
        GroupRow
    },
    data: () => ({
        groups: [] as Group[]
    }),
    methods: {
      AddGroup() {
            this.groups.push({
                isNew: true,
                id: "N/A",
                name: "",
                subject: "",
                educationType: EducationType.Basisschool,
                schoolYear: SchoolYear.One
            });
        },
        closeGroup() {
            this.groups.pop();
        },
    },
    async fetch() {
            try {
                const result = await get(`/groups`).then( (result) => { return JSON.parse(result.data)});
                this.groups = result;
            } catch (e: any) {
                console.error(e);
            }
    },
});

</script>

<template>
    <main>
        <Header />
    <section>
            <header class="pure-g">
                <h1>Groups</h1>
                <button class="pure-button pure-button-primary button-add" @click="AddGroup">Add Group</button>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>EducationType</th>
                        <th>SchoolYear</th>
                        <th>Group Users</th>
                        <th>Group Sets</th>
                    </tr>
                </thead>
                <tbody>
                    <GroupRow v-for="group in groups" :key="group.id" :group="group" @closeGroup="closeGroup"/>
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

</style>