const ModelTripHost = require("./../../model/trip_host/trip_host");

const HelperResponse = require("./../helper/response");
const HelperValidation = require("./../helper/validation");


module.exports = client => {
  const modelTripHost = ModelTripHost(client);

  const reply = HelperResponse();
  const validate = HelperValidation();

  let module = {};

  module.mandatoryFields = [
    "account_id",
    "trip_id",
    "trip_host_rank",
    "profile_picture_url",
    "location",
    "occupation",
    "bank_option",
    "bank_account_name",
    "bank_account_number",
    "quotes",
    "ktp_photo_url",
    "ktp_selfie_photo_url"
  ];


        

  // getTripHosts
  module.getTripHosts = async (req, res) => {
    req.query.items_per_page = parseInt(req.query.items_per_page);
    req.query.page = parseInt(req.query.page);
    if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
      return reply.badRequest(
        req,
        res,
        "invalid parameter items_per_page or page"
      );

    try {
      const trip_hosts = await modelTripHost.selectTripHosts(
        req.params.items_per_page,
        req.params.page
      );
      return reply.success(req, res, trip_hosts);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // getTripHost
  module.getTripHost = async (req, res) => {
    req.query.id = parseInt(req.query.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const trip_host = await modelTripHost.selectTripHost("id", req.params.id);
      if (trip_host === undefined)
        return reply.notFound(req, res, "trip_host not found in db");
      else return reply.success(req, res, trip_host);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // postTripHost
  module.postTripHost = async (req, res) => {
    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const trip_host = await modelTripHost.insertTripHost(req.body);

      return reply.created(req, res, trip_host);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // patchTripHost
  module.patchTripHost = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const trip_host = await modelTripHost.updateTripHost(req.params.id, req.body);
      return reply.created(req, res, trip_host);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // deleteTripHost
  module.deleteTripHost = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const trip_host = await modelTripHost.deleteTripHost(req.params.id);
      return reply.created(req, res, trip_host);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  return module;
};