import axios from "../config/axiosConfig";

const registerUser = async (formData) => {
  return axios.post("/auth/signup", formData);
};

const loginUser = async (formData) => {
  return axios.post("/auth/signin", formData);
};

const getAllHabits = () => {
  return axios.get("/habits/");
};
const createHabit = (data) => {
  return axios.post("/habits/", data);
};
const deleteHabit = (id) => {
  return axios.delete(`/habits/${id}`);
};
const updateHabit = (id, data) => {
  return axios.put(`/habits/${id}`, data);
};

const getUser = () => {
  return axios.get("/auth/loggedin-user");
};

export {
  registerUser,
  loginUser,
  getAllHabits,
  createHabit,
  deleteHabit,
  updateHabit,
  getUser,
};
