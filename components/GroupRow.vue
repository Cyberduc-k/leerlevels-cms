<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Group } from "@/src/Group"

export default defineComponent({
    props: {
        group: {
            type: Object as PropType<Group>,
            required: true,
        },
    },
})
</script>

<template>
    <tr>
        <td>{{ group.Id }}</td>
        <td>{{ group.Name }}</td>
        <td>{{ group.EducationType }}</td>
        <td>{{ group.SchoolYear }}</td>
        <td>{{ group.Subject }}</td>
        <td>
            <div class="pure-button-group" role="group">
                <NuxtLink class="pure-button pure-button-primary" :to="`/groups/${group.Id}/edit`">Edit</NuxtLink>
                <button class="pure-button button-delete" @click="$emit('deleteUser',group.Id)">Delete</button>
            </div>
        </td>
    </tr>
</template>

<style scoped>
.pure-button-group {
    float: right;
}
</style>