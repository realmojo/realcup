import React, { useState } from "react";
import { Layout, Row, Col, Image, Typography, message, Table } from "antd";

import { HeaderComponent } from "../../components";
import Head from "next/head";
import { getCup } from "../../api/cup";
import { useRouter } from "next/router";
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
    responsive: ["md"],
  },
  {
    title: "우승횟수",
    dataIndex: "winnerCount",
    key: "winnerCount",
    responsive: ["lg"],
  },
  {
    title: "승률",
    dataIndex: "winnerRate",
    key: "winnerRate",
    responsive: ["lg"],
  },
];
const Analysis = ({ data }) => {
  const router = useRouter();
  const [item, setItem] = useState(data);

  const copy = () => {
    message.success("링크가 복사되었습니다");
    var textarea = document.createElement("textarea");
    textarea.value = `https://realcup.co.kr/cup/${item._id}`;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가

    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  return (
    <>
      <Head>
        <title>{`이상형 월드컵 - 분석 ${item.title}`}</title>
      </Head>
      <HeaderComponent />
      <Layout>
        <Content>
          <Row>
            <Col
              offset={6}
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
              className="px-4 py-4 text-center"
            >
              <Title level={2}>
                <Text className="text-blue-400">{item.title}</Text> 통계 페이지
              </Title>
              <Table columns={columns} dataSource={item.images} key="1" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

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
