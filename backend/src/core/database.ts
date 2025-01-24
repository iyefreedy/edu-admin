import { PrismaClient } from "@prisma/client";
import logger from "./logger";

const database = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

database.$on("query", (event) => {
  logger.info(event.query);
});

export default database;
