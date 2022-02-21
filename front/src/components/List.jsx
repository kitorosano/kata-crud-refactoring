import React, { useContext, useEffect } from 'react';
import StoreContext from '../context/store/storeContext';

function List() {
	// Store Context methods
	const { list, getList, selectItem, updateItem, deleteItem } =
		useContext(StoreContext);

	useEffect(() => {
		// Get list at page start
		getList();
	}, [list.length]);

	const onChange = (ev, modifiedTodo) => {
		// Update new item completion state to database
		updateItem(modifiedTodo.id, {
      name: modifiedTodo.name,
			completed: ev.target.checked,
		});
	};

	const decorationDone = {
		textDecoration: 'line-through',
	};

	return (
		<table className=''>
			<caption>TODO List</caption>
			<thead>
				<tr>
					<th scope='col'>#ID</th>
					<th scope='col'>Nombre</th>
					<th scope='col'>¿Está compleatado?</th>
					<th scope='col'>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{list.map((todo, i) => (
					<tr key={i} style={todo.completed ? decorationDone : {}}>
						<th scope='row'>{todo.id}</th>
						<td>{todo.name}</td>
						<td>
							<input
								type='checkbox'
								defaultChecked={todo.completed}
								onChange={(ev) => onChange(ev, todo)}
							></input>
						</td>
						<td>
							<button className='' onClick={() => selectItem(todo)}>
								Editar
							</button>{' '}
							<button className='' onClick={() => deleteItem(todo.id)}>
								Eliminar
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default List;
