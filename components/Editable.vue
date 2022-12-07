<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        value: {
            type: String,
            default: "",
        },
        editable: {
            type: Boolean,
        },
    },
    computed: {
        listeners(): Record<string, Function | Function[]> {
            return { ...this.$listeners, input: this.onInput };
        },
    },
    methods: {
        onInput(e: InputEvent) {
            this.$emit('input', (e.target as HTMLElement).innerText);
        },
    },
    mounted() {
        (this.$refs.editableEl as HTMLElement).innerText = this.value;
    },
});
</script>

<template>
    <span :contenteditable="editable" v-on="listeners" ref="editableEl"></span>
</template>