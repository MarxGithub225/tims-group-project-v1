// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 0,
  selectedBrand: null,
  loading: true,

  stockAllData: [],
  stockData: [],
  stockTotalPages: 0,
  stockLoading: true,
}

const agencies = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        allData: action.data,
        total: action.totalPages,
        loading: action.loading
      }

      case 'GET_DATA_STOCK':
      return {
        ...state,
        stockData: action.data,
        stockAllData: action.data,
        stockTotalPages: action.totalPages,
        stockLoading: action.loading
      }
    case 'LOADING':
      return {
        ...state,
        loading: action.loading
      }
    case 'SEARCH_AGENCY':
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
export default agencies
