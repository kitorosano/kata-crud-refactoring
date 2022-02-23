import { useReducer } from 'react';
import {
	GET_TODOS,
	ADD_TODO,
	SELECT_TODO,
	UPDATE_TODO,
	DELETE_TODO,
} from '../../types';
import TodoContext from './todoContext';
import TodoReducer from './todoReducer';
import clienteAxios from '../../config/axios';

const HOST_API = 'http://localhost:8080/api';

const TodoProvider = (props) => {
	const initialState = {
		todos: [],
		selectedTodo: {},
	};
	/**TODO: message state for reading request errors*/

	const [state, dispatch] = useReducer(TodoReducer, initialState);

	// Get TODOs from a specific Lists
	const getTodos = async (listId) => {
		try {
			const response = await clienteAxios.get(`/todos?listId=${listId}`);

			dispatch({ type: GET_TODOS, payload: response.data });
		} catch (error) {
			console.error(error.response);
		}
	};

	// Selects a TODO to edit
	const selectTodo = (todo) => {
		dispatch({ type: SELECT_TODO, payload: todo });
	};

	// Adds TODO to a list
	const addTodo = async (listId, newTodo) => {
		try {
			const response = await fetch(HOST_API + `/todos?listId=${listId}`, {
				method: 'POST',
				body: JSON.stringify(newTodo),
				headers: { 'Content-Type': 'application/json' },
			});
			const todo = await response.json();

			dispatch({ type: ADD_TODO, payload: todo });
		} catch (error) {
			console.error(error);
		}
	};

	// Updates TODO by id
	const updateTodo = async (id, newTodo) => {
		try {
			const response = await fetch(HOST_API + `/todos/${id}`, {
				method: 'PUT',
				body: JSON.stringify(newTodo),
				headers: { 'Content-Type': 'application/json' },
			});
			const todo = await response.json();

			dispatch({ type: UPDATE_TODO, payload: todo });
		} catch (error) {
			console.error(error);
		}
	};

	// Deletes TODO by id
	const deleteTodo = async (id) => {
		try {
			fetch(`${HOST_API}/todos/${id}`, {
				method: 'DELETE',
			}).then(() => dispatch({ type: DELETE_TODO, payload: id }));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				selectedTodo: state.selectedTodo,
				getTodos,
				selectTodo,
				deleteTodo,
				addTodo,
				updateTodo,
			}}
		>
			{props.children}
		</TodoContext.Provider>
	);
};

export default TodoProvider;
