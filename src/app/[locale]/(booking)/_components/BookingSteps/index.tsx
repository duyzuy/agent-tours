
import classNames from "classnames";

interface BookingStepsProps {
    activeKey?: number;
}
const BookingSteps: React.FC<BookingStepsProps> = ({ activeKey = 1 }) => {
    const steps = [
        { index: 0, name: "Chọn sản phẩm", key: "product-detail", path: "" },
        { index: 1, name: "Điền thông tin", key: "passenger", path: "" },
        { index: 2, name: "Thanh toán", key: "payment", path: "" },
        { index: 3, name: "Hoàn thành", key: "thank-you", path: "" },
    ];

    return (
        <div className="booking-step-wraper bg-white py-4">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="step-items flex items-center justify-between">
                    {steps.map((step, _index) => (
                        <div
                            className="step relative flex-1 flex items-center justify-center"
                            key={step.key}
                        >
                            <div className="content w-28 lg:w-48 text-center relative z-10">
                                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span
                                        className={classNames(
                                            "rounded-full w-6 h-6 mx-auto flex items-center justify-center",
                                            {
                                                "bg-emerald-500":
                                                    step.index < activeKey,
                                                "bg-amber-500":
                                                    step.index === activeKey,
                                                "bg-gray-100":
                                                    step.index > activeKey,
                                            },
                                        )}
                                    >
                                        {step.index < activeKey ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4 stroke-white"
                                            >
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                        ) : step.index === activeKey ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4 stroke-white"
                                            >
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="19" cy="12" r="1" />
                                                <circle cx="5" cy="12" r="1" />
                                            </svg>
                                        ) : null}
                                    </span>
                                </span>
                                <span className="lg:text-base text-xs">
                                    {step.name}
                                </span>
                            </div>
                            {_index !== 0 ? (
                                <span
                                    className={classNames(
                                        "line h-[2px] bg-gray-200 w-full absolute top-4 right-[100%] translate-x-[50%]",
                                        {
                                            "bg-emerald-500":
                                                step.index <= activeKey,
                                            "bg-gray-200":
                                                step.index > activeKey,
                                        },
                                    )}
                                ></span>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default BookingSteps;
