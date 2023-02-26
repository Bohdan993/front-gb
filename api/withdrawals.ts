import { getCookie } from "./cookies";
import { IWithdrawals } from "../interface/withdrawals";

export const postWithdrawals = (data: IWithdrawals) => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/withdrawals`, {
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
