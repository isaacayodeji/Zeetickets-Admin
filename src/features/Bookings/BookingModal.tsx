import { PageModal } from "../../components/PageModal";
import useBooking from "../../customHooks/useBooking";

const BookingModal = () => {
  const { showDetailsClick, state } = useBooking();
  return (
    <PageModal
      open={state.showForm}
      onCancel={() => {
        showDetailsClick(false);
      }}
      centered
      modalFooter={false}
      modalTitle={"BOOKING INFORMATION"}
      closable
      isPadded
      modalWith="27rem"
    >
      <div className="space-y-4">
        <div className="flex justify-between font-inter-bold">
          <p>BUYER EMAIL :</p>
          <p>{state.record?.buyerEmail}</p>
        </div>

        <div className="flex justify-between font-inter-bold">
          <p>TICKET :</p>
          <p>{state.record?.ticket}</p>
        </div>

        <div className="flex justify-between font-inter-bold">
          <p>QUALITY :</p>
          <p>{state.record?.quantity}</p>
        </div>

        <div className="flex justify-between font-inter-bold">
          <p>TOTAL AMOUNT :</p>
          <p>{state.record?.totalAmount}</p>
        </div>

        <div className="flex justify-between font-inter-bold">
          <p>PAYMENTS STATUS :</p>
          <p>{state.record?.paymentStatus}</p>
        </div>

        <div className="flex justify-between font-inter-bold">
          <p>STATUS :</p>
          <p>{state.record?.buyerEmail}</p>
        </div>

        <div className="flex justify-between font-inter-bold">
          <p>TRANSACTION REF:</p>
          <p>{state.record?.transactionRef}</p>
        </div>

        <div className="flex justify-between font-inter-bold">
          <p>URL:</p>
          <p>{state.record?.authorizationUrl}</p>
        </div>
      </div>
    </PageModal>
  );
};
export default BookingModal;
