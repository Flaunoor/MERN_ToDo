import { createContext , useReducer} from 'react'


export const ThoughtsContext = createContext();

export const thoughtsReducer = (state,action) =>{

    switch (action.type){
        case 'SET_THOUGHT':
            return{
                thoughts : action.payload
            }

        case 'CREATE_THOUGHT':
            return{
                thoughts : [action.payload, ...state.thoughts]
            }

        case 'DELETE_THOUGHT': 
            return{
                thoughts: state.thoughts.filter((th)=> th._id !== action.payload._id)
            }
            
        default :
            return  state;
    }

}



export const ThoughtsContextProvider = ({children})=>{

    const [state, dispatch] = useReducer(thoughtsReducer, {
        thoughts : null
        
    })


    return (
        <ThoughtsContext.Provider value={{...state , dispatch}}>
            {children}
        </ThoughtsContext.Provider>
     )


}