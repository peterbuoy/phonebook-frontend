import axios from "axios";
const baseUrl = "https://pure-lowlands-40590.herokuapp.com/api/persons";

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
