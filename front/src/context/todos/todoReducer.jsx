import {
	GET_TODOS,
	ADD_TODO,
	SELECT_TODO,
	UPDATE_TODO,
	DELETE_TODO,
} from '../../types';

export default (state, action) => {
	switch (action.type) {
		case GET_TODOS:
			return {
				...state,
				todos: [...state.todos, ...action.payload].sort((a, b) => b.id - a.id),
			};
		case SELECT_TODO:
			return {
				...state,
				selectedTodo: action.payload,
			};
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload],
			};
		case UPDATE_TODO:
			return {
				...state,
				selectedTodo: {},
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id ? action.payload : todo
				),
			};
		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};
		default:
			return state;
	}
};
