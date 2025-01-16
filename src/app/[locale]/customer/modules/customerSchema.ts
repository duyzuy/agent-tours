import { CustomerProfileFormData } from "@/models/fe/profile.interface";
import { object, string } from "yup";

export const customerProfileSchema = object<CustomerProfileFormData>({
  fullname: string().required("ko bo tróng"),
});
