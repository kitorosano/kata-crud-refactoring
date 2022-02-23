import { useReducer } from 'react';
import {
  GET_LISTS,
  ADD_LIST,
  SELECT_LIST,
  UPDATE_LIST,
  DELETE_LIST
} from '../../types';
import ListContext from './listContext';
import ListReducer from './listReducer';
const HOST_API = 'http://localhost:8080/api';

const ListProvider = (props) => {
	const initialState = {
		lists: [],
		selectedList: {},
	};
	/**TODO(20/02/2022): message state for reading request errors*/

	const [state, dispatch] = useReducer(ListReducer, initialState);

	// Get every list
	const getLists = async () => {
		try {
			const response = await fetch(HOST_API + '/lists');
			const lists = await response.json();

			dispatch({ type: GET_LISTS, payload: lists });
		} catch (error) {
			console.error(error);
		}
	};

	// Selects a list to edit
	const selectList = (list) => {
		dispatch({ type: SELECT_LIST, payload: list });
	};

	// Adds new list
	const addList = async (newList) => {
		try {
			const response = await fetch(HOST_API + '/lists', {
				method: 'POST',
				body: JSON.stringify(newList),
				headers: { 'Content-Type': 'application/json' },
			});
			const list = await response.json();

			dispatch({ type: ADD_LIST, payload: list });
		} catch (error) {
			console.error(error);
		}
	};

	// Updates list by id
	const updateList = async (id, newList) => {
		try {
			const response = await fetch(HOST_API + `/lists/${id}`, {
				method: 'PUT',
				body: JSON.stringify(newList),
				headers: { 'Content-Type': 'application/json' },
			});
			const list = await response.json();

			dispatch({ type: UPDATE_LIST, payload: list });
		} catch (error) {
			console.error(error);
		}
	};

	// Deletes list by id
	const deleteList = async (id) => {
		try {
			fetch(`${HOST_API}/lists/${id}`, {
				method: 'DELETE',
			}).then(() => dispatch({ type: DELETE_LIST, payload: id }));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ListContext.Provider
			value={{
				lists: state.lists,
				selectedList: state.selectedList,
				getLists,
				addList,
				selectList,
				updateList,
				deleteList,
			}}
		>
			{props.children}
		</ListContext.Provider>
	);
};

export default ListProvider;
