// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 0,
  selectedUser: null,
  loading: true
}

const agencies = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        allData: action.data,
        total: action.totalPages,
        loading: false
      }

      

    case 'SEARCH_COLLAB':
      const queryLowered = action.q.toLowerCase()
      const filteredData = state.allData.filter(
        item => (item.fullName.toLowerCase().includes(queryLowered) || item.lastName.toLowerCase().includes(queryLowered) || item.firstName.toLowerCase().includes(queryLowered)) 
      )

    return {
      ...state,
      data: filteredData,
      total: filteredData.length
    }
    default:
      return { ...state }
  }
}
export default agencies
