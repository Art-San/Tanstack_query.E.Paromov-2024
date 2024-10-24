import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { todoListApi } from './api'
import { useState } from 'react'

// https://www.youtube.com/watch?v=K5-a-wjURrc&t=2523s

// 22:32
// 42:03 -- с этой может чуть дальше разбор isPending, isFetching, isLoading, status, fetchStatus
// 1:03:18
// 1:23:58
export function TodoList() {
	const [page, setPage] = useState(1)
	const [enabled, setEnabled] = useState(false)

	const {
		data: todoItems,
		error,
		isLoading,
		isPlaceholderData,
	} = useQuery({
		...todoListApi.getTodoListQueryOptions({ page }),
		enabled: enabled, // отключает включает запросник
		// placeholderData: { data: [] }, // так же можно что более сложное placeholderData: () =>  data: []
		placeholderData: keepPreviousData, // а можно из библиотеки keepPreviousData, показываются предыдущие данные пока не появятся новые
	})

	console.log(14, todoItems?.data)
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
			<button
				onClick={() => setEnabled((enabled) => !enabled)}
				className={enabled ? ' bg-green-300' : ' bg-gray-400'}
			>
				Toggle enabled
			</button>
			<div className=" flex flex-col gap-1">
				<div className="flex gap-1">
					<h4>Текущая страница:</h4>
					{page}
				</div>
				<div className="flex gap-1">
					<h4>Всего страниц:</h4>
					{todoItems?.pages}
				</div>
			</div>
			<div
				className={
					'flex flex-col gap-4' + (isPlaceholderData ? ' opacity-30' : '')
				} // isFetching, заменили на isPlaceholderData, но его используем тогда когда включ placeholderData: keepPreviousData
			>
				{todoItems?.data.map((todo) => {
					return (
						<div className="border border-slate-300 rounded p-3" key={todo.id}>
							<p className={isPlaceholderData ? ' text-yellow-400' : ''}>
								{todo.text}
							</p>
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
					onClick={() => setPage((p) => Math.min(p + 1, todoItems?.pages ?? 1))}
					className="p-3 rounded border border-teal-500"
				>
					next
				</button>
			</div>
		</div>
	)
}

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
// import {
// 	keepPreviousData,
// 	useQuery,
// 	useInfiniteQuery,
// } from '@tanstack/react-query'
// import { todoListApi } from './api'
// import { useCallback, useRef, useState } from 'react'

// // https://www.youtube.com/watch?v=K5-a-wjURrc&t=2523s

// // 22:32
// // 42:03 -- с этой может чуть дальше разбор isPending, isFetching, isLoading, status, fetchStatus
// // 1:03:18
// export function TodoList() {
// 	const cursorRef = useIntersection(() => {
// 		fetchNextPage()
// 	})
// 	const [enabled, setEnabled] = useState(false)
// 	const {
// 		data: todoItems,
// 		error,
// 		isLoading,
// 		isPlaceholderData,
// 		fetchNextPage,
// 		hasNextPage,
// 		isFetchingNextPage,
// 	} = useInfiniteQuery({
// 		...todoListApi.getTodoListInfinityQueryOptions(),
// 		enabled: enabled,
// 	})
// 	console.log(23, todoItems)
// 	if (isLoading) {
// 		// isLoading нет данных но запрос идет
// 		return <div className="">...Loading</div>
// 	}
// 	if (error) {
// 		return <div className="">Error: {JSON.stringify(error)}</div>
// 	}

// 	return (
// 		<div className="p-5 mx-auto max-w-[1200px] mt-10  ">
// 			<h1 className="text-3xl font-bold underline mb-5">todo list</h1>
// 			<button
// 				onClick={() => setEnabled((enabled) => !enabled)}
// 				className={enabled ? ' bg-green-300' : ' bg-gray-400'}
// 			>
// 				Toggle enabled
// 			</button>

// 			<div
// 				className={
// 					'flex flex-col gap-4' + (isPlaceholderData ? ' opacity-30' : '')
// 				}
// 			>
// 				{todoItems?.map((todo) => {
// 					return (
// 						<div className="border border-slate-300 rounded p-3" key={todo.id}>
// 							<p className={isPlaceholderData ? ' text-yellow-400' : ''}>
// 								{todo.text}
// 							</p>
// 						</div>
// 					)
// 				})}
// 			</div>
// 			<div className="" ref={cursorRef}>
// 				{!hasNextPage && <div>Нет данных для загрузки</div>}
// 				{isFetchingNextPage && <div className="">...Loading</div>}
// 			</div>
// 		</div>
// 	)
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
