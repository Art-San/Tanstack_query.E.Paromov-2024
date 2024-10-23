import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1 * 60 * 1000, // время устаревания данных тут одна минута, по умолчанию 0
			gcTime: 1000 * 60 * 5, // 5 минут по умолчанию
		},
	},
})
