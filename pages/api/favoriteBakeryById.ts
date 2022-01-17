import { NextApiRequest, NextApiResponse } from "next";
import { cleanData, db, findFilteredRecords } from "../../lib/airtable";

const favoriteBakeryById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;

      const records = await findFilteredRecords(id);

      if (!id) {
        return res.status(400).json({ message: "missing id" });
      }
      if (!records) {
        return res.status(404).json({ message: "No records found" });
      }
      const record = records[0];

      const calculateVotes = record.votes! + 1;

      // update a record
      const updateRecord = await db.update([
        {
          id: record.recordId,
          fields: {
            votes: calculateVotes,
          },
        },
      ]);

      if (updateRecord) {
        const cleanRecords = cleanData(updateRecord);
        res.json(cleanRecords);
      }

      res.status(200).json(records);
    } catch (err) {
      res.status(500).json({ message: "Something went wrong", err });
    }
  }
};

export default favoriteBakeryById;
