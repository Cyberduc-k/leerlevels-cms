<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Forum } from "@/src/Forum"
import Editable from "./Editable.vue";
import { post, put } from "~/src/requests";


export default defineComponent({
    components: {
        Editable,
    },
    props: {
        forum: {
            type: Object as PropType<Forum>,
            required: true,
        },
    },
    data() {
        return {
            editable: this.forum.isNew,
            title : this.forum.title,
            description: this.forum.description,
        };
    },
    methods: {
        edit() {
            this.editable = true;
        },
        disableEdit(id: string, isNew: boolean) {
            this.editable = false;
            if(isNew) {
                this.$emit('deleteForum', id);
            }
        },
        async save() {
            try {
                if (this.forum.isNew) {
                    this.forum.isNew = false;

                    let response = await post('/forums', {
                        title: this.title,
                        description: this.description,
                    }).then( (response) => { return JSON.parse(response.data)});

                    this.forum.id = response.id;
                    this.forum.title = response.title;
                    this.forum.description = response.description;

                } else {
                    await put(`/forums/${this.forum.id}`, {
                    Title: this.title,
                    Description: this.description,
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.editable = false;
            }
        }
    },
    emits: ['deleteForum'],
})
</script>

<template>
    <tr :class="{ editable }">
        <td>{{ forum.id }}</td>
        <td><Editable :editable="editable" v-model="title" /></td>
        <td><Editable :editable="editable" v-model="description" /></td>
        <td>
          <div class="pure-button-group" role="group">
                <button v-if="editable" class="pure-button button-delete" @click="disableEdit(forum.id, forum.isNew)">Close</button>
                <button v-if="editable" class="pure-button pure-button-primary" @click="save">Save</button>
                <button v-else class="pure-button pure-button-primary" @click="edit">Edit</button>
                <button class="pure-button button-delete" @click="$emit('deleteForum', forum.id)">Delete</button>
            </div>
        </td>
    </tr>
</template>

<style scoped>
.pure-button-group {
    float: right;
}
</style>
