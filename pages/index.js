import React from "react";
import { Layout, Row, Col } from "antd";
const { Content } = Layout;
import { CupComponent, HeaderComponent, SidebarComponent } from "../components";
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
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Row gutter={[16, 16]}>
              {items.map((item) => (
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 6 }}
                  key={item._id}
                >
                  <CupComponent
                    _id={item._id}
                    urls={item.images}
                    title={item.title}
                    description={item.description}
                    isPreview={false}
                  />
                </Col>
              ))}
            </Row>
          </Content>
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
