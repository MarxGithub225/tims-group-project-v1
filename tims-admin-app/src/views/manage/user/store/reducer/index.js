// ** Initial State
const initialState = {
  loadingSelected: true,
  selectedUser: null
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COLLAB_DATA':
      return {
        ...state,
        selectedUser: action.data,
        loadingSelected: false
      }
    default:
      return { ...state }
  }
}
export default users
