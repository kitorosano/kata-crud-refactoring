import ListForm from './components/grouplists/ListForm';
import ViewLists from './components/grouplists/ViewLists';
import TodoProvider from './context/todos/todoProvider';

function App() {
	return (
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
	);
}

export default App;
