// User Data
const currentUser = {
    id: 1,
    name: "Mark Zuckerberg",
    profilePic: "https://via.placeholder.com/100/1877f2/ffffff?text=MZ"
};

const friends = [
    {
        id: 2,
        name: "Jeffrey Epstein",
        profilePic: "https://via.placeholder.com/100/dc3545/ffffff?text=JE"
    }
];

// Sample Posts
const posts = [
    {
        id: 1,
        author: currentUser,
        content: "Excited to announce the latest developments in connecting people across the world! The future of social networking is here.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        likes: 1542,
        comments: 87,
        shares: 23,
        liked: false
    },
    {
        id: 2,
        author: friends[0],
        content: "Great meeting with Mark today. Looking forward to future collaborations.",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        likes: 234,
        comments: 12,
        shares: 3,
        liked: true
    },
    {
        id: 3,
        author: currentUser,
        content: "Building the metaverse, one day at a time. Virtual reality is the future of human connection.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        likes: 2341,
        comments: 156,
        shares: 89,
        liked: false
    },
    {
        id: 4,
        author: friends[0],
        content: "Traveling the world and meeting interesting people. Life is an adventure!",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        likes: 445,
        comments: 34,
        shares: 12,
        liked: false
    }
];

// Helper Functions
function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (let [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }
    
    return 'Just now';
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Render Functions
function renderFriends() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = friends.map(friend => `
        <div class="friend-item">
            <img src="${friend.profilePic}" alt="${friend.name}" class="friend-pic">
            <span class="friend-name">${friend.name}</span>
        </div>
    `).join('');
}

function renderPost(post) {
    return `
        <div class="post" data-post-id="${post.id}">
            <div class="post-header">
                <img src="${post.author.profilePic}" alt="${post.author.name}" class="post-author-pic">
                <div class="post-author-info">
                    <h4>${post.author.name}</h4>
                    <span class="post-time">${timeAgo(post.timestamp)}</span>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-stats">
                <span>${formatNumber(post.likes)} Likes</span>
                <span>${post.comments} Comments · ${post.shares} Shares</span>
            </div>
            <div class="post-actions">
                <button class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                    </svg>
                    Like
                </button>
                <button class="post-action">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    Comment
                </button>
                <button class="post-action">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    Share
                </button>
            </div>
        </div>
    `;
}

function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = posts.map(post => renderPost(post)).join('');
}

// Event Handlers
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderPosts();
    }
}

function createPost() {
    const postInput = document.getElementById('post-input');
    const content = postInput.value.trim();
    
    if (content) {
        const newPost = {
            id: posts.length + 1,
            author: currentUser,
            content: content,
            timestamp: new Date(),
            likes: 0,
            comments: 0,
            shares: 0,
            liked: false
        };
        
        posts.unshift(newPost);
        postInput.value = '';
        renderPosts();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Update profile images
    const profilePics = document.querySelectorAll('.profile-pic, .post-profile-pic, .sidebar-icon');
    profilePics.forEach(pic => {
        if (pic.tagName === 'IMG') {
            pic.src = currentUser.profilePic;
        }
    });
    
    // Render initial content
    renderFriends();
    renderPosts();
    
    // Post input handler
    const postInput = document.getElementById('post-input');
    postInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            createPost();
        }
    });
    
    postInput.addEventListener('click', function() {
        // Could open a modal for creating posts with more options
        console.log('Post creation clicked');
    });
});

// Search functionality
document.getElementById('search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // Could implement search functionality here
});
