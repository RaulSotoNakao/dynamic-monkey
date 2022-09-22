import mysql from "mysql2";
import util from "util";

const executeMysqlQuery = ({ query, dbConnection }) => {
  return new Promise(function (resolve, reject) {
    // The Promise constructor should catch any errors thrown on
    // this tick. Alternately, try/catch and reject(err) on catch.
    var connection = mysql.createConnection(dbConnection);

    connection.query(query, function (err, rows, fields) {
      // Call reject on error states,
      // call resolve with results
      if (err) {
        console.log("The err is: ", err);

        return reject(err);
      }
      console.log("The solution is: ", rows);

      resolve(rows);
    });
  });
};

export { executeMysqlQuery };
