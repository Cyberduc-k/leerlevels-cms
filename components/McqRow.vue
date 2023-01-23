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
    data()
    {
        return {
            editable: this.mcq.isNew,
            text: this.mcq.questionText,
            explanation: this.mcq.explanation,
            allowRandom: this.mcq.allowRandom,
        };
    },
    methods: {
        edit()
        {
            this.editable = true;
        },
        disableEdit(isNew: boolean)
        {
            if (isNew)
            {
                this.$emit('closeMcq');
            }
            this.editable = false;
        },
        displayMcqAnswers(id: string)
        {
            this.$emit('showMcqAnswers', id);
        },
        async save()
        {
            try
            {
                if (this.mcq.isNew)
                {
                    this.mcq.isNew = false;
                    let response = await post(`/mcqs`, {
                        questionText: this.text,
                        explanation: this.explanation,
                        allowRandom: this.allowRandom,
                    });
                    let data = JSON.parse(response.data);
                    this.mcq.id = data.id;
                    this.mcq.questionText = data.questionText;
                    this.mcq.explanation = data.explanation;
                    this.mcq.allowRandom = data.allowRandom;
                } else
                {
                    await put(`/mcqs/${this.mcq.id}`, {
                        questionText: this.text,
                        explanation: this.explanation,
                        allowRandom: this.allowRandom,
                    });
                }
            } catch (e)
            {
                console.error(e);
            } finally
            {
                this.editable = false;
            }
        }
    },
    emits: ['closeMcq', 'deleteMcq', 'showMcqAnswers'],
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
        <td>
            <div class="pure-button-group" role="group">
                <button v-if="editable" class="pure-button button-delete" @click="disableEdit(mcq.isNew)">Close</button>
                <button v-if="editable" class="pure-button pure-button-primary" @click="save">Save</button>
                <button v-else class="pure-button pure-button-primary" @click="edit">Edit</button>
                <button class="pure-button button-delete" @click="$emit('deleteMcq', mcq.id)">Delete</button>
            </div>
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