document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Mock authentication - replace with real authentication
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminToken', 'mock-token');
        window.location.href = 'dashboard.html';
    } else {
        alert('Sai thông tin đăng nhập!');
    }
});
