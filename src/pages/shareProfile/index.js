import {
  baseURL,
  webviewURL,
  appHeaderKey1,
  appHeaderKey2,
} from "../../config";
import Head from "next/head";
import NotFound from "../component/notFound";

function ShareProfile({ data, userCode, networkCode }) {
  if (!userCode && !networkCode) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={data?.profileTitle ?? ""}
          key="title"
        />
        <meta
          property="og:description"
          content={data?.description ?? ""}
          key="description"
        />
        <meta
          property="og:image"
          content={data?.cardImageURL ?? "/"}
          key="image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={
            userCode
              ? `${webviewURL}?userCode=${userCode}`
              : `${webviewURL}/network-profile?networkCode=${networkCode}`
          }
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const userCode = query.userCode ?? "";
  const networkCode = query.networkCode ?? "";

  let url = `${baseURL}`;
  if (userCode) {
    url += `noSessionPreviewCardScreenshot?userCode=${userCode}`;
  }

  if (networkCode) {
    url += `webviewGetNetworkScreenshot?networkCode=${networkCode}`;
  }

  const response = await fetch(url, {
    cache: "no-cache",
    method: userCode ? "POST" : "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      appDefaultHeader: Math.random() > 0.5 ? appHeaderKey1 : appHeaderKey2,
    },
  });

  const data = await response.json();
  const result = data?.result && data?.result?.length && data?.result[0];

  return {
    props: { data: result, userCode, networkCode },
  };
}

export default ShareProfile;
