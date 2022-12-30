<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Group } from "@/src/Group"
import { post, put } from "@/src/requests";
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
            name: this.group.name,
        };
    },
    methods: {
        edit() {
            this.editable = true;
        },
        disableEdit() {
            this.editable = false;
        },
        async save() {
            try {
                if (this.group.isNew) {
                    this.group.isNew = false;
                    // let response = await post('/users', {
                    //     email: this.email,
                    //     firstName: this.firstName,
                    //     lastName: this.lastName,
                    //     userName: this.userName,
                    //     role: this.role,
                    //     password,
                    // });
            
                    // this.user.id = response.id;
                } else {
                    // await put(`/users/${this.user.id}`, {
                    //     email: this.email,
                    //     firstName: this.firstName,
                    //     lastName: this.lastName,
                    //     userName: this.userName,
                    //     role: this.role,
                    // });
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.editable = false;
            }
        }
    },
    emits: ['deleteGroup'],
})
</script>

<template>
    <tr :class="{ editable, inactive: !group.isActive }"  @blur="disableEdit"> <!-- this blur doesn't work here because this table row is never actually clicked on, it works in the td elements, but to prevent 'have I edited/saved this or not?' uncertainty & confusion I decided to leave it out here if the tr clickability is ever increased and there is a need for this to be utilized here as well -->
        <td>{{ group.id }}</td>
        <td><Editable :editable="editable" v-model="name" /></td>
        <td>
            <div class="pure-button-group" role="group">
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