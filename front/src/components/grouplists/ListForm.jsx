import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
function ListForm() {
	const listFormRef = useRef(null);
	const [listName, setListName] = useState('');

	useEffect(() => {
		// get lists from server
	}, []);

	const addNewList = (ev) => {
		ev.preventDefault();

		// return if blank

		// send requests

		// clear state and form
		listFormRef.current.reset();
		setListName('');
	};

	return (
		<div className='mx-auto py-3'>
			<div className='px-4 py-2 bg-white'>
				<form ref={listFormRef} className='md:w-3/5 mr-auto'>
					<div className='grid grid-cols-8 gap-4 items-center'>
						<div className='col-span-2 '>
							<button
								className='w-full inline-flex justify-center py-1 border shadow-sm text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100'
								onClick={addNewList}
							>
								Crear Lista
							</button>
						</div>
						<div className='col-span-6'>
							<input
								className='mt-1 pl-2 p-1 focus:border-b outline-none block w-full shadow-sm border-gray-300 rounded-md'
								type='text'
								name='name'
								placeholder='Nombre de la nueva lista'
								defaultValue={''}
								onChange={(ev) => setListName(ev.target.value)}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ListForm;
