// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 0,
  selectedBrand: null,
  loading: true
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        allData: action.data,
        total: action.totalPages,
        loading: action.loading
      }
    case 'LOADING':
      return {
        ...state,
        loading: action.loading
      }
    case 'SEARCH_CATEGORY':
    const queryLowered = action.q.toLowerCase()
    const filteredData = state.allData.filter(
      item => item.name.toLowerCase().includes(queryLowered) 
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
export default categories
