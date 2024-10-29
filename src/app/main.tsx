import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { queryClient } from '../shared/api/query-client'
import { store } from '../shared/redux'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { onlineManager } from '@tanstack/react-query'

onlineManager.setOnline(navigator.onLine) // иногда нетак работает как хотелось бы, я так понял

const persister = createSyncStoragePersister({
	storage: window.localStorage,
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
			onSuccess={() => {
				// возобновить мутации после успешного первоначального восстановления из localStorage
				queryClient.resumePausedMutations().then(() => {
					queryClient.invalidateQueries()
				})
			}}
		>
			<Provider store={store}>
				<App />
			</Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</PersistQueryClientProvider>
	</StrictMode>
)

//  <PersistQueryClientProvider
// client={queryClient}
// persistOptions={{ persister }}
// onSuccess={() => {
// 	// resume mutations after initial restore from localStorage was successful
// 	queryClient.resumePausedMutations().then(() => {
// 		queryClient.invalidateQueries()
// 	})
// }}
// >
// <Movies />
// <ReactQueryDevtools initialIsOpen />
// </PersistQueryClientProvider>
