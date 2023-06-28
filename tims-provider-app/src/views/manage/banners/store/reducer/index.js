// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 0,
  selectedBrand: null,
  loading: false
}

const banners = (state = initialState, action) => {
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

    default:
      return { ...state }
  }
}
export default banners
