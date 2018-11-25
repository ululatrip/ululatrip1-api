module.exports = client => {
    let module = {};
  
   
  
  // selectTrips
  module.selectTrips = async (items_per_page, page) => {
    const offset = (page - 1) * items_per_page || 0;
    const trips = await client.query(
      "SELECT id,  triphost_id, activity_id, title, location, duration_hour, quota, dates, price, cover_photo_url, gallery_photo_url, destination, created_at, updated_at FROM trip ORDER BY id LIMIT ($1) OFFSET ($2);",
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
          [parameter]
        );
        return trip.rows[0];
    }
  };

  // insertTrip
  module.insertTrip = async body => {
    const trip = await client.query(
      "INSERT INTO trip ( triphost_id, activity_id, title, location, duration_hour, quota, dates, price, cover_photo_url, gallery_photo_url, destination) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, triphost_id, activity_id, title, location, duration_hour, quota, dates, price, cover_photo_url, gallery_photo_url, destination, created_at, updated_at;",
      [ body.triphost_id, body.activity_id, body.title, body.location, body.duration_hour, body.quota, body.dates, body.price, body.cover_photo_url, body.gallery_photo_url, body.destination]
    );
    console.log(trip.rows[0]) 
    return trip.rows[0];
  };

   // insertTripDetails
   module.insertTripDetails = async body => {
    const trip_details = await client.query(
      "INSERT INTO trip_details ( trip_overview, itinerary, includes, excludes, meeting_point, meeting_time, extra_note, trip_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING id, trip_overview, itinerary, includes, excludes, meeting_point, meeting_time, extra_note, created_at, updated_at;",
      [ body.trip_overview, body.itinerary, body.includes, body.excludes, body.meeting_point, body.meeting_time, body.extra_note, body.trip_id]
    );
    return trip_details.rows[0];
  };

  // updateTrip
  module.updateTrip = async (id, body) => {
    const trip = await client.query(
      `UPDATE trip SET  triphost_id=$1, activity_id=$2, title=$3, location=$4, duration_hour=$5, quota=$6, dates=$7, price=$8, cover_photo_url=$9, gallery_photo_url=$10, destination=$11, updated_at=NOW() WHERE id=$12 RETURNING id, triphost_id, activity_id, trip_details_id, title, location, duration_hour, quota, dates, price, cover_photo_url, gallery_photo_url, created_at, updated_at;`,
      [ body.triphost_id, body.activity_id, body.title, body.location, body.duration_hour, body.quota, body.dates, body.price, body.cover_photo_url, body.gallery_photo_url, body.destination, id]
    );
    return trip.rows[0];
  };

  // updateTripDetails
  module.updateTripDetails = async (id, body) => {
    const trip_details = await client.query(
      `UPDATE trip_details SET trip_overview=$1, itinerary=$2, includes=$3, excludes=$4, meeting_point=$5, meeting_time=$6, extra_note=$7, updated_at=NOW() WHERE id=$8 RETURNING id,trip_overview, itinerary, includes, excludes, meeting_point, meeting_time, extra_note;`,
      [ body.trip_overview, body.itinerary, body.includes, body.excludes, body.meeting_point, body.meeting_time, body.extra_note, id]
    );
    return trip_details.rows[0];
  };

  // deleteTrip
  module.deleteTrip = async id => {
    const trip = await client.query(
      `DELETE FROM trip WHERE id=$1 RETURNING id,  triphost_id, activity_id, title, location, duration_hour, quota, dates, price, cover_photo_url, gallery_photo_url, destination, created_at, updated_at;`,
      [id]
    );
    return trip.rows[0];
  };
    return module;
  };