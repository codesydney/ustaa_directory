import { api } from './configs/axiosConfig'
import { defineCancelApiObject } from './configs/axiosUtils'

const usersURL = '/users'

const searchUsers = async ({ search = '', page = 1 }, cancel = false) => {
  const params = { search, page, limit: 12 }
  const signal = cancel
    ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
    : undefined

  try {
    const response = await api.get(usersURL, { params, signal })
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return { users: [], meta: {} }
  }
}

const login = formData => {
  const signInURL = `${usersURL}/login`
  return api.post(signInURL, formData)
}

const signUp = formData => {
  const signUpURL = `${usersURL}/signup`
  return api.post(signUpURL, formData)
}

const requestReset = formData => {
  const requestResetURL = `${usersURL}/request-reset-password`
  return api.post(requestResetURL, formData)
}

const resetPassword = (formData, token) => {
  const resetPasswordURL = `${usersURL}/reset-password?token=${token}`
  return api.post(resetPasswordURL, formData)
}

const me = token => {
  const meURL = `${usersURL}/me?token=${token}`
  return api.get(meURL)
}

export const UserAPI = {
  searchUsers,
  login,
  signUp,
  requestReset,
  resetPassword,
  me,
}

// defining the cancel API object for UserAPI
const cancelApiObject = defineCancelApiObject(UserAPI)
