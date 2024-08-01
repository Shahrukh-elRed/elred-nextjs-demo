import Head from "next/head";

const DeleteUserAccount = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" key="title" content="Elred Delete Account" />
        <meta
          property="og:description"
          content="Elred Webview Delete Account"
        />
      </Head>

      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={deleteUserURL}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
};

export default DeleteUserAccount;
