import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const addEntry = (personObj) => {
    return axios.post(baseUrl, personObj)
}

const update = (id, updatedObj) => {
    return axios.put(`${baseUrl}/${id}`, updatedObj)
}

export default {getAll, deleteEntry, addEntry, update}