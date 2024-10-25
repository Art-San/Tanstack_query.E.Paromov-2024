import { useQuery } from '@tanstack/react-query'
import { todoListApi } from './api'

export function useTodoList() {
	const {
		data: todoItems,
		error,
		isLoading,
	} = useQuery({
		...todoListApi.getTodoListQueryOptions(),
		select: (data) => data.reverse(), // reverse меняет массив и возвращает ссылку на него
		// select: (data) => data.toReversed(), // использовали toReversed чтобы не мутировать
	})

	return { error, todoItems, isLoading }
}
