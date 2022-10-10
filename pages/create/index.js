import React, { useState } from "react";
import { Image, Input, Typography, Button, Steps, message } from "antd";
import { HeaderComponent } from "../../components/HeaderComponent";
import { useS3Upload } from "next-s3-upload";
import { addCup, updateCup } from "../../api/cup";

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

const Create = () => {
  const [cupId, setCupId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urls, setUrls] = useState([]);
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
      setUrls((current) => [...current, url]);
    }
  };

  const next = async () => {
    if (cupId) {
      const data = await updateCup({
        _id: cupId,
        title,
        description,
      });
    } else {
      const data = await addCup({ title, description });
      setCupId(data._id);
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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
              />

              <div>
                {urls.map((url, index) => (
                  <Image
                    style={{ width: 200, height: 200 }}
                    alt={index}
                    key={index}
                    width={200}
                    src={url}
                  />
                ))}
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
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
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
