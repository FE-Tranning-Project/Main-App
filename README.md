# Employee Management App

Đây là ứng dụng React Native chính dùng để quản lý nhân sự (xem danh sách, thêm, sửa, xóa nhân viên).

## Cấu trúc & Công nghệ sử dụng
- **UI**: Cài đặt và sử dụng các component dùng chung từ thư viện `@thangnoob/ui-components`.
- **State Management**: Dùng Redux Toolkit + Redux Saga để xử lý luồng dữ liệu của ứng dụng.
- **API**: Sử dụng Axios Client cấu hình sẵn tại `src/api` để kết nối và gọi API tới local server (mặc định chạy json-server ở cổng 3000).

## Các màn hình đã thực hiện
- **Màn hình danh sách nhân viên**: Hiển thị danh sách nhân sự lấy từ API, có nút xóa nhanh.
- **Màn hình Form nhân viên**: Dùng chung cho cả 2 luồng Thêm mới và Chỉnh sửa thông tin nhân viên.
