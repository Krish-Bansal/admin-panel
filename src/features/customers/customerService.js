import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axoisconfig';

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);
  return response.data
};
const deleteAUser = async (id) => {
  const response = await axios.delete(`${base_url}user/${id}`, config)
  return response.data
}

const customerService = {

  getUsers,
  deleteAUser
};
export default customerService;