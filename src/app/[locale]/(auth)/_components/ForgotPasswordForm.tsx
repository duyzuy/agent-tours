import FormItem from "@/components/base/FormItem";
import { Form, Input } from "antd";

interface ForgotPasswordFormProps {}
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = () => {
  return (
    <div>
      <Form>
        <FormItem label="Email">
          <Input name="teen " />
        </FormItem>
        <FormItem>
          <Input name="teen " />
        </FormItem>
        <FormItem>
          <Input name="teen " />
        </FormItem>
      </Form>
    </div>
  );
};
export default ForgotPasswordForm;
