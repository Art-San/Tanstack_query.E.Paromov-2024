import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { queryClient } from '../shared/api/query-client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TodoListInfiniteScroll } from '../modules/todo-list/todo-list-infinite-scroll'
// import { TodoListPagination } from '../modules/todo-list/todo-list-pagination'
import { TodoList } from '../modules/todo-list/todo-list'

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* <TodoListInfiniteScroll /> */}
			{/* <TodoListPagination /> */}
			<TodoList />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
