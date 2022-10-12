import React, { useState } from "react";
import Head from "next/head";
import { Layout, Button } from "antd";
import { getCup } from "../../api/cup";
const Cup = ({ item }) => {
  console.log(item);
  return (
    <>
      <Head>
        <title>이상형 월드컵 - {item.title}</title>
      </Head>
      <div>애드센스</div>
      <div>123</div>
    </>
  );
};

export async function getServerSideProps(context) {
  console.log(context);
  const { _id } = context.params;
  const data = await getCup(_id);
  return {
    props: { item: data }, // will be passed to the page component as props
  };
}

export default Cup;
