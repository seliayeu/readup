import axios from 'axios'
const baseUrl = '/api/users'

const getGoals = async (userId, token, callback) => {
  const response = await axios.get(`${baseUrl}/${userId}/goals/`, {
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

const goalsService = { getGoals }

export default goalsService