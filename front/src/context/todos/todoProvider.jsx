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
			console.error(error.response.data);
		}
	};

	// Selects a TODO to edit
	const selectTodo = (todo) => {
		dispatch({ type: SELECT_TODO, payload: todo });
	};

	// Adds TODO to a list
	const addTodo = async (listId, newTodo) => {
		try {
			const response = await clienteAxios.post(`/todos?listId=${listId}`,newTodo, {
				headers: { 'Content-Type': 'application/json' },
      })

			dispatch({ type: ADD_TODO, payload: response.data });
		} catch (error) {
			console.error(error.response.data);
		}
	};

	// Updates TODO by id
	const updateTodo = async (id, newTodo) => {
		try {
			const response = await clienteAxios.put(`/todos/${id}`, newTodo, {
				headers: { 'Content-Type': 'application/json' },
			});
      
			dispatch({ type: UPDATE_TODO, payload: response.data });
		} catch (error) {
			console.error(error.response.data);
		}
	};

	// Deletes TODO by id
	const deleteTodo = async (id) => {
		try {
			await clienteAxios.delete(`/todos/${id}`)

      dispatch({ type: DELETE_TODO, payload: id });
		} catch (error) {
			console.error(error.response.data);
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
