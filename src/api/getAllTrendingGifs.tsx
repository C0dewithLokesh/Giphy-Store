import api from "../services/axios";
import { GiphyResponse } from "../types/trendingDatatypes";

export const getTrendingGifs = async ({ pageParam = 0 }) => {
  const response = await api.get("/gifs/trending", {
    params: {
      limit: 10,
      offset: pageParam,
      rating: "pg",
    },
  });
  return response.data as GiphyResponse;
};
