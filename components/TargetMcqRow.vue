<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Mcq } from "@/src/Mcq"
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
})
</script>

<template>
    <tr :class="{ editable }">
        <td>{{ mcq.id }}</td>
        <td class="editable-class">
            <Editable :editable="editable" v-model="text" />
        </td>
        <td class="editable-class">
            <Editable :editable="editable" v-model="explanation" />
        </td>
        <td class="editable-class">
            <Editable :editable="editable" v-model="allowRandom" />
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