const axios = require("axios");
// const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
const ONEAUTH_API = process.env.ONEAUTH_API || "https://api.ioak.io:8010/api";
import { companyCollection, companySchema } from "./model";
import { getGlobalCollection, getCollection } from "../../lib/dbutils";
import { nextval } from "../sequence/service";
import * as filterExpenseHelper from "../filter/expense/helper";
import {
  lastMonth,
  lastYear,
  thisMonth,
  thisYear,
} from "./ReservedFilterConfiguration";

export const updateCompany = async (data: any, userId: string) => {
  const model = getGlobalCollection(companyCollection, companySchema);
  if (data._id) {
    const response = await model.findByIdAndUpdate(
      data._id,
      {
        ...data,
      },
      { new: true, upsert: true }
    );
    return response;
  }

  const response = await model.create({
    ...data,
    reference: await nextval("companyId"),
  });

  await createReservedFilters(response.reference, userId);

  return response;
};

export const getCompany = async () => {
  const model = getGlobalCollection(companyCollection, companySchema);

  return await model.find();
};

export const getCompanyByReference = async (reference: string) => {
  const model = getGlobalCollection(companyCollection, companySchema);

  return await model.findOne({ reference });
};

export const getCompanyByIdList = async (idList: string[]) => {
  const model = getGlobalCollection(companyCollection, companySchema);

  return await model.find({ _id: { $in: idList } });
};

const createReservedFilters = async (space: string, userId: string) => {
  await filterExpenseHelper.updateFilterExpense(space, lastYear, userId);
  await filterExpenseHelper.updateFilterExpense(space, thisYear, userId);
  await filterExpenseHelper.updateFilterExpense(space, lastMonth, userId);
  await filterExpenseHelper.updateFilterExpense(space, thisMonth, userId);
};
