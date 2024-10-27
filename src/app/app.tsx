// import { TodoListInfiniteScroll } from '../modules/todo-list/todo-list-infinite-scroll'
// import { TodoListPagination } from '../modules/todo-list/todo-list-pagination'
import { Login } from '../modules/auth/login'
import { useUser } from '../modules/auth/use-user'
import { TodoList } from '../modules/todo-list/todo-list'

export function App() {
	const { data, isLoading } = useUser()
	if (isLoading) {
		return <div className="">...Loading</div>
	}

	if (data) {
		return (
			<>
				{/* <TodoListInfiniteScroll />  */}
				{/* <TodoListPagination />  */}
				<TodoList />
			</>
		)
	}

	return <Login />
}
