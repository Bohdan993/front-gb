import { setCookie } from "./cookies";

export const postLoginPhone = (data: { phone: string }) => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded",
      "Content-Type": "application/json",
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
export const postLoginSmsCode = (phone: string, smsCode: string) => {
  const newData = { phone: phone, smsCode: smsCode };
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/send-smscode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setCookie("token", data.token);
      return data;
    })
    .catch((e) => {
      return e;
    });
};
