import React from "react";
import { Card, Row, Col, Typography, Tag } from "antd";
import {
  SignalFilled,
  PlayCircleFilled,
  EditOutlined,
  FileImageTwoTone,
} from "@ant-design/icons";
import { useRouter } from "next/router";
const { Text } = Typography;
const { Meta } = Card;

export const CupComponent = ({
  _id,
  urls,
  title,
  description,
  isPreview,
  status,
  isEdit,
}) => {
  const router = useRouter();

  const actions = [
    <div key="1" onClick={() => doAnalysis()}>
      <Text className="mr-2">통계</Text>
      <SignalFilled key="report" />
    </div>,
    <div key="2" onClick={() => doPlay()}>
      <Text className="mr-2 text-blue-500">시작</Text>
      <PlayCircleFilled key="play" className="text-blue-500" />
    </div>,
  ];
  if (isEdit) {
    actions.push(
      <div key="3" onClick={() => doEdit()}>
        <Text className="mr-2">수정</Text>
        <EditOutlined key="edit" />
      </div>
    );
  }

  const doEdit = () => {
    router.push(`/create?_id=${_id}`);
  };

  const doPlay = () => {
    if (!isPreview) {
      router.push(`/cup/${_id}`);
    }
  };

  const doAnalysis = () => {
    router.push(`/analysis/${_id}`);
  };

  return (
    <Card
      style={{
        minWidth: 300,
      }}
      cover={
        <Row justify="center">
          {urls.length > 2 ? (
            <>
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
            </>
          ) : (
            <Col span={24} style={{ borderBottom: "1px solid #f1f1f1" }}>
              <div
                className="card-cup-image"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 80,
                }}
              >
                <FileImageTwoTone />
              </div>
            </Col>
          )}
        </Row>
      }
      actions={actions}
    >
      {status ? (
        <div className="mb-2">
          {status === "active" ? (
            <Tag color="blue">공개</Tag>
          ) : (
            <Tag>비공개</Tag>
          )}
        </div>
      ) : null}
      <Meta title={title} description={description} />
    </Card>
  );
};
