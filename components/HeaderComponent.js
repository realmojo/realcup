import { Button, PageHeader } from "antd";
import React from "react";
import Link from "next/link";
import { storeLogin } from "../stores/login";
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
  return (
    <PageHeader
      className="site-page-header"
      title="리얼컵"
      extra={[
        <Button key="create" onClick={doCreate}>
          월드컵 만들기
        </Button>,
        storeLogin.isLogin ? (
          <Button key="logout" onClick={doLogout}>
            로그아웃
          </Button>
        ) : (
          <Button key="login">
            <Link href="/login">
              <a>로그인</a>
            </Link>
          </Button>
        ),
      ]}
    />
  );
});
