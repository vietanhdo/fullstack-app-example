import React, { useState, useEffect } from 'react';

function App() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    // Kỹ thuật fallback: Lấy biến môi trường từ tiến trình build, nếu trống thì fallback về localhost (môi trường dev)
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    // Thực hiện nối chuỗi với endpoint API tĩnh
    fetch(`${baseUrl}/api/project`)
      .then((response) => response.json())
      .then((data) => setProjectData(data))
      .catch((err) => console.error("API Fetch Error:", err)); // Thêm catch để bảo vệ ứng dụng không bị crash giao diện
  }, []);

  return (
    <div className="App">
      <h1>Project Information</h1>
      {projectData ? (
        <div>
          <h2>{projectData.projectName}</h2>
          <p><strong>Student:</strong> {projectData.studentName}</p>
          <p><strong>Description:</strong> {projectData.projectDescription}</p>
          <a href={projectData.projectUrl} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;