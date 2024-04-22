import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useSignup = ()=>{
    const {dispatsh} = useAuthContext()
    const [error , setError] = useState(null)
    const [isLoading , setIsLoading] = useState(null)

    const signup = async(email, password) =>{
        setIsLoading(true)
        setError(null)
        

        const response = await fetch('api/user/signup',{

            method: 'POST',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){

            dispatsh({type:'LOGIN' , payload : json})
            

            //save token to local Storage
            localStorage.setItem('user-token', JSON.stringify(json)) // json is {email , token}
            setIsLoading(false)
            
        }


    }
    
    return{ signup, isLoading, error}

}