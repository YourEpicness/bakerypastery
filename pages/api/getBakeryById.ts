import { NextApiRequest, NextApiResponse } from "next";
import { findFilteredRecords } from "../../lib/airtable";

const getBakeryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const records = await findFilteredRecords(id as string);

    if (!id) {
      return res.status(400).json({ message: "Missing id" });
    }

    if (!records.length) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Somethign went wrong", err });
  }
};

export default getBakeryById;
