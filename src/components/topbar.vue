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
        <div class="menu-links">
            <router-link v-for="link in links" :to="'/trinitas/' + link" class="nav-item">{{ toCapitalised(link)
                }}</router-link>
        </div>
    </nav>
</template>

<script setup>
const docs = ["core", "combat", "character-creation", "role", "equipment", "magic", "stat-blocks", "appendices", "design-notes"];

const links = ["powers", "character-creator"]

function toCapitalised(snakeCase) {
    return snakeCase
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
</script>

<style scoped>
.topbar {
    position: sticky;
    top: -5%;

    z-index: 10;

    background: linear-gradient(0.5turn, var(--dark) 33%, var(--less-dark));
    padding: 1rem 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 4px solid var(--contrast);
}

@media screen and (min-width: 1000px) {
    .topbar {
        clip-path: polygon(0% 0%, 200px 100%, calc(100% - 200px) 100%, 100% 0%);
    }
}

.title {
    color: var(--contrast);
    font-size: 2rem;
    letter-spacing: 0.33em;
}

.menu-links {
    display: flex;
    gap: 0;
    margin: 0px 0.5em;
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