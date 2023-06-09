import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axoisconfig';

const getEnquiries = async (enquiryData) => {

  const response = await axios.get(`${base_url}enquiry/`, enquiryData);
  return response.data
};

const deleteEnquiry = async (id) => {

  const response = await axios.delete(`${base_url}enquiry/${id}`, config);
  return response.data
};

const getEnquiry = async (id) => {

  const response = await axios.get(`${base_url}enquiry/${id}`, config);
  return response.data
};
const updateEnquiry = async (enq) => {

  const response = await axios.put(`${base_url}enquiry/${enq.id}`, { status: enq.enqData },
    config);
  return response.data
};

const enquiryService = {


  getEnquiries, deleteEnquiry, getEnquiry, updateEnquiry

};
export default enquiryService;