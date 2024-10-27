import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoListApi } from './api'

export function useToggleTodo() {
	const queryClient = useQueryClient()

	const updateTodoMutation = useMutation({
		mutationFn: todoListApi.updateTodo,
		// Когда вызывается mutate:
		onMutate: async (newTodo) => {
			// Отменить все исходящие повторные загрузки
			// (чтобы они не перезаписали наше оптимистичное обновление)
			await queryClient.cancelQueries({ queryKey: ['todos'] })

			// Снимок предыдущего значения
			const previousTodos = queryClient.getQueryData(['todos'])

			// Оптимистично обновиться до нового значения
			queryClient.setQueryData(['todos'], (old) => [...old, newTodo])

			// Вернуть объект контекста со значением снимка
			return { previousTodos }
		},
		// Если мутация не удалась,
		// используйте контекст, возвращенный из onMutate, для отката
		onError: (err, newTodo, context) => {
			queryClient.setQueryData(['todos'], context.previousTodos)
		},
		// Всегда выполнять повторную выборку после ошибки или успеха:
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
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
