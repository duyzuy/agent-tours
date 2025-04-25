import { Input } from "antd";
import { useFormContext } from "react-hook-form";
const RHFTextField = () => {
  const {} = useFormContext();
  return <Input />;
};
export default RHFTextField;
