import { Outlet, Link } from "umi";
import styles from "./index.less";
import { Menu, Breadcrumb, Flex } from "antd";
import {
  SettingOutlined,
  BarChartOutlined,
  BankOutlined,
  TeamOutlined,
  DownOutlined,
  UpOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const BreadcrumbRoutes = [
  {
    href: "/home",
    title: <HomeOutlined />,
  },
  {
    href: "/home",
    title: (
      <>
        <UserOutlined />
        <span>主页</span>
      </>
    ),
  },
  {
    href: "/setting",
    title: (
      <>
        <SettingOutlined />
        <span>设置</span>
      </>
    ),
  },
];

const orerMenu = [
  {
    name: "主页",
    router: "/",
    icon: <BankOutlined />,
    children: [
      { name: "主页", router: "/home" },
      { name: "数据概览", router: "/option-2" },
    ],
  },
  {
    name: "数据概览",
    router: "/navigation-two",
    icon: <BarChartOutlined />,
  },
  {
    name: "设置",
    router: "/",
    icon: <SettingOutlined />,
    children: [
      { name: "设置", router: "/setting" },
      { name: "登录", router: "/login" },
    ],
  },
];

const Layout = () => {
  const user_name = "root账户";
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);

  return (
    <div>
      {/* 顶部导航菜单 */}
      <nav className={styles.navs}>
        <img src="https://www.cqut.edu.cn/2024/img/logo.png" alt="" />
        <div className={styles.user_info}>
          <TeamOutlined style={{ color: "#ffffff", fontSize: 18 }} />
          <span style={{ color: "#ffffff", fontSize: 16, fontWeight: 300 }}>
            {user_name}
          </span>
          <div onClick={() => setShowUserInfo(!showUserInfo)}>
            {showUserInfo ? (
              <UpOutlined style={{ color: "#ffffff", fontSize: 14 }} />
            ) : (
              <DownOutlined style={{ color: "#ffffff", fontSize: 14 }} />
            )}
          </div>
        </div>
        <div
          className={`${styles.detail} ${showUserInfo ? styles.show : styles.hidden}`}
        >
          <div>当前账号</div>
          <div></div>
        </div>
      </nav>
      {/* 主体 */}
      <div className={styles.body}>
        <div className={styles.side}>
          <Menu
            mode="inline"
            style={{ lineHeight: "50px" }}
            defaultSelectedKeys={["0"]}
            theme="light"
          >
            {orerMenu.map((item, index) => {
              if (item.children && item.children.length > 0) {
                return (
                  <Menu.SubMenu key={index} icon={item.icon} title={item.name}>
                    {item.children.map((child, childIndex) => (
                      <Menu.Item key={`${index}-${childIndex}`}>
                        <Link to={child.router}>{child.name}</Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={index} icon={item.icon}>
                    <Link to={item.router}>{item.name}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </div>
        <div className={styles.body}>
          <div className={styles.breadcrumb}>
            <Breadcrumb style={{ fontSize: 16 }} items={BreadcrumbRoutes} />
          </div>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
