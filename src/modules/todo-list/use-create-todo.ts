import { useAppDispatch } from '../../shared/redux'
import { createTodoThunk, useCreateLoading } from './create-todo-thunk'

export function useCreateTodo() {
	const appDispatch = useAppDispatch()
	const isLoading = useCreateLoading()

	const handleCreate = async (e: React.FocusEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const text = String(formData.get('text') ?? '')

		appDispatch(createTodoThunk(text))

		e.currentTarget.reset()
	}
	return { handleCreate, isLoading }
}
