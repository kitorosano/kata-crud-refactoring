import React, { useContext, useRef, useState } from 'react';
import StoreContext from '../context/store/storeContext';

function Form() {
  // Store Context methods 
	const { item: actualItem, addItem, updateItem } = useContext(StoreContext);

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
		<form ref={formRef} className=''>
			<div className=''>
				<div className=''>
					<input
						type='text'
						name='name'
						placeholder='TODO name'
						defaultValue={actualItem.name}
						className=''
						onChange={(ev) =>
							setModifiedName(ev.target.value)
						}
					/>{' '}
				</div>
				<div className=''>
					{actualItem.id ? (
						<button className='' onClick={onEdit}>
							Actualizar
						</button>
					) : (
						<button className='' onClick={onAdd}>
							Agregar
						</button>
					)}
				</div>
			</div>
		</form>
	);
}

export default Form;
