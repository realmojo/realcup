import { Menu } from "antd";
import {
  faPerson,
  faPersonDress,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
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
  ]),
  getItem("여자", "girl", <FontAwesomeIcon icon={faPersonDress} />, [
    getItem("배우", "girl_actor"),
    getItem("아이돌", "girl_idol"),
    getItem("유튜버", "girl_youtuber"),
    getItem("가수", "girl_singer"),
  ]),
  getItem("그외", "etc", <FontAwesomeIcon icon={faSeedling} />, [
    getItem("드라마", "drama"),
    getItem("웹툰", "webtoon"),
  ]),
  // getItem("Navigation One", "sub1", <MailOutlined />, [
  //   getItem(
  //     "Item 1",
  //     "g1",
  //     null,
  //     [getItem("Option 1", "1"), getItem("Option 2", "2")],
  //     "group"
  //   ),
  //   getItem(
  //     "Item 2",
  //     "g2",
  //     null,
  //     [getItem("Option 3", "3"), getItem("Option 4", "4")],
  //     "group"
  //   ),
  // ]),
  // getItem("", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Submenu", "sub3", null, [
  //     getItem("Option 7", "7"),
  //     getItem("Option 8", "8"),
  //   ]),
  // ]),
  // getItem("Navigation Three", "sub4", <SettingOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  //   getItem("Option 11", "11"),
  //   getItem("Option 12", "12"),
  // ]),
];

export const SidebarComponent = () => {
  const router = useRouter();
  const onClick = (e) => {
    console.log("click ", e);
    router.push(`/?category=${e.key}`);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
        height: "100%",
        float: "left",
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
