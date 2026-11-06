# Thiết kế Bento Grid Dark Mode Portfolio & Vinyl Track Switcher

**Ngày:** 07/11/2026  
**Nhánh:** `feature/ui-redesign`  
**Trạng thái:** Đề xuất để duyệt trước khi triển khai (Spec Review)

---

## 1. Mục tiêu và Định hướng thẩm mỹ

Nâng cấp giao diện Portfolio cá nhân của **Nguyễn Sỹ Mạnh Cường** từ phong cách classic/editorial trước đây sang **Modern Dark Mode Bento Grid Dashboard**, lấy cảm hứng từ tác phẩm thiết kế nổi tiếng *"Digital Pass"* của tác giả Max (@aximoris) trên Spline & Aceternity Bento Grid.

### Điểm đột phá về tương tác (Interactive Vinyl Track Switcher)
- Thay vì sử dụng switch/toggle công tắc thông thường, giao diện sử dụng cơ chế **chuyển bài nhạc bằng đĩa than vinyl (Vinyl Music Disc)** đặt ở góc phải bên dưới màn hình.
- Đĩa nhạc quay liên tục, có vân đĩa riêng biệt và viền nổi bật. Khi click/tương tác, đĩa sẽ kích hoạt đổi "bản nhạc chuyên môn" giữa **App Dev** và **Game Dev**.
- **Hiệu ứng chuyển đổi (Transition Choreography):**
  - **Khung Bento (Container):** Giữ nguyên vị trí cố định, không co giật hay thay đổi layout.
  - **Màu sắc chủ đạo (Color Palette Wipe):** Biến đổi màu dạng quét/transform mượt mà từ trái sang phải (*left-to-right gradient sweep*).
  - **Nội dung bên trong (Content Animation):** Fade-in kết hợp trượt nhẹ từ dưới lên (*fade + slide-up from bottom*) thông qua Framer Motion.

---

## 2. Hệ thống màu sắc theo từng Track (Dev Modes)

### 2.1. Track "App Dev" (Chuyên môn Ứng dụng Di động, Web & AI)
- **Cảm hứng:** Tech Obsidian, Cyber Precision, High-craft Engineering.
- **Màu chủ đạo (Primary Accent):** `Emerald Neon` (`#10b981`) pha `Cyan Blue` (`#06b6d4`).
- **Ambient Glow:** Ánh sáng hào quang xanh lục ngọc bích tỏa sang xanh biển mờ ảo phía trên Hero 3D Card.
- **Viền đĩa than:** Xanh Emerald sáng (`#10b981`).
- **Nội dung nổi bật:** Dự án VSF EV Dispatch, CarX AI, Dungeonary, Rentify; bộ kỹ năng Flutter, React, FastAPI, AI Agents.

### 2.2. Track "Game Dev" (Chuyên môn Phát triển Game)
- **Cảm hứng:** Arcade Cyberpunk, Creative Interactive, Neon Glow.
- **Màu chủ đạo (Primary Accent):** `Neon Violet / Magenta` (`#a855f7`) pha `Cyber Amber / Orange` (`#f59e0b`).
- **Ambient Glow:** Ánh tím neon huyền bí kết hợp cam lửa chạy ngầm ở đỉnh card.
- **Viền đĩa than:** Tím Neon sáng (`#a855f7`).
- **Nội dung nổi bật:** Dự án Enspire Digital (Unity - iOS Platform Channel), IMSOFT game internship, các module game 3D/2D; bộ kỹ năng Unity, C#, C++, Shader, 3D Math, Game Physics.

---

## 3. Kiến trúc bố cục & Lưới Bento Grid (3 Cột)

Giao diện được bọc trong khung trung tâm `max-w-7xl mx-auto px-4 py-6 min-h-screen flex flex-col justify-center`, nền ngoài là hiệu ứng **Ambient Blurred Mesh Gradient** phát sáng nhẹ nhàng tạo chiều sâu thị giác.

### 3.1. Desktop (>= 1024px) — Lưới 12 cột (`grid-cols-12 gap-5`)
1. **Khối 1: Intro Card (Cột trái — `col-span-4`)**
   - **Header Card:** Badge trạng thái nhấp nháy `🟢 Open to opportunities` và handle `@cuongnsm`.
   - **Headline lớn:** *"Hello! I'm Cuong"* (VI: *"Xin chào! Mình là Cường"*).
   - **Bio thích ứng:** Đoạn giới thiệu ngắn thay đổi theo track (App Dev nhấn mạnh Clean Architecture, Mobile/Web/AI; Game Dev nhấn mạnh Unity, C#, Gameplay & Đồ họa).
   - **Skill Pills:** Danh sách nhãn bo tròn (`rounded-full bg-white/5 border border-white/10 text-xs px-3 py-1`) tương ứng với từng track.
   - **Mini Map & Local Time Widget:**
     - Tọa độ Hà Nội, Việt Nam (`Hanoi, VN`).
     - Đồng hồ số hiển thị giờ thực tế múi giờ GMT+7 (chạy live update từng giây).
     - Bản đồ radar vector mini với chấm phát sáng nhịp tim (pulsing dot) định vị vị trí.
   - **Cụm CTA:** Nút *"Contact me"* bo tròn nền trắng nổi bật (`bg-white text-black font-semibold rounded-full hover:bg-neutral-200`) và nút *"CV"* kính mờ (`bg-white/10 text-white border border-white/15 rounded-full hover:bg-white/20`).

2. **Khối 2: Hero 3D Card (Cột giữa — `col-span-5` — Spotlight)**
   - **Background:** SVG Dot Matrix Grid phủ mờ tinh tế kết hợp đỉnh hào quang tỏa sáng (Aura Glow).
   - **Component 3D tương tác (Spline):**
     - Nhúng mô hình 3D thẻ số *"Digital Pass"* tương tác xoay 360 độ theo con trỏ chuột bằng `@splinetool/react-spline`.
     - **Graceful Fallback:** Tự động hiển thị thẻ tương tác 3D Canvas / CSS Perspective nếu thiết bị không hỗ trợ WebGL hoặc khi tài nguyên 3D đang tải, đảm bảo không có gián đoạn hiển thị.
   - **Bottom Label:** *"Digital Pass · Interactive 3D"* kèm chỉ dẫn rê chuột xoay thẻ.

3. **Khối 3: Social Hub Card (Cột phải trên — `col-span-3`)**
   - Bố cục Radial / Hexagonal đối xứng quanh tâm điểm phát sáng.
   - 6 vệ tinh mạng xã hội: **GitHub**, **LinkedIn**, **Email**, **Figma**, **YouTube/Game**, **Blog**.
   - Hover effect: Phóng to nhẹ (`scale-110`), hiệu ứng hút từ tính (Magnetic hover) và tooltip tên kênh.

4. **Khối 4: Latest Projects Card (Cột phải dưới — `col-span-3`)**
   - Header *"Latest projects"* kèm số lượng case studies.
   - Danh sách case studies dạng vertical stack cuộn mượt:
     - Avatar/Logo bo góc với màu gradient riêng cho từng dự án.
     - Tên dự án và phân loại ngắn (`Mobile App`, `AI Platform`, `Unity Game`).
     - Biểu tượng mũi tên mở rộng (`ArrowUpRight`).
   - Click vào dự án sẽ kích hoạt **Slide-over Modal kính mờ** hiển thị chi tiết (bài toán, giải pháp, công nghệ, link source).

5. **Bộ điều khiển đĩa than Vinyl (Bottom Right Vinyl Player Controller)**
   - Nằm cố định ở góc dưới cùng bên phải của giao diện Bento (hoặc ngay góc Khối 4/trang).
   - Thiết kế đĩa than hình tròn đang quay chậm đều (`animate-spin-slow`), vân rãnh đĩa đồng tâm, tâm đĩa có nhãn mock hiển thị track hiện tại (`APP` hoặc `GAME`).
   - Viền ngoài đĩa phát sáng và chuyển màu theo track.
   - Khi click vào đĩa: Kích hoạt âm thanh visual feedback nhẹ, đĩa tăng tốc quay nhẹ và chuyển đổi toàn bộ giao diện sang track còn lại.

### 3.2. Mobile & Tablet (< 1024px)
- Tự động chuyển đổi thành 1 cột mượt mà (`grid-cols-1 gap-4`).
- Thứ tự hiển thị: Hero 3D Card / Intro $\rightarrow$ Projects $\rightarrow$ Social Hub $\rightarrow$ Đĩa than điều khiển nổi ở góc dưới màn hình (floating vinyl dock).

---

## 4. Hệ thống Chuyển cảnh & Animation (Choreography)

```
[User clicks Vinyl Disc]
         │
         ├──► 1. Vinyl Spin Pulse & Border Color Shift
         │
         ├──► 2. Container Theme Color Wipe (Left to Right Sweep)
         │       Background gradient overlay trượt từ trái sang phải
         │
         └──► 3. Content AnimatePresence (Fade + Slide-Up)
                 - initial: { opacity: 0, y: 20 }
                 - animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
                 - exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
```

---

## 5. Thư viện phụ thuộc (Dependencies) & Công nghệ

1. **`framer-motion`**: Điều phối animation đổi track, modal backdrop, hover magnetic effect.
2. **`@splinetool/react-spline` & `@splinetool/runtime`**: Render mô hình 3D Spline Digital Pass.
3. **`lucide-react`**: Hệ thống icon đồng bộ chuẩn xác.
4. **`tailwindcss` v4**: Quản lý CSS Grid, utility classes và CSS Variables.
5. **Đa ngôn ngữ (English & Tiếng Việt)**: Tích hợp đầy đủ vào từ điển `src/data/content.ts`.

---

## 6. Khả năng truy cập (Accessibility) & Xử lý ngoại lệ

- **`prefers-reduced-motion`**: Nếu người dùng kích hoạt giảm chuyển động trên hệ điều hành, đĩa than sẽ dừng tự quay, animation chuyển đổi đổi thành cross-fade đơn giản không giật mắt.
- **Tương thích phím**: Đĩa than và các thẻ dự án có thể kích hoạt bằng phím `Enter` / `Space`, có vòng focus nhìn rõ (`focus-visible:ring-2`).
- **Thời gian thực (Live Clock)**: Sử dụng `Intl.DateTimeFormat` với múi giờ `Asia/Bangkok` để luôn hiển thị chính xác giờ Hà Nội dù người xem ở bất kỳ quốc gia nào.
- **Graceful Spline Fallback**: Đảm bảo component 3D không bao giờ gây crash trang nếu Spline CDN bị chặn hoặc WebGL lỗi.

---

## 7. Kế hoạch kiểm thử (Testing Strategy)

- **Unit tests (Vitest):**
  - Kiểm tra logic chuyển track `app` ⟷ `game` khi click đĩa than.
  - Kiểm tra hiển thị đúng giờ địa phương GMT+7.
  - Kiểm tra dictionary ngôn ngữ EN/VI đầy đủ các key cho cả 2 track.
  - Kiểm tra mở/đóng modal chi tiết dự án.
- **Visual verification:** Kiểm tra trên các độ phân giải màn hình Desktop (1440px, 1280px), Tablet (768px), Mobile (375px).

