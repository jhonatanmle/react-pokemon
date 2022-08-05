import { Card, Skeleton } from "antd";

const EmptyCard = () => {
  return (
    <Card bodyStyle={{ textAlign: "center" }}>
      <Skeleton.Image active={true} />
      <br />
      <br />
      <Skeleton paragraph={{ rows: 1 }} active={true} />
    </Card>
  );
};

export default EmptyCard;
