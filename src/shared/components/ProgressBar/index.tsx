import { Progress } from "antd";
import { FC } from "react";

type Props = {
  value: number;
};

const ProgressBar: FC<Props> = ({ value = 0 }) => {
  return (
    <Progress
      percent={value}
      format={(percent) => {
        return percent;
      }}
    />
  );
};

export default ProgressBar;
