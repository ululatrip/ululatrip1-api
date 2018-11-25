const ModelTrip = require("./../../model/trip/trip");


const HelperResponse = require("./../helper/response");
const HelperValidation = require("./../helper/validation");


module.exports = client => {
  const modelTrip = ModelTrip(client);
  

  const reply = HelperResponse();
  const validate = HelperValidation();


  let module = {};

  module.mandatoryFields = [
    "triphost_id",
    "activity_id",
    "trip_details_id",
    "destination",
    "location",
    "duration_hour",
    "quota",
    "dates",
    "price",
    "cover_photo_url",
    "gallery_photo_url",
    "trip_overview", 
    "itinerary", 
    "meeting_point", 
    "meeting_time"
  ];

  // getTrips
  module.getTrips = async (req, res) => {
    req.query.items_per_page = parseInt(req.query.items_per_page);
    req.query.page = parseInt(req.query.page);
    if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
      return reply.badRequest(
        req,
        res,
        "invalid parameter items_per_page or page"
      );

    try {
      const trips = await modelTrip.selectTrips(
        req.params.items_per_page,
        req.params.page
      );
      return reply.success(req, res, trips);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // getTrip
  module.getTrip = async (req, res) => {
    req.query.id = parseInt(req.query.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const trip = await modelTrip.selectTrip("id", req.params.id);
      if (trip === undefined)
        return reply.notFound(req, res, "trip not found in db");
      else return reply.success(req, res, trip);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // postTrip
  module.postTrip = async (req, res) => {
    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const trip = await modelTrip.insertTrip(req.body);
      req.body.trip_id = trip.id;
      const trip_details = await modelTrip.insertTripDetails(req.body);
      console.log(trip_details)
      return reply.created(req, res, trip);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // patchTrip
  module.patchTrip = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
      return reply.badRequest(req, res, "incomplete req.body fields");

    try {
      const trip = await modelTrip.updateTrip(req.params.id, req.body);
      return reply.created(req, res, trip);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  // deleteTrip
  module.deleteTrip = async (req, res) => {
    req.params.id = parseInt(req.params.id);
    if (req.params.id <= 0)
      return reply.badRequest(req, res, "invalid parameter id");

    try {
      const trip = await modelTrip.deleteTrip(req.params.id);
      return reply.created(req, res, trip);
    } catch (e) {
      return reply.error(req, res, e);
    }
  };

  return module;
};