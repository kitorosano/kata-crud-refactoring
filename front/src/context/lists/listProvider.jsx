import { useReducer } from 'react';
import clienteAxios from '../../config/axios';
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
			const response = await clienteAxios('/lists');

			dispatch({ type: GET_LISTS, payload: response.data });
		} catch (error) {
			console.error(error.response.data);
		}
	};

	// Selects a list to edit
	const selectList = (list) => {
		dispatch({ type: SELECT_LIST, payload: list });
	};

	// Adds new list
	const addList = async (newList) => {
		try {
			const response = await clienteAxios.post('/lists', newList, {
				headers: { 'Content-Type': 'application/json' },
			});

			dispatch({ type: ADD_LIST, payload: response.data });
		} catch (error) {
			console.error(error.response.data);
		}
	};

	// Updates list by id
	const updateList = async (id, newList) => {
		try {
			const response = await clienteAxios.put(`/lists/${id}`, newList, {
				headers: { 'Content-Type': 'application/json' },
			});

			dispatch({ type: UPDATE_LIST, payload: response.data });
		} catch (error) {
			console.error(error.response.data);
		}
	};

	// Deletes list by id
	const deleteList = async (id) => {
		try {
			clienteAxios.delete(`/lists/${id}`)

      dispatch({ type: DELETE_LIST, payload: id });
		} catch (error) {
			console.error(error.response.data);
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
