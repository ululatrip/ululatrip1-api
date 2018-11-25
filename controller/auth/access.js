const ModelAccount = require("./../../model/account/account");
const HelperResponse = require("./../helper/response");
const AdminAccess = require("../access/admin");
const TriphostAccess = require("../access/triphost");
const TripperAccess = require("../access/tripper");

module.exports = client => {
  const modelAccount = ModelAccount(client);
  const reply = HelperResponse();

  let module = {};

  module.isAllowed = (role, module, write = false) => {
    let access;
    switch (role) {
      case "admin":
        access = AdminAccess;
        break;
      case "triphost":
        access = TriphostAccess;
        break;
      case "tripper":
        access = TripperAccess;
        break;
    }
    if (write) return access.write.includes(module) ? true : false;
    else return access.read.includes(module) ? true : false;
  };

  const mapURLtoModuleName = url => {
    // add 'es' or irregular plurals here for exception
    return url.split("/")[1].slice(-1) === "s"
      ? url.split("/")[1].substr(0, url.split("/")[1].length - 1)
      : url.split("/")[1];
  };

  // Validate module access rights
  module.checkAccess = async (req, res, next) => {
    const role = await modelAccount.getRole("email", req.headers.account_email);
    req.role = role;
    if (
      !module.isAllowed(
        role,
        mapURLtoModuleName(req.url),
        ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)
      )
    ) {
      return reply.unauthorized(req, res, "violation of module access rights");
    }
    next();
  };

  return module;
};