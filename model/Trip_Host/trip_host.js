module.exports = client => {
    let module = {};

  
  // selectTripHost
  module.selectTripHosts = async (items_per_page, page) => {
    const offset = (page - 1) * items_per_page || 0;
    const trip_hosts = await client.query(
      "SELECT id, account_id, trip_id, trip_host_rank, profile_picture_url, location, occupation, bank_option, bank_account_name, bank_account_number, quotes, ktp_photo_url, ktp_selfie_photo_url, created_at, updated_at FROM trip_host ORDER BY id LIMIT ($1) OFFSET ($2);",
      [items_per_page, offset]
    
      );
    return trip_hosts.rows;
  };

  // selectTripHost
  module.selectTripHost = async (by, parameter) => {
    let trip_host;
    switch (by) {
      case "id":
        trip_host = await client.query(
          "SELECT id,  account_id, trip_id, trip_host_rank, profile_picture_url, location, occupation, bank_option, bank_account_name, bank_account_number, quotes, ktp_photo_url, ktp_selfie_photo_url, created_at, updated_at FROM trip_host WHERE id=($1) LIMIT 1;",
          [parameter]
        );
        return trip_host.rows[0];
    }
  };

  // insertTripHost
  module.insertTripHost = async body => {
    const trip_host = await client.query(
      "INSERT INTO trip_host ( account_id, trip_id, trip_host_rank, profile_picture_url, location, occupation, bank_option, bank_account_name, bank_account_number, quotes, ktp_photo_url, ktp_selfie_photo_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11, $12) RETURNING id, account_id, trip_id, trip_host_rank, profile_picture_url, location, occupation, bank_option, bank_account_name, bank_account_number, quotes, ktp_photo_url, ktp_selfie_photo_url, created_at, updated_at;",
      [ body.account_id, body.trip_id, body.trip_host_rank, body.profile_picture_url, body.location, body.occupation, body.bank_option, body.bank_account_name, body.bank_account_number, body.quotes, body.ktp_photo_url, body.ktp_selfie_photo_url]
    );
    return trip_host.rows[0];
  };

  // updateTripHost
  module.updateTripHost = async (id, body) => {
    const trip_host = await client.query(
      `UPDATE trip_host SET  account_id=$1, trip_id=$2, trip_host_rank=$3, profile_picture_url=$4, location=$5, occupation=$6, bank_option=$7, bank_account_name=$8, bank_account_number=$9, quotes=$10, ktp_photo_url=$11, ktp_selfie_photo_url=$12  updated_at=NOW() WHERE id=$13 RETURNING id, account_id, trip_id, trip_host_rank, profile_picture_url, location, occupation, bank_option, bank_account_name, bank_account_number, quotes, ktp_photo_url, ktp_selfie_photo_url, created_at, updated_at;`,
      [ body.account_id, body.trip_id, body.trip_host_rank, body.profile_picture_url, body.location, body.occupation, body.bank_option, body.bank_account_name, body.bank_account_number, body.quotes, body.ktp_photo_url, body.ktp_selfie_photo_url,id]
      );
    return trip_host.rows[0];
  };

  // deleteTripHost
  module.deleteTripHost = async id => {
    const trip_host = await client.query(
      `DELETE FROM trip_host WHERE id=$1 RETURNING id,  account_id, trip_id, trip_host_rank, profile_picture_url, location, occupation, bank_option, bank_account_name, bank_account_number, quotes, ktp_photo_url, ktp_selfie_photo_url, created_at, updated_at;`,
      [id]
    );
    return trip_host.rows[0];
  };
    return module;
  };