// "use client";
// import React, { useState } from "react";
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import { Breadcrumb, Layout, Menu, theme } from "antd";
// import NavBar from "../navbar/NavBar";

// const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[]
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem("المركز الجماهيري ام الفحم", "1", <img src="/logo1.svg" alt="logo" width={20} height={20} />),
//   getItem("Option 1", "2", <PieChartOutlined />),
//   getItem("Option 2", "3", <DesktopOutlined />),
//   getItem("User", "sub1", <UserOutlined />, [
//     getItem("Tom", "4"),
//     getItem("Bill", "5"),
//     getItem("Alex", "6"),
//   ]),
//   getItem("Team", "sub2", <TeamOutlined />, [
//     getItem("Team 1", "7"),
//     getItem("Team 2", "8"),
//   ]),
//   getItem("Files", "9", <FileOutlined />),
// ];

// const SideBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   console.log(NavBar);
//   console.log("ddddddd");
  
//   const [collapsed, setCollapsed] = useState(false);
//   const [breadcrumbItems, setBreadcrumbItems] = useState([
//     { title: "الرئيسية" },
//   ]);

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   // ✅ Update breadcrumb dynamically based on menu selection
//   const handleMenuClick = ({ key }: { key: string }) => {
//     const breadcrumbMap: Record<string, { title: string }[]> = {
//       "1": [{ title: "الرئيسية" }],
//       "2": [{ title: "التقارير" }],
//       "3": [{ title: "الإعدادات" }],
//       "4": [{ title: "المستخدمين" }, { title: "توم" }],
//       "5": [{ title: "المستخدمين" }, { title: "بيل" }],
//       "6": [{ title: "المستخدمين" }, { title: "أليكس" }],
//       "7": [{ title: "الفِرق" }, { title: "الفريق 1" }],
//       "8": [{ title: "الفِرق" }, { title: "الفريق 2" }],
//       "9": [{ title: "الملفات" }],
//     };
//     setBreadcrumbItems(breadcrumbMap[key] || [{ title: "الرئيسية" }]);
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }} dir="rtl">
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//         theme="light"
//         style={{ background: "white" }}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="light"
//           defaultSelectedKeys={["1"]}
//           mode="inline"
//           items={items}
//           onClick={handleMenuClick}
//         />
//       </Sider>

//       <Layout>
//       <Header style={{ padding: 0, background: "#f0f0f0", height: 64 }} className="haeee">
//   <div style={{
//     background: "red",
//     color: "white",
//     textAlign: "center",
//     padding: "10px",
//     fontSize: "18px",
//     fontWeight: "bold"
//   }}>
//     NavBar
//   </div>
// </Header>

      
//         <Content style={{ margin: "0 16px" }}>
//           <Breadcrumb style={{ margin: "16px 0", direction: "rtl" }} items={breadcrumbItems} />
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//            {children}
//           </div>
//         </Content>
//         <Footer style={{ textAlign: "center" }}>
//           Ant Design ©{new Date().getFullYear()} Created by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default SideBar;
