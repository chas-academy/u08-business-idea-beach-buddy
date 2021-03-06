import axios from "axios";

//const URL_API_DELETE_LOC = "https://beach-buddy.herokuapp.com/api/locations/delete";

const URL_API_DELETE_LOC = "http://localhost:4000/api/locations/delete";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const deleteLocation = async (id) => {
  const res = await axios.delete(`${URL_API_DELETE_LOC}/${id}`, config);
  console.log(res);
};
const userLocationService = {
  deleteLocation,
};

export default userLocationService;
