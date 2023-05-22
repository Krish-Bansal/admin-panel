import axios from "axios";
import { config } from "../../utils/axoisconfig";
import { base_url } from "../../utils/base_url";


const uploadImg = async (data, config2) => {
  const response = await axios.post(`${base_url}upload`, data, config2)
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(`${base_url}upload/delete-img/${id}`, config)
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg
}
export default uploadService;