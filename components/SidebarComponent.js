import React, { useEffect } from "react";
import { Menu, Layout } from "antd";
import {
  faPerson,
  faPersonDress,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { storeCommon } from "../stores/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { observer } from "mobx-react";
const { Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("남자", "man", <FontAwesomeIcon icon={faPerson} />, [
    getItem("배우", "man_actor"),
    getItem("아이돌", "man_idol"),
    getItem("유튜버", "man_youtuber"),
    getItem("가수", "man_singer"),
    getItem("19+", "man_19_plus"),
  ]),
  getItem("여자", "girl", <FontAwesomeIcon icon={faPersonDress} />, [
    getItem("배우", "girl_actor"),
    getItem("아이돌", "girl_idol"),
    getItem("유튜버", "girl_youtuber"),
    getItem("가수", "girl_singer"),
    getItem("19+", "girl_19_plus"),
  ]),
  getItem("그외", "etc", <FontAwesomeIcon icon={faSeedling} />, [
    getItem("이것저것", "etc_etc"),
  ]),
];

export const SidebarComponent = observer(() => {
  const router = useRouter();
  const onClick = (e) => {
    router.push(`/board?category=${e.key}`);
  };

  const handleResize = debounce(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth < 1200) {
        storeCommon.setIsSidebarOpen(true);
      } else {
        storeCommon.setIsSidebarOpen(false);
      }
    }
  }, 100);

  useEffect(() => {
    if (window.innerWidth < 1200) {
      storeCommon.setIsSidebarOpen(true);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={storeCommon.isSidebarOpen && !storeCommon.isMenuOpen}
      style={{ flex: "none" }}
      className={
        storeCommon.isSidebarOpen && !storeCommon.isMenuOpen
          ? "realcup-sidebar-hide"
          : "realcup-sidebar-open"
      }
    >
      <Menu
        onClick={onClick}
        style={{
          height: "100%",
          float: "left",
          display:
            storeCommon.isSidebarOpen && !storeCommon.isMenuOpen
              ? "none"
              : "block",
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
});
