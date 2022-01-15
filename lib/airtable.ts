import Airtable, { Base, FieldSet, Record, Records, Table } from "airtable";

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

let db: Table<Data>;

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});

if (process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY) {
  const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);
  db = base("bakeries");
}

const cleanData = <T extends FieldSet>(dbFunction: Records<T>): T[] => {
  return dbFunction
    .map((record: Record<T>) => record.fields)
    .filter((record) => record.name);
};

const findFilteredRecords = async (id: string): Promise<Data[]> => {
  const findBakeryRecords = await db
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  // Find a record
  return cleanData(findBakeryRecords);
};

export { db, cleanData, findFilteredRecords };
