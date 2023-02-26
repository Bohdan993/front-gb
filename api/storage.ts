import { getCookie } from "./cookies";

export const uploadFile = (data: File) => {
  const formData = new FormData();
  formData.append("file", data);
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_STORAGE_URL}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      return e;
    });
};
