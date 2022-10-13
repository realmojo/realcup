import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Col, Modal, Row, Select, Typography } from "antd";
import { getCup } from "../../api/cup";
import { useRouter } from "next/router";
const { Option } = Select;
const { Text } = Typography;

const getRound = (len) => {
  const rounds = [];
  let n = 4;
  while (n < len) {
    rounds.push(n);
    n *= 2;
  }
  return rounds;
};

const Cup = ({ item }) => {
  const router = useRouter();
  const [round, setRound] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    router.back();
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <Head>
        <title>이상형 월드컵 - {item.title}</title>
      </Head>

      <Modal
        title={item.title}
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        okText="시작"
        onCancel={handleCancel}
        cancelText="뒤로가기"
      >
        <Row justify="center" gutter={[12, 12]} className="mb-3">
          <Col span={12}>
            <div
              className="card-cup-image"
              style={{
                backgroundImage: `url("${item.images[0].url}")`,
              }}
            ></div>
          </Col>
          <Col span={12}>
            <div
              className="card-cup-image"
              style={{
                backgroundImage: `url("${item.images[1].url}")`,
              }}
            ></div>
          </Col>
        </Row>

        <Select
          className="w-full"
          defaultValue="4"
          value={round}
          onChange={(e) => setRound(e)}
        >
          {getRound(item.images.length).map((item) => (
            <Option key={item} value={item}>
              {item}강
            </Option>
          ))}
        </Select>
        <div>
          <Text type="secondary">
            {item.images.length}개의 이미지 중에서 랜덤으로 {round}강의 월드컵을
            시작합니다.
          </Text>
        </div>
      </Modal>
      <div style={{ width: "100%", height: 80, backgroundColor: "gray" }}>
        애드센스
      </div>
      <div>123</div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { _id } = context.params;
  const data = await getCup(_id);
  return {
    props: { item: data }, // will be passed to the page component as props
  };
}

export default Cup;
