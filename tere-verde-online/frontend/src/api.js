import axios from "axios"

const API = axios.create({
  baseURL: "https://upgraded-succotash-5gq975pwrpxqh7r6-8000.app.github.dev",
})

// Events
export const fetchEvents = (params={}) => API.get("/events/", { params })
export const createEvent = (event, token) =>
  API.post("/events/", event, { headers: { Authorization: `Bearer ${token}` } })
export const updateEvent = (id, event, token) =>
  API.put(`/events/${id}`, event, { headers: { Authorization: `Bearer ${token}` } })
export const deleteEvent = (id, token) =>
  API.delete(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` } })

// Trails
export const fetchTrails = (params={}) => API.get("/trails/", { params })
export const createTrail = (trail, token) =>
  API.post("/trails/", trail, { headers: { Authorization: `Bearer ${token}` } })
export const updateTrail = (id, trail, token) =>
  API.put(`/trails/${id}`, trail, { headers: { Authorization: `Bearer ${token}` } })
export const deleteTrail = (id, token) =>
  API.delete(`/trails/${id}`, { headers: { Authorization: `Bearer ${token}` } })

// Parks
export const fetchParks = (params={}) => API.get("/parks/", { params })
export const createPark = (park, token) =>
  API.post("/parks/", park, { headers: { Authorization: `Bearer ${token}` } })
export const updatePark = (id, park, token) =>
  API.put(`/parks/${id}`, park, { headers: { Authorization: `Bearer ${token}` } })
export const deletePark = (id, token) =>
  API.delete(`/parks/${id}`, { headers: { Authorization: `Bearer ${token}` } })

// Biodiversity
export const fetchBiodiversity = (params={}) => API.get("/biodiversidade/", { params })
export const createBiodiversity = (biodiversity, token) =>
  API.post("/biodiversidade/", biodiversity, { headers: { Authorization: `Bearer ${token}` } })
export const updateBiodiversity = (id, biodiversity, token) =>
  API.put(`/biodiversidade/${id}`, biodiversity, { headers: { Authorization: `Bearer ${token}` } })
export const deleteBiodiversity = (id, token) =>
  API.delete(`/biodiversidade/${id}`, { headers: { Authorization: `Bearer ${token}` } })

// Waterfalls
export const fetchWaterfalls = (params={}) => API.get("/cachoeiras/", { params })
export const createWaterfall = (waterfall, token) =>
  API.post("/cachoeiras/", waterfall, { headers: { Authorization: `Bearer ${token}` } })
export const updateWaterfall = (id, waterfall, token) =>
  API.put(`/cachoeiras/${id}`, waterfall, { headers: { Authorization: `Bearer ${token}` } })
export const deleteWaterfall = (id, token) =>
  API.delete(`/cachoeiras/${id}`, { headers: { Authorization: `Bearer ${token}` } })

// Admins
export const adminLogin = (username, password) =>
  API.post("/auth/login", new URLSearchParams({ username, password }))
export const fetchAdmins = (token) =>
  API.get("/admins/", { headers: { Authorization: `Bearer ${token}` } })
export const createAdmin = (admin, token) =>
  API.post("/admins/", admin, { headers: { Authorization: `Bearer ${token}` } })
export const deleteAdmin = (id, token) =>
  API.delete(`/admins/${id}`, { headers: { Authorization: `Bearer ${token}` } })
export const changeAdminPassword = (payload, token) =>
  API.put(
    "/admins/change-password",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  )