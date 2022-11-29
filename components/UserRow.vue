<script lang="ts">
import { defineComponent, PropType } from "vue"
import { User, UserRole } from "@/src/User"

export default defineComponent({
    props: {
        user: {
            type: Object as PropType<User>,
            required: true,
        },
    },
    data: () => ({
        userRole: UserRole,
    }),
    emits: ['deleteUser'],
})
</script>

<template>
    <tr>
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.userName }}</td>
        <td>{{ userRole[user.role] }}</td>
        <td>
            <div class="pure-button-group" role="group">
                <NuxtLink class="pure-button pure-button-primary" :to="`/users/${user.id}/edit`">Edit</NuxtLink>
                <button class="pure-button button-delete" @click="$emit('deleteUser', user.id)">Delete</button>
            </div>
        </td>
    </tr>
</template>

<style scoped>
.pure-button-group {
    float: right;
}
</style>