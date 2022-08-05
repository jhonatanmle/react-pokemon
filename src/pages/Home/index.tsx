import { Col, Row } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@shared/hooks/store";
import { fetchPokemonsWithDetails } from "@store/slices/pokemonSlice";

import styles from "./styles.module.scss";
import BattleZone from "./components/BattleZone";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemonsWithDetails());
  }, []);

  return (
    <div className={styles.home}>
      <Row gutter={[0, 24]}>
        <Col
          span={24}
          md={{
            span: 16,
          }}
        >
          <div className={styles.outletContainer}>
            <Outlet />
          </div>
        </Col>
        <Col
          span={24}
          md={{
            span: 8,
          }}
        >
          <BattleZone />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
