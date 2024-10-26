import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoListApi } from './api'
import { nanoid } from 'nanoid'

export function useCreateTodo() {
	const queryClient = useQueryClient()

	const createTodoMutation = useMutation({
		mutationFn: todoListApi.createTodo,
		onSuccess() {
			console.log(1, 'успех')
		},
		// onSuccess() {
		//   queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions()) // тоже работает, правда не понял зачем если есть ключи
		// },
		onError(error) {
			console.log(2, 'срабатывает при ошибке', error)
		},
		onSettled: (data, error) => {
			console.log('Этот код будет выполнен как при успехе, так и при ошибке')
			// паромов посоветовал invalidateQueries делать в onSettled
			queryClient.invalidateQueries({
				// invalidateQueries помечает все запросы подходящие по ключу в stale (устаревшие)
				queryKey: ['tasks', 'list'],
			})
			if (error) {
				console.log('Обработка ошибки')
			} else {
				console.log('Обработка успеха')
			}
		},
	})

	const handleCreate = (e: React.FocusEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const text = String(formData.get('text') ?? '')

		// todoListApi.createTodo()
		createTodoMutation.mutate(
			{
				id: nanoid(),
				done: false,
				text: text,
				userId: '1',
			}
			// {
			// 	onSuccess() {
			// 		queryClient.invalidateQueries({
			// 			// invalidateQueries помечает все запросы подходящие по ключу в stale (устаревшие)
			// 			queryKey: [todoListApi.baseKey],
			// 		})
			// 	},
			// }
		) // не выбрасывает ошибку при не удаче
		// createTodoMutation.mutateAsync() // эта выбрасывает ошибки при не удаче, надо обрабатывать ошибки, надо оборачивать trycatch чаще всего это не нужно
		e.currentTarget.reset()
	}
	return { handleCreate, isPending: createTodoMutation.isPending }
}
