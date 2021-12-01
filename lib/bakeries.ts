// initialize unsplash
import { createApi } from "unsplash-js";

const unsplashApi: any = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
});

const getUrlForCoffeeStores = (
  query: string,
  latLong: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=300&limit=${limit}`;
};

const getBakeryPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "bakery",
    page: 1,
    perPage: 10,
    orientation: "portrait",
  });

  const unsplashResults = photos.response?.results;
  return unsplashResults?.map((result: any) => result.urls["small"]);
};

export const fetchBakeries = async () => {
  const photos = (await getBakeryPhotos()) || "";
  const options: any = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FSQ_API_KEY,
    },
  };
  let bakeryData: [] = [];
  const url = getUrlForCoffeeStores("bakery", "41.8781%2C-87.6298", 6);
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);

  return data.results.map((result: any, idx: any) => {
    return {
      ...result,
      imgUrl: photos[idx],
    };
  });
};
