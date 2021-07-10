import { LitElement, html } from 'lit-element'; 
import { connect } from 'pwa-helpers';
import { store } from '../../redux/store';

// UI components from the open source Vaadin component set
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

import { addTodo, updateTodoStatus, updateFilter } from '../../redux/actions'
import { VisibilityFilters, getVisibleTodosSelector } from '../../redux/reducer';

// make todo-view aware of the store and listen to updates to the state.
export class TodoView extends connect(store)(LitElement) { 

  // Add a stateChanged method and update the component properties based on it.
  // every time the app state changes, stateChanged gets called on the component and we can update the properties on our component.
  stateChanged(state) { 
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.filter;
    
  }

  // Define a static getter for properties that returns an object that defines the property names and types.
  static get properties() { 
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String }
    };
  }

  render() {
    return html` 
    <!-- Scope styles to this view. -->
    <!-- Using a CSS custom property defined in styles.css -->
      <style>
        todo-view { 
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }
        todo-view .input-layout {
          width: 100%;
          display: flex;
        }
        todo-view .input-layout vaadin-text-field {
          flex: 1;
          margin-right: var(--spacing); 
        }
        todo-view .todos-list {
          margin-top: var(--spacing);
        }
        todo-view .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
      </style>

      <!-- Listen for keyup events on the surrounding <div> so we can add todos with Enter. -->
      <div class="input-layout"
        @keyup="${this.shortcutListener}"> 

      <!-- Bind the value of the text field to the task property. -->
      <!-- Listen for the change event on the text field and call this.updateTask -->
      <vaadin-text-field
        placeholder="Task"
        value="${this.task || ''}" 
        @change="${this.updateTask}"> 
      </vaadin-text-field>

      <!-- Bind the button click event to this.addTodo -->
      <vaadin-button
        theme="primary"
        @click="${this.addTodo}"> 
          Add Todo
      </vaadin-button>
    </div>
    
    <div class="todos-list">
      <!-- Use the .map() operation to map each todo object to a lit-html template -->
      ${this.todos.map(
            todo => html` 
              <div class="todo-item">
                <!-- Bind the checked boolean attribute to the complete property on the todo object -->
                <!-- Call this.updateTodoStatus with the todo and a boolean for status on change events -->
                <vaadin-checkbox
                  ?checked="${todo.complete}" 
                  @change="${ e => this.updateTodoStatus(todo, e.target.checked)}"> 
                  ${todo.task}
                </vaadin-checkbox>
              </div>
            `
          )
      }
    </div>
    <!-- Bind the value to the filter property and the value-changed event to the this.filterChanged method -->
    <vaadin-radio-group
      class="visibility-filters"
      value="${this.filter}"
      @value-changed="${this.filterChanged}"> 

      <!-- Loop over the filter values and create a radio button for each -->
      ${Object.values(VisibilityFilters).map( 
        filter => html`
          <vaadin-radio-button value="${filter}">
            ${filter}
          </vaadin-radio-button>`
      )}
    </vaadin-radio-group>

    <!-- Hook up the clear button click event to this.clearCopleted -->
    <vaadin-button
      @click="${this.clearCompleted}"> 
        Clear completed
    </vaadin-button>
    `;
  }

  // Create a new array with the new todo object
  addTodo() {
    if (this.task) {
      store.dispatch(addTodo(this.task));
      this.task = '';
    }
  }

  shortcutListener(e) {
    // If the keyup event originates from the Enter key, call this.addTodo()
    if (e.key === 'Enter') { 
      this.addTodo();
    }
  }

  // Update the task property to the value of the text field on change events
  updateTask(e) {
    this.task = e.target.value; 
  }
  
  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(updateTodoStatus(updatedTodo, complete));
  }

  filterChanged(e) {
    // Update the filter property based on the event value.
    store.dispatch(updateFilter(e.detail.value));
  }

  clearCompleted() { 
    // Update the todos property to a new array only containing the non-completed todos.
    store.dispatch(clearCompleted());
  }

  // Create a method that returns only the todos that pass the filter criteria.
  applyFilter(todos) { 
    switch (this.filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);
      default:
        return todos;
    }
  }
  // tell LitElement to render directly into the light DOM
  // you should see the CSS styles applied.
  createRenderRoot() {
    return this;
  }
}
