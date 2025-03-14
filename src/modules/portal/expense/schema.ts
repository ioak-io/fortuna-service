import * as CategoryHelper from "../../category/helper";
import * as TagHelper from "../../tag/helper";
import { generateStandardEndpoints } from "../utils";

const fields = {
  id: "key",
  description: "long_text",
  category: "options",
  tagId: "options_multi",
  billId: "null",
  billDate: "date",
  amount: "number_decimal"
}

export const getSchemaExpense = async (realm: string) => {
  const category = (await CategoryHelper.getCategory(realm)).map((obj: any) => ({
    id: obj._id.toString(),
    name: obj.name,
  }));
  const tagId = (await TagHelper.getTag(realm)).map((obj: any) => ({
    id: obj._id.toString(),
    name: obj.name,
  }));

  const schema = {
    domain: {
      fields, options: {
        category, tagId
      }
    }, endpoints: generateStandardEndpoints("/api/portal/operation/module/expense")
  }
  return schema;
}
