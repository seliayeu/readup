import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../authContext"
import goalsService from "../../services/goalsService"
import itemsService from "../../services/itemsService"

const Home = () => {
  const auth = useContext(AuthContext)
  const [goals, setGoals] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    goalsService.getGoals(localStorage.getItem("id"), localStorage.getItem("token"), 
      (data) => {
        console.log(data)
        setGoals(data)
      }
    )
    itemsService.getItems(localStorage.getItem("id"), localStorage.getItem("token"), 
      (data) => {
        console.log(data)
        setItems(data)
      }
    )
  }, [])
  return(
    <div>
      <div>
        {goals.map(goal =>
          <div key={`${goal.created}`}>books {goal.book_count}/{goal.book_goal} articles {goal.website_count}/{goal.website_goal}</div>)
        }
      </div>
      <div>
        {items.map(item =>
          <div key={`${item.created}`}>{item.address}</div>)
        }
      </div>
    </div>     
  )
}

export default Home