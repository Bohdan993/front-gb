import { getCookie } from "./cookies";
import { IPersonData } from "../components/popup/PopupEarn/PopupEarn";

export const getBankCards = () => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bank-cards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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
export const patchBankCards = (id: number, data: IPersonData) => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bank-cards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
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
export const deleteBankCards = (id: number) => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bank-cards/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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
export const postBankCards = (data: IPersonData) => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bank-cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
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
