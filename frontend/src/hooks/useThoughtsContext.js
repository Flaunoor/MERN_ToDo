import { ThoughtsContext } from "../context/thoughtsContext";
import { useContext } from "react";


export const useThoughtsContext = () =>{
    const context = useContext(ThoughtsContext)

    if(!context){
        throw new Error('useThoughtContext must be used within a ThoughtContextProvider');
    }

    return context;
}