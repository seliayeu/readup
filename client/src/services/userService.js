import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async (userId, token, callback) => {
  const response = await axios.get(`${baseUrl}/${userId}//`, {
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

const updateUser = async (userId, token, updatedUser, callback) => {
  const response = await axios.put(`${baseUrl}/${userId}/`, updatedUser,  {
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

const finishBookUser = async (userId, token, book_id, callback) => {
  const response = await axios.post(`${baseUrl}/${userId}/`, { book_id },  {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
  console.log(response)
  if (response.status === 200) {
    callback(response.data)
  }
  return response.status
}

const  userService = { getUser, updateUser, finishBookUser }

export default userService 