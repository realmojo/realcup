import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Image, Col, Modal, Row, Select, Typography, Layout } from "antd";
import { getCup } from "../../api/cup";
import { storeCup } from "../../stores/cup";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
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
  // const [nextImageItems, setNextImageItems] = useState([]);
  // const [currentRound, setCurrentRound] = useState(1);
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
      console.log(nextImageItems);
      setTimeout(() => {
        storeCup.setCurrentRound(++currentRound);
      }, 1000);

      // 다음 라운드로 넘어갈 때
      console.log("currentRound: ", currentRound);
      if (currentRound === round) {
        const nextRound = round / 2;
        if (Math.floor(nextRound) === 0) {
          console.log("game clear");
          setTimeout(() => {
            setIsGameClear(true);
          }, 1000);
          setImageItems([]);
          setFinalImage(imageItems[index]);
          storeCup.setCurrentRound(1);
          nextImageItems = [];
          // setTimeout(() => {
          //   router.push("/result");
          // }, 2000);
        } else {
          console.log("next");
          console.log("round: ", round);
          console.log(nextImageItems);
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
    setIsModalOpen(false);
    console.log();
    // shuffle(item);
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
        <div style={{ width: "100%", height: 80, backgroundColor: "gray" }}>
          애드센스
        </div>
        <Content className="board-bg-color">
          <div className="text-center pt-4">
            <Title style={{ color: "rgb(241 245 249" }}>
              {item.title}{" "}
              {isGameClear
                ? "우승"
                : round === 1
                ? "결승"
                : `${storeCup.currentRound}/${round}`}
            </Title>
          </div>
          {isGameClear ? (
            <Row gutter={[10, 10]}>
              <Col span={12} offset={6}>
                <div className="relative">
                  <Image
                    className="cup-image"
                    src={finalImage.url}
                    // layout="fill"
                    alt="image-1"
                    preview={false}
                  />
                </div>
              </Col>
            </Row>
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
                <div className="relative">
                  <Image
                    className={`cup-image ${isRightClick ? "hidden" : "block"}`}
                    src={imageItems[0].url}
                    layout="fill"
                    alt="image-1"
                    preview={false}
                  />
                  <div
                    style={{
                      textShadow: "1px 1px 2px black",
                    }}
                    className="text-3xl absolute top-0 justify-center w-full text-slate-100"
                  >
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
                <div className="relative">
                  <Image
                    className={`cup-image ${isLeftClick ? "hidden" : "block"}`}
                    src={imageItems[1].url}
                    layout="fill"
                    alt="image-2"
                    preview={false}
                  />
                  <div
                    style={{
                      textShadow: "1px 1px 2px black",
                    }}
                    className="text-3xl absolute top-0 justify-center w-full text-slate-100"
                  >
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
  const data = await getCup(_id);
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Cup;
