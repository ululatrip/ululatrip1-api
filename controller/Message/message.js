const ModelMessage = require("./../../model/message/message");

const HelperResponse = require("./../helper/response");
const HelperValidation = require("./../helper/validation");


module.exports = client => {
  const modelMessage = ModelMessage(client);

  const reply = HelperResponse();
  const validate = HelperValidation();

  let module = {};

  module.mandatoryFields = [
    "sender_id",
    "receiver_id",
    "message_date",
    "message"
  ];


        

  // getMessages
  module.getMessages = async (req, res) => {
    req.query.items_per_page = parseInt(req.query.items_per_page);
    req.query.page = parseInt(req.query.page);
    if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
      return reply.badRequest(
        req,
        res,
        "invalid parameter items_per_page or page"
      );

    try {
      const messages = await modelMessage.selectMessages(
        req.params.items_per_page,
        req.params.page
      );
      return reply.success(req, res, messages);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // getMessage
  module.getMessage = async (req, res) => {
    req.query.id = parseInt(req.query.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const message = await modelMessage.selectMessage("id", req.params.id);
      if (message === undefined)
        return reply.notFound(req, res, "message not found in db");
      else return reply.success(req, res, message);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // postMessage
  module.postMessage = async (req, res) => {
    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const message = await modelMessage.insertMessage(req.body);

      return reply.created(req, res, message);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // patchMessage
  module.patchMessage = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const message = await modelMessage.updateMessage(req.params.id, req.body);
      return reply.created(req, res, message);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // deleteMessage
  module.deleteMessage = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const message = await modelMessage.deleteMessage(req.params.id);
      return reply.created(req, res, message);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  return module;
};