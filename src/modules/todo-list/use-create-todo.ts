import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoListApi } from './api'
import { nanoid } from 'nanoid'

export function useCreateTodo() {
	const queryClient = useQueryClient()

	const createTodoMutation = useMutation({
		mutationFn: todoListApi.createTodo,
		onSuccess: () => {
			// queryClient.invalidateQueries({ queryKey: ['tasks', 'list'] })
		},
		onError: () => {
			console.log('Произошла ошибка')
		},
		onSettled() {
			queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
		},
		// async onSettled() {
		// 	await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
		// },
	})

	const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const text = String(formData.get('text') ?? '')

		createTodoMutation.mutate(
			{
				id: nanoid(),
				text: text,
				done: false,
				userId: '2',
			}
			// {
			// 	onSuccess: () => {
			// 		queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions())
			// 	},
			// }
		)

		e.currentTarget.reset()
	}

	return {
		handleCreate,
		isLoading: createTodoMutation.isPending,
	}
}
