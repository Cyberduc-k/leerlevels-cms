<script lang="ts">
import Header from "@/components/Header.vue";
import { Target } from "~/src/Target";
import TargetRow from "@/components/TargetRow.vue";
import TargetMcqRow from "@/components/TargetMcqRow.vue";
import { defineComponent } from "vue"
import { get } from "@/src/requests";
import { Mcq } from "~/src/Mcq";

export default defineComponent({
    components: {
        Header,
        TargetRow,
        TargetMcqRow,
    },
    data: () => ({
        targets: [] as Target[],
        targetMcqs: [] as Mcq[],
        targetId: "",
        targetName: "",
        showTargetMcq: false,
    }),
    methods: {
        AddTarget()
        {
            this.targets.push({
                isNew: true,
                id: "N/A",
                label: "",
                description: "",
                targetExplanation: "",
                youtubeId: "",
                imageUrl: "",
                mcqs: [],
            });
        },
        closeTarget()
        {
            this.targets.pop();
        },
        async showTargetMcqs(id: string)
        {
            try
            {
                const result = await get(`/targets/${id}`);
                const data = JSON.parse(result.data);
                this.targetId = data.id;
                this.targetName = data.label;
                this.targetMcqs = data.mcqs;
                this.showTargetMcq = true;
            } catch (e: any)
            {
                console.error(e);
            }

        },
    },
    async fetch()
    {
        try
        {
            const result = await get(`/targets`);
            const data = JSON.parse(result.data);
            this.targets = data.items;
        } catch (e: any)
        {
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
                <h1>Targets</h1>
                <button class="pure-button pure-button-primary button-add" @click="AddTarget">Add Target</button>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Label</th>
                        <th>Description</th>
                        <th>Explanation</th>
                        <th>Youtube Id</th>
                        <th>Image URL</th>
                        <th>Questions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <TargetRow v-for="target in targets" :key="target.id" :target="target" @closeTarget="closeTarget"
                        @showTargetMcqs="showTargetMcqs" />
                </tbody>
            </table>
        </section>

        <section v-if="showTargetMcq">
            <header class="pure-g">
                <h1>Target Questions</h1>
                <h2 class="groupUsersHeaderTwo">&nbsp;(Target: {{ targetId }}&nbsp;</h2>
                <h2 class="groupUsersHeaderTwo">-&nbsp;Label: {{ targetName }})</h2>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th id="id-column">Id</th>
                        <th>Text</th>
                        <th>Explanation</th>
                        <th>Allow Random</th>
                    </tr>
                </thead>
                <tbody>
                    <TargetMcqRow v-for="mcq in targetMcqs" :key="mcq.id" :mcq="mcq" />
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

.groupUsersHeaderTwo {
    margin-top: 26px;
}

.button-add {
    margin-left: auto;
    align-self: center;
}
</style>