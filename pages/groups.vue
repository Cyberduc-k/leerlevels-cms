<script lang="ts">
import Header from "@/components/Header.vue";
import { AnswerOption } from "@/src/AnswerOption";
import { Group, EducationType, SchoolYear } from "@/src/Group";
import { Set } from "~/src/Set";
import { Target } from "~/src/Target";
import GroupRow from "@/components/GroupRow.vue";
import { User, UserRole } from "@/src/User";
import { Mcq } from "@/src/Mcq";
import GroupUserRow from "@/components/GroupUserRow.vue";
import GroupSetRow from "~/components/GroupSetRow.vue";
import GroupTargetRow from "~/components/GroupTargetRow.vue";
import GroupMcqRow from "~/components/GroupMcqRow.vue";
import McqAnswerRow from "~/components/McqAnswerRow.vue";
import { defineComponent, PropType } from "vue"
import { get } from "@/src/requests";

export default defineComponent({
    components: {
        Header,
        GroupRow,
        GroupUserRow,
        GroupSetRow,
        GroupTargetRow,
        GroupMcqRow,
        McqAnswerRow,
    },
    data: () => ({
        groups: [] as Group[],
        groupUsers: [] as User[],
        groupSets: [] as Set[],
        setTargets: [] as Target[],
        targetMcqs: [] as Mcq[],
        mcqAnswers: [] as AnswerOption[],
        groupId: "",
        groupName: "",
        groupSubject: "",
        groupEducationType: EducationType.Basisschool,
        groupSchoolYear: SchoolYear.One,
        EducationType: EducationType,
        SchoolYear: SchoolYear,
        showGroupUser: false,
        showGroupSet: false,
        showSetTarget: false,
        showTargetMcq: false,
        showMcqAnswer: false,
        setGroupId: "",
        setGroupName: "",
        setGroupSubject: "",
        setGroupEducationType: EducationType.Basisschool,
        setGroupSchoolYear: SchoolYear.One,
        setId: "",
        setName: "",
        targetId: "",
        targetName: "",
        mcqId: "",
        mcqText: "",
        mcqExplanation: "",
        mcqAllowRandom: false,
    }),
    beforeCreate() {
        if (this.$store.state.authToken === "") {
            this.$router.replace({ path: "/login", query: { next: "/" } });
        }
    },
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
        async showGroupUsers(id: string) {
            try {
                const result = await get(`/groups/${id}`).then((result) => { return JSON.parse(result.data) });

                this.groupId = result.id;
                this.groupName = result.name;
                this.groupSubject = result.subject;
                this.groupEducationType = result.educationType;
                this.groupSchoolYear = result.schoolYear;

                this.groupUsers = result.users;

                this.showGroupUser = true;

            } catch (e: any) {
                console.error(e);
            }

        },
        async showGroupSets(id: string) {
            try {
                const result = await get(`/groups/${id}`).then((result) => { return JSON.parse(result.data) });

                this.setGroupId = result.id;
                this.setGroupName = result.name;
                this.setGroupSubject = result.subject;
                this.setGroupEducationType = result.educationType;
                this.setGroupSchoolYear = result.schoolYear;

                this.groupSets = result.sets;

                this.showGroupSet = true;

            } catch (e: any) {
                console.error(e);
            }
        },
        async showSetTargets(id: string) {
            try {
                const result = await get(`/sets/${id}`).then((result) => { return JSON.parse(result.data) });

                this.setId = result.id;
                this.setName = result.name;

                this.setTargets = result.targets;

                this.showSetTarget = true;

            } catch (e: any) {
                console.error(e);
            }
        },
        async showTargetMcqs(id: string) {
            try {
                const result = await get(`/targets/${id}`).then((result) => { return JSON.parse(result.data) });

                this.targetId = result.id;
                this.targetName = result.label;

                this.targetMcqs = result.mcqs;

                this.showTargetMcq = true;

            } catch (e: any) {
                console.error(e);
            }

        },
        async showMcqAnswers(id: string) {
            try {
                const result = await get(`/mcqs/${id}`).then((result) => { return JSON.parse(result.data) });

                this.mcqId = result.id;
                this.mcqText = result.questionText;
                this.mcqExplanation = result.explanation;
                this.mcqAllowRandom = result.allowRandom;

                this.mcqAnswers = result.answerOptions;

                this.showMcqAnswer = true;

            } catch (e: any) {
                console.error(e);
            }
        }
    },
    async fetch() {
        try {
            const result = await get(`/groups`).then((result) => { return JSON.parse(result.data) });
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <GroupRow v-for="group in groups" :key="group.id" :group="group" @closeGroup="closeGroup"
                        @showGroupUsers="showGroupUsers" @showGroupSets="showGroupSets" />
                </tbody>
            </table>
        </section>

        <!--Group Users-->
        <section v-if="showGroupUser">
            <header class="pure-g">
                <h1>Group Users</h1>
                <h2 class="groupHeaderTwo">&nbsp;(Group: {{ groupId }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Name: {{ groupName }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Subject: {{ groupSubject }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Education type: {{ EducationType[groupEducationType] }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Schoolyear: {{ SchoolYear[groupSchoolYear] }})</h2>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th id="id-column">Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <GroupUserRow v-for="user in groupUsers" :key="user.id" :user="user" />
                </tbody>
            </table>
        </section>

        <!--Group Sets-->
        <section v-if="showGroupSet">
            <header class="pure-g">
                <h1>Group Sets</h1>
                <h2 class="groupHeaderTwo">&nbsp;(Group: {{ setGroupId }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Name: {{ setGroupName }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Subject: {{ setGroupSubject }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Education type: {{ EducationType[setGroupEducationType] }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Schoolyear: {{ SchoolYear[setGroupSchoolYear] }})</h2>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th id="id-column">Id</th>
                        <th>Name</th>
                        <th>Set Targets</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <GroupSetRow v-for="set in groupSets" :key="set.id" :set="set" @showSetTargets="showSetTargets" />
                </tbody>
            </table>
        </section>

        <!--Set Targets-->
        <section v-if="showSetTarget">
            <header class="pure-g">
                <h1>Set Targets</h1>
                <h2 class="groupHeaderTwo">&nbsp;(Set: {{ setId }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Name: {{ setName }})</h2>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th id="id-column">Id</th>
                        <th>Label</th>
                        <th>Description</th>
                        <th>Target Explaination</th>
                        <th>Youtube Id</th>
                        <th>Image Id</th>
                        <th>Target Questions</th>
                    </tr>
                </thead>
                <tbody>
                    <GroupTargetRow v-for="target in setTargets" :key="target.id" :target="target"
                        @showTargetMcqs="showTargetMcqs" />
                </tbody>
            </table>
        </section>

        <!--Target Questions-->
        <section v-if="showTargetMcq">
            <header class="pure-g">
                <h1>Target Questions</h1>
                <h2 class="groupHeaderTwo">&nbsp;(Target: {{ targetId }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Label: {{ targetName }})</h2>
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th id="id-column">Id</th>
                        <th>Text</th>
                        <th>Explanation</th>
                        <th>Allow Random</th>
                        <th>Answer Options</th>
                    </tr>
                </thead>
                <tbody>
                    <GroupMcqRow v-for="mcq in targetMcqs" :key="mcq.id" :mcq="mcq" @showMcqAnswers="showMcqAnswers" />
                </tbody>
            </table>
        </section>

        <!-- Question Answers-->
        <section v-if="showMcqAnswer">
            <header class="pure-g">
                <h1>Question Answer Options</h1>
                <h2 class="groupHeaderTwo">&nbsp;(Multiple Choice Question: {{ mcqId }})</h2>
                <!-- <h2 class="groupHeaderTwo">-&nbsp;Text: {{ mcqText }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Explanation: {{ mcqExplanation }}&nbsp;</h2>
                <h2 class="groupHeaderTwo">-&nbsp;Allow Random: {{ mcqAllowRandom }})</h2> -->
            </header>
            <table class="pure-table pure-table-horizontal">
                <thead>
                    <tr>
                        <th id="id-column">Id</th>
                        <th>Text</th>
                        <th>Index</th>
                        <th>Is Correct</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <McqAnswerRow v-for="answerOption in mcqAnswers" :key="answerOption.id" :answer="answerOption" />
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

.groupHeaderTwo {
    margin-top: 26px;
}

.button-add {
    margin-left: auto;
    align-self: center;
}
</style>