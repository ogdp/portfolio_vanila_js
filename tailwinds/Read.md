## Setup môi trường cho tailwind

0. Cài đặt node JS
   npm install -g
1. npm init -y
2. Tạo folder cùng cấp file index.html với tên
   css > tailwind.css
3. npm install -D tailwindcss postcss autoprefixer vite
4. npx tailwindcss init -p
<!-- Bước 5 bỏ qua cũng được -->
5. Mở file package.json:
   - Thay đổi : "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
     },
   - Thành : "dev" : "vite",
6. npm run dev
7. npx tailwindcss-cli build css/tailwind.css -o build/tailwind.css
8. nhúng cdn: <script src="https://cdn.tailwindcss.com"></script> và link css: css/build/taiwind.css
