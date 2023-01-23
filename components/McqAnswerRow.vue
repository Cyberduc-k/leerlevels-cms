<script lang="ts">
import { defineComponent, PropType } from "vue"
import { AnswerOption } from "@/src/AnswerOption"
import Editable from "./Editable.vue";

export default defineComponent({
    components: {
        Editable,
    },
    props: {
        answer: {
            type: Object as PropType<AnswerOption>,
            required: true,
        },
    },
    data()
    {
        return {
            editable: this.answer.isNew,
            text: this.answer.text,
            index: this.answer.index,
            isCorrect: this.answer.isCorrect,
        };
    },
})
</script>

<template>
    <tr :class="{ editable }">
        <td>{{ answer.id }}</td>
        <td class="editable-class">
            <Editable :editable="editable" v-model="text" />
        </td>
        <td class="editable-class">
            <input type="number" :disabled="!editable" v-model="index" />
        </td>
        <td class="editable-class">
            <input type="checkbox" :disabled="!editable" v-model="isCorrect" />
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