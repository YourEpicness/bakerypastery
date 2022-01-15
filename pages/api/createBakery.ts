import { cleanData, db, Data, findFilteredRecords } from "../../lib/airtable";
import { NextApiRequest, NextApiResponse } from "next";

interface NextApiRequestWithBody extends NextApiRequest {
  body: Data;
}

const createBakery = async (
  req: NextApiRequestWithBody,
  res: NextApiResponse
) => {
  const { id } = req.body;
  //   Error checking
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }
  if (req.method === "POST") {
    const { name, address, neighborhood, votes, imgUrl } = req.body;

    const findBakeryRecords = await db
      .select({
        filterByFormula: `id="${id}"`,
      })
      .firstPage();
    // error checking
    if (!id || !name) {
      return res.status(400).json({ error: "Missing id or name" });
    }

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
    const { id } = req.body;
    // Find a record
    try {
      const records = await findFilteredRecords(id);
      // error checking
      if (!records) {
        return res.status(404).json({ error: "Bakery not found" });
      }
      res.json(records);
    } catch (err) {
      console.error("Error finding store", err);
      res.status(500).json({ message: "Error finding store", err });
    }
  }
};

export default createBakery;
