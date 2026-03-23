<template>
    <nav class="topbar">
        <div class="title">
            TRINITAS
        </div>

        <div class="decoration-line"></div>

        <div class="menu-links">
            <router-link v-for="doc in docs" :to="'/trinitas/' + doc" class="nav-item">{{ toCapitalised(doc)
                }}</router-link>
        </div>
    </nav>
</template>

<script setup>
const docs = ["core", "combat", "character-creation", "role", "equipment", "magic", "stat-blocks", "appendices", "design-notes"];

function toCapitalised(snakeCase) {
    return snakeCase
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
</script>

<style scoped>
.topbar {
    background: var(--dark);
    padding: 1rem 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 2px solid var(--contrast);
}

@media screen and (min-width: 1000px) {
    .topbar {
        clip-path: polygon(0% 0%, 200px 100%, calc(100% - 200px) 100%, 100% 0%);
    }
}

.title {
    font-family: 'Cinzel', serif;
    color: var(--bright);
    font-size: 2rem;
    letter-spacing: 0.33em;
    margin-bottom: 0.5rem;
}

.menu-links {
    display: flex;
    gap: 0;
    margin: 0.5em;
    flex-wrap: wrap;
    width: calc(100% - 400px);
    justify-content: center;
}

.nav-item {
    text-decoration: none;
    color: var(--less-bright);
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 5px 0;
    margin: 0 1em;
}

.router-link-active {
    text-decoration: underline;
    font-style: italic;
    font-weight: 700;
}

.nav-item:hover {
    text-decoration: underline;
}
</style>