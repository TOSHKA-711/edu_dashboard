"use client";
import React, { useState, useEffect, useMemo } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { FiUsers } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { FaChalkboardTeacher, FaLaptopCode } from "react-icons/fa";
import { MdOutlineWidgets, MdOutlinePayments } from "react-icons/md";
import { CiSettings, CiLogout } from "react-icons/ci";

import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import NavBar from "../components/navbar/NavBar";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../Redux/Slices/Auth/authSlice";

const DashLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { Header, Content, Sider } = Layout;
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname(); 

  // handle logout
  const handleLogout = () => {
    router.push("/auth");
    dispatch(logout());
  };

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
      <Image src="/logo1.svg" alt="logo" width={20} height={20} />
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
    getItem(
      <Link href="/dashboard/parents">أولياء الأمور</Link>,
      "4",
      <GoArrowSwitch />
    ),
    getItem(
      <Link href="/dashboard/teachers">المعلمين</Link>,
      "5",
      <FaChalkboardTeacher />
    ),
    getItem(
      <Link href="/dashboard/courses">الكورسات</Link>,
      "6",
      <FaLaptopCode />
    ),
    getItem(
      <Link href="/dashboard/subjects">المواضيع</Link>,
      "7",
      <MdOutlineWidgets />
    ),
    getItem(
      <Link href="/dashboard/payments">المدفوعات</Link>,
      "8",
      <MdOutlinePayments />
    ),
    getItem(
      <Link href="/dashboard/settings/profile">الاعدادات</Link>,
      "9",
      <CiSettings />,
      [
        getItem(
          <Link href="/dashboard/settings/profile">الملف الشخصي</Link>,
          "10",
          <CiSettings />
        ),
        getItem(
          <Link href="/dashboard/settings/addRole">الاذونات</Link>,
          "11",
          <CiSettings />
        ),
        getItem(
          <Link href="/dashboard/settings/changeLanguage">اللغة</Link>,
          "12",
          <CiSettings />
        ),
      
      ]
    ),
  ];

  const items2: MenuItem[] = [
    getItem(<button onClick={handleLogout}>Logout</button>, "11", <CiLogout />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ title: string }[]>([
    { title: "الرئيسية" },
  ]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const breadcrumbMap: Record<string, { title: string }[]> = useMemo(
    () => ({
      "1": [{ title: "نظرة عامة" }],
      "2": [{ title: "نظرة عامة" }],
      "3": [{ title: "الطلاب" }],
      "4": [{ title: "أولياء الأمور" }],
      "5": [{ title: "المعلمين" }],
      "6": [{ title: "الكورسات" }],
      "7": [{ title: "المواضيع" }],
      "8": [{ title: "المدفوعات" }],
      "9": [{ title: "الاعدادات" }],
    }),
    []
  );

  useEffect(() => {
    switch (true) {
      case path.includes("/students"):
        setBreadcrumbItems(breadcrumbMap["3"] || [{ title: "الرئيسية" }]);
        break;
      case path.includes("/parents"):
        setBreadcrumbItems(breadcrumbMap["4"] || [{ title: "الرئيسية" }]);
        break;
      case path.includes("/teachers"):
        setBreadcrumbItems(breadcrumbMap["5"] || [{ title: "الرئيسية" }]);
        break;
      case path.includes("/courses"):
        setBreadcrumbItems(breadcrumbMap["6"] || [{ title: "الرئيسية" }]);
        break;
      case path.includes("/subjects"):
        setBreadcrumbItems(breadcrumbMap["7"] || [{ title: "الرئيسية" }]);
        break;
      case path.includes("/payments"):
        setBreadcrumbItems(breadcrumbMap["8"] || [{ title: "الرئيسية" }]);
        break;
      case path.includes("/settings"):
        setBreadcrumbItems(breadcrumbMap["9"] || [{ title: "الرئيسية" }]);
        break;
      default:
        setBreadcrumbItems([{ title: "الرئيسية" }]);
        break;
    }
  }, [path, breadcrumbMap]);

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
          style={{ paddingTop: "2rem" }}
        />
        <Image
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
      </Layout>
    </Layout>
  );
};

export default DashLayout;
