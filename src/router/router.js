import { createRouter, createWebHistory } from 'vue-router';
import DocView from '../views/DocView.vue';
import PowersView from '../views/PowersView.vue';
import CharacterCreatorView from '../views/CharacterCreatorView.vue';

const router = createRouter({
  history: createWebHistory('/trinitas/'),
  routes: [
      {
      path: '/powers',
      name: 'powers',
      component: PowersView
    },
    {
      path: '/character-creator',
      name: 'character-creator',
      component: CharacterCreatorView
    },
    {
      path: '/:docName',
      name: 'Document',
      component: DocView,
      props: true // Passes :docName as a prop to the component
    },
    {
      path: '/', 
      redirect: '/core' 
    }
  ]
});

export default router;