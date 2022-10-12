import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { SignalFilled, PlayCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
const { Text } = Typography;
const { Meta } = Card;

export const CupComponent = ({ _id, urls, title, description, isPreview }) => {
  const router = useRouter();
  const doPlay = () => {
    if (!isPreview) {
      router.push(`/cup/${_id}`);
    }
  };
  return (
    <Card
      style={{
        minWidth: 300,
      }}
      cover={
        <Row justify="center">
          <Col span={12}>
            <div
              className="card-cup-image"
              style={{
                backgroundImage: `url("${urls[0].url}")`,
              }}
            ></div>
          </Col>
          <Col span={12}>
            <div
              className="card-cup-image"
              style={{
                backgroundImage: `url("${urls[1].url}")`,
              }}
            ></div>
          </Col>
        </Row>
      }
      actions={[
        <div key="1">
          <Text className="mr-2">통계</Text>
          <SignalFilled key="report" />
        </div>,
        <div key="2" onClick={() => doPlay()}>
          <Text className="mr-2 text-blue-500">시작</Text>
          <PlayCircleFilled key="play" className="text-blue-500" />
        </div>,
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};
