/* eslint-disable react-refresh/only-export-components */
import {  createContext, useState, useEffect } from "react";
import { getuser } from "./services/auth.api.js";

export const Authcontext= createContext()

export const Authprovider=({children})=>{
    const [user,setuser]=useState(null)
    const [loading,setloading]=useState(true)

    useEffect(() => {
        const getandsetuser = async () => {
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
            if (!isLoggedIn) {
                setuser(null)
                setloading(false)
                return
            }
            try {
                const data = await getuser()
                setuser(data.user)
            }
            catch (err) {
                setuser(null)
                localStorage.removeItem("isLoggedIn")
            }
            finally {
                setloading(false)
            }
        }
        getandsetuser()
    }, [])

    return <Authcontext.Provider value={{user,setuser,loading,setloading}}>
        {children}
    </Authcontext.Provider>

}

