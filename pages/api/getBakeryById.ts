import { NextApiRequest, NextApiResponse } from "next";
import { db, cleanData } from "../../lib/airtable";

const getBakeryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ message: "Missing id" });
    }

    const findBakeryRecords = await db
      .select({
        filterByFormula: `id="${id}"`,
      })
      .firstPage();

    // Find a record
    if (!findBakeryRecords.length) {
      return res.status(404).json({ message: "Record not found" });
    }

    const records = cleanData(findBakeryRecords);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Somethign went wrong", err });
  }
};

export default getBakeryById;
