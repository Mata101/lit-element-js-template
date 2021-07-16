import { Router } from '@vaadin/router';
import { LitElement, html } from 'lit-element';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import '@vaadin/vaadin-tabs';

window.process = {
  env: {
    NODE_ENV: 'production'
  }
};

class App extends LitElement {
  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean }
    };
  }
  constructor() {
    super();
    this.activeTab =
      location.pathname === '/' ? '/' : location.pathname.replace('/', '');
    this.tabs = ['/', 'stats', 'not-found-view'];
    installMediaQueryWatcher(`(min-width: 600px)`, matches => {
      this.smallScreen = !matches;
    });
  }

  firstUpdated() {
    
    // Initialize the router and tell it to output content into the <outlet> section.
    const router = new Router(this.shadowRoot.getElementById('outlet')); 

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
        path: '/stats',
        component: 'stats-view',
        action: () => 
          import('./src/views/stats-view.js')
      },
      {
        path: '(.*)', 
        component: 'not-found-view',
        action: () =>
          import(/* webpackChunkName: "not-found-view" */ './src/views/not-found-view.js')
      }
    ]);

    if ('serviceWorker' in navigator) { 
      try {
        navigator.serviceWorker.register('./src/sw.js'); 
      } catch (e) {
        console.log('ServiceWorker registration failed. Sorry about that.', e);
      }
    } else {
      console.log('Your browser does not support ServiceWorker.');
    }
  }

  render() {
    return html`
      <vaadin-tabs
        class="${this.smallScreen ? 'nav' : ''}"
        orientation="${this.smallScreen ? 'vertical' : 'horizontal'}"
        selected=${this.tabs.indexOf(this.activeTab)}
        theme="${this.smallScreen ? '' : 'centered'}"
      >
        <vaadin-tab @click=${() => this.switchRoute('')}>Todos</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('stats')}
          >Status</vaadin-tab
        >
      </vaadin-tabs>
      <div id="outlet"></div>
    `;
  }

  switchRoute(route) {
   
    this.activeTab = route;
    Router.go(`/${route}`);
  }

  
}


customElements.define('lit-app', App);