import { getCookie } from "./cookies";

export const postAdminIsOpen = (isOpen: boolean, id: string) => {
  const token = getCookie("token");
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/articles/${id}/edit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ isOpen: isOpen }),
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
