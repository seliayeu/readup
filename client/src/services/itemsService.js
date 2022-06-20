import axios from 'axios'
const baseUrl = '/api/users'

const getItems = async (userId, token, callback) => {
  const response = await axios.get(`${baseUrl}/${userId}/items/`, {
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

const getItem = async (itemId, userId, token, callback) => {
  const response = await axios.get(`${baseUrl}/${userId}/items/${itemId}/`, {
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

const deleteItem = async (itemId, userId, token, callback) => {
  const response = await axios.delete(`${baseUrl}/${userId}/items/${itemId}/`, {
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

const itemsService = { getItems, getItem, deleteItem }

export default itemsService