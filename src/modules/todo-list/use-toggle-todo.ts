import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoListApi } from './api'
import { useSuspenseUser } from '../auth/use-user'

export function useToggleTodo() {
	const queryClient = useQueryClient()
	const user = useSuspenseUser()

	const updateTodoMutation = useMutation({
		mutationFn: todoListApi.updateTodo,
		// Когда вызывается mutate:
		onMutate: async (newTodo) => {
			await queryClient.cancelQueries({ queryKey: [todoListApi.baseKey] }) // Отменить все исходящие повторные загрузки // (чтобы они не перезаписали наше оптимистичное обновление)

			// Снимок предыдущего значения
			const previousTodos = queryClient.getQueryData(
				todoListApi.getTodoListQueryOptions({ userId: user.data.id }).queryKey
			)

			// Оптимистично обновиться до нового значения // ПОМЕНЯЛИ кеш
			queryClient.setQueryData(
				todoListApi.getTodoListQueryOptions({ userId: user.data.id }).queryKey,
				(old) =>
					old?.map((todo) =>
						todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
					)
			)

			return { previousTodos } // Предыдущие тудушкипередали в контекст
		},
		// Если мутация не удалась,
		// используйте контекст, возвращенный из onMutate, для отката
		onError: (_, __, context) => {
			if (context) {
				queryClient.setQueryData(
					todoListApi.getTodoListQueryOptions({ userId: user.data.id })
						.queryKey,
					context.previousTodos
				)
			}
		},
		// Всегда выполнять повторную выборку после ошибки или успеха:
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
		},
	})

	const toggleTodo = (id: string, done: boolean) => {
		updateTodoMutation.mutate({
			id,
			done: !done,
		})
	}
	return { toggleTodo }
	// return { toggleTodo, isPending: updateTodoMutation.isPending }  // isPending не понадобится так как делаем опртиместический апдейт
}

// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { todoListApi } from './api'

// export function useToggleTodo() {
// 	const queryClient = useQueryClient()

// 	const updateTodoMutation = useMutation({
// 		mutationFn: todoListApi.updateTodo,
// 		onSuccess() {
// 			console.log(1, 'успех')
// 		},

// 		onError(error) {
// 			console.log(2, 'срабатывает при ошибке', error)
// 		},
// 		onSettled: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: ['tasks', 'list'],
// 			})
// 		},
// 	})

// 	const toggleTodo = (id: string, done: boolean) => {
// 		updateTodoMutation.mutate({
// 			id,
// 			done: !done,
// 		})
// 	}
// 	return { toggleTodo }
// 	// return { toggleTodo, isPending: updateTodoMutation.isPending }  // isPending не понадобится так как делаем опртиместический апдейт
// }
