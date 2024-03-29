const axios = require("axios");
// const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
const ONEAUTH_API = process.env.ONEAUTH_API || "https://api.ioak.io:8010/api";
import { accountScopeCollection, accountScopeSchema } from "./model";
const { getCollection } = require("../../../lib/dbutils");

export const getAccountScope = async (space: string) => {
  const model = getCollection(
    space,
    accountScopeCollection,
    accountScopeSchema
  );

  const res = await model.find({});
  if (res.length > 0) {
    return res[0];
  } else {
    return {
      scope: "This month",
    };
  }
};

export const updateAccountScope = async (space: string, data: any) => {
  const model = getCollection(
    space,
    accountScopeCollection,
    accountScopeSchema
  );
  await model.deleteMany({});
  return await model.create(data);
};
