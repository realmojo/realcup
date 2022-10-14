import React from "react";
import { Layout } from "antd";
import { HeaderComponent, SidebarComponent } from "../../components";
import Head from "next/head";
const Result = () => {
  return (
    <>
      <Head>
        <title>이상형 월드컵 - 결과</title>
      </Head>
      <HeaderComponent />
      <Layout>
        <div>결과</div>
      </Layout>
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { category } = context.query;
//   console.log(category);
//   const data = await getCupList(category);
//   return {
//     props: { items: data }, // will be passed to the page component as props
//   };
// }

export default Result;
