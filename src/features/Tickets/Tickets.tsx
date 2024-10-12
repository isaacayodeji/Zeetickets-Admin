import { Button, Typography } from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";
import { DataTable } from "../../components/DataTable";
import useTicket from "../../customHooks/useTicket";
import TicketForm from "./TicketForm";

const Tickets: React.FC = () => {
  const {
    columns,
    state,
    handleFormClick,
    dataSource,
    total,
    isFetching,
    onPaginate,
  } = useTicket();
  console.log(state.page);

  return (
    <>
      {state.showForm && <TicketForm />}
      <div>
        <Typography className="text-xl font-inter-medium mt-5">
          Tickets
        </Typography>
        <div className="gap-x-2">
          <Button
            type="primary"
            className="my-5 float-end shadow-none font-inter-medium"
            icon={<IoMdAddCircleOutline size={20} />}
            onClick={() => handleFormClick(true, "CREATE")}
          >
            Add Ticket
          </Button>
        </div>
        <DataTable
          columns={columns}
          dataSource={dataSource}
          emptyHeadingText="No Tickets available"
          emptyParagraphText="There are no ticket created yet."
          spinning={isFetching}
          total={total}
          pageSize={state.size}
          page={state.page}
          onPagination={onPaginate}
        />
      </div>
    </>
  );
};
export default Tickets;
