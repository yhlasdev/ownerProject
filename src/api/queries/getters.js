/* 
import { axiosInstance } from "../axiosInstance";
import Cookies from 'js-cookie';
 */
/* export const renewAccessTokenApi = async () => {
  const refreshToken = Cookies.get('refreshToken')
  const bearer = 'Bearer ' + refreshToken
  return axiosInstance.get('/auth/renew-access-token', {
    headers: {
      Authorization: bearer,
    },
  });
};

*/
import { api } from "../service/apiHelper";


export const getAllDocuments = async () => {
  return await api.getPrivate("/tbl-documents/get-all-documents");
};

export const getDocument = async (guid) => {
  return await api.getPrivate(`/tbl-documents/documents/${guid}`);
}

export const getSubDocuments = async (guid) => {
  return await api.getPrivate(`/sub-documents/subdocuments/${guid}`);
}

export const getMessages = async (guid) => {
  return await api.getPrivate(`/messages/getMessages/${guid}`);
}

export const getPlaces = async () => {
  return await api.getPrivate('/tbl-places/getPlaces');
}

export const getUsers = async () => {
  return await api.getPrivate('/user/get-all-users')
}