import { authorizeApi, authorizeApiOneauth } from "../../middlewares";
import { validateSession, getUsers, getLocalToken } from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.post("/user/:realmId/authorize_user", validateSession);
  router.get("/user/:realmId", authorizeApi, getUsers);
  router.get("/user/token/local", authorizeApiOneauth, getLocalToken);
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};