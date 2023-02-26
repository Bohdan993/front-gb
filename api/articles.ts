import { getCookie } from "./cookies";

export const getArticles = (page: number, currencyId: number | undefined) => {
  const token = getCookie("token");
  const language = getCookie("language");
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/me?currencyId=${currencyId}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Content-Language": language,
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

export const getArticlesPay = (page: number) => {
  const token = getCookie("token");
  const language = getCookie("language");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bought-articles/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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

export const getDeletedArticles = () => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/articles-deleted/`, {
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

export const getFinanceArticles = (
  page: number,
  currencyId: number | undefined
) => {
  const token = getCookie("token");
  const language = getCookie("language");
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-finance?currencyId=${currencyId}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Content-Language": language,
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

export const getFinanceArticlesDeleted = () => {
  const token = getCookie("token");
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/my-finance-deleted/`, {
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
export const getMyArticle = (slug: string, authorId?: number) => {
  const token = getCookie("token");
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${
      authorId ? authorId : "me"
    }/${slug}`,
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
export const getArticle = (asPath: string) => {
  const token = getCookie("token");
  const currencyId = getCookie("currencyId");
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles${asPath}?currencyId=${currencyId}`,
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
