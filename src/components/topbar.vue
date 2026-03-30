<template>
    <nav class="topbar">
        <div class="title">
            TRINITAS

            <span @click="collapsed = !collapsed" class="toggle-btn" :class="{collapsed: collapsed}">&#x23F6;</span>
        </div>

        <div class="decoration-line"></div>

        <div class="menus" :class="{'hidden-menu': collapsed}">
            <div class="menu-links">
                <h5 class="nav-item nav-header">Docs</h5>
                <router-link v-for="doc in docs" :to="'/trinitas/' + doc" class="nav-item">{{ toCapitalised(doc)
                    }}</router-link>
            </div>
            <div class="menu-links">
                <h5 class="nav-item nav-header">Links</h5>
                <router-link v-for="link in links" :to="'/trinitas/' + link" class="nav-item">{{ toCapitalised(link)
                    }}</router-link>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const docs = ["core", "combat", "character-creation", "role", "equipment", "magic", "stat-blocks", "appendices", "design-notes"];

const links = ["powers", "character-creator"]
const collapsed = ref(false);

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
    top: -65px;

    z-index: 10;

    background: linear-gradient(0.5turn, var(--dark) 33%, var(--less-dark));
    padding: 0.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 4px solid var(--contrast);
}

.title {
    color: var(--contrast);
    font-size: 2rem;
    letter-spacing: 0.33em;
}

.menus {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: left;

    max-height: 100vh;
    overflow:hidden;
    transition: all 0.3s ease;
}

.menu-links {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    gap: 0;
    margin: 0px 0.5em;

    width: fit-content;
    justify-content: start;
    align-items: baseline;


}

.nav-item {
    text-decoration: none;
    color: var(--less-bright);
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 500;
    width: fit-content;

    padding: 0.33rem 0;
    margin: 2px 4px;
}

.nav-header {
    font-size: 1.33rem;
    color: var(--contrast)
}

.router-link-active {
    text-decoration: underline;
    font-style: italic;
    font-weight: 700;
}

.nav-item:hover {
    text-decoration: underline;
}

.decoration-line {
    width: 100%;
    border-bottom: 2px solid var(--contrast);
}

.toggle-btn {
  display: inline-block;
  transition: transform 0.3s ease;
  letter-spacing: normal;
  transform-origin: center;
}

.toggle-btn.collapsed {
  transform: rotate(180deg);
}

.hidden-menu {
    max-height: 0;
}

@media screen and (min-width: 900px) {
    .topbar {
        clip-path: polygon(0% 0%, 200px 100%, calc(100% - 200px) 100%, 100% 0%);
    }

    .menus {
        top: -5%;
        width: calc(100% - 400px);
    }
}
</style>