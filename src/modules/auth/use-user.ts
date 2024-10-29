import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { authApi } from './api'
import { authSlice } from './auth.slice'
import { useSelector } from 'react-redux'

export function useUser() {
	const userId = useSelector(authSlice.selectors.userId)
	const { data, isLoading } = useQuery({
		...authApi.getUserById(userId!),
		enabled: Boolean(userId), // отключает включает запросник
	})
	return { data, isLoading }
}

export function useSuspenseUser() {
	const userId = useSelector(authSlice.selectors.userId)
	return useSuspenseQuery({
		...authApi.getUserById(userId!),
	})
}
