import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoListApi } from './api'

export function useDeleteTodo() {
	const queryClient = useQueryClient()

	const deleteTodoMutation = useMutation({
		mutationFn: todoListApi.deleteTodo,

		onSettled() {
			queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions())
		},
		async onSuccess(_, deletedId) {
			const todos = queryClient.getQueryData(
				todoListApi.getTodoListQueryOptions().queryKey
			)
			if (todos) {
				queryClient.setQueryData(
					todoListApi.getTodoListQueryOptions().queryKey,
					todos?.filter((item) => item.id !== deletedId)
				)
			}
		},
	})

	return {
		handleDelete: deleteTodoMutation.mutate,
		isPending: deleteTodoMutation.isPending,
		getIsPending: (id: string) =>
			deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
	}
}
