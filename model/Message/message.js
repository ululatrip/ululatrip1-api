module.exports = client => {
    let module = {};

  
  // selectMessages
  module.selectMessages = async (items_per_page, page) => {
    const offset = (page - 1) * items_per_page || 0;
    const messages = await client.query(
      "SELECT id, sender_id, receiver_id, message_date, message,created_at, updated_at FROM message ORDER BY id LIMIT ($1) OFFSET ($2);",
      [items_per_page, offset]

    );
    return messages.rows;
  };

  // selectMessage
  module.selectMessage = async (by, parameter) => {
    let message;
    switch (by) {
      case "id":
        message = await client.query(
          "SELECT id,  sender_id, receiver_id, message_date, message,created_at, updated_at FROM message WHERE id=($1) LIMIT 1;",
          [parameter]
        );
        return message.rows[0];
    }
  };

  // insertMessage
  module.insertMessage = async body => {
    const message = await client.query(
      "INSERT INTO message ( sender_id, receiver_id, message_date,message) VALUES ($1, $2, $3,$4) RETURNING id, sender_id, receiver_id, message_date, message, created_at, updated_at;",
      [ body.sender_id, body.receiver_id, body.message_date, body.message]
    );
    return message.rows[0];
  };

  // updateMessage
  module.updateMessage = async (id, body) => {
    const message = await client.query(
      `UPDATE message SET  sender_id=$1, receiver_id=$2, message_date=$3, message=$4, updated_at=NOW() WHERE id=$5 RETURNING id, sender_id, receiver_id, message_date, message, created_at, updated_at;`,
      [ body.sender_id, body.receiver_id, body.message_date, body.message,id]
      );
    return message.rows[0];
  };

  // deleteMessage
  module.deleteMessage = async id => {
    const message = await client.query(
      `DELETE FROM message WHERE id=$1 RETURNING id,  sender_id, receiver_id, message_date, message, created_at, updated_at;`,
      [id]
    );
    return message.rows[0];
  };
    return module;
  };