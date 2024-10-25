// import { useInfiniteQuery } from '@tanstack/react-query'
// import { todoListApi } from './api'
// import { useCallback, useRef } from 'react'

// export function useTodoListInfiniteScroll() {
// 	const {
// 		data: todoItems,
// 		error,
// 		isLoading,
// 		fetchNextPage,
// 		hasNextPage,
// 		isFetchingNextPage,
// 	} = useInfiniteQuery({
// 		...todoListApi.getTodoListInfinityQueryOptions(),
// 	})

// 	const cursorRef = useIntersection(() => {
// 		fetchNextPage()
// 	})

// 	const cursor = (
// 		<div className="flex gap-2 mb-4" ref={cursorRef}>
// 			{!hasNextPage && <div>Нет данных для загрузки</div>}
// 			{isFetchingNextPage && <div className="">...Loading</div>}
// 		</div>
// 	)

// 	return { error, todoItems, isLoading, cursor }
// }

// export function useIntersection(onIntersect: () => void) {
// 	const unsubscribe = useRef(() => {})

// 	return useCallback((el: HTMLDivElement | null) => {
// 		const observer = new IntersectionObserver((entries) => {
// 			// IntersectionObserver браузерное апи помогает отслеивать поподание элемента на экран

// 			entries.forEach((intersection) => {
// 				if (intersection.isIntersecting) {
// 					onIntersect()
// 				}
// 			})
// 		})
// 		if (el) {
// 			observer.observe(el)
// 			unsubscribe.current = () => observer.disconnect()
// 		} else {
// 			unsubscribe.current()
// 		}
// 	}, [])
// }
