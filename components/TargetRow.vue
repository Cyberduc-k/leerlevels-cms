<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Target } from "@/src/Target"
import { post, put } from "@/src/requests";
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
    data()
    {
        return {
            editable: this.target.isNew,
            label: this.target.label,
            description: this.target.description,
            explanation: this.target.targetExplanation,
            youtubeId: this.target.youtubeId,
            imageUrl: this.target.imageUrl,
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
                this.$emit('closeTarget');
            }
            this.editable = false;
        },
        displayTargetMcqs(id: string)
        {
            this.$emit('showTargetMcqs', id);
        },
        async save()
        {
            try
            {
                if (this.target.isNew)
                {
                    this.target.isNew = false;
                    let response = await post(`/targets`, {
                        label: this.label,
                        description: this.description,
                        targetExplanation: this.explanation,
                        youtubeId: this.youtubeId,
                        imageUrl: this.imageUrl,
                    });
                    let data = JSON.parse(response.data);
                    this.target.id = data.id;
                    this.target.label = data.label;
                    this.target.description = data.description;
                    this.target.targetExplanation = data.targetExplanation;
                    this.target.youtubeId = data.youtubeId;
                    this.target.imageUrl = data.imageUrl;
                } else
                {
                    await put(`/targets/${this.target.id}`, {
                        label: this.label,
                        description: this.description,
                        targetExplanation: this.explanation,
                        youtubeId: this.youtubeId,
                        imageUrl: this.imageUrl,
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
    emits: ['closeTarget', 'deleteTarget', 'showTargetMcqs'],
})
</script>

<template>
    <tr :class="{ editable }">
        <td>{{ target.id }}</td>
        <td>
            <Editable :editable="editable" v-model="label" />
        </td>
        <td>
            <Editable :editable="editable" v-model="description" />
        </td>
        <td>
            <Editable :editable="editable" v-model="explanation" />
        </td>
        <td>
            <Editable :editable="editable" v-model="youtubeId" />
        </td>
        <td>
            <Editable :editable="editable" v-model="imageUrl" />
        </td>
        <td>
            <button class="button-secondary pure-button" @click="displayTargetMcqs(target.id)">Target Questions</button>
        </td>
        <td>
            <div class="pure-button-group" role="group">
                <button v-if="editable" class="pure-button button-delete"
                    @click="disableEdit(target.isNew)">Close</button>
                <button v-if="editable" class="pure-button pure-button-primary" @click="save">Save</button>
                <button v-else class="pure-button pure-button-primary" @click="edit">Edit</button>
                <button class="pure-button button-delete" @click="$emit('deleteTarget', target.id)">Delete</button>
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