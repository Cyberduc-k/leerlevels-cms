<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Set } from "@/src/Set";
import Editable from "./Editable.vue";

export default defineComponent({
    components: {
        Editable,
    },
    props: {
        set: {
            type: Object as PropType<Set>,
            required: true,
        },
    },
    data() {
        return {
            editable: this.set.isNew,
            name: this.set.name,
        };
    },
    methods: {
        displaySetTargets(id: string) {
            this.$emit('showSetTargets', id);
        }
    },
})
</script>

<template>
    <tr :class="{ editable, inactive: !set.isNew }">
        <td>{{ set.id }}</td>
        <td class="editable-class">
            <Editable :editable="editable" v-model="name" />
        </td>
        <td>
            <button class="button-secondary pure-button" @click="displaySetTargets(set.id)">Set Targets</button>
        </td>
    </tr>
</template>

<style scoped>

</style>