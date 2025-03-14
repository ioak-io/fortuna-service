import { authorizeApi } from "../../middlewares";
import { backupDatabase, restoreDatabase } from "./service";
const multer = require("multer");
var upload = multer();

module.exports = function (router: any) {
  router.get(
    "/backup/:space",
    authorizeApi,
    backupDatabase
  );
  router.get(
    "/restore/:space",
    upload.single("file"),
    authorizeApi,
    restoreDatabase
  );
};
