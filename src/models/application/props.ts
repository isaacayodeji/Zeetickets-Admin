import {
  ColumnGroupType,
  ColumnType,
  TableRowSelection,
} from "antd/es/table/interface";
import { ReactNode } from "react";

export class TableData<T> {
  dataSource: T[] = [];
  columns: (ColumnGroupType<T> | ColumnType<T>)[] = [];
  spinning?: boolean = false;
  total?: number = 0;
  pageSize?: number = 10;
  onPagination?: (page: number, size: number) => void = () => {};
  onRowSelection?: (_rowIndex: number, record: any) => void;
  shouldExpand?: boolean = false;
  scrollX?: number = 0;
  isNotPaginated?: boolean = false;
  emptyParagraphText?: string = "";
  emptyHeadingText?: string = "";
  rowSelection?: TableRowSelection<T> = {};
  page?: number = 1;
}

export class ModalProps {
  open: boolean = false;
  onCancel: () => void = () => {};
  modalTitle?: string | ReactNode = "";
  modalFooter?: string | ReactNode = "";
  onOk?: () => void = () => {};
  children?: ReactNode;
  cancelText?: string | ReactNode = "";
  okText?: string | ReactNode = "";
  modalWith?: string = "";
  centered?: boolean = true;
  maskClosable?: boolean = false;
  closable?: boolean = false;
  isPadded?: boolean = true;
}
