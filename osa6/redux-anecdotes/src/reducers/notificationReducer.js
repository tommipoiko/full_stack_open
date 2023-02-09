import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer