import { useInfiniteQuery } from '@tanstack/react-query'
import { todoListApi } from './api'
import { useCallback, useRef, useState } from 'react'
// https://www.youtube.com/watch?v=K5-a-wjURrc&t=2523s

export function TodoList() {
	const cursorRef = useIntersection(() => {
		fetchNextPage()
	})
	const [enabled, setEnabled] = useState(false)
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
		enabled: false,
	})

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

			<div
				className={
					'flex flex-col gap-4' + (isPlaceholderData ? ' opacity-30' : '')
				}
			>
				{todoItems?.map((todo) => {
					return (
						<div className="border border-slate-300 rounded p-3" key={todo.id}>
							<p className={isPlaceholderData ? ' text-yellow-400' : ''}>
								{todo.text}
							</p>
						</div>
					)
				})}
			</div>
			<div className="" ref={cursorRef}>
				{!hasNextPage && <div>Нет данных для загрузки</div>}
				{isFetchingNextPage && <div className="">...Loading</div>}
			</div>
		</div>
	)
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
