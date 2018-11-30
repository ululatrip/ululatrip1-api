const ModelAccount = require("./../../model/account/account");
const ModelAuthAccount = require("./../../model/auth/account");

const HelperResponse = require("./../helper/response");
const HelperValidation = require("./../helper/validation");
const AuthAccount = require("./../auth/account");

module.exports = client => {
  const modelAccount = ModelAccount(client);
  const modelAuthAccount = ModelAuthAccount(client);

  const reply = HelperResponse();
  const validate = HelperValidation();
  const authAccount = AuthAccount(client);

  let module = {};

  module.mandatoryFields = [
    "firstname",
    "lastname",
    "email",
    "role",
    "phone"
  ];

  // getAccounts
  module.getAccounts = async (req, res) => {
    req.query.items_per_page = parseInt(req.query.items_per_page);
    req.query.page = parseInt(req.query.page);
    if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
      return reply.badRequest(
        req,
        res,
        "invalid parameter items_per_page or page"
      );

    try {
      const accounts = await modelAccount.selectAccounts(
        req.params.items_per_page,
        req.params.page
      );
      return reply.success(req, res, accounts);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // getAccount
  module.getAccount = async (req, res) => {
    req.query.id = parseInt(req.query.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const account = await modelAccount.selectAccount("id", req.params.id);
      if (account === undefined)
        return reply.notFound(req, res, "account not found in db");
      else return reply.success(req, res, account);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // postAccount
  module.postAccount = async (req, res) => {
    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const account = await modelAccount.insertAccount(req.body);

      // fill token for created account
      await modelAuthAccount.fillToken(authAccount.generateToken(64), account.id);

      return reply.created(req, res, account);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // patchAccount
  module.patchAccount = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const account = await modelAccount.updateAccount(req.params.id, req.body);
      return reply.created(req, res, account);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // deleteAccount
  module.deleteAccount = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const account = await modelAccount.deleteAccount(req.params.id);
      return reply.created(req, res, account);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  return module;
};