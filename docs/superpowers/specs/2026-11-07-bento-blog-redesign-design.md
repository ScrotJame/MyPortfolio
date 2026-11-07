# Thiết kế Kế hoạch: Redesign Giao diện Blog thành Digital Library Card Vault

**Ngày:** 07/11/2026  
**Nhánh:** `feature/blog-bento-redesign`  
**Trạng thái:** Chờ phê duyệt (Spec Review Gate)

---

## 1. Mục tiêu và Định hướng thẩm mỹ

Nâng cấp toàn bộ trải nghiệm giao diện **Blog / Reviews** từ phong cách classic/HTML truyền thống (`.blog-container`, `.blog-card`) sang **Digital Library Card Vault (Kho lưu trữ thẻ bài thư viện số)** đồng bộ 100% với ngôn ngữ Bento Grid của trang Home Portfolio.

### Yêu cầu cốt lõi từ người dùng:
1. **Bố cục Kho thẻ bài thư viện (Digital Library Vault):**
   - Đóng khung trong tấm **Tablet Slate Frame** bo góc lớn `38px` với kính mờ `#0c0d10/90` tương tự trang Home.
   - Phân loại danh mục theo cơ chế **Kệ sách thư viện (Library Shelves)** thay vì dùng thanh đĩa than:
     - `Tất cả tài liệu // ALL ARCHIVES`
     - `Kệ 01: Ứng dụng & Công cụ // DEV APPS`
     - `Kệ 02: Trò chơi & Đánh giá // GAMING`
   - Ô tìm kiếm nhanh hồ sơ bài viết trực tiếp trên thanh kệ.
2. **Quy chuẩn thẻ bài (Card Styling & Interactions):**
   - Tỷ lệ thẻ đứng `3:4` dạng Trading Card sưu tầm.
   - **Tối giản màu sắc viền:** Trạng thái mặc định **chỉ để màu đen / dark tối giản** (`bg-[#121214]`, viền tối `border-white/10` hoặc `border-neutral-800`), tuyệt đối không có viền màu mè sặc sỡ.
   - **Hiệu ứng hover:** Khi rê chuột vào thẻ bài, kích hoạt hiệu ứng **viền màu xanh (Emerald / Cyan glow)** (`border-emerald-400` / `border-emerald-500/80` kèm bóng hào quang nhẹ).
   - **Loại bỏ các tag line thừa:** Xóa bỏ hoàn toàn mã số `#APP-001`, `#GAME-001` hay các nhãn rườm rà ở đỉnh thẻ.
   - **Nút hành động:** Đổi tên nút thành **"Xem chi tiết →"** (VI) / **"View Details →"** (EN).
   - **Hiệu ứng 3D Tilt:** Giữ hiệu ứng nghiêng đa chiều theo vị trí chuột và phản chiếu vệt sáng kính mờ khi rê chuột.
3. **Màn hình Đọc bài viết (Dedicated Bento Reader):**
   - Bấm vào *"Xem chi tiết"* sẽ chuyển mượt mà sang giao diện đọc chuyên sâu (`/blog/:slug`).
   - Có **thanh tiến độ đọc (Reading Progress Bar)** chạy ở mép trên cùng khung Slate.
   - Nút điều hướng quay lại: `← Quay lại Thư viện`.
   - Typography Markdown tối ưu font Manrope, hỗ trợ code blocks, trích dẫn callout và bảng biểu dark mode.
4. **Không có dock đĩa than:** Trang Blog loại bỏ thanh `VinylTrackSwitcher` ở đáy màn hình.

---

## 2. Kiến trúc Giao diện & Hệ thống màu sắc

### 2.1. Bảng màu (Color Palette & Dark Tokens)
- **Nền trang bao bọc (Page Wrapper):** `#09090b` với ambient mesh glow xanh lục (`bg-emerald-500/20`) và xanh biển (`bg-cyan-600/15`) phân tán ở các góc.
- **Khung Slate Frame chính:** `#0c0d10/90`, viền `border-white/[0.08]`, bo góc `rounded-[32px] sm:rounded-[38px]`, `backdrop-blur-2xl`.
- **Thẻ bài (Card Vault Items):**
  - Trạng thái mặc định: Nền `#121214/95`, viền `border-white/10` (đen xám thanh lịch, không màu mè).
  - Trạng thái Hover: Viền sáng `border-emerald-400/80`, đổ bóng hào quang `shadow-[0_0_24px_rgba(16,185,129,0.22)]`.
- **Thanh Kệ sách (Library Shelf Tabs):**
  - Tab Active: Nền `bg-white/10`, chữ `text-white`, viền `border-white/20`.
  - Tab Inactive: Nền `bg-white/[0.03]`, chữ `text-white/50`, viền `border-white/5`, hover `text-white`.

### 2.2. Phân cấp Typography
- **Tiêu đề trang & Logo:** Font Manrope ExtraBold / Black, chữ in hoa, phong cách kỹ thuật (`CƯỜNG NGUYỄN // DIGITAL ARCHIVES`).
- **Tên Kệ sách (Shelf Labels):** Font mono, `tracking-wider`, `uppercase`, kích cỡ `11px - 12px`.
- **Tiêu đề Thẻ bài (Card Title):** Font Manrope SemiBold / Bold, `text-sm sm:text-base`, màu trắng, dòng hiển thị 2 dòng truncate.
- **Tóm tắt (Summary):** `text-xs`, màu `text-white/60`, `line-clamp-2`.

---

## 3. Kiến trúc Component & Tổ chức File

```
src/
├── components/
│   ├── bento/                          # Giữ nguyên các component trang Home
│   │   ├── BentoLayout.tsx
│   │   ├── Hero3DCard.tsx
│   │   └── ...
│   └── blog/                           # Thư mục component mới cho Blog
│       ├── BlogVaultLayout.tsx         # Khung Slate, Header, Toolbar & chuyển đổi View
│       ├── BlogCard3D.tsx              # Thẻ bài 3D Tilt sưu tầm (đen tối giản -> hover viền xanh)
│       ├── BlogShelfFilter.tsx         # Thanh Kệ sách thư viện & Ô tìm kiếm
│       └── BlogReader.tsx              # Màn hình đọc bài viết Markdown chuyên sâu
├── utils/
│   └── blog.ts                         # Đọc frontmatter, slug, category, rating, markdown
└── App.tsx                             # Định tuyến tích hợp (/ và /blog, /blog/:slug)
```

### 3.1. Chi tiết từng Component

#### `BlogVaultLayout.tsx`
- Nhận props: `locale`, `onLocaleChange`, `activeSlug`, `onSelectPost`, `onNavigateHome`.
- Điều khiển hiển thị:
  - Nếu `activeSlug !== null`: Render `<BlogReader />`.
  - Nếu `activeSlug === null`: Render Kệ sách `<BlogShelfFilter />` và lưới thẻ bài `<BlogCard3D />`.
- Đảm bảo thanh dock đĩa than `VinylTrackSwitcher` không xuất hiện trên trang này.

#### `BlogCard3D.tsx`
- Nhận props: `post: BlogPost`, `locale: 'en' | 'vi'`, `onSelect: () => void`.
- **Logic 3D Tilt:** Tính toán góc nghiêng chuột xoay trục X/Y từ `[-10deg, 10deg]` mượt mà.
- **Visual:**
  - Viền đen mặc định (`border-white/10`), đổi thành viền xanh ngọc khi hover (`hover:border-emerald-400`).
  - Đã loại bỏ hoàn toàn các tag line mã số (`#APP-001`, v.v.).
  - Góc trên hiển thị tinh tế: Huy hiệu sao đánh giá (`★ 9.0/10`) và nhãn nền tảng (`macOS / Windows`).
  - Giữa thẻ: Thumbnail poster đại diện hoặc đồ họa gradient kỹ thuật số.
  - Chân thẻ: Tiêu đề, tóm tắt và nút bấm **"Xem chi tiết →"** (`hover:bg-emerald-500/20 hover:text-emerald-300`).

#### `BlogShelfFilter.tsx`
- Tab phân loại Kệ thư viện:
  - `Tất cả` (All) kèm bộ đếm số lượng.
  - `Ứng dụng` (Apps) kèm icon điện thoại/code.
  - `Trò chơi` (Games) kèm icon tay cầm game.
- Ô tìm kiếm từ khóa theo thời gian thực (lọc tiêu đề và tóm tắt).

#### `BlogReader.tsx`
- Nhận bài viết `activePost`, render Markdown bằng `react-markdown`.
- Thanh **Reading Progress Bar** cố định ở đỉnh Slate: gắn `onScroll` lắng nghe tỷ lệ cuộn và hiển thị dải sáng xanh `emerald-400`.
- Nút bấm `← Quay lại Thư viện` (`onBack`) ở góc trái trên.
- Khối nội dung:
  - Header bài: Tiêu đề lớn, ngày xuất bản, điểm rating, nền tảng, thời gian đọc ước tính.
  - Body: Heading `h2`/`h3` bo viền phát sáng nhẹ, code block có nền đen đậm `#09090b` và font mono, blockquote kính mờ.

---

## 4. Quản lý Trạng thái & Định tuyến (Routing & State)

1. **URL Routing trong `App.tsx`:**
   - Khi ở `/blog`: hiển thị Kho lưu trữ thẻ bài.
   - Khi ở `/blog/:slug`: hiển thị Trình đọc bài viết tương ứng.
   - Sử dụng `window.history.pushState` đồng bộ với `popstate` để hỗ trợ nút Back/Forward của trình duyệt.
2. **Đa ngôn ngữ (Localization):**
   - Toàn bộ nhãn Kệ sách, nút "Xem chi tiết", nút quay lại, tiêu đề và ngày tháng đều hỗ trợ mượt mà cả `VI` và `EN`.

---

## 5. Kế hoạch Kiểm thử & Xác thực (Verification Plan)

1. **Kiểm thử giao diện (UI Verification):**
   - Kiểm tra hiển thị thẻ bài: Nền đen sang trọng, viền đen tối giản, khi hover xuất hiện viền xanh ngọc rõ nét.
   - Xác nhận không còn các tag line mã số thừa (`#APP-001`, `#GAME-001`).
   - Nút hành động hiển thị đúng nhãn: "Xem chi tiết $\rightarrow$".
   - Xác nhận không có thanh đĩa than VinylTrackSwitcher ở trang blog.
2. **Kiểm thử tương tác & Kệ sách (Functional Verification):**
   - Click chuyển qua lại giữa các Kệ `Tất cả`, `Ứng dụng`, `Trò chơi`: Lưới thẻ bài lọc đúng danh mục.
   - Nhập từ khóa vào ô tìm kiếm: Lưới thẻ bài cập nhật chính xác.
   - Click "Xem chi tiết" trên thẻ: Màn hình đọc mở mượt mà, thanh cuộn tiến độ chạy chuẩn xác khi cuộn trang.
   - Click "← Quay lại Thư viện": Trở về đúng danh sách và vị trí đang duyệt.
3. **Kiểm thử tự động (Unit & Integration Tests):**
   - Cập nhật và bổ sung bài test trong `src/Blog.test.tsx` hoặc `src/components/blog/__tests__/` để đảm bảo test coverage xanh 100%.
   - Chạy `npm test` và `npm run build` để đảm bảo không có lỗi TypeScript hay build error.
