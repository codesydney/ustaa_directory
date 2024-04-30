import { api } from './configs/axiosConfig'

const adminURL = '/admin/users'

const adminSearchUsers = async (searchObj, token) => {
  const params = searchObj
  console.log('admin api func running', searchObj)
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await api.get(adminURL, { params, ...config })
    return response.data
  } catch (error) {
    console.error('Error fetching users', error)
    return { users: [], meta: {} }
  }
}

export const AdminAPI = {
  adminSearchUsers,
}