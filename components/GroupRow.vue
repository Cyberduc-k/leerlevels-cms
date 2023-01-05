<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Group, EducationType, SchoolYear } from "@/src/Group"
import { post } from "@/src/requests";
import Editable from "./Editable.vue";

export default defineComponent({
    components: {
        Editable,
    },
    props: {
        group: {
            type: Object as PropType<Group>,
            required: true,
        },
    },
    data() {
        return {
            editable: this.group.isNew,
            EducationType: EducationType,
            SchoolYear: SchoolYear,
            name: this.group.name,
            subject: this.group.subject,
            educationType: this.group.educationType,
            schoolYear: this.group.schoolYear
        };
    },
    methods: {
        edit() {
            this.editable = true;
        },
        disableEdit(isNew: boolean, educationType: number, schoolYear: number) {
            if(isNew) {
                this.$emit('closeGroup');
            }
            this.editable = false;
            this.EducationType[this.educationType] = this.EducationType[educationType];
            this.SchoolYear[this.schoolYear] = this.SchoolYear[schoolYear];
        },
        gotoGroupUsers(id: string) {
            this.$router.push({path: `/groups/${id}/users`});
        },
        gotoGroupSets(id: string) {
            this.$router.push({path: `/groups/${id}/sets`});
        },
        async save() {
            try {
                if (this.group.isNew) {
                    this.group.isNew = false;
                    let response = await post(`/groups/users/${this.group.id}`, {

                    }).then( (response) => { return JSON.parse(response.data)});
                    this.group.id = response.id;
                    this.group.name = response.name;
                    this.group.subject = response.subject;
                    this.group.educationType = response.educationType;
                    this.group.schoolYear = response.schoolYear;
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.editable = false;
            }
        }
    },
    emits: ['closeGroup', 'deleteGroup'],
})
</script>

<template>
    <tr :class="{ editable }">
        <td>{{ group.id }}</td>
        <td><Editable :editable="editable" v-model="name" /></td>
        <td><Editable :editable="editable" v-model="subject" /></td>
        <td>
            <select v-if="editable" v-model="educationType">
                <option selected disabled>currently: {{ EducationType[educationType] }}</option>
                <option>{{ EducationType[0] }}</option>
                <option>{{ EducationType[1] }}</option>
                <option>{{ EducationType[2] }}</option>
                <option>{{ EducationType[3] }}</option> 
                <option>{{ EducationType[4] }}</option> 
                <option>{{ EducationType[5] }}</option> 
                <option>{{ EducationType[6] }}</option> 
                <option>{{ EducationType[7] }}</option> 
                <option>{{ EducationType[8] }}</option> 
                <option>{{ EducationType[9] }}</option> 
            </select>
            <label v-if="!editable">{{ EducationType[educationType] }}</label>
        </td>
        <td>
            <select v-if="editable" v-model="schoolYear">
                <option selected disabled>currently: {{ SchoolYear[schoolYear] }}</option>
                <option>{{ SchoolYear[0] }}</option>
                <option>{{ SchoolYear[1] }}</option>
                <option>{{ SchoolYear[2] }}</option>
                <option>{{ SchoolYear[3] }}</option>
                <option>{{ SchoolYear[4] }}</option>
                <option>{{ SchoolYear[5] }}</option>
                <option>{{ SchoolYear[6] }}</option>
                <option>{{ SchoolYear[7] }}</option>
                <option>{{ SchoolYear[8] }}</option>
            </select>
            <label v-if="!editable">{{ SchoolYear[schoolYear] }}</label>
        </td>
        <!--<td>{{ EducationType[educationType] }}</td>
        <td>{{ SchoolYear[schoolYear] }}</td>-->
        <td>
            <button class="button-secondary pure-button" @click="gotoGroupUsers(group.id)">Group Users</button>
        </td>
        <td>
            <button class="button-secondary pure-button" @click="gotoGroupSets(group.id)">Group Sets</button>
        </td>
        <td>
            <div class="pure-button-group" role="group">
                <button v-if="editable" class="pure-button button-delete" @click="disableEdit(group.isNew, group.educationType, group.schoolYear)">Close</button>
                <button v-if="editable" class="pure-button pure-button-primary" @click="save">Save</button>
                <button v-else class="pure-button pure-button-primary" @click="edit">Edit</button>
                <button class="pure-button button-delete" @click="$emit('deleteGroup', group.id)">Deactivate</button>
            </div>
            <!-- <div v-else class="pure-button-group" role="group">
                <button class="pure-button button-delete" @click="$emit('activateUser', user.id)">Activate</button>
            </div> -->
        </td>
    </tr>
</template>

<style scoped>
.pure-button-group {
    float: right;
}

.inactive {
    opacity: 0.5;
    height: 51px;
}

.pure-button-group button:first-child {
    box-sizing: content-box;
    width: 37px;
}
</style>