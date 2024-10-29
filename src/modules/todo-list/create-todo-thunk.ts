import { queryClient } from '../../shared/api/query-client'
import { AppThunk } from '../../shared/redux'
import { MutationObserver, useMutation } from '@tanstack/react-query'
import { TodoDto, todoListApi } from './api'
import { nanoid } from 'nanoid'
import { authSlice } from '../auth/auth.slice'
import { authApi } from '../auth/api'

export const createTodoThunk =
	(text: string): AppThunk =>
	async (_dispatch, getState) => {
		const userId = authSlice.selectors.userId(getState())

		if (!userId) {
			throw new Error('user not login')
		}

		const user = await queryClient.fetchQuery(authApi.getUserById(userId)) // 1. Если юзер ест в кеше то запроса не будет
		// 2. Важный момент: должен быть указан staleTime: 1 * 60 * 1000, иначе перезапрос будет каждый раз
		console.log(1, user)

		const newTodo: TodoDto = {
			id: nanoid(),
			done: false,
			text: `${text}. Owner: ${user.login}`,
			userId,
		}

		// Optimistic update - играем в такой
		queryClient.cancelQueries({
			// оменили запросы по базавому ключу
			queryKey: [todoListApi.baseKey],
		})

		const prevTasks = queryClient.getQueryData(
			todoListApi.getTodoListQueryOptions().queryKey
		)

		queryClient.setQueryData(
			todoListApi.getTodoListQueryOptions().queryKey,
			(tasks) => [...(tasks ?? []), newTodo]
		)

		try {
			await new MutationObserver(queryClient, {
				mutationFn: todoListApi.createTodo,
			}).mutate(newTodo)
		} catch (e) {
			queryClient.setQueryData(
				todoListApi.getTodoListQueryOptions().queryKey,
				prevTasks
			)
		} finally {
			queryClient.invalidateQueries({
				queryKey: [todoListApi.baseKey],
			})
		}
	}

export const useCreateLoading = () =>
	useMutation({
		mutationKey: ['create-todo'],
	}).isPending
