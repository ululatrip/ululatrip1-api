const ModelOrder = require("./../../model/order/order");

const HelperResponse = require("../helper/response");
const HelperValidation = require("../helper/validation");

module.exports = client => {
  const modelOrder = ModelOrder(client);

  const reply = HelperResponse();
  const validate = HelperValidation();

  let module = {};

  module.mandatoryFields = [
    "trip_id",
    "trip_host_id",
    "account_id",
    "payment_id",
    "order_date",
    "order_status"
  ];


        

  // getOrders
  module.getOrders = async (req, res) => {
    req.query.items_per_page = parseInt(req.query.items_per_page);
    req.query.page = parseInt(req.query.page);
    if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
      return reply.badRequest(
        req,
        res,
        "invalid parameter items_per_page or page"
      );

    try {
      const order = await modelOrder.selectOrders(
        req.params.items_per_page,
        req.params.page
      );
      return reply.success(req, res, order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // getOrder
  module.getOrder = async (req, res) => {
    req.query.id = parseInt(req.query.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const order = await modelOrder.selectOrder("id", req.params.id);
      if (order === undefined)
        return reply.notFound(req, res, "order not found in db");
      else return reply.success(req, res, order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // postOrder
  module.postOrder = async (req, res) => {
    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const order = await modelOrder.insertOrder(req.body);


      return reply.created(req, res, order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // patchOrder
  module.patchOrder = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const order = await modelOrder.updateOrder(req.params.id, req.body);
      return reply.created(req, res, order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // deleteOrder
  module.deleteOrder = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const order = await modelOrder.deleteOrder(req.params.id);
      return reply.created(req, res, order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  return module;
};