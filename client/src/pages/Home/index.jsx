import { useEffect, useState } from "react"
import goalsService from "../../services/goalsService"
import booksService from "../../services/booksService"
import Navbar from "../../components/Navbar"

const Home = () => {
  const [goals, setGoals] = useState([])
  const [books, setBooks] = useState([])

  useEffect(() => {
    goalsService.getGoals(localStorage.getItem("id"), localStorage.getItem("token"), 
      (data) => {
        console.log(data)
        setGoals(data)
      }
    )
    booksService.getBooks(localStorage.getItem("id"), localStorage.getItem("token"), 
      (data) => {
        console.log(data)
        setBooks(data)
      }
    )
  }, [])

  return(
    <div>
      <Navbar />
      <div>
        {goals.map(goal =>
          <div key={`${goal.id}`}>
            books {goal.goal}/{goal.count}  
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
        {books.map(book =>
          <div key={`${book.id}`}>
            {book.title}
            <button onClick={() => {
              booksService.deleteBook(book.id, localStorage.getItem("id"), localStorage.getItem("token"), () => {
                console.log(books)
                console.log(books.filter(b => b.id !== book.id))
                setBooks(books.filter(b => b.id !== book.id))
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