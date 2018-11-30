module.exports = client => {
    let module = {};

  
  // selectPayments
  module.selectPayments = async (items_per_page, page) => {
    const offset = (page - 1) * items_per_page || 0;
    const payments = await client.query(
      "SELECT id, order_id, trip_id, dates, gross_amount,created_at, updated_at FROM payment ORDER BY id LIMIT ($1) OFFSET ($2);",
      [items_per_page, offset]
      
    );
    return payments.rows;
  };

  // selectPayment
  module.selectPayment = async (by, parameter) => {
    let payment;
    switch (by) {
      case "id":
        payment = await client.query(
          "SELECT id, order_id, trip_id, dates, gross_amount,created_at, updated_at FROM payment WHERE id=($1) LIMIT 1;",
          [parameter]
        );
        return payment.rows[0];
    }
  };

  // insertPayment
  module.insertPayment = async body => {
    const payment = await client.query(
      "INSERT INTO payment ( order_id, trip_id, dates, gross_amount) VALUES ($1, $2, $3,$4) RETURNING id, order_id, trip_id, dates, gross_amount, created_at, updated_at;",
      [ body.order_id, body.trip_id, body.dates, body.gross_amount]
    );
    return payment.rows[0];
  };

  // updatePayment
  module.updatePayment = async (id, body) => {
    const payment = await client.query(
      `UPDATE payment SET  order_id=$1, trip_id=$2, dates=$3, gross_amount=$4, updated_at=NOW() WHERE id=$5 RETURNING id, order_id, trip_id, dates, gross_amount, created_at, updated_at;`,
      [ body.order_id, body.trip_id, body.dates, body.gross_amount,id]
      );
    return payment.rows[0];
  };

  // deletePayment
  module.deletePayment = async id => {
    const payment = await client.query(
      `DELETE FROM payment WHERE id=$1 RETURNING id,  order_id, trip_id, dates, gross_amount, created_at, updated_at;`,
      [id]
    );
    return payment.rows[0];
  };
    return module;
  };