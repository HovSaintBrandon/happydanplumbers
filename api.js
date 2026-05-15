const API_BASE_URL = 'https://happydan-backend.onrender.com/api/v1';

const api = {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // Logging for debugging
        console.log(`🚀 [API Request] ${options.method || 'GET'} ${url}`);
        if (options.body) {
            try {
                console.log('📦 Request Body:', JSON.parse(options.body));
            } catch (e) {
                console.log('📦 Request Body:', options.body);
            }
        }

        try {
            const response = await fetch(url, { ...options, headers });
            const data = await response.json();

            console.log(`✅ [API Response] Status: ${response.status}`);
            console.log('📄 Full Response Body:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data;
        } catch (error) {
            console.error(`❌ API Error (${endpoint}):`, error);
            throw error;
        }
    },

    // Inquiries
    async submitInquiry(data) {
        return this.request('/inquiries', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // Reviews
    async submitReview(data) {
        return this.request('/reviews', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async getReviews() {
        return this.request('/reviews', {
            method: 'GET',
        });
    },

    // Appointments
    async bookAppointment(data) {
        return this.request('/appointments', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // Blog
    async getBlogs() {
        return this.request('/blog', {
            method: 'GET',
        });
    },

    async getBlogPost(slug) {
        return this.request(`/blog/${slug}`, {
            method: 'GET',
        });
    },

    getCategoryImage(categories) {
        const fallbacks = {
            'biodigesters': [
                'https://images.unsplash.com/photo-1542013936693-884638332954?w=800&q=80',
                'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
                'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&q=80'
            ],
            'plumbing': [
                'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
                'https://images.unsplash.com/photo-1607472586893-edb5ec3ad320?w=800&q=80',
                'https://images.unsplash.com/photo-1542013936693-884638332954?w=800&q=80'
            ],
            'interior': [
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
            ],
            'design': [
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
            ]
        };

        const defaultImages = [
            'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
            'https://images.unsplash.com/photo-1585702138250-c40760dabeab?w=800&q=80',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'
        ];

        if (!categories || categories.length === 0) {
            return defaultImages[Math.floor(Math.random() * defaultImages.length)];
        }

        // Search for matching category
        for (const cat of categories) {
            const lowerCat = cat.toLowerCase();
            for (const key in fallbacks) {
                if (lowerCat.includes(key)) {
                    const possibleImages = fallbacks[key];
                    return possibleImages[Math.floor(Math.random() * possibleImages.length)];
                }
            }
        }

        return defaultImages[Math.floor(Math.random() * defaultImages.length)];
    }
};

window.happyDanApi = api;
