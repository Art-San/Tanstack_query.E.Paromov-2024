// import { TodoListInfiniteScroll } from '../modules/todo-list/todo-list-infinite-scroll'
// import { TodoListPagination } from '../modules/todo-list/todo-list-pagination'
import { Login } from '../modules/auth/login'
import { LogoutButton } from '../modules/auth/logout-button'
import { useUser } from '../modules/auth/use-user'
import { prefetchTodoList } from '../modules/todo-list/prefetch-todo-list'
import { TodoList } from '../modules/todo-list/todo-list'

export function App() {
	const { data, isLoading } = useUser()
	if (isLoading) {
		return <div className="">...Loading</div>
	}

	if (data) {
		prefetchTodoList()
		return (
			<>
				{/* <TodoListInfiniteScroll />  */}
				{/* <TodoListPagination />  */}
				<LogoutButton /> <TodoList />
			</>
		)
	}

	return <Login />
}
