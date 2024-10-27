import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoListApi } from './api'

export function useDeleteTodo() {
	const queryClient = useQueryClient()

	const deleteTodoMutation = useMutation({
		mutationFn: todoListApi.deleteTodo,

		onSettled() {
			queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions())
		},
		async onSuccess(_, variables) {
			// 1. "_" -- data результат запроса
			// 2. variables это то что предаем в мутацию в данном случае id
			// 3. context расмотрим позже
			const todos = queryClient.getQueryData(
				todoListApi.getTodoListQueryOptions().queryKey
			)

			if (todos) {
				queryClient.setQueryData(
					todoListApi.getTodoListQueryOptions().queryKey,
					todos.filter((item) => item.id !== variables)
				)
			}
		},
	})

	// const handleDelete = (id: string) => {
	// 	deleteTodoMutation.mutate(id)
	// 	console.log(34, id)
	// }
	return {
		handleDelete: deleteTodoMutation.mutate,
		isPending: deleteTodoMutation.isPending,
		getIsPending: (id: string) =>
			deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
	}
}

// if (todos) {
// 	queryClient.setQueryData(
// 		todoListApi.getTodoListQueryOptions().queryKey,
// 		todos.filter((item) => item.id !== variables)
// 	)
// }
