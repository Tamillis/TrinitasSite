<template>
    <div class="selected-tags input" v-click-outside="() => isOpen = false">
        <span v-for="tag in selected" :key="tag" class="tag-badge">
            {{ tag }}
            <button @click="removeTag(tag)" class="remove-btn">×</button>
        </span>
        <div style="flex-grow: 1;">

            <input type="text" v-model="query" @focus="isOpen = true" placeholder="Filter by tags..."
                class="tag-input" />

            <ul v-if="isOpen && filteredTags.length" class="tag-dropdown">
                <li v-for="tag in filteredTags" :key="tag" @click="selectTag(tag)" class="dropdown-item">
                    {{ tag }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Tags from './Tags.vue';

const props = defineProps({
    tags: Array,
    modelValue: Array
});

const emit = defineEmits(['update:modelValue']);

const query = ref('');
const isOpen = ref(false);

const selected = computed(() => props.modelValue);

const filteredTags = computed(() => {
    return props.tags.filter(tag =>
        tag.toLowerCase().includes(query.value.toLowerCase()) &&
        !selected.value.includes(tag)
    );
});

const selectTag = (tag) => {
    emit('update:modelValue', [...selected.value, tag]);
    query.value = '';
    isOpen.value = false;
};

const removeTag = (tag) => {
    emit('update:modelValue', selected.value.filter(t => t !== tag));
};
</script>

<style scoped>
.tag-search-container {

    flex-grow: 1;
}

.selected-tags {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 0.33em;
    padding: 0.33em;
}

.tag-badge {
    font-size: 0.65rem;
    text-transform: uppercase;
    background: rgba(139, 69, 19, 0.15);
    padding: 2px 6px;
    border-radius: 2px;
    letter-spacing: 0.5px;
    font-weight: bold;

    display: flex;
    align-items: center;
    gap: 8px;
    animation: popIn 0.2s ease-out;
}

.remove-btn {
    background: transparent;
    border: none;
    color: var(--highlight);
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0;
}

.tag-input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 1rem;
    min-width: 150px;
}

.tag-dropdown {
    position: absolute;
    top: 105%;
    left: 0;
    right: 0;
    background: var(--bright);
    border: 1px solid var(--contrast);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 50;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 4px 0 0;
    width: 100%;
}

.dropdown-item {
    padding: 0.33rem;
    cursor: pointer;
    border-bottom: 1px solid var(--contrast);
    text-transform: capitalize;
}

.dropdown-item:hover {
    background: var(--less-bright);
}

@keyframes popIn {
    from {
        transform: scale(0.8);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>