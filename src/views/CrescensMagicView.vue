<template>
    <div class="content ">
        <div v-if="loadingCards || loadingDoc">
            <p>Loading!</p>
        </div>
        <div v-else>
            <h1>Crescens: Magic Module</h1>

            <article class="article crescens" v-html="renderedHtml"></article>

            <h2 class="m0">Powers</h2>

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
    </div>
</template>

<script setup>
import { marked } from 'marked';
import { ref, computed, onMounted } from 'vue';

// Customised Markdown Renderer
const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const attr = isInternal ? `data-internal="true"` : `target="_blank"`;
    return `<a href="${href}" title="${title}" ${attr}>${text}</a>`;
};

const loadingCards = ref(true);
const loadingDoc = ref(true);
const error = ref("");
const magicJson = ref([]);
const txt = ref("");
const renderedHtml = computed(() => marked.parse(txt.value, { renderer }));

// API handling
const fetchCards = async () => {
    loadingCards.value = true;
    try {
        const response = await fetch('/api/crescens-magic');
        if (!response.ok) throw new Error('File not found');
        let json = await response.json();

        magicJson.value = json;

        tags = Array.from(new Set(json.flatMap(p => p.tag))).sort();
    } catch (err) {
        error.value = `Sorry: "crescens-magic" Not Found. ${err}`;
    } finally {
        loadingCards.value = false;
    }
};
const fetchDoc = async () => {
    loadingDoc.value = true;
    try {
        const response = await fetch(`/api/docs/crescens-magic.md`);
        if (!response.ok) throw new Error('File not found');
        txt.value = await response.text();
    } catch (err) {
        error.value = `Sorry: 'docs/crescens-magic' Not Found. ${err}`;
    } finally {
        loadingDoc.value = false;
    }
};

onMounted(() => {
    fetchCards();
    fetchDoc();
});

</script>

<style lang="css" scoped>
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
    background: var(--cool-dark);
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
</style>