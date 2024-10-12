import { Typography } from "antd";
import { DataTable } from "../../components/DataTable";
import useBooking from "../../customHooks/useBooking";
import BookingModal from "./BookingModal";

const Bookings: React.FC = () => {
  const { columns, state, dataSource, loading, total } = useBooking();
  return (
    <>
      {state.showForm && <BookingModal />}
      <div>
        <Typography className="text-xl font-inter-medium mt-5">
          Booking
        </Typography>

        <DataTable
          columns={columns}
          dataSource={dataSource}
          emptyHeadingText="No Booking is available"
          emptyParagraphText="There are no booking created yet."
          spinning={loading}
          total={total}
          onPagination={undefined}
        />
      </div>
    </>
  );
};
export default Bookings;
