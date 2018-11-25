module.exports = client => {
    let module = {};
  

  
  // selectOrders
  module.selectOrders = async (items_per_page, page) => {
    const offset = (page - 1) * items_per_page || 0;
    const orders = await client.query(
      "SELECT id, trip_id, triphost_id, account_id, order_date, created_at, updated_at FROM \"order\" ORDER BY id LIMIT ($1) OFFSET ($2);",
      [items_per_page, offset]
    );
    return orders.rows;
  };

  // selectOrder
  module.selectOrder = async (by, parameter) => {
    let order;
    switch (by) {
      case "id":
        order = await client.query(
          "SELECT id,  trip_id, triphost_id, account_id, order_date, created_at, updated_at FROM \"order\"  WHERE id=($1) LIMIT 1;",
          [parameter]
        );
        return order.rows[0];
    }
  };

  // insertOrder
  module.insertOrder = async body => {
    const order = await client.query(
      "INSERT INTO \"order\"  ( trip_id, triphost_id, account_id, order_date) VALUES ($1, $2, $3, $4) RETURNING id, trip_id, triphost_id, account_id, order_date, created_at, updated_at;",
      [ body.trip_id, body.triphost_id, body.account_id, body.order_date]
    );
    return order.rows[0];
  };

  // updateOrder
  module.updateOrder = async (id, body) => {
    const order = await client.query(
      `UPDATE \"order\"  SET  trip_id=$1, triphost_id=$2, account_id=$3, order_date=$4, updated_at=NOW() WHERE id=$5 RETURNING id, trip_id, triphost_id, account_id, order_date, created_at, updated_at;`,
      [ body.trip_id, body.triphost_id, body.account_id, body.order_date, id]
      );
    return order.rows[0];
  };

  // deleteOrder
  module.deleteOrder = async id => {
    const order = await client.query(
      `DELETE FROM \"order\"  WHERE id=$1 RETURNING id, trip_id, triphost_id, account_id, order_date, created_at, updated_at;`,
      [id]
    );
    return order.rows[0];
  };
    return module;
  };