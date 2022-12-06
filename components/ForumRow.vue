<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Forum } from "@/src/Forum"


export default defineComponent({
    props: {
        forum: {
            type: Object as PropType<Forum>,
            required: true,
        },
    },
    emits: ['deleteForum'],
})
</script>

<template>
    <tr>
        <td>{{ forum.forumId }}</td>
        <td>{{ forum.forumTitle }}</td>
        <td>{{ forum.description }}</td>
        <td>
            <div class="pure-button-group" role="group">
                <NuxtLink class="pure-button pure-button-primary" :to="`/forums/${forum.forumId}/edit`">Edit</NuxtLink>
                <button class="pure-button button-delete" @click="$emit('deleteForum', forum.forumId)">Delete</button>
            </div>
        </td>
    </tr>
</template>

<style scoped>
.pure-button-group {
    float: right;
}
</style>