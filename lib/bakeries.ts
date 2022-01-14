// initialize unsplash
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const getUrlForCoffeeStores = (
  query: string,
  latLong: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/nearby?query=${query}&ll=${latLong}&radius=300&limit=${limit}`;
};

const getBakeryPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "bakery",
    page: 1,
    perPage: 40,
    orientation: "portrait",
  });

  const unsplashResults = photos.response?.results;
  return unsplashResults?.map((result) => result.urls["small"]);
};

export interface Bakery {
  address: string;
  id: number;
  imgUrl: string;
  name: string;
  neighborhood: string;
}

export interface Venue {
  address: string;
  fsq_id: number;
  imgUrl: string;
  name: string;
  neighborhood: string;
  websiteUrl: string;
  location: {
    neighborhood: string;
    crossStreet: string;
    address: string;
    locality: string;
  };
}

interface Data {
  results: Venue[];
}

export const fetchBakeries = async (
  latLong: string = "41.8781%2C-87.6298",
  limit: number = 6
): Promise<Bakery[]> => {
  const photos = (await getBakeryPhotos()) || "";

  const options: any = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FSQ_API_KEY,
    },
  };

  options.headers["Access-Control-Allow-Origin"] = "*";

  const url = getUrlForCoffeeStores("bakery", latLong, limit);

  const response = await fetch(url, options);
  const data: Data = await response.json();

  return data.results.map((venue: Venue, idx: number) => {
    return {
      id: venue.fsq_id,
      address: venue.location.address || "",
      name: venue.name,
      neighborhood:
        venue.location.neighborhood ||
        venue.location.crossStreet ||
        venue.location.locality ||
        "",
      imgUrl: photos[idx],
    };
  });
};
