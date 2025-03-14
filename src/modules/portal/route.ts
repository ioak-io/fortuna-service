import { asyncHandler } from "../../handler";
import {
  authorizeApi,
  authorizePortal,
  readAuthorizationPortal,
} from "../../middlewares";
import { createPortalSession, getBaseSchema, getModules, getModuleOperations } from "./service";
import * as ExpenseDomain from './expense/service';

module.exports = function (router: any) {
  router.get("/portal/token/:space/:name", asyncHandler(createPortalSession));
  router.get(
    "/portal/schema",
    asyncHandler(getBaseSchema)
  );
  router.get(
    "/portal/schema/module",
    readAuthorizationPortal,
    asyncHandler(getModules)
  );
  router.get(
    "/portal/schema/module/:name",
    readAuthorizationPortal,
    asyncHandler(getModuleOperations)
  );
  // Expense data endpoints
  router.get(
    "/portal/operation/module/expense",
    readAuthorizationPortal,
    asyncHandler(ExpenseDomain.get)
  );
  router.get(
    "/portal/operation/module/expense/:id",
    readAuthorizationPortal,
    asyncHandler(ExpenseDomain.getById)
  );
  router.post(
    "/portal/operation/module/expense",
    readAuthorizationPortal,
    asyncHandler(ExpenseDomain.post)
  );
  router.put(
    "/portal/operation/module/expense/:id",
    readAuthorizationPortal,
    asyncHandler(ExpenseDomain.put)
  );
  router.delete(
    "/portal/operation/module/expense/:id",
    readAuthorizationPortal,
    asyncHandler(ExpenseDomain.deleteById)
  );
};
