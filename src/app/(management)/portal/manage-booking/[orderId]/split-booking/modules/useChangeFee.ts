import { OnChangeFeeForm } from "../_components/FeeForm";
import { useSplitBooking } from "../context";

const useChangeFee = () => {
  const [splitState, setSplitBooking] = useSplitBooking();

  const onChangeFee: OnChangeFeeForm = (fopType, { key, value }) => {
    setSplitBooking((oldData) => {
      const {
        bookingOrder: { fops },
      } = oldData;

      let newFops = [...fops];

      const fopIndex = fops.findIndex((item) => item.type === fopType);

      if (fopIndex !== -1) {
        newFops.splice(fopIndex, 1, {
          ...newFops[fopIndex],
          [key]: value,
        });
      } else {
        let item = { amount: 0, rmk: "" };
        if (key === "amount" && !isNaN(Number(value))) {
          value = Number(value);
          item = {
            rmk: "",
            amount: value,
          };
        }
        if (key === "rmk") {
          value = value.toString();
          item = {
            rmk: value,
            amount: 0,
          };
        }
        newFops = [...newFops, { type: fopType, ...item }];
      }
      return {
        ...oldData,
        bookingOrder: {
          ...oldData.bookingOrder,
          fops: newFops,
        },
      };
    });
  };

  return {
    fops: splitState.bookingOrder.fops,
    onChangeFee: onChangeFee,
  };
};
export default useChangeFee;
