import { Button, Card, Image, Spin } from "antd";
import { FC } from "react";
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import styles from "./style.module.scss";

type Props = {
  id: number;
  name: string;
  image: string;
  showIconButton?: boolean;
  isSelected?: boolean;
  onIconClick?: (id: number) => void;
  onCardClick?: (id: number) => void;
};
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PokemonCard: FC<Props> = ({
  id,
  name,
  image,
  showIconButton,
  isSelected,
  onIconClick,
  onCardClick,
}) => {
  const handleIconClick = (event: any) => {
    event.stopPropagation();
    onIconClick?.(id);
  };

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const actionIcon = showIconButton ? (
    <Button shape="circle" onClick={handleIconClick}>
      {!isSelected ? <PlusOutlined /> : <DeleteOutlined />}
    </Button>
  ) : null;

  return (
    <Card onClick={handleCardClick} extra={actionIcon}>
      <div className={styles.card}>
        <Image
          src={image}
          preview={false}
          placeholder={
            <div className={styles.spin}>
              <Spin indicator={antIcon} />
            </div>
          }
        />
        <div className={styles.containerName}>
          <span className={styles.name}>{name}</span>
        </div>
      </div>
    </Card>
  );
};

export default PokemonCard;
