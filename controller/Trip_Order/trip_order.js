const ModelTripOrder = require("./../../model/trip_order/trip_order");

const HelperResponse = require("./../helper/response");
const HelperValidation = require("./../helper/validation");


module.exports = client => {
  const modelTripOrder = ModelTripOrder(client);

  const reply = HelperResponse();
  const validate = HelperValidation();

  let module = {};

  module.mandatoryFields = [
        "order_id",
        "trip_id",
        "dates",
        "gross_amount"
  ];


        

  // getTripOrders
  module.getTripOrders = async (req, res) => {
    req.query.items_per_page = parseInt(req.query.items_per_page);
    req.query.page = parseInt(req.query.page);
    if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
      return reply.badRequest(
        req,
        res,
        "invalid parameter items_per_page or page"
      );

    try {
      const trip_orders = await modelTripOrder.selectTripOrders(
        req.params.items_per_page,
        req.params.page
      );
      return reply.success(req, res, trip_orders);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // getTripOrder
  module.getTripOrder = async (req, res) => {
    req.query.id = parseInt(req.query.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const trip_order = await modelTripOrder.selectTripOrder("id", req.params.id);
      if (trip_order === undefined)
        return reply.notFound(req, res, "trip_order not found in db");
      else return reply.success(req, res, trip_order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // postTripOrder
  module.postTripOrder = async (req, res) => {
    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const trip_order = await modelTripOrder.insertTripOrder(req.body);

      return reply.created(req, res, trip_order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // patchTripOrder
  module.patchTripOrder = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const trip_order = await modelTripOrder.updateTripOrder(req.params.id, req.body);
      return reply.created(req, res, trip_order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // deleteTripOrder
  module.deleteTripOrder = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const trip_order = await modelTripOrder.deleteTripOrder(req.params.id);
      return reply.created(req, res, trip_order);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  return module;
};