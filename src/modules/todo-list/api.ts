import { queryOptions, infiniteQueryOptions } from '@tanstack/react-query'
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
	getTodoList: (
		{ page }: { page: number },
		{ signal }: { signal: AbortSignal }
	) => {
		// Чел зашел а затем резко  вышел то AbortSignal отменит запрос
		return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=5`, {
			signal,
		}).then((res) => res.json() as Promise<PaginatedResult<TodoDto>>)
	},

	getTodoListQueryOptions: ({ page }: { page: number }) => {
		return queryOptions({
			queryKey: ['tasks', 'list', { page }],
			queryFn: (meta) =>
				jsonApiInstance<PaginatedResult<TodoDto>>(
					`/tasks?_page=${page}&_per_page=5`,
					{
						signal: meta.signal,
					}
				),
			// queryFn: jsonApiInstance(`/tasks?_page=${page}&_per_page=5`), // первый вариант
		})
	},
	getTodoListInfinityQueryOptions: () => {
		return infiniteQueryOptions({
			queryKey: ['tasks', 'list'],
			queryFn: (meta) =>
				jsonApiInstance<PaginatedResult<TodoDto>>(
					`/tasks?_page=${meta.pageParam}&_per_page=5`,
					{
						signal: meta.signal,
					}
				),
			// queryFn: (meta) =>
			// 	todoListApi.getTodoList({ page: meta.pageParam }, meta),
			initialPageParam: 1,
			getNextPageParam: (res) => res.next,
			select: (result) => result.pages.flatMap((page) => page.data),
		})
	},
}
