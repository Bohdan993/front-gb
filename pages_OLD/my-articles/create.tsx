import React, { FC } from "react";
import { GetServerSideProps } from "next";

import Creation from "../../components/creation";

const Create: FC = () => {
  return <Creation />;
};

export default Create;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";

  const getUser = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
      body: JSON.stringify({}),
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
  if (
    !getUser ||
    !getUser.user ||
    !getUser.user.description ||
    !getUser.user.name ||
    !getUser.user.specialization ||
    !getUser.user.avatar_id
  ) {
    return {
      redirect: {
        destination: `/become-expert`,
        permanent: false,
      },
    };
  }

  const article = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Content-Language": locale || "uk",
      },
      body: JSON.stringify({}),
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

  return {
    redirect: {
      destination: `/my-articles/${article.data.slug}/edit`,
      permanent: false,
    },
  };
};
