const getUrlForCoffeeStores = (
  query: string,
  latLong: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=300&limit=${limit}`;
};

export const fetchBakeries = async () => {
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

  return data.results;
};
