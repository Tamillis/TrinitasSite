<template>
    <div>
        <div class="search">
            <label class="search-label">
                <span style="display:none">Search: </span>
                <input v-model="search" value="" class="input" style="padding: 0.33em;" placeholder="Search by term..." />
            </label>
            <TagSearch :tags="visibleTags" v-model="activeFilters" />
        </div>

        <div v-if="loading">
            <p>Loading powers...</p>
        </div>
        <div v-else>
            <div v-if="error">
                <p>{{ error }}</p>
            </div>
            <div v-else class="powers-grid">
                <PowerCard v-for="p in powers" :key="p.name" :power="p" :step="32" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PowerCard from '../components/PowerCard.vue';
import TagSearch from '../components/TagSearch.vue';

const search = defineModel({default: ""});

const powersJson = ref([]);
let tags = [];

const powers = computed(() => {
    let val = [];

    console.log(search.value, Boolean(search.value), activeFilters.value)

    if(search.value) {
        let clean = (str) => str.toLowerCase().trim();
        let match = (p, term) =>
            clean(p.name).includes(clean(term)) ||
            clean(p.tag.join(" ")).includes(clean(term))
        val = powersJson.value.filter(p => match(p, search.value));
    }
    else val = powersJson.value;

    if (activeFilters.value.length > 0) {
        val = val.filter(power =>
            activeFilters.value.every(filterTag => power.tag.includes(filterTag))
        );
    }

    return val;
});

const visibleTags = computed(() => Array.from(new Set(powers.value.flatMap(p => p.tag))).sort())

const error = ref("");
const loading = ref(false);
const activeFilters = ref([]);

// API handling
const fetchJson = async (name) => {
    loading.value = true;
    try {
        const response = await fetch(`/api/${name}`);
        if (!response.ok) throw new Error('File not found');
        let json = await response.json();

        powersJson.value = json;

        tags = Array.from(new Set(json.flatMap(p => p.tag))).sort();
    } catch (err) {
        error.value = `Sorry: '${name}' Not Found. ${err}`;
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
    gap: 16px;
    grid-auto-rows: 16px;
    justify-items: center;
    align-items: start;
}

.search {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}


</style>