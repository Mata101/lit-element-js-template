import { html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store';
import { statsSelector } from '../redux/reducer';
import { BaseView } from './base-view-class';

export class StatsView extends connect(store)(BaseView) { 
  static get properties() {
    return {
      completed: { type: Number },
      active: { type: Number }
    };
  }

  stateChanged(state) {
    const stats = statsSelector(state);
    this.completed = stats.completed;
    this.active = stats.active;
    this.hasTodos = state.todos.length > 0; 

  }
  render() {
    return html`
      <style>
        stats-view {
          display: block;
        }
      </style>

      ${this.showStats()} 
    `;
  }
  
  showStats() {
    if (this.hasTodos) { 
        return html`
          <p>Active: ${this.active}</p>
          <p>Completed: ${this.completed}</p>
        `;
      } else {
        return html`
          <p>Nothing to do! 🌴🍻☀️</p>
        `;
      }
  }
}

customElements.define('stats-view',StatsView);
