// Utility functions
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const showNotification = (message, type = 'success') => {
    const responseDiv = document.getElementById('contact-response');
    responseDiv.className = `mt-4 p-4 rounded-lg ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    responseDiv.textContent = message;
    responseDiv.classList.remove('hidden');
    
    setTimeout(() => {
        responseDiv.classList.add('hidden');
    }, 5000);
};

// API functions
const testAPI = async () => {
    try {
        const response = await fetch('/api/hello');
        const data = await response.json();
        console.log('API Response:', data);
        alert(`API is working! Message: ${data.message}`);
    } catch (error) {
        console.error('API Error:', error);
        alert('API test failed. Check console for details.');
    }
};

const testHelloAPI = async () => {
    const responseDiv = document.getElementById('api-response');
    responseDiv.innerHTML = '<p class="text-gray-500">Testing /api/hello...</p>';
    
    try {
        const response = await fetch('/api/hello');
        const data = await response.json();
        
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-green-600">✅ Success!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    } catch (error) {
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-red-600">❌ Error!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${error.message}</pre>
            </div>
        `;
    }
};

const testUsersAPI = async () => {
    const responseDiv = document.getElementById('api-response');
    responseDiv.innerHTML = '<p class="text-gray-500">Testing /api/users...</p>';
    
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-green-600">✅ Success!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    } catch (error) {
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-red-600">❌ Error!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${error.message}</pre>
            </div>
        `;
    }
};

// API v2 test functions
const testApiV2Status = async () => {
    const responseDiv = document.getElementById('api-response');
    responseDiv.innerHTML = '<p class="text-gray-500">Testing /apiv2/status...</p>';
    
    try {
        const response = await fetch('/apiv2/status');
        const data = await response.json();
        
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-green-600">✅ API v2 Status Success!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    } catch (error) {
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-red-600">❌ Error!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${error.message}</pre>
            </div>
        `;
    }
};

const testApiV2Products = async () => {
    const responseDiv = document.getElementById('api-response');
    responseDiv.innerHTML = '<p class="text-gray-500">Testing /apiv2/products...</p>';
    
    try {
        const response = await fetch('/apiv2/products');
        const data = await response.json();
        
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-green-600">✅ API v2 Products Success!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    } catch (error) {
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-red-600">❌ Error!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${error.message}</pre>
            </div>
        `;
    }
};

const testApiV2Orders = async () => {
    const responseDiv = document.getElementById('api-response');
    responseDiv.innerHTML = '<p class="text-gray-500">Testing /apiv2/orders...</p>';
    
    try {
        const mockOrderData = {
            customerId: 'CUST123',
            items: [
                { productId: 1, name: 'Premium Widget', price: 99.99, quantity: 2 },
                { productId: 3, name: 'Amazing Tool', price: 79.99, quantity: 1 }
            ],
            shippingAddress: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345'
            }
        };
        
        const response = await fetch('/apiv2/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockOrderData)
        });
        
        const data = await response.json();
        
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-green-600">✅ API v2 Orders Success!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    } catch (error) {
        responseDiv.innerHTML = `
            <div class="space-y-2">
                <p class="font-semibold text-red-600">❌ Error!</p>
                <pre class="bg-white p-3 rounded border text-sm overflow-x-auto">${error.message}</pre>
            </div>
        `;
    }
};

// Contact form handling
const handleContactSubmit = async (event) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showNotification(data.message, 'success');
            form.reset();
        } else {
            showNotification(data.error || 'Failed to send message', 'error');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Network error. Please try again.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add loading animation to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) return;
            
            // Add loading state for API buttons
            if (this.onclick && this.onclick.toString().includes('test')) {
                this.classList.add('loading');
                this.disabled = true;
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});

// Add some interactive features
const addInteractiveFeatures = () => {
    // Add hover effects to cards
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.gradient-bg h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
};

// Initialize interactive features when DOM is loaded
document.addEventListener('DOMContentLoaded', addInteractiveFeatures); 