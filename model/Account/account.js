module.exports = client => {
    let module = {};
  
    // getRole
    module.getRole = async (by, parameter) => {
      let role;
      switch (by) {
        case "id":
          role = await client.query(
            "SELECT role FROM account WHERE id=($1) LIMIT 1;",
            [parameter]
          );
          return role.rows[0].role;
        case "email":
          role = await client.query(
            "SELECT role FROM account WHERE email=($1) LIMIT 1;",
            [parameter]
          );
          return role.rows[0].role;
      }
    };
  
  // selectAccounts
  module.selectAccounts = async (items_per_page, page) => {
    const offset = (page - 1) * items_per_page || 0;
    const accounts = await client.query(
      "SELECT id,  firstname, lastname, email, role, phone, created_at, updated_at FROM account ORDER BY id LIMIT ($1) OFFSET ($2);",
      [items_per_page, offset]
    );
    return accounts.rows;
  };

  // selectAccount
  module.selectAccount = async (by, parameter) => {
    let account;
    switch (by) {
      case "id":
        account = await client.query(
          "SELECT id,  firstname, lastname, email, role, phone, created_at, updated_at FROM account WHERE id=($1) LIMIT 1;",
          [parameter]
        );
        return account.rows[0];
    }
  };

  // insertAccount
  module.insertAccount = async body => {
    const account = await client.query(
      "INSERT INTO account ( firstname, lastname, email, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, lastname, email, role, phone, created_at, updated_at;",
      [ body.firstname, body.lastname, body.email, body.role, body.phone]
    );
    return account.rows[0];
  };

  // updateAccount
  module.updateAccount = async (id, body) => {
    const account = await client.query(
      `UPDATE account SET  firstname=$1, lastname=$2, email=$3, role=$4, phone=$5 updated_at=NOW() WHERE id=$6 RETURNING id, firstname, lastname, email, role, phone, created_at, updated_at;`,
      [ body.firstname, body.lastname, body.email, body.role, body.phone, id]
    );
    return account.rows[0];
  };

  // deleteAccount
  module.deleteAccount = async id => {
    const account = await client.query(
      `DELETE FROM account WHERE id=$1 RETURNING id, firstname, lastname, email, role, phone, created_at, updated_at;`,
      [id]
    );
    return account.rows[0];
  };
    return module;
  };