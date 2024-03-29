const axios = require("axios");
// const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
const ONEAUTH_API = process.env.ONEAUTH_API || "https://api.ioak.io:8010/api";
import { importLogCollection, importLogSchema } from "./model";
const { getCollection } = require("../../../lib/dbutils");
import * as Helper from "./helper";
import { format } from "date-fns";

export const getLog = async (space: string) => {
  const model = getCollection(space, importLogCollection, importLogSchema);

  const response = await model.find({}).sort({ transactionDate: -1 });
  return response.map((record: any) => {
    return {
      ...record._doc,
      _id: record._id,
      transactionDate: format(record.transactionDate, "yyyy-MM-dd"),
    };
  });
};

export const addLog = async (
  space: string,
  transactionId: string,
  transactionDate: Date,
  expenseRecords: number,
  expenseTotal: number,
  incomeRecords: number,
  incomeTotal: number,
  receiptRecords: number,
  receiptTotal: number,
  budgetRecords: number,
  budgetTotal: number,
  categoryRecords: number,
  incomeCategoryRecords: number,
  tagRecords: number
) => {
  const model = getCollection(space, importLogCollection, importLogSchema);

  return await model.create({
    transactionId,
    transactionDate,
    expenseRecords,
    expenseTotal,
    incomeRecords,
    incomeTotal,
    receiptRecords,
    receiptTotal,
    budgetRecords,
    budgetTotal,
    categoryRecords,
    incomeCategoryRecords,
    tagRecords,
  });
};

export const deleteLogByTransactionId = async (
  space: string,
  transactionId: string
) => {
  const model = getCollection(space, importLogCollection, importLogSchema);

  return await model.deleteMany({
    transactionId,
  });
};
