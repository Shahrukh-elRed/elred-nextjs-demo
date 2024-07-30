import {
  baseURL,
  webviewURL,
  appHeaderKey1,
  appHeaderKey2,
} from "../../config";
import Head from "next/head";
import NotFound from "../component/notFound";

function ShareCard({ data, userCode }) {
  if (!userCode) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image"
          content={data?.cardImageURL ?? ""}
          key="image"
        />
        <meta property="og:title" content={data?.cardTitle ?? ""} key="title" />
        <meta property="og:description" content={data?.description ?? ""} />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={`${webviewURL}share-card?userCode=${userCode}`}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const userCode = query?.userCode ?? "";

  let url = `${baseURL}`;
  if (userCode) {
    url += `noSessionPreviewCardScreenshot?userCode=${userCode}`;
  }

  const response = await fetch(url, {
    cache: "no-cache",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      appDefaultHeader: Math.random() > 0.5 ? appHeaderKey1 : appHeaderKey2,
    },
  });

  const data = await response.json();
  const result = data?.result && data?.result?.length && data?.result[0];

  return {
    props: { data: result, userCode },
  };
}

export default ShareCard;
