<template>
    <div>
        <div class="search">
            <label>
                Search:
                <input v-model="search" />
            </label>
        </div>

        <div v-if="loading">
            <p>Loading powers...</p>
        </div>
        <div v-else>
            <div v-if="error">
                <p>{{ error }}</p>
            </div>
            <div v-else class="powers-grid">
                <powercard v-for="p in powers" :key="p.name" :power="p" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import powercard from '../components/powercard.vue';

const search = defineModel();
const powersJson = [];
const powers = computed(() => {
    let clean = (str) => str.toLowerCase().trim();
    let match = (p, term) =>
        clean(p.name).includes(clean(term)) ||
        clean(p.tag.join(" ")).includes(clean(term))
    let val = powersJson.filter(p => match(p, search.value));
    return !search.value ? powersJson : val;
});

const error = ref("");
const loading = ref(false);

// API handling
const fetchJson = async (name) => {
    loading.value = true;
    try {
        const response = await fetch(`/api/${name}`);
        if (!response.ok) throw new Error('File not found');
        let json = await response.json();

        json.forEach(j => powersJson.push(j))
    } catch (err) {
        error.value = `Sorry: '${name}' Not Found.`;
    } finally {
        loading.value = false;
    }
};

onMounted(() => fetchJson("powers"));

</script>

<style scoped>
.powers-grid {
    display: grid;
    /* This automatically fits as many 320px cards as possible */
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));

    padding: 0 2rem;
    gap: 20px;
    grid-auto-rows: 10px;
    justify-items: center;
    align-items: start;
}

.search {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.search input {
    outline: none;
    background-color: var(--bright);

    font-size: 1em;
    width: 33em;
    margin: 0.33em 0;

    border: 2px solid;
    border-image-source: linear-gradient(90deg, transparent, var(--highlight), transparent);
    border-image-slice: 1;

    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        inset 0 0 20px rgba(139, 69, 19, 0.05);
}
</style>