<script lang="ts">
import { defineComponent, PropType } from "vue"
import { User, UserRole } from "@/src/User"
import { post, put } from "~/src/requests";
import Editable from "./Editable.vue";

export default defineComponent({
    components: {
        Editable,
    },
    props: {
        user: {
            type: Object as PropType<User>,
            required: true,
        },
    },
    data() {
        return {
            editable: this.user.isNew,
            userRole: UserRole,
            email: this.user.email,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            userName: this.user.userName,
            role: this.user.role,
        };
    },
    methods: {
        edit() {
            this.editable = true;
        },
        disableEdit(id: string, isNew: boolean) {
            this.editable = false;
            if(isNew) {
                this.$emit('deleteUser', id);
            } else {
                this.$emit('fetch');
            }
        },
        async save() {
            try {
                if (this.user.isNew) {
                    let password = prompt("Fill in a password for the user");
                
                    if (password !== null) {
                        this.user.isNew = false;
                        let response = await post('/users', {
                            email: this.email,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            userName: this.userName,
                            role: this.role,
                            password,
                        }).then( (response) => { return JSON.parse(response.data)});
                
                        this.user.id = response.id;
                        this.user.email = response.email;
                        this.user.firstName = response.firstName;
                        this.user.lastName = response.lastName;
                        this.user.userName = response.userName;
                        this.user.role = response.role;
                    }
                } else {
                    await put(`/users/${this.user.id}`, {
                        email: this.email,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        userName: this.userName,
                        role: this.role,
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.editable = false;
            }
        }
    },
    emits: ['activateUser', 'deleteUser', 'fetch'],
})
</script>

<template>
    <tr :class="{ editable, inactive: !user.isActive }"  @blur="disableEdit(user.id, user.isNew)"> <!-- this blur doesn't work here because this table row is never actually clicked on, it works in the td elements, but to prevent 'have I edited/saved this or not?' uncertainty & confusion I decided to leave it out here if the tr clickability is ever increased and there is a need for this to be utilized here as well -->
        <td>{{ user.id }}</td>
        <td class="email-editable"><Editable :editable="editable" v-model="email" /></td>
        <td class="editable-class"><Editable :editable="editable" v-model="firstName" /></td>
        <td class="editable-class"><Editable :editable="editable" v-model="lastName" /></td>
        <td class="editable-class"><Editable :editable="editable" v-model="userName" /></td>
        <td>{{ userRole[role] }}</td>
        <td>
            <div v-if="user.isActive" class="pure-button-group" role="group">
                <button v-if="editable" class="pure-button button-delete" @click="disableEdit(user.id, user.isNew)">Close</button>
                <button v-if="editable" class="pure-button pure-button-primary" @click="save">Save</button>
                <button v-else class="pure-button pure-button-primary" @click="edit">Edit</button>
                <button v-if="!user.isNew" class="pure-button button-delete" @click="$emit('deleteUser', user.id)">Deactivate</button>
            </div>
            <div v-else class="pure-button-group reactivate-button" role="group">
                <button class="pure-button button-delete" id="activatebutton" @click="$emit('activateUser', user.id)">Activate</button>
            </div>
        </td>
    </tr>
</template>

<style scoped>

.email-editable {
    max-width: 175px;
}

.editable-class {
    max-width: 80px;
}
.pure-button-group {
    float: right;
}

#activatebutton {
    width: 77px;
}

.reactivate-button {
    margin-left: -33px;
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