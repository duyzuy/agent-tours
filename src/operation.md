## Xếp phong

1. Phần sếp phòng phải theo booking là của sale (Chỉ các khách trong 1 booking) và booking của điều hành (all khách trong 1 sellable (tour)).

## Thêm chức năng tạo tài khoản staff đi theo Agent.

## Điều hành

1. Thêm phần quản lý tour leader.

### workflow Tour leader

1.1. 1 tour leader là 1 supplier (Không cần setup loại dịch vụ.)

2. Add thêm thông tin số hiệu chuyến bay ngày bay, giờ bay (Thông tin theo từng loại dịch vụ đi kèm trong tour.) theo từng khách.

## Bổ sung Cấu hình phần sản phẩm

1. limitPerBooking => dịch vụ tối đa/pax/booking
2. limitPerOrder => tối đa pax trên mỗi booking

## Frontend

1. Quản lý booking ngoài Frontend (Hiện chưa cho sửa thông tin người đặt và thông tin khách.)

## Quản lý tài khoản đăng ký ngoài frontend

1. thiếu phần quản lý tài khoản đăng ký khách hàng ngoài frontend.
2. hiện tại password đăng ký tài khoản vẫn đang default 123123.

## Các tempalate Email:

1. Email Sau khi booking thành công.
2. Email Xác nhận sau khi thanh toán full đơn hàng.
3. Email thông báo số tiền đã thanh toán. => gửi khi admin duyệt thanh toán trong MMB.
4. Email Đăng ký tài khoản thành công
5. Email thông báo đổi mật khẩu thành công.
6. Email Reset password

## Phân công điều hành

1. Bổ sung thêm phần filter trong endpoint OperationCode_List

- Thêm type: MICE | TOUR | EXTRA;
- Thêm status: "HANDOVERED" | "ACCEPTED" ....

## Đối với kênh Agent booking trong portal

- Không được tách booking =>> oke
- thay đổi thông tin khách, dịch vụ (khi sale chưa bàn giao)

## Ngoài B2c

- khách lẻ không được đổi tên khi đã deposite.
- mua dịch vụ thêm phải liên hệ với sale. hiện tại đang chưa support

## tạo tài khoản Agent staff cho agent. => oke

## handle logic booking channel cho tài khoản agent. chỉ cho nhìn vé b2b. => oke

## Email...

## Meeting presentation 08/02/2025

lỗi nhập leading => lỗi APIs

Phần thanh toán trong MMB bổ sung thêm field add document.
Bỏ nút bàn giao trong rooming
sửa lại giao diện trạng thái document trong từng pax ở điều hành.
