import { Layout } from "antd";
import { useRoutes } from "react-router-dom";
import "./App.scss";
import { routes } from "./routes";

const { Content } = Layout;

function App() {
  const elementRoutes = useRoutes(routes);

  return (
    <Layout className="App">
      <Content className="content">{elementRoutes}</Content>
    </Layout>
  );
}

export default App;
