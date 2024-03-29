import { useEffect, useState } from "react"
import { Button, Card, Grid, Dialog, DialogActions, DialogTitle, DialogContentText, DialogContent, Stack, TextField, useMediaQuery, Typography } from "@mui/material";
import LinearProgres, { LinearProgressProps } from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import goalsService from "../../services/goalsService"
import userService from "../../services/userService"
import booksService from "../../services/booksService"
import { useContext } from "react"
import { AuthContext } from "../../authContext"
import CardMedia from '@mui/material/CardMedia';

const Home = () => {
  const auth = useContext(AuthContext)

  const [goals, setGoals] = useState([])
  const [books, setBooks] = useState([])
  const [addBookOpen, setAddBookOpen] = useState(false)
  const [viewBookOpen, setViewBookOpen] = useState(false)
  const [viewBook, setViewBook] = useState({})
  const [currISBN, setCurrISBN] = useState("")
  const handleClose = () => setAddBookOpen(false);
  const handleOpen = () => setAddBookOpen(true);

  const matches = useMediaQuery('(min-width:600px)');

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

  const handleAddBook = async () => {
    // const createBook = async (bookId, userId, token, newBook, callback) => {
    await booksService.createBook(currISBN, auth.user.id, auth.user.token, 
      (data) => {
        setBooks([...books, data])
      }
    );
    setCurrISBN("");
    handleClose();
  }

  const markCompletedBook = async (id) => {
    // const createBook = async (bookId, userId, token, newBook, callback) => {
    await userService.finishBookUser(auth.user.id, auth.user.token, id,
      (data) => {
        setBooks(books.filter(b => b.id !== id))
        localStorage.setItem("experience", parseInt(localStorage.getItem("experience")) + 10)
        setViewBookOpen(false);
      }
    );
    setCurrISBN("");
    handleClose();
  }

  const handleRemoveBook = (id) => {
    booksService.deleteBook(id, localStorage.getItem("id"), auth.user.token, () => {})
    setBooks(books.filter(b => b.id !== id))
    setViewBookOpen(false);
  }

  const handleOpenBook = (book) => {
    setViewBook(book);
    setViewBookOpen(true);
  }

  return(
    <Box sx={{ width: "100%", height: "100%", justifyContent: "center", display: "flex", alignItems: "center"}}>
      <Dialog fullWidth open={addBookOpen} onClose={handleClose} sx={{position: "absolute" }}>
        <DialogTitle>Add book</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter book ISBN to add a book!</DialogContentText>
          <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label="ISBN"
          type="text"
          fullWidth
          value={currISBN}
          onChange={(event) => setCurrISBN(event.target.value)}
          variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddBook}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth open={viewBookOpen} onClose={()=>{setViewBookOpen(false)}} sx={{position: "absolute" }}>
        <DialogTitle>{viewBook.title}</DialogTitle>
        <DialogActions>
          <Button onClick={()=>{setViewBookOpen(false)}}>Cancel</Button>
          <Button onClick={() => {markCompletedBook(viewBook.id)}}>Mark Completed</Button>
          <Button onClick={() => {handleRemoveBook(viewBook.id)}}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{width: "90%", maxWidth: "700px", marginTop: "2%"}}>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <h1>readup</h1> 
        <Box sx={{ width: "70%" }} mt="4.6vh" ml="1vw" >
          <LinearProgres value={localStorage.getItem("experience") % 100} variant="determinate" />
        </Box>
        <Typography mt="3.7vh" ml="1vw">{Math.floor(localStorage.getItem("experience") / 100)}</Typography>
      </Box>
      <Grid 
        sx={{ width: "100%", minHeight: "18vh", backgroundColor: "lightgrey", borderRadius: "8px", display: "flex", flexDirection: "row", flexGrow: 1}} 
        p={"2%"}
        pr={"4%"}
        container spacing={1}
        >
          <Grid
          item xs={matches ? 2.3 : 3}>
        <Card 
          sx={{ minHeight: matches ? "17.6vh" : "15.5vh", minWidth: matches ? "100%" : "11vh", maxWidth: matches ? "18%" : "11vh", cursor: "pointer", justifyContent: "center", display: "flex", alignItems: "center" }}
          onClick={handleOpen}
        >
          <AddIcon sx={{ width: "30%", height: "30%"}}/>
        </Card></Grid>
        {books.map(book =>
          <Grid
          item xs={matches ? 2.3 : 3}>
          <Card key={`${book.id}`}
            sx={{ minHeight: matches ? "17.6vh" : "15.5vh", minWidth: matches ? "100%" : "11vh", maxWidth: matches ? "18%" : "11vh", cursor: "pointer", justifyContent: "center", display: "flex", alignItems: "center" }}
            onClick={() => handleOpenBook(book)}
          >{
              book.thumbnail_link ? 
                <CardMedia
                component="img"
                sx={{ width: "100%" }}
                image={book.thumbnail_link}
                alt={book.title.substring(0, 4) + "..."}
                ></CardMedia>
                :
                <Typography>{book.title.substring(0, 4) + "..."}</Typography>
            }
        </Card></Grid>)
        }
      </Grid>
      </Box>
    </Box>     
  )
}

export default Home