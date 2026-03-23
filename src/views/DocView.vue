<template>
    <div class="content" @click="handleNavigate">
        <div v-if="loading" class="loader">Loading...</div>
        <article v-else class="article" v-html="renderedHtml"></article>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { marked } from 'marked';

const props = defineProps(['docName']);
const router = useRouter();

const rawMarkdown = ref('');
const loading = ref(true);

// Customised Markdown Renderer
const renderer = new marked.Renderer();
renderer.link = ({ href, title, text }) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const attr = isInternal ? `data-internal="true"` : `target="_blank"`;
    return `<a href="${href}" title="${title}" ${attr}>${text}</a>`;
};

const renderedHtml = computed(() => marked.parse(rawMarkdown.value, { renderer }));

// API handling
const fetchDoc = async (name) => {
    loading.value = true;
    try {
        const response = await fetch(`/api/docs/${name}.md`);
        if (!response.ok) throw new Error('File not found');
        rawMarkdown.value = await response.text();
    } catch (err) {
        rawMarkdown.value = `## Sorry\n'${name}' is not an available file.`;
    } finally {
        loading.value = false;
    }
};

// Navigation Interceptor
const handleNavigate = (event) => {
    const link = event.target.closest('a');
    if (link && link.dataset.internal) {
        event.preventDefault();
        const href = link.getAttribute('href');

        //scroll header link into view
        if (href.startsWith('#'))
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        //push href to vue router otherwise 
        else
            router.push(href);
    }
};
// and set the fetch up on mount
onMounted(() => fetchDoc(props.docName));

// Watch props for route changes from parent -- I didn't know you could do this!
watch(() => props.docName, (newVal) => fetchDoc(newVal));
</script>

<style lang="css" scoped></style>