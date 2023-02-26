import { getCookie } from "./cookies";

export const getCurrencies = () => {
  const language = getCookie("language");

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/currencies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Content-Language": language,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return e;
    });
};
