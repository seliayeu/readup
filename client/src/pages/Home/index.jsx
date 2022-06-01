import { useContext, useEffect } from "react"
import { AuthContext } from "../../authContext"

const Home = () => {
  const auth = useContext(AuthContext)
  useEffect(() => {
    console.log(auth.user)
  }, [auth.user])
  return(
    <div>home here cousin</div>     
  )
}

export default Home