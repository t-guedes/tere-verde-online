import React, { createContext, useState, useContext } from "react"


const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "")

  const login = (tk) => {
    setToken(tk)
    localStorage.setItem("adminToken", tk)
  }
  const logout = () => {
    setToken("")
    localStorage.removeItem("adminToken")
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)