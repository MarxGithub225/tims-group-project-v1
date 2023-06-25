import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import { config } from "@src/utility/axiosconfig"

// ** Get all Data
export const getAllData = (pagination) => {
  const queryString = new URLSearchParams(pagination).toString();
  return async dispatch => {
    dispatch({
      type: 'LOADING',
      loading: true
    })
    axios.get(`${base_url}user/all?${queryString}`).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data.filter(user => user.role !== 'user'),
        totalPages: response.data.itemCount,
        pages: response.data.pageCount,
        currentPages: response.data.currentPage,
        loading: false
      })
    })
    .catch((error) => {
      console.log('error', error);
      dispatch({
        type: 'LOADING',
        loading: false
      })
    })
  }
}
// ** Get all Data
export const searchCollab = (search) => dispatch => {
  dispatch({
    type: 'SEARCH_COLLAB',
    q: search
  })
}
