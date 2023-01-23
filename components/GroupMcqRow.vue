<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Mcq } from "@/src/Mcq"
import { post, put } from "@/src/requests";
import Editable from "./Editable.vue";

export default defineComponent({
    components: {
        Editable,
    },
    props: {
        mcq: {
            type: Object as PropType<Mcq>,
            required: true,
        },
    },
    data() {
        return {
            editable: this.mcq.isNew,
            text: this.mcq.questionText,
            explanation: this.mcq.explanation,
            allowRandom: this.mcq.allowRandom,
        };
    },
    methods: {
        displayMcqAnswers(id: string) {
            this.$emit('showMcqAnswers', id);
        }
    },
})
</script>

<template>
    <tr :class="{ editable }">
        <td>{{ mcq.id }}</td>
        <td>
            <Editable :editable="editable" v-model="text" />
        </td>
        <td>
            <Editable :editable="editable" v-model="explanation" />
        </td>
        <td>
            <input type="checkbox" :disabled="!editable" v-model="allowRandom" />
        </td>
        <td>
            <button class="button-secondary pure-button" @click="displayMcqAnswers(mcq.id)">Answers</button>
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