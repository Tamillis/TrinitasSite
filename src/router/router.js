import { createRouter, createWebHistory } from 'vue-router';
import DocView from '../views/DocView.vue';
import PowersView from '../views/PowersView.vue';
import CharacterCreatorView from '../views/CharacterCreatorView.vue';
import CrescensMagicView from '../views/CrescensMagicView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
        {
      path: '/trinitas/powers',
      name: 'powers',
      component: PowersView
    },
    {
      path: '/trinitas/character-creator',
      name: 'character-creator',
      component: CharacterCreatorView
    },
      {
      path: '/crescens/magic',
      name: 'crescens-magic',
      component: CrescensMagicView
    },
    {
      path: '/trinitas/:docName',
      name: 'Document',
      component: DocView,
      props: true // Passes :docName as a prop to the component
    },
    {
      path: '/', 
      redirect: '/trinitas/core' 
    }
  ]
});

export default router;