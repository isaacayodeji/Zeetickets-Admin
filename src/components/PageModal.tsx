import { Modal } from "antd";
import React from "react";
import { ModalProps } from "../models/application/props";

export const PageModal: React.FC<ModalProps> = ({
  cancelText,
  centered,
  children,
  closable,
  onCancel,
  maskClosable,
  modalFooter,
  modalTitle,
  modalWith,
  okText,
  onOk,
  open,
  isPadded,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={<div className="text-center">{modalTitle}</div>}
      cancelText={cancelText}
      okText={okText}
      width={modalWith}
      closeIcon={null}
      closable={closable}
      maskClosable={maskClosable}
      footer={modalFooter}
      centered={centered}
      onOk={onOk}
      okButtonProps={{ type: "primary" }}
      classNames={{ content: !isPadded ? "!p-0" : "" }}
    >
      <div className="max-h-[85vh] overflow-auto">{children}</div>
    </Modal>
  );
};
