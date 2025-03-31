import axios from "axios";

export const getCoaches = async ({ pageParam = 1, searchQuery = "" }) => {
  const { data } = await axios.get("http://localhost:5001/api/coaches", {
    params: { search: searchQuery, page: pageParam, limit: 30 }
  });
  return data;
};


export const getCoachById = async (id) => {
  const { data } = await axios.get("http://localhost:5001/api/coaches/"+id);
  return data;
};