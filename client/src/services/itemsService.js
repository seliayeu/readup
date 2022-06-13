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

const itemsService = { getItems }

export default itemsService