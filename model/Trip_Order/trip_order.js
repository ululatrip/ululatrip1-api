module.exports = client => {
    let module = {};

  
  // selectTripOrders
  module.selectTripOrders = async (items_per_page, page) => {
    const offset = (page - 1) * items_per_page || 0;
    const trip_orders = await client.query(
      "SELECT id, order_id, payment_option, unique_code, created_at, updated_at FROM trip_order ORDER BY id LIMIT ($1) OFFSET ($2);",
      [items_per_page, offset]
      
    );
    return trip_orders.rows;
  };

  // selectTripOrder
  module.selectTripOrder = async (by, parameter) => {
    let trip_order;
    switch (by) {
      case "id":
        trip_order = await client.query(
          "SELECT id, order_id, payment_option, unique_code,created_at, updated_at FROM trip_order WHERE id=($1) LIMIT 1;",
          [parameter]
        );
        return trip_order.rows[0];
    }
  };

  // insertTripOrder
  module.insertTripOrder = async body => {
    const trip_order = await client.query(
      "INSERT INTO trip_order ( order_id, payment_option, unique_code) VALUES ($1, $2, $3) RETURNING id, order_id, payment_option, unique_code, created_at, updated_at;",
      [ body.order_id, body.payment_option, body.unique_code]
    );
    return trip_order.rows[0];
  };

  // updateTripOrder
  module.updateTripOrder = async (id, body) => {
    const trip_order = await client.query(
      `UPDATE trip_order SET  order_id=$1, payment_option=$2, unique_code=$3, updated_at=NOW() WHERE id=$4 RETURNING id, order_id, payment_option, unique_code, created_at, updated_at;`,
      [ body.order_id, body.payment_option, body.unique_code,id]
      );
    return trip_order.rows[0];
  };

  // deleteTripOrder
  module.deleteTripOrder = async id => {
    const trip_order = await client.query(
      `DELETE FROM trip_order WHERE id=$1 RETURNING order_id, payment_option, unique_code, created_at, updated_at;`,
      [id]
    );
    return trip_order.rows[0];
  };
    return module;
  };