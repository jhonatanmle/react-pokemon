import { Layout } from "antd";
import "./App.scss";
import Home from "./pages/Home";

const { Content } = Layout;

function App() {
  return (
    <Layout className="App">
      <Content className="content">
        <Home />
      </Content>
    </Layout>
  );
}

export default App;
