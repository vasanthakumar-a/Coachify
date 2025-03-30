import axios from "axios";

export const getCoaches = async (searchQuery) => {
  const { data } = await axios.get("http://localhost:5001/api/coaches", {
    params: { search: searchQuery }
  });
  console.log(data);
  return data;
};


export const getCoachById = async (id) => {
  console.log(id);
  const { data } = await axios.get("http://localhost:5001/api/coaches/"+id);
  console.log(data);
  return data;
};