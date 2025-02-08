FROM node:18-alpine

# ตั้งค่า work directory
WORKDIR /app

# Copy package.json และ package-lock.json มาเพื่อ install dependencies
COPY package.json package-lock.json ./
RUN npm install

# ตั้งค่า environment variable สำหรับ production
ENV NODE_ENV=production

# Copy โค้ดทั้งหมดจาก local ไปยัง container
COPY . .

# เปิดพอร์ตที่ Node.js จะฟัง
EXPOSE 8000

# คำสั่งรันแอปพลิเคชันใน production
CMD ["npm", "start"]