import {
  baseURL,
  webviewURL,
  appHeaderKey1,
  appHeaderKey2,
} from "../../config";
import Head from "next/head";
import NotFound from "../component/notFound";

function ShareNeed({ data, leadId, userCode }) {
  if (!userCode || !leadId) {
    return <NotFound />;
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={data?.leadImageURL ?? "/"}
          key="image"
        />
        <meta property="og:title" content={data?.leadTitle ?? ""} key="title" />
        <meta
          property="og:description"
          content={data?.leadsDescription ?? ""}
          key="description"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={`${webviewURL}/leads/responding-leads?leadId=${leadId}&userCode=${userCode}`}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const leadId = query?.leadId ?? "";
  const leadOwner_userCode = query?.leadOwner_userCode ?? "";

  const response = await fetch(
    `${baseURL}webViewPreviewLeadScreenshot?userCode=${leadOwner_userCode}&leadId=${leadId}`,
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
    props: { data: result, userCode: leadOwner_userCode, leadId },
  };
}

export default ShareNeed;
