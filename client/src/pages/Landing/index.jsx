import { useContext, useEffect } from "react"
import { AuthContext } from "../../authContext"

const Landing = () => {
  const auth = useContext(AuthContext)
  useEffect(() => {
    console.log(auth.user)
  }, [auth.user])
  return(
    <div>heh just landed? make urself at home!!!</div>     
  )
}

export default Landing