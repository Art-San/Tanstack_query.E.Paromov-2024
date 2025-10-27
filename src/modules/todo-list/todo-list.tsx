import { useTodoList } from './use-todo-list'
// https://www.youtube.com/watch?v=K5-a-wjURrc&t=2523s

export function TodoList() {
	const { todoItems, error, cursor, isLoading } = useTodoList()
	if (isLoading) {
		// isLoading нет данных но запрос идет
		return <div className="">...Loading</div>
	}
	if (error) {
		return <div className="">Error: {JSON.stringify(error)}</div>
	}

	return (
		<div className="p-5 mx-auto max-w-[1200px] mt-10  ">
			<h1 className="text-3xl font-bold underline mb-5">todo list</h1>

			<div>
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
