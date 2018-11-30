const ModelPayment = require("./../../model/payment/payment");

const HelperResponse = require("./../helper/response");
const HelperValidation = require("./../helper/validation");


module.exports = client => {
  const modelPayment = ModelPayment(client);

  const reply = HelperResponse();
  const validate = HelperValidation();

  let module = {};

  module.mandatoryFields = [
        "order_id",
        "payment_option",
        "unique_code"
  ];


        

  // getPayments
  module.getPayments = async (req, res) => {
    req.query.items_per_page = parseInt(req.query.items_per_page);
    req.query.page = parseInt(req.query.page);
    if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
      return reply.badRequest(
        req,
        res,
        "invalid parameter items_per_page or page"
      );

    try {
      const payments = await modelPayment.selectPayments(
        req.params.items_per_page,
        req.params.page
      );
      return reply.success(req, res, payments);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // getPayment
  module.getPayment = async (req, res) => {
    req.query.id = parseInt(req.query.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const payment = await modelPayment.selectPayment("id", req.params.id);
      if (payment === undefined)
        return reply.notFound(req, res, "payment not found in db");
      else return reply.success(req, res, payment);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // postPayment
  module.postPayment = async (req, res) => {
    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const payment = await modelPayment.insertPayment(req.body);

      return reply.created(req, res, payment);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // patchPayment
  module.patchPayment = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const payment = await modelPayment.updatePayment(req.params.id, req.body);
      return reply.created(req, res, payment);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // deletePayment
  module.deletePayment = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const payment = await modelPayment.deletePayment(req.params.id);
      return reply.created(req, res, payment);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  return module;
};