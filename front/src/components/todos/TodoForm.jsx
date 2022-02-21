import React, { useContext, useRef, useState } from 'react';
import TodoContext from '../../context/todos/todoContext';

function Form() {
	// Store Context methods
	const { item: actualItem, addItem, updateItem } = useContext(TodoContext);

	// Input name state
	const [modifiedName, setModifiedName] = useState('');

	// Reference on form element, for reset purpose
	const formRef = useRef(null);

	const onAdd = (ev) => {
		ev.preventDefault();

		// if input is blank don't send
		if (modifiedName === '') return;

		// Add new item to database
		addItem({
			name: modifiedName,
			completed: false,
		});

		// Clear state
		setModifiedName('');

		// Clear inputs
		formRef.current.reset();
	};

	const onEdit = (ev) => {
		ev.preventDefault();
		// if input is blank don't send
		if (modifiedName === '') return;

		// Update new item to database using id
		updateItem(actualItem.id, {
			name: modifiedName,
			completed: actualItem.completed,
		});

		// Clear state
		setModifiedName('');

		// Clear inputs
		formRef.current.reset();
	};

	return (
		<form ref={formRef}>
			{/* <div className='shadow overflow-hidden border-b border-gray-100 sm:rounded-md'> */}

			<div className='grid grid-cols-8 gap-6'>
				<div className='col-span-5 md:col-span-6'>
					<input
						className='mt-1 outline-none block w-full border-none text-sm md:text-base rounded-md'
						type='text'
						name='name'
						placeholder='Nombre del nuevo TO-DO...'
						defaultValue={actualItem.name}
						onChange={(ev) => setModifiedName(ev.target.value)}
					/>
				</div>
				<div className='col-span-3 md:col-span-2'>
					{actualItem.id ? (
						<button
							className='w-full inline-flex justify-center py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
							onClick={onEdit}
						>
							Actualizar
						</button>
					) : (
						<button
							className='w-full inline-flex justify-center py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							onClick={onAdd}
						>
							Agregar
						</button>
					)}
				</div>
			</div>
			{/* </div> */}
		</form>
	);
}

export default Form;