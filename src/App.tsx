import { Layout } from "antd";
import { useRoutes } from "react-router-dom";
import "./App.scss";
import { routes } from "./routes";

import Logo from "./assets/img/logo.png";

const { Content, Header } = Layout;

function App() {
  const elementRoutes = useRoutes(routes);

  return (
    <Layout className="App">
      <img src={Logo} className="logo" />
      <Content className="content">{elementRoutes}</Content>
    </Layout>
  );
}

export default App;
