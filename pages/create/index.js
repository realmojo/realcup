import React, { useState } from "react";
import {
  Image,
  Input,
  Typography,
  Button,
  Steps,
  message,
  Select,
  List,
  Radio,
  Card,
  Space,
  Row,
  Col,
} from "antd";
import { HeaderComponent } from "../../components/HeaderComponent";
import { useS3Upload } from "next-s3-upload";
import { addCup, patchCup, patchCupImage, patchCupStatus } from "../../api/cup";
import { useRouter } from "next/router";
import { CupComponent } from "../../components/CupComponent";

const { Option } = Select;
const { Meta } = Card;
const { Text } = Typography;
const { Step } = Steps;

const steps = [
  {
    title: "기본정보",
  },
  {
    title: "이미지 등록",
  },
  {
    title: "미리보기",
  },
];

const CUP_STATUS = [
  {
    key: "active",
    title: "공개",
  },
  {
    key: "wait",
    title: "비공개",
  },
];

const MAIN_CATEGORIES = [
  {
    title: "남자",
    key: "man",
  },
  {
    title: "여자",
    key: "girl",
  },
  {
    title: "그외",
    key: "etc",
  },
];

const SUB_CATEGORIES = {
  man: [
    {
      title: "배우",
      key: "actor",
    },
    {
      title: "아이돌",
      key: "idol",
    },
    {
      title: "유튜버",
      key: "youtuber",
    },
    {
      title: "가수",
      key: "singer",
    },
    {
      title: "19+",
      key: "19_plus",
    },
  ],
  girl: [
    {
      title: "배우",
      key: "actor",
    },
    {
      title: "아이돌",
      key: "idol",
    },
    {
      title: "유튜버",
      key: "youtuber",
    },
    {
      title: "가수",
      key: "singer",
    },
    {
      title: "19+",
      key: "19_plus",
    },
  ],
  etc: [
    {
      title: "그외",
      key: "etc",
    },
  ],
};

const Create = () => {
  const router = useRouter();
  const [cupId, setCupId] = useState("");
  const [title, setTitle] = useState("");
  const [mainCategory, setMainCategory] = useState("man");
  const [subCategory, setSubCategory] = useState("actor");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [urls, setUrls] = useState([]);
  // const [urls, setUrls] = useState([
  //   {
  //     name: "이름1",
  //     url: "https://realcup.s3.ap-northeast-2.amazonaws.com/63459e73df7b298e543b5ee7/SF_mSL60Y",
  //   },
  //   {
  //     name: "이름2",
  //     url: "https://realcup.s3.ap-northeast-2.amazonaws.com/63459e73df7b298e543b5ee7/Kz1TTSNDV",
  //   },
  //   {
  //     name: "이름3",
  //     url: "https://realcup.s3.ap-northeast-2.amazonaws.com/63459e73df7b298e543b5ee7/bpnCPkBhKu",
  //   },
  // ]);
  const [current, setCurrent] = useState(0);
  const { uploadToS3 } = useS3Upload();

  const handleFilesChange = async ({ target }) => {
    const files = Array.from(target.files);
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const { url } = await uploadToS3(file, {
        endpoint: {
          request: {
            body: {
              id: cupId,
            },
          },
        },
      });
      const param = {
        name: file.name.trim().replace(/(.png|.jpg|.jpeg|.gif)$/, ""),
        url,
      };
      setUrls((current) => [...current, param]);
    }
  };

  const next = async () => {
    if (current === 0) {
      if (!title) {
        return message.error("제목을 입력해주세요");
      }
      if (!description) {
        return message.error("설명을 입력해주세요");
      }
      if (!mainCategory || !subCategory) {
        return message.error("카테고리를 선택해주세요");
      }
      const category = `${mainCategory}_${subCategory}`;
      if (cupId) {
        await patchCup({
          _id: cupId,
          title,
          description,
          category,
        });
      } else {
        const data = await addCup({ title, description, category });
        setCupId(data._id);
      }
    } else if (current === 1) {
      if (urls.length < 2) {
        return message.error("2개 이상의 이미지를 올려주세요");
      }
      const params = {
        _id: cupId,
        images: urls,
      };
      await patchCupImage(params);
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = async () => {
    const params = {
      _id: cupId,
      status,
    };
    try {
      const data = await patchCupStatus(params);
      console.log(data);
      if (data._id && status === "active") {
        message.success("월드컵 생성이 완료되었습니다.");
      } else {
        message.warn("월드컵이 비공개 처리 되었습니다.");
      }
      router.push("/");
    } catch (e) {
      message.error("월드컵 생성 중 오류가 발생하였습니다.");
    }
  };

  const doRemove = (value) => {
    const filterUrls = urls.filter((item) => {
      return item.url !== value;
    });
    setUrls(filterUrls);
  };

  const doNameChange = (e, index) => {
    const newArr = [...urls];
    newArr[index].name = e.target.value;
    setUrls(newArr);
  };

  const handleSelectMainCategory = (value) => {
    setMainCategory(value);
    if (value === "etc") {
      setSubCategory("etc");
    } else {
      setSubCategory("actor");
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className="create-container">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {current === 0 ? (
            <>
              <div className="mb-1 text-xl">제목</div>
              <Input
                size="large"
                placeholder="월드컵 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="mt-1">
                <Text type="secondary">
                  월드컵의 제목을 입력해주세요. 예) 여자 연예인 월드컵, 남자
                  아이돌 월드컵
                </Text>
              </div>
              <div style={{ margin: "20px 0" }}></div>
              <div className="mb-1 text-xl">설명</div>
              <Input
                size="large"
                placeholder="월드컵에 대한 간단한 설명을 입력해주세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="mt-1">
                <Text type="secondary">
                  월드컵에 대한 설명을 자유롭게 입력해주세요.
                </Text>
              </div>
              <div style={{ margin: "20px 0" }}></div>
              <div className="mb-1 text-xl">카테고리</div>
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <Select
                    className="w-full"
                    size="large"
                    defaultValue="girl"
                    value={mainCategory}
                    onChange={handleSelectMainCategory}
                  >
                    {MAIN_CATEGORIES.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.title}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={12}>
                  <Select
                    className="w-full"
                    size="large"
                    defaultValue="girl"
                    value={subCategory}
                    onChange={(value) => setSubCategory(value)}
                  >
                    {SUB_CATEGORIES[mainCategory].map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.title}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>

              <div className="mt-1">
                <Text type="secondary">
                  월드컵의 설명을 자유롭게 입력해주세요.
                </Text>
              </div>
            </>
          ) : (
            ""
          )}
          {current === 1 ? (
            <div>
              <input
                type="file"
                name="file"
                multiple={true}
                onChange={handleFilesChange}
                className="mb-4"
              />
              <List
                size="large"
                header={<div>이미지를 첨부하세요</div>}
                bordered
                dataSource={urls}
                renderItem={(item, index) => (
                  <List.Item style={{ padding: "4px 24px" }}>
                    <Image
                      style={{ width: 90, height: 90 }}
                      alt={index}
                      key={index}
                      src={item.url}
                    />
                    <Input
                      className="ml-2"
                      value={item.name}
                      onChange={(e) => doNameChange(e, index)}
                    />
                    <Button
                      className="ml-2"
                      danger
                      onClick={() => doRemove(item.url)}
                    >
                      삭제
                    </Button>
                  </List.Item>
                )}
              />
              <div className="float-right mt-1">
                <Text type="secondary">
                  ⚠️ 불법적인 이미지를 올릴 경우에는 경고없이 삭제될 수
                  있습니다.
                </Text>
              </div>
              <div className="clear-right"></div>
            </div>
          ) : (
            ""
          )}
          {current === 2 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CupComponent
                _id={cupId}
                urls={urls}
                title={title}
                description={description}
                isPreview={true}
              />
              <div className="ml-4">
                <Typography.Title level={2}>공개여부</Typography.Title>

                <Radio.Group
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <Space direction="vertical">
                    {CUP_STATUS.map((item) => (
                      <Radio key={item.key} value={item.key}>
                        {item.title}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="steps-action">
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => done()}>
              Done
            </Button>
          )}
        </div>
        {/* <Card title="월드컵 만들기">
          <div className="mb-1 text-xl">제목</div>
          <Input size="large" placeholder="월드컵 제목을 입력해주세요" />
          <div className="mt-1">
            <Text type="secondary">
              월드컵의 제목을 입력해주세요. 예) 여자 연예인 월드컵, 남자 아이돌
              월드컵
            </Text>
          </div>
          <div style={{ margin: "20px 0" }}></div>
          <div className="mb-1 text-xl">설명</div>
          <Input
            size="large"
            placeholder="월드컵에 대한 간단한 설명을 입력해주세요"
          />
          <div className="mt-1">
            <Text type="secondary">월드컵의 설명을 자유롭게 입력해주세요.</Text>
          </div>
          <div style={{ margin: "20px 0" }}></div>
          <div className="float-right">
            <Button size="large" type="primary" onClick={doCreate}>
              저장하기
            </Button>
          </div>
        </Card> */}
      </div>
    </>
  );
};

export default Create;
