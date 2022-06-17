import { Breadcrumb, Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./layout.css";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;

const LayoutContainer = ({ children }) => (
  <Layout>
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        // defaultSelectedKeys={["1"]}
        items={[
          {
            key: 1,
            label: <Link to="/">Home</Link>,
          },
          {
            key: 2,
            label: <Link to="/filter">Filter</Link>,
          },
        ]}
      />
    </Header>
    <Content
      className="site-layout"
      style={{
        padding: "0 50px",
        marginTop: 64,
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 380,
        }}
      >
        {children}
      </div>
    </Content>
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Yahyo Temirov
    </Footer>
  </Layout>
);

export default LayoutContainer;
