import { authorizeApi } from "../../middlewares";
import { updateTag, getTag } from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.put("/tag/:space", authorizeApi, updateTag);
  router.get("/tag/:space", authorizeApi, getTag);
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
