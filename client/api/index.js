const { VUE_APP_SERVER_URL } = process.env

export default {
  async fetchRooms() {
    const response = await fetch(`${VUE_APP_SERVER_URL}/get-rooms-list`)
    const data = await response.json()
    return data;
  }
}