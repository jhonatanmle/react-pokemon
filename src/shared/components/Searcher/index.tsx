import { Input } from "antd";
import { ChangeEvent, FC } from "react";

const { Search } = Input;

type Props = {
  onSearch: (value: string) => void;
};

const Searcher: FC<Props> = ({ onSearch }) => {
  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Search
      placeholder="Que pokemon buscas..."
      onSearch={handleSearch}
      onChange={handleChange}
    />
  );
};

export default Searcher;
