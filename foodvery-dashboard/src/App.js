import { Layout, Image } from "antd";
import SideMenu from "../src/components/SideMenu";
import { Header } from "../src/components/SignIn/Header.js";
import { SignInHeader } from "../src/components/SignIn/SignInHeader";
import { SignInFooter } from "../src/components/SignIn/SignInFooter";
import AppRoutes from "./components/AppRoutes";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import RestaurantContextProvider from "./contexts/RestaurantContext";

const { Sider, Content, Footer } = Layout;

Amplify.configure(awsconfig);

function App() {
  return (
    <RestaurantContextProvider>
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
    </RestaurantContextProvider>
  );
}

export default withAuthenticator(App, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter,
    },
    Footer,
  },
});
