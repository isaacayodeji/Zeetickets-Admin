import { FormProps } from "antd";

export const routerPath = {
  Tickets: "/tickets",
  Dashboard: "/",
  Bookings: "/bookings",
};

export const appTitle = " - a platform to booking your show tickets";

export const splitAndCapitalize = (word: string): string => {
  // Capitalize "DTO" or "DTOS" if they exist (case-insensitive match)
  let separatedWords = word.replace(/\bdto(s?)\b/gi, "DTO$1");
  // Split the word at uppercase letters and join with a space
  separatedWords = separatedWords.replace(/([A-Z])/g, " $1").trim();

  // Capitalize the first letter of the resulting string
  return (
    separatedWords.charAt(0).toUpperCase() +
    separatedWords.slice(1).toLowerCase()
  );
};

export const formConfig: FormProps = {
  autoComplete: "off",
  layout: "vertical",
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  requiredMark: "optional",
};

export type FilterDays = "TODAY" | "YESTERDAY" | "DAYS_7" | "DAYS_30";
export type FormAction = "CREATE" | "UPDATE" | "DELETE" | "NONE" | "VIEW";
export type Status = "AVAILABLE" | "CANCELLED";
export type category = "VIP" | "VVIP" | "REGULAR";
