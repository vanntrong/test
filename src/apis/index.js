import env from "../constants/env";

export default {
  getUser() {
    return fetch(env.API_URL, {
      method: "POST",
      body: {
        timeZone: env.timezone,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.token}`,
      },
    });
  },
};
