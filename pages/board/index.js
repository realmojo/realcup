import React from "react";
import { Layout, Row, Col, Button } from "antd";
const { Content } = Layout;
import {
  CupComponent,
  CupList,
  HeaderComponent,
  SidebarComponent,
} from "../../components";
import { getCupList } from "../../api/cup";
import Head from "next/head";
const Board = ({ items, category }) => {
  return (
    <>
      <Head>
        <title>이상형 월드컵 - 연예인, 배우, 여자, 남자, 가수</title>
      </Head>
      <HeaderComponent />
      <Layout>
        <SidebarComponent />
        <Layout className="site-layout">
          <CupList items={items} category={category} />
        </Layout>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { category } = context.query;
  const data = await getCupList(category);
  return {
    props: { items: data, category }, // will be passed to the page component as props
  };
}

export default Board;
