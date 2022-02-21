import React from 'react';
import { useEffect } from 'react';
import TodoForm from '../todos/TodoForm';
import ViewTodos from '../todos/ViewTodos';

function ViewLists() {
	useEffect(() => {
		// traer listas
	}, []);

	return (
		<div>
      {/* Si no hay lista */}
			{/* <div className='flex px-4 py-2 bg-white'>
				<h1 className="italic">Comienza agregando una nueva lista!</h1>
			</div> */}

			{/* Si hay listas */}
			<div className='px-4 py-3 mt-1 border-2 border-dashed border-gray-100 rounded-lg'>
				<div className='flex px-4 py-2 bg-white'>
					<h1 className='text-xl px-4 sm:px-6 lg:px-8 w-2/5 font-semibold md:text-center text-gray-800'>
						{/* Nombre Lista */}
					</h1>
					<div className='flex-1 justify-center'>
						<TodoForm />
					</div>
				</div>
				<ViewTodos />
			</div>
		</div>
	);
}

export default ViewLists;
