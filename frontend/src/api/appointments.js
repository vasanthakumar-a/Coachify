import axios from "axios";

export const getUserAppointments = async (userId) => {
  const { data } = await axios.get(`https://coachify-01m4.onrender.com/api/appointments?userId=${userId}`);
  console.log(data);
  return data;
};
