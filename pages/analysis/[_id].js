import React, { useState, useEffect } from "react";
import { Layout, Image, Typography, Table } from "antd";

import { HeaderComponent } from "../../components";
import Head from "next/head";
import { getCup } from "../../api/cup";
import { debounce } from "lodash";
import { Adsense } from "../../components/Adsense";
import { storeCommon } from "../../stores/common";
import { observer } from "mobx-react";
const { Title, Text } = Typography;
const { Content } = Layout;

const columns = [
  {
    title: "이미지",
    dataIndex: "url",
    key: "url",
    width: 100,
    render: (url, index) => (
      <Image
        style={{ width: 90, height: 90 }}
        alt={index}
        key={index}
        src={url}
      />
    ),
  },
  {
    title: "이름",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "우승횟수",
    dataIndex: "winnerCount",
    key: "winnerCount",
  },
  {
    title: "승률",
    dataIndex: "winnerRate",
    key: "winnerRate",
  },
];
const Analysis = observer(({ data }) => {
  const [item, _] = useState(data);

  const handleResize = debounce(() => {
    if (typeof window !== undefined) {
      console.log(window.innerWidth);
      console.log(storeCommon.isMobile);
      if (window.innerWidth < 580) {
        storeCommon.setIsMobile(true);
      } else {
        storeCommon.setIsMobile(false);
      }
    }
  }, 100);

  useEffect(() => {
    if (window.innerWidth < 580) {
      storeCommon.setIsMobile(true);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{`이상형 월드컵 - 분석 ${item.title}`}</title>
      </Head>
      <HeaderComponent />
      <Layout>
        <Content
          style={{
            width: storeCommon.isMobile ? "100%" : "600px",
            margin: storeCommon.isMobile ? "0" : "0 auto !important",
          }}
        >
          <Title level={2} className="text-center mt-4">
            <Text className="text-blue-400">{item.title}</Text> 통계 페이지
          </Title>
          <Adsense
            slotId="2865338157"
            style={{ display: "block" }}
            adFormat="auto"
            isResponsive={true}
          />
          <Table columns={columns} dataSource={item.images} key="1" />
        </Content>
      </Layout>
    </>
  );
});

export async function getServerSideProps(context) {
  const { _id } = context.params;
  const data = await getCup(_id, false);

  data.images = data.images
    .map((item, index) => {
      return {
        key: index,
        ...item,
        winnerRate:
          item.winnerCount === 0
            ? 0
            : `${Math.round((item.winnerCount / data.playCount) * 100, 2)}%`,
      };
    })
    .sort((a, b) => b.winnerCount - a.winnerCount);
  return {
    props: { data },
  };
}

export default Analysis;
