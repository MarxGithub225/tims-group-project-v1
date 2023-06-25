const accessToken = localStorage.getItem("accessToken")
export const config = {
  headers: {
    Authorization: `Bearer ${accessToken !== null ? JSON.stringify(accessToken) : ""}`
  }
}
