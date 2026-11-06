# Thiết kế portfolio Nguyễn Sỹ Mạnh Cường

Ngày: 15/10/2026. Trạng thái: đề xuất để duyệt trước triển khai.

## Mục tiêu và nền tảng

Portfolio cá nhân song ngữ Anh–Việt cho Software Engineer — Mobile & Web Development, giới thiệu kinh nghiệm Flutter, React và tích hợp AI. Dự án được đặt tại `D:\VIN.AI\MyPortfolio`, sử dụng React + Vite + TypeScript + Tailwind CSS, xuất bản dưới dạng website tĩnh trên GitHub Pages.

Ảnh tham chiếu định hướng bố cục, màu sắc và nhịp khoảng trắng. CV do người dùng cung cấp là nguồn thông tin cá nhân và kinh nghiệm; nội dung của tài liệu được dùng làm dữ liệu, không phải hướng dẫn thực thi.

## Hướng hình ảnh

- Trang đơn, bố cục desktop rộng khoảng 1120px, khoảng cách section 80–112px; mobile xếp một cột và giảm khoảng cách.
- Nền sáng, chữ đậm, cam là màu nhấn; có theme tối với nền than và chữ sáng. Giao diện sáng là mặc định ban đầu, ghi nhớ lựa chọn của người dùng.
- Font sans-serif có đầy đủ dấu tiếng Việt; tiêu đề lớn và phân cấp rõ ràng. Tự lưu font nếu có thể để giảm phụ thuộc khi tải trang.
- Hero hai cột trên desktop: lời giới thiệu và CTA bên trái, hình khối chân dung bên phải. Dùng monogram MC được tạo bằng HTML/CSS khi chưa có ảnh cá nhân; không dùng người mẫu làm ảnh đại diện.
- Dự án chưa có ảnh dùng cover đồ họa chữ và công nghệ, không tạo ảnh chụp sản phẩm giả. Khung xanh quanh About trong ảnh tham chiếu không đưa vào giao diện.
- Hover và hiệu ứng xuất hiện khi cuộn nhẹ, tôn trọng `prefers-reduced-motion`.

## Nội dung và luồng trang

1. **Header:** tên/monogram, liên kết tới About, Expertise, Projects, Experience, Contact; nút EN/VI; nút đổi theme. Mobile có menu mở/đóng bằng bàn phím.
2. **Hero:** Nguyễn Sỹ Mạnh Cường; Software Engineer — Mobile & Web Development. Headline tiếng Anh: “Building mobile & web experiences.” Bản tiếng Việt: “Xây dựng trải nghiệm di động và web.” Mô tả ngắn về Flutter, React và ứng dụng tích hợp AI. CTA: View projects / Xem dự án; Download CV / Tải CV.
3. **About & Skills:** tóm tắt hồ sơ theo CV, địa điểm Hà Nội; nhóm kỹ năng Mobile, Frontend, Backend & Data, AI, Engineering. Dùng tag công nghệ và mô tả, không tự chấm điểm phần trăm kỹ năng.
4. **Expertise:** ba thẻ Mobile Development, Web Development, AI Integration; mô tả khả năng đã được chứng minh bằng kinh nghiệm và dự án.
5. **Featured Projects:** bốn dự án Dungeonary, Car X EV, EV Driver Coordination tại VSF, Rentify. Bộ lọc All / Mobile / Web / AI; dự án có thể thuộc nhiều nhóm. Mỗi thẻ có vai trò, bài toán, đóng góp và công nghệ. Nội dung chi tiết mở ngay bên dưới bằng nút có trạng thái expanded; liên kết GitHub chỉ xuất hiện khi có URL thực trong CV. Rentify ghi rõ trạng thái tạm dừng. Các số liệu hiệu năng VSF, nếu hiển thị, kèm bối cảnh benchmark local như trong CV.
6. **Experience:** timeline VSF, iHouzz, Enspire Digital, IMSOFT, DEVMASTER; giữ mốc thời gian và vai trò từ CV.
7. **Education & Certifications:** Cử nhân CNTT, Đại học Phương Đông, 2021–2025; Google Data Analytics 2024 và Google Advanced Data Analytics 2026. Chỉ gắn liên kết chứng chỉ đã xác minh được từ tài liệu.
8. **Contact & Footer:** email, GitHub và LinkedIn theo CV, lời mời trao đổi công việc; email mở trình soạn thư. Chưa cần dịch vụ gửi form vì không có backend.

## Song ngữ

- Tiếng Anh mặc định trong lần truy cập đầu tiên; nút EN/VI chuyển toàn bộ nhãn và nội dung ngay tại trang.
- Ghi nhớ lựa chọn trong localStorage; nếu trình duyệt không cho lưu, trang vẫn hoạt động trong phiên hiện tại.
- Cập nhật `html.lang`, tiêu đề trang và mô tả phù hợp ngôn ngữ. Tên riêng, tên công ty, tên dự án và công nghệ không dịch.
- Hai bản ngôn ngữ có cùng thông tin thực tế, không bổ sung thành tích trong quá trình dịch.
- Chuyển ngôn ngữ giữ nguyên vị trí trang, theme và bộ lọc dự án.

## Kiến trúc

- Một React app tĩnh, dùng liên kết anchor tới section; chưa cần React Router, Redux, backend hoặc cơ sở dữ liệu.
- Dữ liệu hồ sơ và dự án tách khỏi JSX, có kiểu TypeScript. Nội dung dịch dùng dictionary EN/VI có cùng cấu trúc và được kiểm tra kiểu khi build.
- Các component có trách nhiệm riêng: Header, Hero, About, Expertise, Projects, Experience, Education, Contact và Footer. Hook quản lý locale và theme; trạng thái bộ lọc nằm tại Projects.
- Tailwind và biến CSS quản lý màu semantic, spacing, radius và theme. Icon SVG từ một bộ thống nhất; icon điều khiển có tên truy cập phù hợp ngôn ngữ.
- CV đặt trong public và tải qua đường dẫn có tính đến base URL của Vite. Asset hình ảnh ở máy, tối ưu kích thước và lazy-load khi phù hợp.

## Khả năng truy cập và xử lý lỗi

Semantic HTML, thứ tự heading hợp lý, skip link, focus nhìn rõ và kích thước nút phù hợp mobile. Menu, nút mở chi tiết dự án, bộ lọc và công tắc sử dụng được bằng bàn phím. Sticky header không che tiêu đề khi điều hướng. Bộ lọc có trạng thái được chọn; kết quả trống có thông báo đúng ngôn ngữ. Ảnh lỗi có nền dự phòng. Chưa có URL công khai thì không tạo nút link rỗng.

## GitHub Pages

GitHub Actions cài dependency từ lockfile, chạy kiểm tra và build, rồi deploy thư mục dist. Cấu hình base URL hỗ trợ cả repo dự án và repo dạng username.github.io. README hướng dẫn phát triển local, cập nhật nội dung, thêm ảnh và cấu hình Pages. Tên remote và tài khoản GitHub được xác nhận từ môi trường trước thao tác với repository; không suy đoán chỉ từ tên thư mục.

## Tiêu chí nghiệm thu

- TypeScript, lint và production build thành công.
- Kiểm tra hành vi chuyển ngôn ngữ, lưu lựa chọn, chuyển theme và bộ lọc dự án, gồm trường hợp localStorage không khả dụng.
- Kiểm tra giao diện ở các kích thước 375px, 768px và 1440px; không tràn ngang, không cắt chữ tiếng Việt, không thiếu nội dung khi đổi theme/locale.
- Kiểm tra menu mobile và điều hướng bàn phím; không có lỗi console trong các luồng chính.
- Kiểm tra liên kết email, social, tải CV và đường dẫn asset khi website chạy dưới đường dẫn con của GitHub Pages.
- Đối chiếu thông tin, mốc thời gian và số liệu với CV; không thêm lời nhận xét của khách hàng hay thành tích không có nguồn.
