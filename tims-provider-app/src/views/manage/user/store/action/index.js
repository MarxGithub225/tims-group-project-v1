import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import { config } from "@src/utility/axiosconfig"


export const getUser = (id) => {
  return async dispatch => {
    axios.get(`${base_url}user/${id}`).then(response => {
      console.log('response.data', response.data)
      dispatch({
        type: 'GET_COLLAB_DATA',
        data: response.data.getaUser,
      })
    })
  }
}