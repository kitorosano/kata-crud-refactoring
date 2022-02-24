import ListForm from './components/lists/ListForm';
import ViewLists from './components/lists/ViewLists';
import TodoProvider from './context/todos/todoProvider';
import ListProvider from './context/lists/listProvider';

function App() {
	return (
		<ListProvider>
			<TodoProvider>
					<div className='container px-3 md:px-7 m-auto md:w-3/4'>
						<div className='min-h-full'>
							<header className='bg-white shadow'>
								<div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
									<h1 className='text-3xl font-bold md:text-center text-gray-900'>
										To-Do List Dashboard
									</h1>
								</div>
							</header>

							<main>
								<ListForm />
								<ViewLists />
							</main>
						</div>
					</div>
			</TodoProvider>
		</ListProvider>
	);
}

export default App;