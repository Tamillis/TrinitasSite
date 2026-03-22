import { createRouter, createWebHistory } from 'vue-router';
import DocView from '../views/DocView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/trinitas/:docName',
      name: 'Document',
      component: DocView,
      props: true // Passes :docName as a prop to the component
    },
    // Optional: Redirect root to character creation
    { path: '/', redirect: '/trinitas/core' }
  ]
});

export default router;