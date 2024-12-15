import api from "../services/axios";
import { GiphyResponse } from "../types/trendingDatatypes";

export const getSearchResults = async ({
  searchText,
  pageParam = 0,
}: {
  searchText?: string;
  pageParam?: number;
}) => {
  const response = await api.get("/gifs/search", {
    params: {
      q: searchText,
      limit: 10,
      offset: pageParam,
    },
  });
  return response.data as GiphyResponse;
};
