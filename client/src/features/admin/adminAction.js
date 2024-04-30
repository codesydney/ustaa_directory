import { createAsyncThunk } from '@reduxjs/toolkit'
import { AdminAPI } from '../../apis/AdminAPI.js'
import { resetSearchQuery } from './adminSlice.js'

const adminSearchUsers = createAsyncThunk(
  'admin/searchUsers',
  async (searchObj, { rejectWithValue }) => {
    console.log('admin action running', searchObj)
    try {
      const token = localStorage.getItem('accessToken')

      const response = await AdminAPI.adminSearchUsers(searchObj, token)

      return response
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const adminResetSearch = createAsyncThunk(
  'admin/resetSearch',
  async (_, { rejectWithValue, getState, dispatch }) => {
    console.log('Admin reset search')

    dispatch(resetSearchQuery())

    const updatedSearchQuery = getState().admin.searchQuery
    return dispatch(adminSearchUsers({ ...updatedSearchQuery, page: 1 }))
  },
)

export { adminSearchUsers, adminResetSearch }