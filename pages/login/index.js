import React, { useState } from "react";
import Link from "next/link";
import { Card, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { HeaderComponent } from "../../components/HeaderComponent";
import { authLogin } from "../../api/login";
import { storeLogin } from "../../stores/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const doLogin = async () => {
    try {
      const params = {
        email,
        password,
      };
      const loginData = await authLogin(params);
      message.success("로그인 합니다.");
      storeLogin.setJWT(loginData.access_token);
      location.href = "/";
    } catch (e) {
      message.error(e.message);
    }
  };
  return (
    <>
      <HeaderComponent />
      <div className="login-container">
        <Card className="" title="로그인" style={{ width: 300 }}>
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
            onPressEnter={doLogin}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ margin: "20px 0" }}></div>
          <div className="float-right">
            <Button size="large" className="mr-3">
              <Link href="/login/register">
                <a>회원가입</a>
              </Link>
            </Button>
            <Button size="large" type="primary" onClick={doLogin}>
              로그인
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
