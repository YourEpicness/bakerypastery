import Airtable, { Base, Record, Table } from "airtable";

type Bakery = {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  imgUrl: string;
  votes: number;
};

export type Data = {
  address: string;
  id: string;
  imgUrl: string;
  name: string;
  neighborhood: string;
  votes?: number;
};

export let db: Table<Data>;

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});

if (process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY) {
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);
  db = base("bakeries");
}

export const cleanData = (dbFunction: any) => {
  return dbFunction
    .map((record: any) => record.fields)
    .filter((record: any) => record.name);
};
