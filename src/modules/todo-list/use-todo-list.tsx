import { useSuspenseQuery } from '@tanstack/react-query'
import { todoListApi } from './api'

// Suspense - если рендерится компонет до дата будет всегда
export function useTodoList() {
	const { data: todoItems, refetch } = useSuspenseQuery({
		...todoListApi.getTodoListQueryOptions(),
		select: (data) => [...data].reverse(), // reverse меняет массив и возвращает ссылку на него
		// select: (data) => data.toReversed(), // использовали toReversed чтобы не мутировать
	})

	return { todoItems, refetch }
}
