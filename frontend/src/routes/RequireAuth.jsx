import React,{useEffect,useState} from 'react'
import { Navigate } from 'react-router-dom'
import { api } from '../lib/api'

export default function RequireAuth({Component}) {
    const [ok,setOk]=useState(null)
     useEffect(()=>{
    
            let alive=true
    
            (async()=>{     //즉시 실행 함수 (async()=>{})()
                try {
                    await api.post('/api/auth/verify-token',{})
    
                    if(alive) setOk(true)
                } catch (error) {
                    if(alive) setOk(false)
                }
            })()
    
            return ()=>{alive=false}  //보이지 않는 page false로 변경
        },[])

  return ok?
    <Component/>:
    <Navigate to='/admin/login' replace />
}

 