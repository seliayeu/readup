import axios from 'axios'
const baseUrl = '/api/users'

const getBooks = async (userId, token, callback) => {
  const response = await axios.get(`${baseUrl}/${userId}/books/`, {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
  console.log(response)
  if (response.status === 200) {
    callback(response.data)
  }
  return response.data
}

const getBook = async (bookId, userId, token, callback) => {
  const response = await axios.get(`${baseUrl}/${userId}/books/${bookId}/`, {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
  console.log(response)
  if (response.status === 200) {
    callback(response.data)
  }
  return response.data
}

const deleteBook = async (bookId, userId, token, callback) => {
  const response = await axios.delete(`${baseUrl}/${userId}/books/${bookId}/`, {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
  console.log(response)
  if (response.status === 204) {
    callback()
  }
  return response.status
}

const createBook = async (bookId, userId, token, newBook, callback) => {
  const response = await axios.put(`${baseUrl}/${userId}/books/${bookId}`, newBook,  {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
  console.log(response)
  if (response.status === 204) {
    callback(response.data)
  }
  return response.status
}

const booksService = { getBooks, getBook, deleteBook, createBook }

export default booksService 