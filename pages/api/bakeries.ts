import { NextApiRequest, NextApiResponse } from "next";
import { fetchBakeries } from "../../lib/bakeries";

interface Query {
  latLong: string;
  limit: number;
}

type NextApiRequestWithQuery = NextApiRequest & {
  query: Query;
};

const bakeries = async (req: NextApiRequestWithQuery, res: NextApiResponse) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchBakeries(latLong, limit);
    return res.status(200).json(response);
  } catch (err) {
    console.error("Error", err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
};

export default bakeries;
