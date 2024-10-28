import { queryClient } from '../../shared/api/query-client'
import { AppThunk } from '../../shared/redux'
import { authSlice } from './auth.slice'

export const logoutThunk = (): AppThunk => async (dispatch) => {
	dispatch(authSlice.actions.removeUser())
	queryClient.removeQueries() // очистка кеша всего когда человек вышел
	localStorage.removeItem('userId')
}
