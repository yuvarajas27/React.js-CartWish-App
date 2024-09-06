import React, { useEffect, useState } from 'react'

import  apiClient  from '../utils/apiClient'

const useData = (endpoint,customConfig,deps) => {

    const [data,setData]= useState(null)
    const [error,setError]=useState("")
    const [loading,setIsLoading]=useState(false)

    useEffect(()=>{
        setIsLoading(true)
        apiClient.get(endpoint,customConfig).
        then(res=>{
            setIsLoading(false)
            setData(res.data)
        }).
        catch(err=>{
            setIsLoading(false)
            setError(err.message)
        }
        )
    },deps ? deps:[] )


    return {data,error,loading}
    
  
}

export default useData
