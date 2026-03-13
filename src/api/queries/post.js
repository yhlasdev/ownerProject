import { api } from "../service/apiHelper";

export const login = async (objectData) => {
  const response = await api.postPrivate("/auth/login", objectData);
  return response;
};


export const messageSend = async (objectData) => {
  const response = await api.postPrivate('/messages/createMessage', objectData)
  return response;
}

export const createPlace = async (objectData) => {
  const response = await api.postPrivate('/tbl-places/addPlace', objectData);
  return response;
};

export const registerUser = async (objectData) => {
  const response = await api.postPrivate('/auth/register', objectData);
  return response;
};