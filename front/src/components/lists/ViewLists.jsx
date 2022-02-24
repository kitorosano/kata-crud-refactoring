import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import TodoForm from '../todos/TodoForm';
import ViewTodos from '../todos/ViewTodos';
import ListContext from '../../context/lists/listContext';
import todoContext from '../../context/todos/todoContext';
import { AiOutlineClose } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa';

function ViewLists() {
	// Store Context methods
	const { lists, getLists, selectList, updateList, deleteList } =
		useContext(ListContext);
	// Store Context methods
	const { getTodos } = useContext(todoContext);

	const [mouseOverList, setMouseOverList] = useState(false);

	useEffect(() => {
		// Get lists at page start
		getLists();
	}, []);

	const handleDelete = (id) => {
		deleteList(id);
	};

	return (
		<div>
			{lists.length > 0 ? (
				lists.map((list) => (
					<div
						key={list.id}
						className='px-4 py-3 mt-1 border-2 border-dashed border-gray-100 rounded-lg'
					>
						<div className='flex px-4 py-2 bg-white items-center relative'>
							<AiOutlineClose
								className='cursor-pointer absolute'
								onClick={() => handleDelete(list.id)}
							/>
							<div className='flex w-2/5 justify-center space-x-3 items-center'>
								<h1 className='text-xl font-semibold md:text-center text-gray-800'>
									{list.name}
								</h1>
								<FaPencilAlt
									className='cursor-pointer'
									onClick={() => selectList(list)}
								/>
							</div>
							<div className='flex-1 justify-center'>
								<TodoForm listId={list.id} />
							</div>
						</div>
						<ViewTodos listId={list.id} />
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
