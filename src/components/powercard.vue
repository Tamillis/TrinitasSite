<template>
    <div ref="cardElement" class="power-card" :style="{ gridRowEnd: `span ${rowSpan}` }">
        <h3 class="power-name title-font">{{ power.name }}</h3>

        <div class="card-divider"></div>

        <div class="tags">
            <span v-for="tag in power.tag" :key="tag" class="tag-badge">
                {{ tag }}
            </span>
        </div>

        <section class="card-body">

            <div v-if="power.preq && power.preq[0] != ''" class="card-divider"></div>
            <div v-if="power.preq && power.preq[0] != ''" class="prerequisite">
                <strong>Prerequisite:</strong> {{ power.preq.join(', ') }}
            </div>

            <div class="card-divider"></div>

            <div class="description" v-html="marked.parse(power.desc)"></div>
        </section>

        <div class="card-divider"></div>

        <p v-if="power.repeatable" class="repeatable">Repeatable</p>
    </div>
</template>

<script setup>
import { marked } from 'marked';
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({ power: Object });
const cardElement = ref(null);
const rowSpan = ref(1);

const updateSpan = () => {
  if (cardElement.value) {
    const height = cardElement.value.getBoundingClientRect().height;
    
    // 2. Calculate spans: (Height + Gap) / (RowHeight + Gap)
    // We use 10px for rowHeight and 20px for gap as defined in parent CSS
    const rowHeight = 10;
    const gap = 20;
    
    const spans = Math.ceil((height + gap) / (rowHeight + gap));
    rowSpan.value = spans;
  }
};

const observer = new ResizeObserver(() => updateSpan());

onMounted(() => {
  if (cardElement.value) {
    observer.observe(cardElement.value);
    updateSpan();
  }
});

onUnmounted(() => observer.disconnect());
</script>

<style>
.power-card {
    height: max-content;

    background: #f4e4bc;
    background-image: url('https://www.transparenttextures.com/patterns/paper-1.png');
    /* Light paper texture */
    color: #3e2723;
    width: 100%;
    min-height: 200px;
    padding: 1.5rem;
    margin: 10px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2),
        inset 0 0 40px rgba(139, 69, 19, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;

    /* Rough edges look */
    clip-path: polygon(0% 2%, 2% 0%, 98% 1%, 100% 3%,
            99% 97%, 97% 100%, 3% 99%, 0% 98%);
}

.power-name {
    margin: 0px;
    font-size: 1.5em;
    color: var(--less-dark);
}

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

.card-divider {
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--less-dark), transparent);
    margin: 0.33em 0;
    opacity: 0.4;
}

.card-body {
    flex-grow: 1;
    font-size: 1rem;
    line-height: 1.333em;
}

.prerequisite {
    font-size: 0.85rem;
    font-style: italic;
    color: var(--highlight);
}

.repeatable {
    font-size: 0.75rem;
    text-align: right;
    font-weight: bold;
    margin: 0;
}

.description>* {
    margin: 0.5em 0;
}

.description table, .description td, .description th {
    border-collapse: collapse;
    border: 1px solid var(--less-dark);
    text-align: right;
    padding: 0 1em;

    font-size: 0.9em;
}

.description a {
    color: var(--highlight);
    font-weight: 600;
    text-decoration: none;
}
</style>