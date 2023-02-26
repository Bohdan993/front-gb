import { getCookie } from "./cookies";

export const getMyBalance = (id?: number) => {
  const token = getCookie("token");
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-balance?currencyId=${
      id ? id : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
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
