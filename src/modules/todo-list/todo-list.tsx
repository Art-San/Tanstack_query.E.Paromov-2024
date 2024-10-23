import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { todoListApi } from './api'
import { useState } from 'react'

// 22:32
// 42:03

export function TodoList() {
	const [page, setPage] = useState(1)

	const {
		data: todoItems,
		error,
		isPending,
	} = useQuery({
		queryKey: ['tasks', 'list', { page }],
		queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
		// placeholderData: { data: [] }, // так же можно что более сложное placeholderData: () =>  data: []
		placeholderData: keepPreviousData, // а можно из библиотеки keepPreviousData, показываются предыдущие данные пока не появятся новые
	})
	// console.log(13, data)

	if (isPending) {
		return <div className="">...Loading</div>
	}
	if (error) {
		return <div className="">Error: {JSON.stringify(error)}</div>
	}
	return (
		<div className="p-5 mx-auto max-w-[1200px] mt-10">
			<h1 className="text-3xl font-bold underline mb-5">todo list</h1>
			<div className=" flex flex-col gap-1">
				<div className="flex gap-1">
					<h4>Текущая страница:</h4>
					{page}
				</div>
				<div className="flex gap-1">
					<h4>Всего страниц:</h4>
					{todoItems.pages}
				</div>
			</div>
			<div className=" flex flex-col gap-4">
				{todoItems.data.map((todo) => {
					return (
						<div className="border border-slate-300 rounded p-3" key={todo.id}>
							{todo.text}
						</div>
					)
				})}
			</div>
			<div className=" flex gap-2 mt-4">
				<button
					onClick={() => setPage((p) => Math.max(p - 1, 1))}
					className="p-3 rounded border border-teal-500"
				>
					prev
				</button>
				<button
					onClick={() => setPage((p) => Math.min(p + 1, todoItems.pages))}
					className="p-3 rounded border border-teal-500"
				>
					next
				</button>
			</div>
		</div>
	)
}
