import { Button, Typography } from "antd";
import { PageModal } from "../../components/PageModal";
import useTicket from "../../customHooks/useTicket";

const DeleteModal: React.FC = () => {
  const { state, deleting, onFinish } = useTicket();
  return (
    <PageModal
      open={state.showModal}
      onCancel={() => []}
      centered
      modalFooter={false}
      closable
      isPadded
      modalWith="27rem"
    >
      <div className="space-y-4">
        <Typography>Are you sure you want to delete this ticket ?</Typography>
        <div className="flex">
          <Button loading={deleting} onClick={() => onFinish()}>
            Yes
          </Button>
          {/* <Button onClick={() => handleModalClick(false, "NONE")}>No</Button> */}
        </div>
      </div>
    </PageModal>
  );
};
export default DeleteModal;
