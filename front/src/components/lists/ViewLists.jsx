import React, { useContext } from 'react';
import { useEffect } from 'react';
import TodoForm from '../todos/TodoForm';
import ViewTodos from '../todos/ViewTodos';
import ListContext from '../../context/lists/listContext';
import todoContext from '../../context/todos/todoContext';

function ViewLists() {
	// Store Context methods
	const { lists, getLists, selectList, updateList, deleteList } =
		useContext(ListContext);
	// Store Context methods
	const { getTodos } = useContext(todoContext);

	useEffect(() => {
		// Get lists at page start
		getLists();
	}, []);
	return (
		<div>
			{lists.length > 0 ? (
				lists.map((list) => (
					<div
						key={list.id}
						className='px-4 py-3 mt-1 border-2 border-dashed border-gray-100 rounded-lg'
					>
						<div className='flex px-4 py-2 bg-white'>
							<h1 className='text-xl px-4 sm:px-6 lg:px-8 w-2/5 font-semibold md:text-center text-gray-800'>
								{list.name}
							</h1>
							<div className='flex-1 justify-center'>
								<TodoForm listId={list.id} />
							</div>
						</div>
						<ViewTodos listId={list.id}/>
					</div>
				))
			) : (
				<div className='flex px-4 py-2 bg-white'>
					<h1 className='italic'>Comienza agregando una nueva lista!</h1>
				</div>
			)}
		</div>
	);
}

export default ViewLists;
