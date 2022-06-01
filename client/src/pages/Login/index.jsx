import { useContext } from "react"
import { AuthContext } from "../../authContext"


const Login = () => {
  const auth = useContext(AuthContext)

  return(
    <div>login here bro
      <button onClick={() => auth.login({displayname: "jumbo"}, () => {})}></button>
    </div>     

  )
}

export default Login