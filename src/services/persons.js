import axios from "axios";
const baseUrl = "api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject);
};

const personService = { getAll, create, remove, update };

export default personService;
