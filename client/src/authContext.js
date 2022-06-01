import { createContext } from "react"

export const AuthContext = createContext({ 
  user: {},
  login: () => null,
  logout: () => null
})