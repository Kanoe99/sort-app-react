import MonthsDropdown from "@/Components/MonthsDropdown";

const TextContainer = ({
  contentFar,
}: {
  contentFar?: boolean;
  onChange: (value: number) => void;
}) => {
  return (
    <MonthsDropdown
      id=""
      contentFar={contentFar}
      db_head={null}
      department_heads={[]}
      setData={function (key: string, value: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export { TextContainer };
