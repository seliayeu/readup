import { useEffect, useState } from "react"
import goalsService from "../../services/goalsService"
import itemsService from "../../services/itemsService"

const Home = () => {
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
          <div key={`${goal.id}`}>
            books {goal.book_count}/{goal.book_goal} articles {goal.website_count}/{goal.website_goal} 
            <button onClick={() => {
              goalsService.deleteGoal(goal.id, localStorage.getItem("id"), localStorage.getItem("token"), () => {
                console.log(goals)
                console.log(goals.filter(g => g.id !== goal.id))
                setGoals(goals.filter(g => g.id !== goal.id))
              })
            }}>
              delete
            </button>
          </div>
        )
        }
      </div>
      <div>
        {items.map(item =>
          <div key={`${item.id}`}>
            {item.address}
            <button onClick={() => {
              itemsService.deleteItem(item.id, localStorage.getItem("id"), localStorage.getItem("token"), () => {
                console.log(items)
                console.log(items.filter(i => i.id !== item.id))
                setItems(items.filter(i => i.id !== item.id))
              })
            }}>
              delete
            </button>
          </div>)
        }
      </div>
    </div>     
  )
}

export default Home