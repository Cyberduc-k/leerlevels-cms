<script lang="ts">
import Header from "@/components/Header.vue";
import { Group, EducationType, SchoolYear } from "@/src/Group";
import { Set } from "~/src/Set";
import { Target } from "~/src/Target";
import GroupRow from "@/components/GroupRow.vue";
import { User, UserRole } from "@/src/User";
import GroupUserRow from "@/components/GroupUserRow.vue";
import GroupSetRow from "~/components/GroupSetRow.vue";
import { defineComponent, PropType } from "vue"
import { get } from "@/src/requests";

export default defineComponent({ 
    components: {
        Header,
        GroupRow,
        GroupUserRow,
        GroupSetRow,
    },
    data: () => ({
        groups: [] as Group[],
        groupUsers: [] as User[],
        groupSets: [] as Set[],
        setTargets: [] as Target[],
        groupId: "",
        groupName: "",
        groupSubject: "",
        groupEducationType: EducationType.Basisschool,
        groupSchoolYear: SchoolYear.One,
        EducationType: EducationType,
        SchoolYear: SchoolYear,
        showGroupUser: false,
        showGroupSet: false,
        setGroupId: "",
        setGroupName: "",
        setGroupSubject: "",
        setGroupEducationType: EducationType.Basisschool,
        setGroupSchoolYear: SchoolYear.One,
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
        async showGroupUsers(id: string) {
            try {
                const result = await get(`/groups/${id}`).then( (result) => { return JSON.parse(result.data)});
                this.groupId = result.id;
                this.groupName = result.name;
                this.groupSubject = result.subject;
                this.groupEducationType = result.educationType;
                this.groupSchoolYear = result.schoolYear;

                this.groupUsers = result.users;

                this.showGroupUser = true;

            } catch(e: any) {
                console.error(e);
            }

        },
        async showGroupSets(id: string) {
            try {
                const result = await get(`/groups/${id}`).then( (result) => { return JSON.parse(result.data)});

                this.setGroupId = result.id;
                this.setGroupName = result.name;
                this.setGroupSubject = result.subject;
                this.setGroupEducationType = result.educationType;
                this.setGroupSchoolYear = result.schoolYear;

                this.groupSets = result.sets;

                this.setTargets = result.sets.targets;

                this.showGroupSet = true;

            } catch(e: any) {
                console.error(e);
            }
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
                    <GroupRow v-for="group in groups" :key="group.id" :group="group" @closeGroup="closeGroup" @showGroupUsers="showGroupUsers" @showGroupSets="showGroupSets"/>
                </tbody>
            </table>
        </section>

    <section v-if="showGroupUser">
        <header class="pure-g">
            <h1>Group Users</h1>
            <h2 class="groupUsersHeaderTwo">&nbsp;(Group: {{ groupId }}&nbsp;</h2>
            <h2 class="groupUsersHeaderTwo">-&nbsp;Name: {{ groupName }}&nbsp;</h2>
            <h2 class="groupUsersHeaderTwo">-&nbsp;Subject: {{ groupSubject }}&nbsp;</h2>
            <h2 class="groupUsersHeaderTwo">-&nbsp;Education type: {{ EducationType[groupEducationType] }}&nbsp;</h2>
            <h2 class="groupUsersHeaderTwo">-&nbsp;Schoolyear: {{ SchoolYear[groupSchoolYear] }})</h2>
        </header>
        <table class="pure-table pure-table-horizontal">
            <thead>
                <tr>
                    <th id="id-column">Set Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Name</th>
                        <th>Role</th>
                        <th></th>
                </tr>
            </thead>
            <tbody>
                <GroupUserRow v-for="user in groupUsers" :key="user.id" :user="user"/>
            </tbody>
        </table>
    </section>

    <section v-if="showGroupSet">
        <header class="pure-g">
            <h1>Group Sets</h1>
            <h2 class="groupUsersHeaderTwo">&nbsp;(Group: {{ setGroupId }}&nbsp;</h2>
            <h2 class="groupUsersHeaderTwo">-&nbsp;Name: {{ setGroupName }}&nbsp;</h2>
            <h2 class="groupUsersHeaderTwo">-&nbsp;Subject: {{ setGroupSubject }}&nbsp;</h2>
            <h2 class="groupUsersHeaderTwo">-&nbsp;Education type: {{ EducationType[setGroupEducationType] }}&nbsp;</h2>
            <h2 class="groupUsersHeaderTwo">-&nbsp;Schoolyear: {{ SchoolYear[setGroupSchoolYear] }})</h2>
        </header>
        <table class="pure-table pure-table-horizontal">
            <thead>
                <tr>
                    <th id="id-column">Set Id</th>
                        <th>Name</th>
                        <th>Set Targets</th>
                </tr>
            </thead>
            <tbody>
                <GroupSetRow v-for="set in groupSets" :key="set.id" :set="set"/>
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