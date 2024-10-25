import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { todoListApi } from './api'

export function useTodoListPagination(page: number, enabled: boolean) {
	const {
		data: todoItems,
		error,
		isLoading,
		isPlaceholderData,
	} = useQuery({
		...todoListApi.getTodoListQueryOptions({ page }),
		enabled: enabled, // отключает включает запросник
		// placeholderData: { data: [] }, // так же можно что более сложное placeholderData: () =>  data: []
		placeholderData: keepPreviousData, // а можно из библиотеки keepPreviousData, показываются предыдущие данные пока не появятся новые
	})

	return { todoItems, error, isLoading, isPlaceholderData }
}
