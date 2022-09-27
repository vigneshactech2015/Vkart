import axios from 'axios'

axios.defaults.baseURL = 'https://vigneshecommerce.herokuapp.com'

export const getUsersAPI = async () => axios.get('/Product')

export const getUserByIdAPI = async (id) => axios.get(`/Product/${id}`)

export const createUserAPI = async (user) => axios.post(`/Product`, user)

export const updateUserAPI = async (user) => axios.put(`/Product/${user.id}`, user)

export const deleteUserByIdAPI = async (id) => axios.delete(`/Product/${id}`)