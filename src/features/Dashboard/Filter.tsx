import { Select } from "antd";

const Filter: React.FC = () => {


  return (
    <div className="flex items-center justify-end gap-5">
      <Select
        onChange={() => {}}
        className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F] !w-36 !text-gray-text !rounded-[8px]"
        defaultValue="TODAY"
        options={[
          {
            label: "Today",
            value: "TODAY",
          },
          {
            label: "Yesterday",
            value: "YESTERDAY",
          },
          {
            label: "A Week",
            value: "DAYS_7",
          },
          {
            label: "A Month",
            value: "DAYS_30",
          },
        ]}
      />
    </div>
  );
};

export default Filter;
