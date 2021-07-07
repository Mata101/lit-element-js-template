// import { nanoid } from 'nanoid';


export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

export const addTodo = task => {
  return {
    type: ADD_TODO,
    todo: { 
      // id: nanoid(),
      task,
      complete: false
    }
  };
};

export const updateTodoStatus = (todo, complete) => {
  return {
    type: UPDATE_TODO_STATUS,
    todo,
    complete
  };
};

export const updateFilter = filter => {
  return {
    type: UPDATE_FILTER,
    filter
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED
  };
};


export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_TODO:
        return {
          ...state,
          todos: [...state.todos, action.todo]
        };
      case UPDATE_TODO_STATUS:
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.todo.id 
              ? { ...action.todo, complete: action.complete }
              : todo
          )
        };
      case UPDATE_FILTER:
        return {
          ...state,
          filter: action.filter
        };
      case CLEAR_COMPLETED:
        return {
          ...state,
          todos: state.todos.filter(todo => !todo.complete)
        };
      default:
        return state;
    }
  };