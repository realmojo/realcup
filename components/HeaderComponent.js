import { Button, PageHeader, Image } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import React from "react";
import Link from "next/link";
import { storeLogin } from "../stores/login";
import { storeCommon } from "../stores/common";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

export const HeaderComponent = observer(() => {
  const router = useRouter();
  const doLogout = () => {
    storeLogin.logout();
    storeLogin.removeJWT();
    location.href = "/";
  };
  const doCreate = () => {
    if (storeLogin.isLogin) {
      router.push("/create");
    } else {
      router.push("/login");
    }
  };
  const doMyCup = () => {
    if (storeLogin.isLogin) {
      router.push("/create/my");
    } else {
      router.push("/login");
    }
  };
  const doLogin = () => {
    router.push("/login");
  };
  const goHome = () => {
    router.push("/");
  };
  return (
    <PageHeader
      className="site-page-header"
      title={
        <div>
          {storeCommon.isSidebarOpen ? (
            <MenuOutlined
              className="mr-3"
              onClick={() => {
                storeCommon.setIsMenuOpen(!storeCommon.isMenuOpen);
              }}
            />
          ) : (
            <Image
              style={{ width: 26, height: 26, marginTop: -4, marginRight: 4 }}
              src="https://realcup.s3.ap-northeast-2.amazonaws.com/logo.png"
              alt="logo"
              preview={false}
            />
          )}
          <span style={{ cursor: "pointer" }} onClick={() => goHome()}>
            리얼컵
          </span>
        </div>
      }
      extra={[
        <Button key="my" onClick={() => doMyCup()}>
          내 월드컵
        </Button>,
        <Button key="create" onClick={() => doCreate()}>
          월드컵 만들기
        </Button>,
        storeLogin.isLogin ? (
          <Button key="logout" onClick={() => doLogout()}>
            로그아웃
          </Button>
        ) : (
          <Button key="login" onClick={() => doLogin()}>
            로그인
          </Button>
        ),
      ]}
    />
  );
});
