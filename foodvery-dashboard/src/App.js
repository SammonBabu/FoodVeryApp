import { Layout, Image } from "antd";
import SideMenu from "../src/components/SideMenu";
import AppRoutes from "./components/AppRoutes";
import {Amplify} from 'aws-amplify';
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';
import "@aws-amplify/ui-react/styles.css";

const { Sider, Content, Footer } = Layout;

Amplify.configure(awsconfig);

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

export default withAuthenticator(App);
