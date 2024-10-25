// https://www.youtube.com/watch?v=K5-a-wjURrc&t=2523s

import { useTodoListInfiniteScroll } from './use-todo-list-infinite-scroll'

// 22:32
// 42:03 -- с этой может чуть дальше разбор isPending, isFetching, isLoading, status, fetchStatus
// 1:03:18
// 1:23:58

export function TodoListInfiniteScroll() {
	const { error, todoItems, isLoading, cursor } = useTodoListInfiniteScroll()

	if (isLoading) {
		// isLoading нет данных но запрос идет
		return <div className="">...Loading</div>
	}
	if (error) {
		return <div className="">Error: {JSON.stringify(error)}</div>
	}

	return (
		<div className="p-5 mx-auto max-w-[1200px] mt-10  ">
			<h1 className="text-3xl font-bold underline mb-5">
				Todo List Infinite Scroll
			</h1>

			<div className={'flex flex-col gap-4'}>
				{todoItems?.map((todo) => {
					return (
						<div className="border border-slate-300 rounded p-3" key={todo.id}>
							{todo.text}
						</div>
					)
				})}
			</div>
			{cursor}
		</div>
	)
}
