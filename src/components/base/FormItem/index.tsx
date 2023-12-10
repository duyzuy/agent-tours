import { Form, FormItemProps } from "antd";
import { FormItemWrapper } from "./FormItemWrapper.style";

type Props = FormItemProps & {
    children?: React.ReactNode;
};
const FormItem: React.FC<Props> = (props) => {
    return (
        <FormItemWrapper>
            <Form.Item {...props}>{props.children}</Form.Item>
        </FormItemWrapper>
    );
};
export default FormItem;
