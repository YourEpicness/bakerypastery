import { Base, Record, Table } from "airtable";
import { NextApiRequest, NextApiResponse } from "next";
const Airtable = require("airtable");

interface Database {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  imgUrl: string;
  votes: number;
}

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});
const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);
const db = base("bakeries");

const cleanData = (dbFunction: any) => {
  return dbFunction
    .map((record: any) => record.fields)
    .filter((record: any) => record.name);
};

const createBakery = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.body.id || 1;
  const findBakeryRecords = await db
    .select({
      filterByFormula: `id=${id}`,
    })
    .firstPage();

  if (req.method === "POST") {
    const { id, name, address, neighborhood, votes, imgUrl } = req.body;
    // Create a record
    if (findBakeryRecords.length) {
      return res.json({ message: "Record already exists" });
    }

    const createRecords = await db.create([
      {
        fields: {
          id,
          name,
          address,
          neighborhood,
          votes,
          imgUrl,
        },
      },
    ]);

    const records = cleanData(createRecords);

    return res.json({ message: "Created a record", records });
  }

  if (req.method === "GET") {
    // Find a record
    try {
      if (findBakeryRecords.length) {
        const records = cleanData(findBakeryRecords);
        return res.json(records);
      }
    } catch (err) {
      console.error("Error finding store", err);
      res.status(500).json({ message: "Error finding store", err });
    }

    return res.json({ message: "Please create a bakery" });
  }
};

export default createBakery;
