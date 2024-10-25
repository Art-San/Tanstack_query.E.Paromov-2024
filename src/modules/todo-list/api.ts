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
	userId: string
}

export const todoListApi = {
	getTodoListQueryOptions: () => {
		return queryOptions({
			queryKey: ['tasks', 'list'],
			queryFn: (meta) =>
				jsonApiInstance<TodoDto[]>(`/tasks`, {
					signal: meta.signal,
				}),
		})
	},
	getTodoListPagQueryOptions: ({ page }: { page: number }) => {
		return queryOptions({
			queryKey: ['tasks', 'list', { page }],
			queryFn: (meta) =>
				jsonApiInstance<PaginatedResult<TodoDto>>(
					`/tasks?_page=${page}&_per_page=5`,
					{
						signal: meta.signal,
					}
				),
		})
	},
	getTodoListInfinityQueryOptions: () => {
		return infiniteQueryOptions({
			queryKey: ['tasks', 'list'],
			queryFn: (meta) =>
				jsonApiInstance<PaginatedResult<TodoDto>>(
					`/tasks?_page=${meta.pageParam}&_per_page=10`,
					{
						signal: meta.signal,
					}
				),

			initialPageParam: 1,
			getNextPageParam: (res) => res.next,
			select: (result) => result.pages.flatMap((page) => page.data),
		})
	},

	createTodo: (data: TodoDto) => {
		return jsonApiInstance<TodoDto>('/tasks', {
			method: 'POST',
			json: data,
		})
	},
	updateTodo: (id: string, data: Partial<TodoDto>) => {
		return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
			method: 'PATCH',
			json: data,
		})
	},
	deleteTodo: (id: string) => {
		return jsonApiInstance<TodoDto>(`/tasks/${id}`, {
			method: 'DELETE',
		})
	},
}
