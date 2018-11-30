module.exports = client => {
    let module = {};
  
   
  
  // selectTrips
  module.selectTrips = async (items_per_page, page) => {
    const offset = (page - 1) * items_per_page || 0;
    const trips = await client.query(
      "SELECT id,  trip_host_id, activity_category_id, trip_details_id, title, location, duration_hour, gross_amount, dates, price, cover_photo_url, gallery_photo_url, destination, created_at, updated_at FROM trip ORDER BY id LIMIT ($1) OFFSET ($2);",
      [items_per_page, offset]
    );
    return trips.rows;
  };

  // selectTrip
  module.selectTrip = async (by, parameter) => {
    let trip;
    switch (by) {
      case "id":
        trip = await client.query(
          "SELECT * FROM trip t left join trip_details td on t.id=td.trip_id where t.id=$1;",
          "SELECT * FROM trip t left join activity_category td on t.id=td.trip_id where t.id=$1;",
          [parameter]
        );
        return trip.rows[0];
    }
  };

  // insertTrip
  module.insertTrip = async body => {
    const trip = await client.query(
      "INSERT INTO trip ( trip_host_id, activity_category_id, trip_details_id, title, location, duration_hour, gross_amount, dates, price, cover_photo_url, gallery_photo_url, destination) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12) RETURNING id, trip_host_id, activity_category_id, trip_details_id, title, location, duration_hour, gross_amount, dates, price, cover_photo_url, gallery_photo_url, destination, created_at, updated_at;",
      [ body.trip_host_id, body.activity_category_id, body.trip_details, body.title, body.location, body.duration_hour, body.gross_amount, body.dates, body.price, body.cover_photo_url, body.gallery_photo_url, body.destination]
    );
    console.log(trip.rows[0]) 
    return trip.rows[0];
  };

   // insertTripDetails
   module.insertTripDetails = async body => {
    const trip_details = await client.query(
      "INSERT INTO trip_details ( trip_overview, itinerary, includes, excludes, meeting_point, meeting_time, extra_note, trip_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING id, trip_overview, itinerary, includes, excludes, meeting_point, meeting_time, extra_note, trip_id created_at, updated_at;",
      [ body.trip_overview, body.itinerary, body.includes, body.excludes, body.meeting_point, body.meeting_time, body.extra_note, body.trip_id]
    );
    return trip_details.rows[0];
  };

  // insertActivityCategory
  module.insertActivityCategory = async body => {
    const activity_category = await client.query(
      "INSERT INTO activity_category ( activity_category_name, activity_category_photo_url, trip_id) VALUES ($1, $2, $3) RETURNING id, activity_category_name, activity_category_photo_url, created_at, updated_at;",
      [body.activity_category_name, body.activity_category_photo_url, body.trip_id]
    );
    return activity_category.rows[0];
  };


  // updateTrip
  module.updateTrip = async (id, body) => {
    const trip = await client.query(
      `UPDATE trip SET  trip_host_id=$1, activity_category_id=$2, trip_details=$3, title=$4, location=$5, duration_hour=$6, gross_amount=$7, dates=$8, price=$9, cover_photo_url=$10, gallery_photo_url=$11, destination=$12, updated_at=NOW() WHERE id=$13 RETURNING id, trip_host_id, activity_category_id, trip_details_id, title, location, duration_hour, gross_amount, dates, price, cover_photo_url, gallery_photo_url, created_at, updated_at;`,
      [ body.trip_host_id, body.activity_category_id, body.trip_details, body.title, body.location, body.duration_hour, body.gross_amount, body.dates, body.price, body.cover_photo_url, body.gallery_photo_url, body.destination, id]
    );
    return trip.rows[0];
  };

  // updateTripDetails
  module.updateTripDetails = async (id, body) => {
    const trip_details = await client.query(
      `UPDATE trip_details SET trip_overview=$1, itinerary=$2, includes=$3, excludes=$4, meeting_point=$5, meeting_time=$6, extra_note=$7, updated_at=NOW() WHERE id=$8 RETURNING id,trip_overview, itinerary, includes, excludes, meeting_point, meeting_time, extra_note, trip_id;`,
      [ body.trip_overview, body.itinerary, body.includes, body.excludes, body.meeting_point, body.meeting_time, body.extra_note, id]
    );
    return trip_details.rows[0];
  };

  // updateActivityCategory
  module.updateActivityCategory = async (id, body) => {
    const activity_category = await client.query(
      `UPDATE activity_category SET activity_category_name=$1, activity_category_photo_url=$2, updated_at=NOW() WHERE id=$3 RETURNING id, activity_category_name, activity_category_photo_url;`,
      [ body.activity_category_name, body.activity_category_photo_url, id]
    );
    return activity_category.rows[0];
  };

  // deleteTrip
  module.deleteTrip = async id => {
    const trip = await client.query(
      `DELETE FROM trip WHERE id=$1 RETURNING id,  trip_host_id, activity_category_id, trip_details_id, title, location, duration_hour, gross_amount, dates, price, cover_photo_url, gallery_photo_url, destination, created_at, updated_at;`,
      [id]
    );
    return trip.rows[0];
  };
    return module;
  };