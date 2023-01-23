<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Target } from "@/src/Target";
import Editable from "./Editable.vue";

export default defineComponent({
    components: {
        Editable,
    },
    props: {
        target: {
            type: Object as PropType<Target>,
            required: true,
        },
    },
    data(){
        return {
            editable: this.target.isNew,
            label : this.target.label,
            description: this.target.description,
            targetExplanation: this.target.targetExplanation,
            youtubeId: this.target.youtubeId,
            imageUrl: this.target.imageUrl,
        };
    },
    methods: {
        displayTargetQuestions(id: string) {
            this.$emit('showTargetQuestions', id);
        }
    },
})
</script>

<template>
    <tr :class="{ editable, inactive: !target.isNew }">
        <td>{{ target.id }}</td>
        <td class="editable-class"><Editable :editable="editable" v-model="label"/></td>
        <td class="editable-class"><Editable :editable="editable" v-model="description"/></td>
        <td class="editable-class"><Editable :editable="editable" v-model="targetExplanation"/></td>
        <td class="editable-class"><Editable :editable="editable" v-model="youtubeId"/></td>
        <td class="editable-class"><Editable :editable="editable" v-model="imageUrl"/></td>
        <td>
            <button class="button-secondary pure-button" @click="displayTargetQuestions(target.id)">Target Questions</button>
        </td>
    </tr>
</template>

<style scoped>
.inactive {
    height: 51px;
}
</style>