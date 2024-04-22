import { useAuthContext } from "./useAuthContext"
import { useTodosContext } from "./useTodosContext"
export const useLogout = () =>{

    const {dispatsh} = useAuthContext()
    const { dispatch } = useTodosContext ()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user-token')
        // dispatch logout action
        dispatsh({type: 'LOGOUT'})
        dispatch({type:'SET_TODO' , payload: null})
    }

    return {logout}
}