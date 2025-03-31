import axiosInstance from "../utils/axiosInstance";

export const getUserAppointments = async (userId) => {
  const { data } = await axiosInstance.get(`/appointments?userId=${userId}`);
  console.log(data);
  return data;
};
