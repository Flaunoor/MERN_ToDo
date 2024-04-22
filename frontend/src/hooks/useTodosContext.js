import { TodosContext } from "../context/todosContext";
import { useContext } from "react";


export const useTodosContext = () =>{
    const context = useContext(TodosContext)

    if(!context){
        throw new Error('useTodosContext must be used within a TodosContextProvider');
    }

    return context;
}