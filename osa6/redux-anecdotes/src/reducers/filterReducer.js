const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default: return state
  }
}

export const filterAction = (f) => {
  return {
    type: 'SET_FILTER',
    payload: f
  }
}

export default filterReducer