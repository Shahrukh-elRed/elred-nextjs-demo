import {
  baseURL,
  webviewURL,
  appHeaderKey1,
  appHeaderKey2,
} from "../../config";
import Head from "next/head";
import NotFound from "../component/notFound";

function ShareNeed({ data, needId, userCode }) {
  if (!userCode || !needId) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={data?.needImageURL ?? "/"}
          key="image"
        />
        {data?.otherTags?.length && (
          <meta
            property="og:description"
            content={`Tags: ${data?.otherTags?.join(", ")}`}
            key="description"
          />
        )}
        <meta property="og:title" content={data.needDescription} key="title" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={`${webviewURL}my-bio/needs/need?needId=${needId}&userCode=${userCode}`}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const needId = query?.needId ?? "";
  const needOwner_userCode = query?.needOwner_userCode ?? "";

  const response = await fetch(
    `${baseURL}webViewPreviewNeedScreenshot?userCode=${needOwner_userCode}&needId=${needId}`,
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        appDefaultHeader: Math.random() > 0.5 ? appHeaderKey1 : appHeaderKey2,
      },
    }
  );

  const data = await response.json();
  const result = data?.result && data?.result?.length && data?.result[0];

  return {
    props: { data: result, userCode: needOwner_userCode, needId },
  };
}

export default ShareNeed;
