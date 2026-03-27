<template>
    <div class="tags">
        <span v-for="tag in tags" :key="tag" class="tag-badge">
            {{ tag }}
        </span>
    </div>
</template>

<script setup>
const props = defineProps({tags:Object, removable:Boolean});


</script>

<style lang="css" scoped>
.tags {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
}

.tag-badge {
    font-size: 0.65rem;
    text-transform: uppercase;
    background: rgba(139, 69, 19, 0.15);
    padding: 2px 6px;
    border-radius: 2px;
    letter-spacing: 0.5px;
    font-weight: bold;
}
</style>