import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"

function AuthLayout({children , authentication = true}) {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    const [loader , setLoader]=useState(true)

    useEffect(()=>{
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        }else if (!authentication && authentication !== authStatus){
            navigate("/")
        }
        setLoader(false)
    },[authStatus , authentication , navigate])

  return loader ? <>Loding</> : <>{children}</>
}

export default AuthLayout