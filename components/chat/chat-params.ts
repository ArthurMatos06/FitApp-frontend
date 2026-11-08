import { parseAsBoolean, parseAsString } from "nuqs";

export const chatParams = {
  chat_open: parseAsBoolean.withDefault(false),
  chat_initial_message: parseAsString.withDefault(""),
};
