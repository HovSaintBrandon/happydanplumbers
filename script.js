// ========================================
// Mobile Menu Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  mobileMenuBtn.addEventListener('click', function () {
    const isOpen = !mobileNav.classList.contains('hidden');

    if (isOpen) {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      mobileNav.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });
  // Close mobile menu when clicking on a link
  const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
});
// ========================================
// Form Tabs
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const formTabs = document.querySelectorAll('.form-tab');

  formTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs
      formTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
    });
  });
});

// ========================================
// Service Tabs
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceContents = document.querySelectorAll('.tab-content');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      // Hide all contents
      serviceContents.forEach(content => content.classList.remove('active'));

      // Show target content
      const targetId = this.getAttribute('data-service-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
});
// ========================================
// Form Submission
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      zip: document.getElementById('zip').value,
      smsOptIn: document.getElementById('sms').checked
    };

    // Simulate form submission
    console.log('Form submitted:', formData);

    // Show success message (you can customize this)
    alert('Thank you! We will call you shortly.');

    // Reset form
    contactForm.reset();
  });
});
// ========================================
// Phone Number Formatting
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
      if (value.length <= 3) {
        value = '(' + value;
      } else if (value.length <= 6) {
        value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
      } else {
        value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
      }
    }

    e.target.value = value;
  });
});
// ========================================
// ZIP Code Validation
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const zipInput = document.getElementById('zip');

  zipInput.addEventListener('input', function (e) {
    // Only allow numbers and limit to 5 digits
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
  });
});
// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
// ========================================
// Scroll Animation (Intersection Observer)
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  // Observe service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });
  // Observe reason items
  const reasonItems = document.querySelectorAll('.reason-item');
  reasonItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
  });
  // Observe testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});
// Add animate-in styles
document.addEventListener('DOMContentLoaded', function () {
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
// ========================================
// Navbar Background on Scroll
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      navbar.style.boxShadow = '0 4px 20px -4px rgba(26, 35, 50, 0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 10px -2px rgba(26, 35, 50, 0.1)';
    }
  });
});