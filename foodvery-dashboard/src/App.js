import { Layout, Image } from "antd";
import SideMenu from "../src/components/SideMenu";
import AppRoutes from "./components/AppRoutes";

const { Sider, Content, Footer } = Layout;


//https://i.ibb.co/rsNxyWS/logo.png
//https://i.ibb.co/1XQ720R/162328.png
function App() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "white" }}>
        <Image
          src="https://i.ibb.co/PYWxFqN/Red-and-Yellow-Food-Delivery-Service-Logo-845-475-px-1.png"
          preview={false}
          alt="FoodVery-Logo"
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          FoodVery Restaurant Dashboard ©2022
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
