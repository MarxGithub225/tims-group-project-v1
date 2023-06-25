// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 0,
  loading: true
}

const DataTablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        allData: action.data,
        total: action.totalPages,
        loading: false
      }

      case 'LOADING':
      return {
        ...state,
        loading: action.loading
      }

    case 'SEARCH_PRODUCTS':
    const queryLowered = action.q.toLowerCase()
    const filteredData = state.allData.filter(
      item => (item.title.toLowerCase().includes(queryLowered) || item.productId.toLowerCase().includes(queryLowered)) 
    )

    return {
      ...state,
      data: filteredData,
      total: filteredData.length,
      loading: false
    }
    default:
      return { ...state }
  }
}

export default DataTablesReducer
