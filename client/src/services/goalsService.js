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

const getGoal = async (goalId, userId, token, callback) => {
  const response = await axios.get(`${baseUrl}/${userId}/goals/${goalId}/`, {
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

const deleteGoal = async (goalId, userId, token, callback) => {
  const response = await axios.delete(`${baseUrl}/${userId}/goals/${goalId}/`, {
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

const goalsService = { getGoals, getGoal, deleteGoal }

export default goalsService