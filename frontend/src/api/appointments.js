import axios from "axios";

export const getUserAppointments = async (userId) => {
  const { data } = await axios.get(`http://localhost:5001/api/appointments?userId=${userId}`);
  console.log(data);
  return data;
};
