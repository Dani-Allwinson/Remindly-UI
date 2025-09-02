import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7032/api", // Change this to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

class ApiServices {
  static async post(url, payload) {
    try {
      const response = await api.post(url, payload);
      console.log(response.data);
      return response.data;
    } catch (e) {
      console.error("Error in post function:", e);
      throw e;
    }
  }
  static async get(url) {
    try {
      var res = await api.get(url);
      return res.data;
    } catch (e) {
      console.error("Error in get function:", e);
      throw e;
    }
  }
  static async update(url, payload) {
    try {
      await api.put(url, payload);
    } catch (e) {
      console.error("Error in update function:", e);

      throw e;
    }
  }
  static async delete(url) {
    try {
      await api.delete(url);
    } catch (e) {
      console.error("Error in delete function:", e);
      throw e;
    }
  }
}

export default ApiServices;
