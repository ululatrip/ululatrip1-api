module.exports = client => {
    let module = {};
  
    // getAccountsWithEmptyAccessTokens
    module.getAccountWithEmptyAccessTokens = async () => {
      const account = await client.query(
        "SELECT id FROM account WHERE access_token IS NULL;"
      );
      return account.rows;
    };
  
    // fillToken
    module.fillToken = async (token64, account_id) => {
      const createdToken = await client.query(
        "UPDATE account SET access_token=($1) WHERE id=($2) AND access_token IS NULL RETURNING access_token;",
        [token64, account_id]
      );
      return createdToken.rows.access_token;
    };
  
    // getToken
    module.getToken = async (by, parameter) => {
      switch (by) {
        case "email":
          const token = await client.query(
            "SELECT access_token FROM account WHERE email=($1);",
            [parameter]
          );
          return token.rows;
      }
    };
  
    return module;
  };