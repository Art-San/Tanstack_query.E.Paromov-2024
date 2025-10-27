import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { jsonApiInstance } from '../../shared/api/api-instance'

const BASE_URL = 'http://localhost:3000'

export type PaginatedResult<T> = {
	data: T[]
	first: number
	items: number
	last: number
	next: number | null
	pages: number
	prev: number | null
}

export type TodoDto = {
	id: string
	text: string
	done: boolean
}

export const todoListApi = {
	baseKey: 'tasks',
	getTodoList: (
		{ page }: { page: number },
		{ signal }: { signal: AbortSignal }
	) => {
		// Чел зашел а затем резко  вышел то AbortSignal отменит запрос
		return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
			signal,
		}).then((res) => res.json() as Promise<PaginatedResult<TodoDto>>)
	},
	getTodoListQueryOptions: ({ userId }: { userId: string }) => {
		return queryOptions({
			queryKey: [todoListApi.baseKey, 'list', userId],
			queryFn: (meta) =>
				jsonApiInstance<TodoDto[]>(`/tasks?userId=${userId}`, {
					signal: meta.signal,
				}),
		})
	},

	getTodoListInfinityQueryOptions: () => {
		return infiniteQueryOptions({
			queryKey: [todoListApi.baseKey, 'list'],
			queryFn: (meta) =>
				jsonApiInstance<PaginatedResult<TodoDto>>(
					`/tasks?_page=${meta.pageParam}&_per_page=10`,
					{
						signal: meta.signal,
					}
				),
			initialPageParam: 1,
			getNextPageParam: (result) => result.next,
			select: (result) => result.pages.flatMap((page) => page.data),
		})
	},
}
