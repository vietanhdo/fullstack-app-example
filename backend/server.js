// Import the Express framework for building the server
const express = require('express');

// Import the CORS package to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Create an Express application instance
const app = express();

// Set the port for the server to listen on, using an environment variable if available, or defaulting to 5000
const PORT = process.env.PORT || 5000;

// Use the CORS middleware to enable cross-origin requests from any origin
app.use(cors());

/*
// [Security] Cross-Origin Resource Sharing
// Khi lên Production thực tế, anh nên uncomment đoạn này và thay URL của Vercel vào
// để ngăn chặn các domain lạ gọi trộm API, gây tốn băng thông (FinOps impact).
app.use(cors({
  origin: ['http://localhost:3000', 'https://ten-du-an-cua-anh.vercel.app'], 
  methods: ['GET', 'POST'],        
}));
*/

// Use the JSON middleware to automatically parse incoming JSON requests
app.use(express.json());

// Define a GET route at /api/project to handle API requests from the frontend
app.get('/api/project', (req, res) => {
    // Send a JSON response containing information about the project
    res.json({
        studentName: "Smith, John",
        projectName: "Weather App",
        projectUrl: "http://10.0.0.1:3000/",
        projectDescription: "This application provides real-time weather updates for any location worldwide."
    });
});

// [Reliability & Scalability] Cloud-Native Server Initialization
// BẮT BUỘC thêm '0.0.0.0' để Render Reverse Proxy có thể route traffic từ ngoài internet vào Docker container.
// Nếu không có '0.0.0.0', app chỉ listen ở localhost nội bộ của container và Render sẽ báo lỗi Port Scan Timeout.
const server = app.listen(PORT, '0.0.0.0', () => {
    // Log a message to indicate the server is running
    console.log(`Server space initialized and listening on port ${PORT}`);
});

// [Reliability] Graceful Shutdown Handling
// Render (hay AKS/Kubernetes) sẽ gửi tín hiệu SIGTERM khi deploy bản mới hoặc scale-in.
// Đoạn code này giúp Server dọn dẹp port sạch sẽ, hoàn tất các request đang dở trước khi tắt,
// triệt tiêu tình trạng zombie process gây lỗi EADDRINUSE như lúc anh test ở local.
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    console.log(`\n[${signal}] signal received: closing HTTP server`);
    server.close(() => {
      console.log('HTTP server closed gracefully');
      process.exit(0);
    });
  });
});