import { useContext } from "react";
import { Authcontext } from "../auth.context";
import { login, register, logout } from "../services/auth.api.js"


export const useAuth = () => {
    const context = useContext(Authcontext)

    const { user, setuser, loading, setloading } = context

    const handlelogin = async ({ email, password }) => {
        setloading(true)
        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setuser(data.user)
                localStorage.setItem("isLoggedIn", "true")
            }
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setloading(false)
        }
    }

    const handleregister = async ({ username, email, password }) => {
        setloading(true)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setuser(data.user)
                localStorage.setItem("isLoggedIn", "true")
            }
        } catch (error) {
            console.error("Registration failed:", error)
        } finally {
            setloading(false)
        }
    }

    const handlelogout = async () => {
        setloading(true)
        try {
            await logout()
            setuser(null)
            localStorage.removeItem("isLoggedIn")
        } catch (error) {
            console.error("Logout failed:", error)
        } finally {
            setloading(false)
        }
    }

    return {
        user,
        loading,
        handlelogin,
        handleregister,
        handlelogout
    }

}