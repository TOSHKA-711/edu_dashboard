"use client";
import React, { useState } from "react";
import { PieChartOutlined, TeamOutlined } from "@ant-design/icons";
import { FiUsers } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { FaChalkboardTeacher, FaLaptopCode } from "react-icons/fa";
import { MdOutlineWidgets } from "react-icons/md";
import { CiSettings, CiLogout } from "react-icons/ci";

import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import NavBar from "../components/navbar/NavBar";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({ key, icon, children, label });

const items: MenuItem[] = [
  getItem(
    <Link href="/dashboard/overview">المركز الجماهيري ام الفحم</Link>,
    "1",
    <img src="/logo1.svg" alt="logo" width={20} height={20} />
  ),
  getItem(
    <Link href="/dashboard/overview">نظرة عامة</Link>,
    "2",
    <PieChartOutlined />
  ),
  getItem(
    <Link href="/dashboard/students/allStudents">الطلاب</Link>,
    "3",
    <FiUsers />
  ),
  getItem(<Link href="/parents">أولياء الأمور</Link>, "4", <GoArrowSwitch />),
  getItem(<Link href="/teachers">المعلمين</Link>, "5", <FaChalkboardTeacher />),
  getItem(<Link href="/courses">الكورسات</Link>, "6", <FaLaptopCode />),
  getItem(<Link href="/subjects">المواضيع</Link>, "7", <MdOutlineWidgets />),

  getItem("الفِرق", "sub2", <TeamOutlined />, [
    getItem(<Link href="/teams/1">الفريق 1</Link>, "8"),
    getItem(<Link href="/teams/2">الفريق 2</Link>, "9"),
  ]),
  getItem(<Link href="/settings">الاعدادات</Link>, "10", <CiSettings />),
];
const items2: MenuItem[] = [
  getItem("Logout", "11", <CiLogout className="text-red-400" />),
];

const DashLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ title: string }[]>([
    { title: "الرئيسية" },
  ]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const breadcrumbMap: Record<string, { title: string }[]> = {
    "1": [{ title: "نظرة عامة" }],
    "2": [{ title: "نظرة عامة" }],
    "3": [{ title: "الطلاب" }],
    "4": [{ title: "أولياء الأمور" }],
    "5": [{ title: "المعلمين" }],
    "6": [{ title: "الكورسات" }],
    "7": [{ title: "المواضيع" }],
    "8": [{ title: "الفرق" }, { title: "الفريق 1" }],
    "9": [{ title: "الفرق" }, { title: "الفريق 2" }],
    "10": [{ title: "الاعدادات" }],
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    setBreadcrumbItems(breadcrumbMap[key] || [{ title: "الرئيسية" }]);
  };

  return (
    <Layout style={{ minHeight: "100vh" }} dir="rtl">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
        style={{
          background: "white",
          height: "100vh",
          position: "sticky",
          top: "0",
          right: "0",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
          style={{ paddingTop: "2rem" }}
        />
        <img
          src="/sidebar_image.svg"
          alt="sidebar"
          width={500}
          height={530}
          className="pt-6 pl-2"
        />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items2}
          onClick={handleMenuClick}
          style={{ paddingTop: "2rem" }}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <NavBar />
        </Header>
        <Content
          style={{
            padding: "0 16px",
            background: "linear-gradient(to left, #EDF4F1, #E3EBF5)",
          }}
        >
          <Breadcrumb
            style={{ margin: "20px 0", direction: "rtl", fontSize: "25px" }}
            items={breadcrumbItems.map((item) => ({ title: item.title }))}
          />

          {children}
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ali Mostafa ©{new Date().getFullYear()} Created by Toshka
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default DashLayout;
