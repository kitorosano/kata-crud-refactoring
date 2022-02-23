import React, { useContext, useEffect } from 'react';
import TodoContext from '../../context/todos/todoContext';

function ViewTodos({ listId }) {
	// Store Context methods
	const { todos, getTodos, selectTodo, updateTodo, deleteTodo } =
		useContext(TodoContext);

	useEffect(() => {
		// Get todos at page start
		getTodos(listId);
	}, []);
  console.log(todos)

	const onChange = (ev, modifiedTodo) => {
		// Update new item completion state to database
		updateTodo(modifiedTodo.id, {
			name: modifiedTodo.name,
			completed: ev.target.checked,
		});
	};

	const decorationDone = {
		textDecoration: 'line-through',
	};

	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							{/* <thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										#
									</th>
									<th
										scope='col'
										className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Nombre
									</th>
									<th
										scope='col'
										className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										¿Está completado?
									</th>
									<th
										scope='col'
										className='px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										<span className='sr-only'>Acciones</span>
									</th>
								</tr>
							</thead> */}
							<tbody className='bg-white divide-y divide-gray-200'>
								{todos.map(
									(todo,i) =>
										todo.listId === listId && (
											<tr
												key={todo.id}
												className={`${
													i % 2 == 0 ? 'bg-white' : 'bg-gray-50'
												} hover:bg-gray-100`}
											>
												<td
													className='px-3 md:px-6 py-4 whitespace-nowrap'
													scope='row'
												>
													<div className='flex items-center'>
														<div className='text-sm font-medium text-gray-900'>
															{todo.id}
														</div>
													</div>
												</td>
												<td className='px-3 md:px-6 py-4 whitespace-nowrap'>
													<div
														className='text-sm text-gray-900'
														style={todo.completed ? decorationDone : {}}
													>
														{todo.name}
													</div>
												</td>
												<td className='px-3 md:px-6 py-2 whitespace-nowrap'>
													<label
														htmlFor={todo.id + '-completed'}
														className={`px-8 py-1 inline-flex text-xs leading-5 font-semibold rounded-full  ${
															todo.completed
																? 'bg-green-100 text-green-800'
																: 'bg-red-100 text-red-800'
														}`}
													>
														{todo.completed ? 'Si' : 'No'}
													</label>
													<input
														id={todo.id + '-completed'}
														type='checkbox'
														defaultChecked={todo.completed}
														className='invisible'
														onChange={(ev) => onChange(ev, todo)}
													></input>
												</td>
												<td className='px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2'>
													<button
														className='px-4 inline-flex justify-center py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
														onClick={() => selectTodo(todo)}
													>
														Editar
													</button>
													<button
														className='px-4 inline-flex justify-center py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
														onClick={() => deleteTodo(todo.id)}
													>
														Eliminar
													</button>
												</td>
											</tr>
										)
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewTodos;
