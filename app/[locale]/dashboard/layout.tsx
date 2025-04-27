"use client";
import React, { useState, useEffect, useMemo } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { FiUsers } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { FaChalkboardTeacher, FaLaptopCode } from "react-icons/fa";
import { MdOutlineWidgets, MdOutlinePayments } from "react-icons/md";
import { CiSettings, CiLogout } from "react-icons/ci";
import { LuHistory } from "react-icons/lu";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import NavBar from "../components/navbar/NavBar";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/Redux/Slices/Auth/authSlice";
import { useTranslations } from "next-intl";

const DashLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { Header, Content, Sider } = Layout;
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations();

  const getStoredLanguage = (): string => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("userLang");
      return storedLanguage || "ar";
    }
    return "ar";
  };

  const [language, setLanguage] = useState(getStoredLanguage());

  // تحديث localStorage عند تغيير اللغة
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userLang", language);
    }
  }, [language]);

  useEffect(() => {
    if (typeof window !== "undefined" && path) {
      const pathName = path.split("/");
      pathName[1] = language;
      router.replace(pathName.join("/"));
    }
  }, [language, path, router]);

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
      <button>المركز الجماهيري ام الفحم</button>,
      "1",
      <Image src="/logo1.svg" alt="logo" width={20} height={20} />
    ),
    getItem(
      <Link href="/dashboard/overview"> {t("home.home")}</Link>,
      "2",
      <PieChartOutlined />
    ),
    getItem(
      <Link href="/dashboard/students/allStudents">
        {t("students.all.students")}
      </Link>,
      "3",
      <FiUsers />
    ),
    getItem(
      <Link href="/dashboard/parents"> {t("parents.all.guardians")}</Link>,
      "4",
      <GoArrowSwitch />
    ),
    getItem(
      <Link href="/dashboard/teachers">{t("instructors.all.teachers")}</Link>,
      "5",
      <FaChalkboardTeacher />
    ),
    getItem(
      <Link href="/dashboard/courses">{t("courses.all.courses")}</Link>,
      "6",
      <FaLaptopCode />
    ),
    getItem(
      <Link href="/dashboard/subjects">{t("categories.all.topics")}</Link>,
      "7",
      <MdOutlineWidgets />
    ),
    getItem(
      <Link href="/dashboard/payments">{t("other.payments")}</Link>,
      "13",
      <MdOutlinePayments />
    ),
    getItem(
      <Link href="/dashboard/logs">{t("other.logs")}</Link>,
      "8",
      <LuHistory />
    ),
    getItem(
      <button className="cursor-pointer">{t("other.settings")}</button>,
      "9",
      <CiSettings />,
      [
        getItem(
          <Link href="/dashboard/settings/profile">{t("other.profile")} </Link>,
          "10",
          <CiSettings />
        ),
        getItem(
          <Link href="/dashboard/settings/addRole">{t("other.roles")}</Link>,
          "11",
          <CiSettings />
        ),
        getItem(
          <button className="cursor-pointer">{t("other.language")}</button>,
          "12",
          <CiSettings />,
          [
            getItem(
              <button
                onClick={() => setLanguage("ar")}
                className="cursor-pointer"
              >
                العربية
              </button>,
              "12-1",
              <span>AR</span>
            ),
            getItem(
              <button
                onClick={() => setLanguage("he")}
                className="cursor-pointer"
              >
                עברית
              </button>,
              "12-3",
              <span>🇮🇱</span>
            ),
          ]
        ),
      ]
    ),
  ];

  const items2: MenuItem[] = [
    getItem(<button onClick={handleLogout}>{t("btns.logout")}</button>, "11", <CiLogout />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ title: string }[]>([
    { title: `${t("home.home")}` },
  ]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const breadcrumbMap: Record<string, { title: string }[]> = useMemo(
    () => ({
      "1": [{ title: `${t("home.home")}` }],
      "2": [{ title: `${t("home.home")}` }],
      "3": [{ title: `${t("students.all.students")}` }],
      "4": [{ title: `${t("parents.all.guardians")}` }],
      "5": [{ title: `${t("instructors.all.teachers")} ` }],
      "6": [{ title: `${t("courses.all.courses")}` }],
      "7": [{ title: `${t("categories.all.topics")}` }],
      "8": [{ title: `${t("other.payments")}` }],
      "9": [{ title: `${t("other.settings")}` }],
      "13": [{ title: `${t("other.logs")}` }],
    }),
    [t]
  );

  useEffect(() => {
    switch (true) {
      case path.includes("/students"):
        setBreadcrumbItems(
          breadcrumbMap["3"] || [{ title: `${t("students.all.students")}` }]
        );
        break;
      case path.includes("/parents"):
        setBreadcrumbItems(
          breadcrumbMap["4"] || [{ title: `${t("parents.all.guardians")}` }]
        );
        break;
      case path.includes("/teachers"):
        setBreadcrumbItems(
          breadcrumbMap["5"] || [{ title: `${t("instructors.all.teachers")} ` }]
        );
        break;
      case path.includes("/courses"):
        setBreadcrumbItems(
          breadcrumbMap["6"] || [{ title: `${t("courses.all.courses")}` }]
        );
        break;
      case path.includes("/subjects"):
        setBreadcrumbItems(
          breadcrumbMap["7"] || [{ title: `${t("categories.all.topics")}` }]
        );
        break;
      case path.includes("/payments"):
        setBreadcrumbItems(
          breadcrumbMap["8"] || [{ title: `${t("other.payments")}` }]
        );
        break;
      case path.includes("/settings"):
        setBreadcrumbItems(
          breadcrumbMap["9"] || [{ title: `${t("other.settings")}` }]
        );
        break;
      case path.includes("/logs"):
        setBreadcrumbItems(
          breadcrumbMap["13"] || [{ title: `${t("other.logs")}` }]
        );
        break;
      default:
        setBreadcrumbItems([{ title: `${t("home.home")}` }]);
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
          minHeight: "100vh",
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
          style={{ paddingTop: "1rem" }}
        />
        <Image
          src="/sidebar_image.svg"
          alt="sidebar"
          width={500}
          height={530}
          className="pt-4 pl-2"
        />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items2}
          style={{ paddingTop: "1rem" }}
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
            style={{ margin: "20px 0", direction: "rtl", fontSize: "30px" }}
            items={breadcrumbItems.map((item) => ({ title: item.title }))}
          />
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashLayout;
