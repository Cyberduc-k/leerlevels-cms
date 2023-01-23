<script lang="ts">
import Header from "@/components/Header.vue";
import { Mcq } from "~/src/Mcq";
import McqRow from "@/components/McqRow.vue";
import McqAnswerRow from "@/components/McqAnswerRow.vue";
import { defineComponent } from "vue"
import { del, get } from "@/src/requests";
import { AnswerOption } from "~/src/AnswerOption";

export default defineComponent({
    components: {
        Header,
        McqRow,
        McqAnswerRow,
    },
    data: () => ({
        mcqs: [] as Mcq[],
        mcqAnswers: [] as AnswerOption[],
        mcqId: "",
        mcqText: "",
        showMcqAnswer: false,
    }),
    methods: {
        AddMcq() {
            this.mcqs.push({
                isNew: true,
                id: "N/A",
                questionText: "",
                explanation: "",
                allowRandom: true,
                answerOptions: [],
            });
        },
        closeMcq() {
            this.mcqs.pop();
        },
        async showMcqAnswers(id: string) {
            try {
                const result = await get(`/mcqs/${id}`);
                const data = JSON.parse(result.data);
                this.mcqId = data.id;
                this.mcqText = data.questionText;
                this.mcqAnswers = data.answerOptions;
                this.showMcqAnswer = true;
            } catch (e: any) {
                console.error(e);
            }
        },
        async deleteMcq(id: string) {
            const index = this.mcqs.findIndex(u => u.id == id);
            const mcq = this.mcqs[index];

            if (mcq.isNew && this.mcqs != undefined) {
                this.mcqs.pop();
            }

            if (!mcq.isNew && confirm(`Are you sure you want to delete question ${id}?`)) {
                try {
                    await del(`/mcqs/${id}`);
                    this.$fetch();
                } catch (e) {
                    console.error(e);
                }
            }
        },
    },
    async fetch() {
        try {
            const result = await get(`/mcqs`);
            const data = JSON.parse(result.data);
            this.mcqs = data.items;
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
                <h1>Questions</h1>
                <button class="pure-button pure-button-primary button-add" @click="AddMcq">Add Question</button>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Text</th>
                        <th>Explanation</th>
                        <th>Allow Random</th>
                        <th>Answers</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <McqRow v-for="mcq in mcqs" :key="mcq.id" :mcq="mcq" @deleteMcq="deleteMcq" @closeMcq="closeMcq"
                        @showMcqAnswers="showMcqAnswers" />
                </tbody>
            </table>
        </section>

        <section v-if="showMcqAnswer">
            <header class="pure-g">
                <h1>Question Answers</h1>
                <h2 class="groupUsersHeaderTwo">&nbsp;(Question: {{ mcqId }}&nbsp;</h2>
                <h2 class="groupUsersHeaderTwo">-&nbsp;Text: {{ mcqText }})</h2>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th id="id-column">Id</th>
                        <th>Text</th>
                        <th>Index</th>
                        <th>Is Correct</th>
                    </tr>
                </thead>
                <tbody>
                    <McqAnswerRow v-for="answer in mcqAnswers" :key="answer.id" :answer="answer" />
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