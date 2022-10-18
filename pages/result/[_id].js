import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Image,
  Typography,
  Button,
  message,
  Avatar,
  Input,
  List,
  Skeleton,
} from "antd";

import { HeaderComponent } from "../../components";
import Head from "next/head";
import { getCup, patchCupImageWinnerCount } from "../../api/cup";
import { storeCup } from "../../stores/cup";
import { useRouter } from "next/router";
import shortId from "shortid";
import { addComment, getCommentList } from "../../api/comment";
import moment from "moment";
import { Adsense } from "../../components/Adsense";
const { Content } = Layout;
const { Text } = Typography;

const Result = ({ data }) => {
  const router = useRouter();
  const [item, setItem] = useState(data);
  const [resultItem, setResultItem] = useState(storeCup.finalImage);

  const [commentLoading, setCommentLoading] = useState(false);
  const [commentItems, setCommentItems] = useState([]);
  const [comment, setComment] = useState();
  const [commentPage, setCommentPage] = useState(1);

  const copy = () => {
    message.success("링크가 복사되었습니다");
    var textarea = document.createElement("textarea");
    textarea.value = `https://realcup.co.kr/cup/${item.title.replace(
      / /g,
      "-"
    )}/${item._id}`;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // 추가

    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const doAddComment = async (e) => {
    if (e.keyCode === 13 && comment) {
      const params = {
        _cupId: item._id,
        comment: comment,
        nickname: `익명의 ${shortId.generate()}`,
        winnerName: resultItem.name,
      };
      const data = await addComment(params);
      setCommentItems([data, ...commentItems]);
      setComment("");
    }
  };

  const onLoadMore = async () => {
    setCommentLoading(true);
    const data = await getCommentList(item._id, ++commentPage);

    setCommentPage(commentPage);
    setCommentItems([...commentItems, ...data]);
    setCommentLoading(false);
  };

  const loadMore = (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <Button onClick={() => onLoadMore()}>더보기</Button>
    </div>
  );

  useEffect(() => {
    if (storeCup.finalImage.name === undefined) {
      router.push("/");
    } else {
      (async () => {
        const params = {
          _id: data._id,
          _imageId: storeCup.finalImage._id,
        };
        const patchItem = await patchCupImageWinnerCount(params);
        const commentItems = await getCommentList(data._id, commentPage);
        setItem(patchItem);
        setCommentItems(commentItems);
      })();
    }
  }, []);
  return (
    <>
      <Head>
        <title>
          {`이상형 월드컵 - 결과 ${resultItem.name} ${
            resultItem.winnerCount + 1
          }회 우승`}
        </title>
      </Head>
      <HeaderComponent />
      <Layout>
        <Content>
          <Row>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
              className="px-4 py-4 text-center"
            >
              <Image
                className="cup-image"
                src={resultItem.url}
                alt="result-image"
                preview={false}
              />
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
              className="px-4 py-4"
            >
              <div className="text-3xl mb-4">
                <Text className="font-bold">{resultItem.name}</Text>는{" "}
                <Text className="font-bold text-blue-500">
                  {resultItem.winnerCount + 1}
                </Text>
                회 우승하였습니다.
              </div>
              <Adsense
                slotId="1318917221"
                style={{ display: "block" }}
                adFormat="auto"
                isResponsive={true}
              />
              <div className="mt-4">
                <Button
                  className="mr-2"
                  size="large"
                  danger
                  onClick={() =>
                    router.push(
                      `/cup/${item.title.replace(/ /g, "-")}/${item._id}`
                    )
                  }
                >
                  리플레이
                </Button>
                <Button
                  className="mr-2"
                  size="large"
                  danger
                  onClick={() => router.push(`/analysis/${item._id}`)}
                >
                  랭킹분석
                </Button>
                <Button
                  className="mr-2"
                  size="large"
                  danger
                  onClick={() => router.push("/")}
                >
                  홈으로
                </Button>
                <Button size="large" onClick={() => copy()} type="primary">
                  링크복사
                </Button>
              </div>
              <div className="mt-4">
                <Text className="text-slate-500">한줄평 남기기</Text>
                <Input.Group compact>
                  <Input
                    style={{ width: "calc(100% - 70px)" }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyUp={(e) => doAddComment(e)}
                  />
                  <Button type="primary" onClick={() => doAddComment()}>
                    남기기
                  </Button>
                </Input.Group>
                <List
                  className="demo-loadmore-list"
                  loading={commentLoading}
                  itemLayout="horizontal"
                  loadMore={loadMore}
                  dataSource={commentItems}
                  renderItem={(item) => (
                    <List.Item>
                      <Skeleton
                        avatar
                        title={false}
                        loading={item.loading}
                        active
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar src="https://realcup.s3.ap-northeast-2.amazonaws.com/no-user-icon.png" />
                          }
                          title={
                            <div>
                              {item?.nickname} - {item?.winnerName}{" "}
                              <Text className="font-light">
                                (
                                {moment(item?.created).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
                                )
                              </Text>
                            </div>
                          }
                          description={item.comment}
                        />
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </div>
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
  return {
    props: { data },
  };
}

export default Result;
