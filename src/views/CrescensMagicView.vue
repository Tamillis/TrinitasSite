<template>
    <div class="powers-container" v-if="!loading">
        <header class="module-header">
            <h1>Crescens: Magic Module</h1>
            <h2>Powers</h2>
        </header>

        <div class="powers-grid">
            <article v-for="power in magicJson" :key="power.name" class="power-card">
                <div class="power-header">
                    <h2>{{ power.name }}</h2>
                    <span class="stat-tag">{{ power.stat }}</span>
                </div>

                <div class="power-meta">
                    <strong>Skill:</strong> {{ power.skill }}
                </div>

                <p class="power-description">
                    {{ power.description }}
                </p>

                <div class="power-section">
                    <h3>Domain</h3>
                    <p class="italic">{{ power.domain }}</p>
                </div>

                <div class="power-section">
                    <h3>Manifestations</h3>
                    <p>{{ power.examples }}</p>
                </div>
            </article>
        </div>
    </div>
    <div v-else class="powers-container">
        <p>Loading!</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const error = ref("");
const magicJson = ref([]);

// API handling
const fetchJson = async (name) => {
    loading.value = true;
    try {
        const response = await fetch(`/api/${name}`);
        if (!response.ok) throw new Error('File not found');
        let json = await response.json();

        magicJson.value = json;

        tags = Array.from(new Set(json.flatMap(p => p.tag))).sort();
    } catch (err) {
        error.value = `Sorry: '${name}' Not Found. ${err}`;
    } finally {
        loading.value = false;
    }
};

onMounted(() => fetchJson("crescens-magic"));

</script>

<style lang="css" scoped>
.powers-container {
    font-family: 'Inter', system-ui, sans-serif;
    color: #2c3e50;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
}

.module-header {
    border-bottom: 2px solid #2c3e50;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
}

.powers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.power-card {
    background: white;
    border: 1px solid #ddd;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.05);
}

.power-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.power-header h2 {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.4rem;
}

.stat-tag {
    background: #2c3e50;
    color: white;
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 4px;
}

.power-meta {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: #666;
}

.power-description {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
}

.power-section h3 {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 0.3rem;
}

.power-section p {
    font-size: 0.9rem;
    margin-top: 0;
}

.italic {
    font-style: italic;
}

.power-footer {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px dashed #eee;
    font-size: 0.8rem;
    font-weight: bold;
    color: #e67e22;
}
</style>