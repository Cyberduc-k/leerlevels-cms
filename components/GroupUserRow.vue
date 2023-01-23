<script lang="ts">
import { defineComponent, PropType } from "vue"
import { User, UserRole } from "@/src/User"
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
})
</script>

<template>
    <tr :class="{ editable, inactive: !user.isActive }">
        <td>{{ user.id }}</td>
        <td class="email-editable">
            <Editable :editable="editable" v-model="email" />
        </td>
        <td class="editable-class">
            <Editable :editable="editable" v-model="firstName" />
        </td>
        <td class="editable-class">
            <Editable :editable="editable" v-model="lastName" />
        </td>
        <td class="editable-class">
            <Editable :editable="editable" v-model="userName" />
        </td>
        <td>
            <label v-if="!editable">{{ userRole[role] }}</label>
        </td>
    </tr>
</template>

<style scoped>
.email-editable {
    max-width: 175px;
    word-wrap: anywhere;
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