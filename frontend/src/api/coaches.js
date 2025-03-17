import axios from "axios";

export const getCoaches = async () => {
  const { data } = await axios.get("http://localhost:5001/api/coaches");
  console.log(data);
  return data;
};


export const getCoachById = async (id) => {
  console.log(id);
  const { data } = await axios.get("http://localhost:5001/api/coaches/"+id);
  console.log(data);
  return data;
};