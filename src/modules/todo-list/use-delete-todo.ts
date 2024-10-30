import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoListApi } from './api'
import { useSuspenseUser } from '../auth/use-user'

export function useDeleteTodo() {
	const queryClient = useQueryClient()

	const user = useSuspenseUser()
	const deleteTodoMutation = useMutation({
		mutationFn: todoListApi.deleteTodo,

		onSettled() {
			queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
		},
		async onSuccess(_, variables) {
			queryClient.setQueryData(
				todoListApi.getTodoListQueryOptions({ userId: user.data.id }).queryKey,
				(todos) => todos?.filter((item) => item.id !== variables)
			)
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
