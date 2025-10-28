import { useTodoList } from './use-todo-list'
import { useCreateTodo } from './use-create-todo'
import { useDeleteTodo } from './use-delete-todo'

export function TodoList() {
	const { todoItems, error, isLoading } = useTodoList()
	const createTodo = useCreateTodo()
	const deleteTodo = useDeleteTodo()

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
			<form className="flex gap-2 mb-5" onSubmit={createTodo.handleCreate}>
				<input
					className="rounded p-2 border border-teal-500"
					type="text"
					name="text"
				/>
				<button
					disabled={createTodo.isLoading}
					className="rounded p-2 border border-teal-500 disabled:opacity-50"
				>
					Создать
				</button>
			</form>
			<div>
				{todoItems?.map((todo) => (
					<div
						className="flex justify-between border border-slate-300 rounded p-3"
						key={todo.id}
					>
						{todo.text}
						<button
							disabled={deleteTodo.getIsPending(todo.id)}
							onClick={() => deleteTodo.handleDelete(todo.id)}
							className=" text-rose-500 font-bold disabled:opacity-30"
						>
							удалить
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
