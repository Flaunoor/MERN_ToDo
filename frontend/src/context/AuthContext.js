import { createContext , useEffect, useReducer} from 'react'

export const AuthContext = createContext() 

export const authReducer = (state, action) => {

    switch (action.type){
        case  'LOGIN':
            return {
                user : action.payload
            }

        case 'LOGOUT':
            return{
                user : null
            }
        default:
            return state
    }

}
export const AuthContextProvider = ({children}) =>{

    const [state , dispatsh] = useReducer(authReducer, {
        user:null
    })

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user-token'))
        if(user){
            dispatsh({type: 'LOGIN', payload:user})
        }
    },[])



    console.log('AuthContext state ', state)

    return (
       <AuthContext.Provider value={{...state , dispatsh}}>
            {children}
       </AuthContext.Provider> 
    )

}