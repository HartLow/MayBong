document.addEventListener('DOMContentLoaded', function() {
    console.log('News loader started'); // Debug log
    setTimeout(loadNewsFromLocalStorage, 500); // Add small delay to ensure DOM is ready
});

function loadNewsFromLocalStorage() {
    const newsContainer = document.getElementById('news-container');
    console.log('News container:', newsContainer); // Debug log

    if (!newsContainer) {
        console.log('News container not found');
        return;
    }

    let posts = localStorage.getItem('posts');
    console.log('Raw posts:', posts); // Debug log

    try {
        posts = posts ? JSON.parse(posts) : [];
        console.log('Parsed posts:', posts);

        if (posts.length === 0) {
            newsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        Chưa có bài viết nào
                    </div>
                </div>`;
            return;
        }

        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Generate HTML for posts
        const newsHTML = posts.map(post => {
            const postDate = new Date(post.date).toLocaleDateString('vi-VN');
            return `
                <div class="col-12 mb-4">
                    <div class="card news-card gradient-border">
                        <div class="card-header bg-white border-bottom-0 py-3">
                            <div class="d-flex align-items-center">
                                <div class="avatar-wrapper">
                                    <img src="images/logo.png" class="rounded-circle avatar-img" width="40" height="40" alt="Mây Bồng">
                                </div>
                                <div class="ms-3">
                                    <div class="fw-bold">Mây Bồng</div>
                                    <div class="text-muted small"><i class="bi bi-clock me-1"></i>${postDate}</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pt-0">
                            <h5 class="card-title mb-3 text-gradient">${post.title}</h5>
                            <p class="card-text mb-3">${post.content}</p>
                            ${post.image ? 
                                `<div class="news-image-container mb-3 gradient-border-light">
                                    <img src="${post.image}" class="img-fluid" alt="${post.title}">
                                </div>` : ''
                            }
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        newsContainer.innerHTML = newsHTML;
        console.log('News loaded successfully');

        // Re-initialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

    } catch (error) {
        console.error('Error loading news:', error);
        newsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger text-center">
                    Có lỗi xảy ra khi tải tin tức
                </div>
            </div>`;
    }
}
