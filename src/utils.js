const URL_SERVER = document.querySelector('meta[name="server"]').content

class fetchAPI {
  #token = sessionStorage.getItem('access_token')

  async get(params) {
    try {
      const response = await fetch(`${URL_SERVER}api/?access_token=${this.#token + params}`)
      const json = await response.json()

      return json
    } catch (err) {
      return err
    }
  }

  async post(data, { upload = false }) {
    try {
      const cfg = {
        method: 'POST',
        body: data
      }

      if (!upload) {
        cfg.headers = {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(`${URL_SERVER}api/?access_token=${this.#token}`, cfg)
      const json = await response.json()

      return json
    } catch (err) {
      return err
    }
  }
}
const API = new fetchAPI()

export { API, URL_SERVER }
