import { useSuspenseQuery } from '@tanstack/react-query'
import { todoListApi } from './api'
import { useSuspenseUser } from '../auth/use-user'

// Suspense - если рендерится компонет до дата будет всегда
export function useTodoList() {
	const user = useSuspenseUser()
	const { data: todoItems, refetch } = useSuspenseQuery({
		...todoListApi.getTodoListQueryOptions({ userId: user.data.id }),
		select: (data) => [...data].reverse(),
	})

	return { todoItems, refetch }
}
