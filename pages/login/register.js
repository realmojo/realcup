import React, { useState } from "react";
import { Card, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { HeaderComponent } from "../../components/HeaderComponent";
import { addUser } from "../../api/user";
import { authLogin } from "../../api/login";
import { storeLogin } from "../../stores/login";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doRegister = async () => {
    const params = {
      email,
      password,
    };
    try {
      const data = await addUser(params);
      if (data._id) {
        // 회원가입 후 로그인 처리
        message.success("가입이 완료되었습니다. 로그인 합니다.");
        const loginData = await authLogin(params);
        storeLogin.setJWT(loginData.access_token);
        location.href = "/";
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <HeaderComponent />
      <div className="login-container">
        <Card className="" title="회원가입" style={{ width: 300 }}>
          <Input
            size="large"
            placeholder="이메일"
            prefix={<UserOutlined />}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ margin: "20px 0" }}></div>
          <Input
            size="large"
            placeholder="비밀번호"
            prefix={<LockOutlined />}
            type="password"
            onPressEnter={doRegister}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ margin: "20px 0" }}></div>
          <div className="float-right">
            <Button size="large" type="primary" onClick={doRegister}>
              가입하기
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;
