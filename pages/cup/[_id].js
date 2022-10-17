import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Image, Col, Modal, Row, Select, Typography, Layout } from "antd";
import { getCup } from "../../api/cup";
import { storeCup } from "../../stores/cup";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import { Adsense } from "../../components/Adsense";
const { Option } = Select;
const { Text, Title } = Typography;
const { Content } = Layout;

const ARROW = {
  LEFT: "left",
  RIGHT: "right",
};

const getRound = (len) => {
  const rounds = [];
  let n = 4;
  while (n < len) {
    rounds.push(n);
    n *= 2;
  }
  return rounds;
};

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const nextImageItems = [];
const Cup = observer(({ data }) => {
  const router = useRouter();
  const [isLeftClick, setIsLeftClick] = useState(false);
  const [isRightClick, setIsRightClick] = useState(false);
  const [item, setItem] = useState(data);
  const [imageItems, setImageItems] = useState(data.images);
  const [isGameClear, setIsGameClear] = useState(false);
  const [finalImage, setFinalImage] = useState({});
  const [round, setRound] = useState(8 / 2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    router.back();
  };

  const doClick = (index, arrow) => {
    if (storeCup.isStatusClick) {
      storeCup.setIsStatusClick(false);
      const { currentRound } = storeCup;

      // 이미지 처리
      if (arrow === ARROW.LEFT) {
        setIsLeftClick(true);
        setTimeout(() => {
          setIsLeftClick(false);
        }, 1000);
      } else if (arrow === ARROW.RIGHT) {
        setIsRightClick(true);
        setTimeout(() => {
          setIsRightClick(false);
        }, 1000);
      }

      // 현재 클릭된 이미지를 다음 넥스트로 추가
      nextImageItems.push(imageItems[index]);
      setTimeout(() => {
        imageItems.splice(0, 2);
        setImageItems(imageItems);
      }, 1000);

      // 현재 라운드
      setTimeout(() => {
        storeCup.setCurrentRound(++currentRound);
      }, 1000);

      // 다음 라운드로 넘어갈 때
      if (currentRound === round) {
        const nextRound = round / 2;
        if (Math.floor(nextRound) === 0) {
          setFinalImage(imageItems[index]);
          storeCup.setFinalImage(imageItems[index]);
          setTimeout(() => {
            setIsGameClear(true);
            setImageItems([]);
            storeCup.setCurrentRound(1);
            nextImageItems = [];
          }, 1000);
          setTimeout(() => {
            router.push(`/result/${item._id}`);
          }, 2000);
        } else {
          setTimeout(() => {
            setRound(round / 2);
            storeCup.setCurrentRound(1);
            setImageItems(nextImageItems);
            nextImageItems = [];
          }, 1000);
        }
      }

      setTimeout(() => {
        storeCup.setIsStatusClick(true);
      }, 1000);
    }
  };

  useEffect(() => {
    setIsModalOpen(true);
    shuffle(imageItems);
  }, []);

  return (
    <>
      <Head>
        <title>{`이상형 월드컵 - ${item.title}`}</title>
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
      <Layout>
        <Adsense ad-slot="9253247567" />
        <Content className="board-bg-color">
          <div className="text-center pt-4">
            <Title style={{ color: "#f1f5f9" }}>
              {item.title}{" "}
              {isGameClear
                ? "우승"
                : round === 1
                ? "결승"
                : `${storeCup.currentRound}/${round}`}
            </Title>
          </div>
          {isGameClear ? (
            <div className="final-image-container">
              <Image
                className="cup-image"
                src={finalImage.url}
                alt="image-1"
                preview={false}
              />
              <div className="text-center text-shadow text-3xl absolute top-0 justify-center w-full text-slate-100">
                {finalImage.name}
              </div>
            </div>
          ) : (
            ""
          )}
          {imageItems.length > 0 ? (
            <Row gutter={[10, 10]}>
              <Col
                className={`cup-image-column ${
                  isRightClick
                    ? "cup-image-column-not-selected w-full"
                    : "cup-image-column-selected"
                }`}
                span={12}
                onClick={() => doClick(0, "left")}
              >
                <div className={isRightClick ? "hidden" : "block"}>
                  <Image
                    className={`cup-image ${isRightClick ? "hidden" : "block"}`}
                    src={imageItems[0].url}
                    layout="fill"
                    alt="image-1"
                    preview={false}
                  />
                  <div className="text-shadow text-3xl absolute top-0 justify-center w-full text-slate-100">
                    {imageItems[0].name}
                  </div>
                </div>
              </Col>
              <Col
                className={`cup-image-column ${
                  isLeftClick
                    ? "cup-image-column-not-selected w-full"
                    : "cup-image-column-selected"
                }`}
                span={12}
                onClick={() => doClick(1, "right")}
              >
                <div className={isLeftClick ? "hidden" : "block"}>
                  <Image
                    className={`cup-image`}
                    src={imageItems[1].url}
                    layout="fill"
                    alt="image-2"
                    preview={false}
                  />
                  <div className="text-shadow text-3xl absolute top-0 justify-center w-full text-slate-100">
                    {imageItems[1].name}
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Content>
      </Layout>
    </>
  );
});

export async function getServerSideProps(context) {
  const { _id } = context.params;
  const data = await getCup(_id, true);
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Cup;
