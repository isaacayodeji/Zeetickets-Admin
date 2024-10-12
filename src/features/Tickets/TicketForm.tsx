/* eslint-disable @typescript-eslint/no-unused-vars */
import { PageModal } from "../../components/PageModal";
import SubmitButton from "../../components/SubmitButton";
import { category, formConfig, Status } from "../../utils/helper";
import { Button, DatePicker, Form, Input, Select, Spin, Upload } from "antd";
import useTicket from "../../customHooks/useTicket";
import { useState } from "react";
import useToast from "../../customHooks/useToast";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "../../store/hooks";
import { AppPayload } from "../../models/application/payload";
import { setTicketState } from "../../store/slices/ticket.slice";

const TicketForm: React.FC = () => {
  const {
    state,
    form,
    creating,
    isFetching,
    handleFormClick,
    onFinish,
    updating,
  } = useTicket();

  const onNotify = useToast();

  const dispatch = useAppDispatch();

  const [base64Image, setBase64Image] = useState<string | null>(null);

  const disablePastDates = (current: Dayjs | null): boolean => {
    // Ensure that null values (like when no date is selected) are handled properly
    return current ? current < dayjs().startOf("day") : false;
  };
  // Function to convert file to base64
  const getBase64 = (
    file: File,
    callback: (result: string | ArrayBuffer | null) => void
  ) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = () => onNotify("error", "Failed to convert image.");
  };

  const handleChange = (info: any) => {
    const file = info.file.originFileObj;

    if (file) {
      // Check if the file size exceeds 7MB (7 * 1024 * 1024 bytes)
      const isLessThan7MB = file.size / 1024 / 1024 < 7;

      if (!isLessThan7MB) {
        onNotify("error", "Image must be smaller than 7MB!");
        return;
      }

      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        onNotify("error", "You can only upload image files!");
        return;
      }

      // Convert the uploaded image to base64
      getBase64(info.file.originFileObj, (base64: any) => {
        setBase64Image(base64);
        form.setFieldsValue({ image: base64 }); // Set base64 string in form field
      });
    }
  };
  const onSelectChange = (value: Status) => {
    dispatch(setTicketState(new AppPayload("status", value || "AVAILABLE")));
  };
  const onSelectChangeCategory = (value: category) => {
    dispatch(setTicketState(new AppPayload("category", value || "VIP")));
  };

  const disableProps = state.action === "VIEW";

  return (
    <Spin spinning={isFetching}>
      <PageModal
        open={state.showForm}
        onCancel={() => handleFormClick(false, "NONE")}
        centered
        modalFooter={false}
        modalTitle={
          state.action === "CREATE"
            ? "ADD TICKET"
            : state.action === "UPDATE"
            ? "UPDATE TICKET"
            : ""
        }
        closable
        isPadded
        modalWith="27rem"
      >
        <Form
          form={form}
          {...formConfig}
          onFinish={onFinish}
          initialValues={state.request}
          className="relative"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input disabled={disableProps} />
          </Form.Item>
          <Form.Item
            label="PRICE"
            name="price"
            rules={[{ required: true, message: "price is required" }]}
          >
            <Input
              addonBefore="NGN"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                form.setFieldsValue({
                  amount: value.replace(/\B(?=(\d{3})+(?!\d))/g, ","), // Add commas
                });
              }}
              placeholder="N 0.00"
              disabled={disableProps}
            />
          </Form.Item>
          <Form.Item
            label="DESCRIPTION"
            name="description"
            rules={[{ required: true, message: "description is required" }]}
          >
            <Input disabled={disableProps} />
          </Form.Item>
          <Form.Item
            label="DATE"
            name="eventDate"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <DatePicker
              disabledDate={disablePastDates}
              className="py-3 w-full"
              disabled={disableProps}
            />
          </Form.Item>
          <Form.Item
            label="VENUE"
            name="venue"
            rules={[{ required: true, message: "Venue is required" }]}
          >
            <Input disabled={disableProps} />
          </Form.Item>

          <Form.Item
            label="CATEGORY"
            name="category"
            rules={[{ required: true, message: "category is required" }]}
          >
            <Select
              onChange={(e) => onSelectChangeCategory(e as category)}
              className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F]  !text-gray-text !rounded-[8px]"
              defaultValue="Available"
              disabled={disableProps}
              options={[
                {
                  label: "VIP",
                  value: "VIP",
                },
                {
                  label: "VVIP",
                  value: "VVIP",
                },
                {
                  label: "REGULAR",
                  value: "REGULAR",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="STATUS"
            name="status"
            rules={[{ required: true, message: "status is required" }]}
          >
            <Select
              onChange={(e) => onSelectChange(e as Status)}
              className="!bg-[#FFFFFF] dark:!bg-[#1F1F1F]  !text-gray-text !rounded-[8px]"
              defaultValue="Available"
              disabled={disableProps}
              options={[
                {
                  label: "AVAILABLE",
                  value: "AVAILABLE",
                },
                {
                  label: "CANCELLED",
                  value: "CANCELLED",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="SLOTS"
            name="slots"
            rules={[{ required: true, message: "slots is required" }]}
          >
            <Input disabled={disableProps} />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "image is required" }]}
          >
            <div className="w-full">
              <Upload
                maxCount={1}
                onChange={handleChange}
                multiple={false}
                defaultFileList={[]}
              >
                <Button
                  disabled={disableProps}
                  type="primary"
                  className="bg-[#006F01] border-[#006F01] text-[#ffffff!important] hover:bg-[transparent!important] hover:text-[#006F01!important] flex items-center justify-center py-5"
                >
                  Upload
                </Button>
              </Upload>
              {/* {base64Image && (
                <img
                  src={base64Image}
                  alt="Uploaded"
                  style={{ marginTop: "20px", width: "200px" }}
                />
              )} */}
            </div>
          </Form.Item>
          <>
            {!disableProps ? (
              <SubmitButton
                form={form}
                loading={state.action === "CREATE" ? creating : updating}
                block
              >
                {state.action === "CREATE" ? "Submit" : "Update"}
              </SubmitButton>
            ) : (
              ""
            )}
          </>
        </Form>
      </PageModal>
    </Spin>
  );
};

export default TicketForm;
