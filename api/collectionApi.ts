import axiosClient from "./axiosClient";
import { Collection2 } from "@/models/Collection";

export const getCollections = async () => {
  try {
    const response = await axiosClient.get("/collection/");
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

export const getCollection = async (symbol: string): Promise<Collection2> => {
  try {
    const response = await axiosClient.get(`/collection/${symbol}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw error;
  }
};
