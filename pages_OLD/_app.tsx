import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import Layout from "../components/contentBlocks/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async ({ ctx }: any) => {
  const { req, res, query } = ctx;
  const { slug } = query;
  const { author } = query;
  const token =
    req && req.cookies && req.cookies["token"] ? req.cookies["token"] : "";
  const language =
    req && req.cookies && req.cookies["language"]
      ? req.cookies["language"]
      : "uk";

  if (req && !req.cookies["currencyId"]) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/currencies`
      );
      const data = await res.json();
      const currencyId = data[0].id;
      const currencySymbol = data[0].symbol;

      ctx.res.setHeader("Set-Cookie", [
        `language = ${language}; path=/`,
        `token = ${token}; path=/`,
        `currencyId = ${currencyId}; path=/`,
      ]);
      // `currencyId=${currencyId} `
    } catch (error) {
      console.error(error);
    }
  }

  if (req) {
    if (!token) {
      if (req.url.includes(`/admin/${author}/${slug}`)) {
      } else if (![`/${author}`, `/${author}/${slug}`, "/"].includes(req.url)) {
        res.writeHead(307, { Location: "/" });
        res.end();
      }
      // if (req.url === `/${author}/${slug}`) {
      // } else if (req.url != "/") {
      //   res.writeHead(307, { Location: "/" });
      //   res.end();
      // }
    }
  }
  // else {
  //   console.log("000000000000000000000000000");
  //   const user = localStorage.getItem("user");
  //   if (token && !user) {
  //     console.log("11111111111111111111");
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("11111111111111111111", data);
  //         localStorage.setItem("user", data.user);
  //         return data;
  //       })
  //       .catch((e) => {
  //         return e;
  //       });
  //   }
  // }

  return {};
};
