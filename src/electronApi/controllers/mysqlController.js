import { executeMysqlQuery } from "../service/mysqlService";

const EXECUTE_MYSQL_QUERY = (event, payload) => {
  return executeMysqlQuery(payload);
};
export { EXECUTE_MYSQL_QUERY };
