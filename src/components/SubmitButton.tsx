import { Button, Form, FormInstance } from "antd";
import React, { memo, ReactNode } from "react";

export interface SubmitButtonProps {
  form?: FormInstance;
  children: string | ReactNode;
  block?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const SubmitButton = memo(({
  form,
  children,
  onClick,
  block,
  loading,
}: SubmitButtonProps) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form?.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={submittable ? false : true}
      className="bg-[#006F01] border-[#006F01] disabled:bg-[#006F0130] mx-auto disabled:hover:scale-100  disabled:border-none disabled:hover:bg-[#006F0130!important] disabled:dark:text-[#888!important] disabled:hover:text-[#FFFFFF!important] text-[#ffffff!important] hover:bg-[transparent!important] hover:text-[#006F01!important] hover:scale-95 transition-all flex items-center justify-center py-5 px-10"
      block={block}
      onClick={onClick}
      loading={loading}
    >
      {children}
    </Button>
  );
}) as (props: SubmitButtonProps) => JSX.Element;

export default SubmitButton;
