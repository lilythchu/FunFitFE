import axios from 'axios';

const client = axios.create({baseURL: 'https://orbital-funfit.herokuapp.com'});

export default client;

export const uploadImageURL =
  'https://orbital-funfit.herokuapp.com/user/upload';
export const downloadPicURL =
  'https://orbital-funfit.herokuapp.com/user/downloadPic?contentType=image/png';
