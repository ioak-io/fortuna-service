const axios = require("axios");
// const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
const ONEAUTH_API = process.env.ONEAUTH_API || "https://api.ioak.io:8010/api";
import { accountCollection, accountSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");

export const getAccount = async (space: string) => {
  const model = getCollection(space, accountCollection, accountSchema);

  return await model.find({});
};

export const updateAccount = async (space: string, data: any) => {
  const model = getCollection(space, accountCollection, accountSchema);
  await model.deleteMany({});
  return await model.insertMany(data);
};
