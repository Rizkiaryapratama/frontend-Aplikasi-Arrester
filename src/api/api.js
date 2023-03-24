import axios from "axios";

const BASE_URL = "https://serveraplikasiarrester.cyclic.app/";

//API Kontrak
//Get
export const getKontrak = async () => {
  const response = await axios.get(`${BASE_URL}/kontrak`);
  return response.data.map((obj, index) => ({ ...obj, id: index + 1 }));
};
//Delete
export const deleteKontrak = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/kontrak/${id}`);
  } catch (error) {
    console.log(error);
  } 
};
//Post
export const postKontrak = async (datakontrak) => {
  try {
    const response = await axios.post(`${BASE_URL}/kontrak`, datakontrak);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//Patch
export const getKontrakById = async (id) => {
  const res = await axios.get(`${BASE_URL}/kontrak/${id}`);
  return res.data;
};
export const updateKontrakById = async (id, data) => {
  await axios.patch(`${BASE_URL}/kontrak/${id}`, data);
};

//API Kas
//Get
export const getKas = async () => {
  const response = await axios.get(`${BASE_URL}/kas`);
  return response.data.map((obj, index) => ({ ...obj, id: index + 1 }));
};
//Delete
export const deleteKas = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/kas/${id}`);
  } catch (error) {
    console.log(error);
  } 
};
//Post
export const postKas = async (dataKas) => {
  try {
    const response = await axios.post(`${BASE_URL}/kas`, dataKas);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//Patch
export const getKasById = async (id) => {
  const res = await axios.get(`${BASE_URL}/kas/${id}`);
  return res.data;
};
export const updateKasById = async (id, data) => {
  await axios.patch(`${BASE_URL}/kas/${id}`, data);
};

//API BebanUsaha
//Get
export const getBebanUsaha = async () => {
  const response = await axios.get(`${BASE_URL}/bebanusaha`);
  return response.data.map((obj, index) => ({ ...obj, id: index + 1 }));
};
//Delete
export const deleteBebanUsaha = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/bebanusaha/${id}`);
  } catch (error) {
    console.log(error);
  } 
};
//Post
export const postBebanUsaha = async (DataBebanUsaha) => {
  try {
    const response = await axios.post(`${BASE_URL}/bebanusaha`, DataBebanUsaha);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//Patch
export const getBebanUsahaById = async (id) => {
  const res = await axios.get(`${BASE_URL}/bebanusaha/${id}`);
  return res.data;
};
export const updateBebanUsahaById = async (id, data) => {
  await axios.patch(`${BASE_URL}/bebanusaha/${id}`, data);
};