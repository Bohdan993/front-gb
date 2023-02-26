import { getCookie } from "./cookies";

export const getHomePage = () => {
  const language = getCookie("language");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home-page/`, {
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
