/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Layout,
  Space,
  Menu,
  Button,
  Typography,
} from "antd";
import { useState, useEffect } from "react";
import FindAllStudent from '../Read/FindAllStudents/FindAllStudents';
import FindByID from '../Read/FindByID/FindByID';
import InsertStudent from "../Create/InsertStudent";

//css
import "./HomePage.css";
import {
  HourglassOutlined,
  FileSyncOutlined, //refresh data
  FileSearchOutlined, //search
  FileDoneOutlined, //notice dont
  EyeOutlined,
  FormOutlined, //edit-update
  DiffOutlined, //add
  DeleteOutlined, //delete
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CopyrightOutlined
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;
export default function HomePage(){
  const [theme, setTheme] = useState("dark");
  const [currentContent, setCurrentContent] = useState(`/`);
  const [collapsed, setCollapsed] = useState(false);
  const serviceStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width:'150px',
    position: 'fixed',
    rowGap:0,
    right:0,
    top: '50%',
    transform: 'translateY(-50%)',
  };
  const menuStyle ={
    width: !collapsed ? '150px': '50px',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
  }
  const buttonMenuStyle ={
    borderRadius:0,
    borderTopLeftRadius: '5px',
    margin:0,
    backgroundColor: theme == "dark" ? "#0B3B61" : "white",
  }
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
    getItem(<a href="#">View</a>, '1', <EyeOutlined />),
    getItem(<a href="#add">Add</a>, '3', <FileSearchOutlined />),
    getItem('Update', 'sub1', <FileDoneOutlined />),
    getItem('Delete', 'sub2', <EyeOutlined />),
  ];
  return (
  <Space
    direction="vertical"
    size="large"
    style={{ display: "block", minHeight: "100vh", width: "100vw" }}
  >
    <Layout theme={theme}>
      <Layout
        theme={theme}
        style={{ minHeight: "100vh", width: "100%" }}
        hasSider={false}
      >
        <Header
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme == "dark" ? "#0B3B61" : "white",
          }}
        >
          <Title
            level={3}
            style={{
              lineHeight: "64px",
              margin: 0,
              marginLeft: 15,
              color: theme == "dark" ? "white" : "black",
            }}
          >
            KITS Student Management System
          </Title>
        </Header>
        <Content>
          <Space style={serviceStyle}>
            <Button
              type="text"
              icon={
                !collapsed ? (
                  <MenuUnfoldOutlined
                    style={{ color: theme == "dark" ? "white" : "black", width: '14px', height: '14px' }}
                  />
                ) : (
                  <MenuFoldOutlined
                    style={{ color: theme == "dark" ? "white" : "black", width: '14px', height: '14px' }}
                  />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={buttonMenuStyle}
            />
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              theme={theme}
              style={menuStyle}
              inlineCollapsed={collapsed}
              items={items}
            />
          </Space>
          <FindAllStudent/>
        </Content>
        <Footer>
          Copyright by Đoàn Minh Hào {String.fromCodePoint(0x00a9)} 2023
        </Footer>
      </Layout>
    </Layout>
  </Space>
);
}