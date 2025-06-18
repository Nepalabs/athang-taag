import axios from "../config/axiosConfig";

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
export { getAllHabits, createHabit, deleteHabit, updateHabit };
