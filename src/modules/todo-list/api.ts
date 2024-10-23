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
}
