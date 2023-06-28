const getTokenFromLocalStorage = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null
export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.accessToken : ""
    }`,
    Accept: "application/json"
  }
}
