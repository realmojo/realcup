import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { getMyCupList } from "../../api/cup";
import { CupComponent, HeaderComponent } from "../../components";

const My = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getMyCupList();
      setItems(data);
    })();
  }, []);
  return (
    <>
      <HeaderComponent />
      <div className="create-container">
        <Row gutter={[10, 10]}>
          {items.length > 0 &&
            items.map((item) => (
              <Col key={item._id} span={8}>
                <CupComponent
                  _id={item._id}
                  urls={item.images}
                  title={item.title}
                  description={item.description}
                  isPreview={false}
                  status={item.status}
                  isEdit={true}
                />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};
export default My;
