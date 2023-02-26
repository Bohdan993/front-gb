import { getCookie } from "./cookies";

export const postPayment = (articleId: number) => {
  const token = getCookie("token");
  const currencyId = getCookie("currencyId");

  //Добавить currencyId
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-payment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ articleId: articleId, currencyId: currencyId }),
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
