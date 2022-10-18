import React from "react";
import { Layout } from "antd";
import { HeaderComponent, SidebarComponent, CupList } from "../components";
import { getCupList } from "../api/cup";
import Head from "next/head";

const Home = ({ items }) => {
  return (
    <>
      <Head>
        <title>이상형 월드컵 - 연예인, 배우, 여자, 남자, 가수</title>
      </Head>
      <HeaderComponent />
      <Layout>
        <SidebarComponent />
        <Layout className="site-layout">
          <CupList items={items} category="all" />
        </Layout>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const data = await getCupList("all");
  return {
    props: { items: data }, // will be passed to the page component as props
  };
}

export default Home;
