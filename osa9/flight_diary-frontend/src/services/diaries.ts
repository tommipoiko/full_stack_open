import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diary, NewDiary } from "../types";

const getAll = () => {
  return axios.get<Diary[]>(`${apiBaseUrl}/diaries`);
};

const createDiary = async (newDiary: NewDiary) => {
  const { data } = await axios.post<Diary>(
    `${apiBaseUrl}/diaries`,
    newDiary
  );

  return data;
}

export default {
  getAll,
  createDiary
};
