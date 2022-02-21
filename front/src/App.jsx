import Form from './components/Form';
import List from './components/List';
import StoreProvider from './context/store/storeProvider';

function App() {
	return (
		<StoreProvider>
			<div className=''>
				<h1 className=''>To-Do List</h1>

				<div className=''>
					<div className=''>
						<Form />
					</div>
					<div className=''>
						<List />
					</div>
				</div>
			</div>
		</StoreProvider>
	);
}

export default App;
