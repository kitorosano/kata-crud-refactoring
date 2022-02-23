import {
  GET_LISTS,
  ADD_LIST,
  SELECT_LIST,
  UPDATE_LIST,
  DELETE_LIST
} from '../../types';

export default (state, action) => {
	switch (action.type) {
		case GET_LISTS:
			return {
				...state,
				lists: action.payload,
			};
		case SELECT_LIST:
			return {
				...state,
				selectedList: action.payload,
			};
		case ADD_LIST:
			return {
				...state,
				lists: [...state.lists, action.payload],
			};
		case UPDATE_LIST:
			return {
				...state,
				selectedList: {},
				lists: state.lists.map((list) =>
					list.id === action.payload.id ? action.payload : list
				),
			};
		case DELETE_LIST:
			return {
				...state,
				lists: state.lists.filter((list) => list.id !== action.payload),
			};
		default:
			return state;
	}
};
