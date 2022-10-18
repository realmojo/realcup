import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Button, message } from "antd";
const { Content } = Layout;
import { CupComponent } from "./CupComponent";
import { Adsense } from "./Adsense";
import { getCupList } from "../api/cup";

export const CupList = ({ items, category }) => {
  const [page, setPage] = useState(1);
  const [cupItems, setCupItems] = useState(items);
  const doMore = async () => {
    const data = await getCupList(category, page + 1);
    if (data.length === 0) {
      message.success("더 이상 월드컵이 없습니다.");
    } else {
      setCupItems([...cupItems, ...data]);
      setPage(page + 1);
    }
  };
  useEffect(() => {
    setCupItems(items);
  }, [category]);
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row gutter={[16, 16]}>
        {cupItems.map((item, index) => (
          <React.Fragment key={item._id}>
            {index === 1 || index === 5 || index === 7 || index === 11 ? (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 8 }}
                xxl={{ span: 6 }}
              >
                <Adsense
                  slotId={
                    index === 1
                      ? "4592017634"
                      : index === 5
                      ? "8103106983"
                      : index === 7
                      ? "2850780309"
                      : index === 11
                      ? "6598453623"
                      : ""
                  }
                  style={{ display: "block" }}
                  adFormat="auto"
                  isResponsive={true}
                />
              </Col>
            ) : null}
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
              xxl={{ span: 6 }}
              key={item._id}
            >
              <CupComponent
                _id={item._id}
                urls={item.images}
                title={item.title}
                description={item.description}
                isPreview={false}
              />
            </Col>
          </React.Fragment>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button
          onClick={() => doMore()}
          type="primary"
          size="large"
          style={{ width: 330 }}
        >
          더보기
        </Button>
      </div>
    </Content>
  );
};
