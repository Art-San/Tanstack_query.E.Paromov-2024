import { useInfiniteQuery } from '@tanstack/react-query'
import { todoListApi } from './api'
import { useCallback, useRef, useState } from 'react'

export function useTodoList() {
	const [enabled, setEnabled] = useState(true)
	const {
		data: todoItems,
		error,
		isLoading,
		isPlaceholderData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		...todoListApi.getTodoListInfinityQueryOptions(),
	})

	const cursorRef = useIntersection(() => {
		fetchNextPage()
	})

	const cursor = (
		<div className="" ref={cursorRef}>
			{!hasNextPage && <div>Нет данных для загрузки</div>}
			{isFetchingNextPage && <div className="">...Loading</div>}
		</div>
	)

	return {
		todoItems,
		error,
		cursor,
		isLoading,
		isPlaceholderData,
		setEnabled,
		enabled,
	}
}

export function useIntersection(onIntersect: () => void) {
	const unsubscribe = useRef(() => {})

	return useCallback((el: HTMLDivElement | null) => {
		const observer = new IntersectionObserver((entries) => {
			// IntersectionObserver браузерное апи помогает отслеивать поподание элемента на экран

			entries.forEach((intersection) => {
				if (intersection.isIntersecting) {
					onIntersect()
				}
			})
		})
		if (el) {
			observer.observe(el)
			unsubscribe.current = () => observer.disconnect()
		} else {
			unsubscribe.current()
		}
	}, [])
}
