// Check authentication
if (!localStorage.getItem('adminToken')) {
    window.location.href = 'login.html';
}

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    window.location.href = 'login.html';
});

// Image preview handler
document.getElementById('postImage').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" class="img-thumbnail">`;
        }
        reader.readAsDataURL(file);
    }
});

// Save post handler
document.getElementById('savePostBtn').addEventListener('click', async function() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const image = document.getElementById('postImage').files[0];
    const date = new Date().toISOString();

    // Create post object
    const post = {
        id: Date.now(), // Use timestamp as ID
        title: title,
        content: content,
        date: date
    };

    // Save image if exists
    if (image) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            post.image = e.target.result;
            await savePost(post);
        };
        reader.readAsDataURL(image);
    } else {
        await savePost(post);
    }
});

async function savePost(post) {
    try {
        // Lưu vào localStorage
        let posts = localStorage.getItem('posts');
        posts = posts ? JSON.parse(posts) : [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));

        // Update UI
        alert('Bài viết đã được lưu thành công!');
        displayPosts();
        
        // Reset form và đóng modal
        document.getElementById('postForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
        const modal = bootstrap.Modal.getInstance(document.getElementById('addPostModal'));
        modal.hide();
    } catch (err) {
        console.error('Lỗi khi lưu bài viết:', err);
        alert('Có lỗi xảy ra khi lưu bài viết. Vui lòng thử lại!');
    }
}

function displayPosts() {
    const tbody = document.getElementById('postsTableBody');
    let posts = localStorage.getItem('posts');
    posts = posts ? JSON.parse(posts) : [];

    tbody.innerHTML = posts.map(post => `
        <tr>
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.image ? '<img src="' + post.image + '" height="50">' : 'No image'}</td>
            <td>${new Date(post.date).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deletePost(${post.id})">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function deletePost(id) {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
        let posts = localStorage.getItem('posts');
        posts = posts ? JSON.parse(posts) : [];
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    }
}

// Display posts when page loads
displayPosts();
