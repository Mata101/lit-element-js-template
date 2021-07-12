import { Router } from '@vaadin/router';

window.process = {
    env: {
      NODE_ENV: 'production'
    }
};

// Wait for the load event before registering the router. 
// This allows the browser to render the page before we run JavaScript, and ensure that the page feels fast.
window.addEventListener('load', () => { 
    initRouter();
});

function initRouter() {
    // Initialize the router and tell it to output content into the <main> section.
    const router = new Router(document.querySelector('main')); 

    // Use the dynamic import() syntax to only load the stats view if a user navigates to it.
    // Define a catch-all as the last route that we can use to show a "not found" page
    router.setRoutes([
      {
        path: '/',
        component: 'todo-view',
        action: () =>
          import(/* webpackChunkName: "/" */ './src/views/todo-view.js') // 
      },
      {
        path: '/stats-view',
        component: 'stats-view',
        action: () =>
          import(/* webpackChunkName: "/stats-view" */ './src/views/stats-view.js')  //
      },
      {
        path: '(.*)', 
        component: 'not-found-view',
        action: () =>
          import(/* webpackChunkName: "not-found-view" */ './src/views/not-found-view.js')
      }
    ]);
}