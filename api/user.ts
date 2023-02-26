import { getCookie } from "./cookies";

export const postUserData = () => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
    method: "POST",
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
export const postUserChangeData = (data: { [key: string]: string }) => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/change`, {
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
