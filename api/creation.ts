import { getCookie } from "./cookies";
import { IArticle } from "../store/creation/creation.props";

export const getArticleTypes = () => {
  const language = getCookie("language");

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article_types`, {
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

export const getCategories = () => {
  const language = getCookie("language");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
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

export const getLanguages = () => {
  const language = getCookie("language");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/languages`, {
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
export const postArticles = (/*articles: IArticles*/ data: any) => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`, {
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
export const patchArticles = (article: IArticle) => {
  const token = getCookie("token");
  const slug = article.slug;
  // article.isPublished = true;
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/me/${slug}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(article),
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

export const deleteArticle = (id: number) => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${id}`, {
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
