// ========================================
// UI Helpers
// ========================================
function showToast(message, isError = false) {
  const toast = document.getElementById('toastContainer');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle('toast-error', isError);
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// ========================================
// Mobile Menu Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileMenuBtn || !mobileNav) return;
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');

  mobileMenuBtn.addEventListener('click', function () {
    const isOpen = !mobileNav.classList.contains('hidden');
    mobileNav.classList.toggle('hidden', isOpen);
    menuIcon.classList.toggle('hidden', !isOpen);
    closeIcon.classList.toggle('hidden', isOpen);
  });

  const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
});

// ========================================
// Tabs (Form & Service)
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  // Form Tabs
  const formTabs = document.querySelectorAll('.form-tab');
  formTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      formTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Service Tabs
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceContents = document.querySelectorAll('.tab-content');
  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      serviceContents.forEach(content => content.classList.remove('active'));
      const targetContent = document.getElementById(this.getAttribute('data-service-tab'));
      if (targetContent) targetContent.classList.add('active');
    });
  });
});

// ========================================
// Form Submissions (Inquiry, Appointment, Review)
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  // Inquiry Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value.replace(/\D/g, ''),
        location: document.getElementById('zip').value,
        type: document.querySelector('.form-tab.active')?.getAttribute('data-tab') || 'residential'
      };

      try {
        await window.happyDanApi.submitInquiry(formData);
        showToast('Thank you! We will call you shortly.');
        contactForm.reset();
      } catch (err) {
        showToast(err.message, true);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // Appointment Form
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      const formData = {
        firstName: document.getElementById('appFirstName').value,
        lastName: document.getElementById('appLastName').value,
        email: document.getElementById('appEmail').value,
        phone: document.getElementById('appPhone').value.replace(/\D/g, ''),
        location: document.getElementById('appLocation').value,
        service: document.getElementById('appService').value,
        preferredDate: document.getElementById('appDate').value,
        preferredTime: document.getElementById('appTime').value,
        type: 'residential' // Default
      };

      try {
        await window.happyDanApi.bookAppointment(formData);
        showToast('Appointment booked successfully!');
        appointmentForm.reset();
        document.getElementById('appointmentModal').classList.remove('active');
      } catch (err) {
        showToast(err.message, true);
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Review Form
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = reviewForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      const formData = {
        name: document.getElementById('revName').value,
        location: document.getElementById('revLocation').value,
        rating: parseInt(document.getElementById('revRating').value),
        comment: document.getElementById('revComment').value
      };

      try {
        await window.happyDanApi.submitReview(formData);
        showToast('Review submitted! It will appear once approved.');
        reviewForm.reset();
        document.getElementById('reviewModal').classList.remove('active');
      } catch (err) {
        showToast(err.message, true);
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});

// ========================================
// Modals Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const appointmentModal = document.getElementById('appointmentModal');
  const reviewModal = document.getElementById('reviewModal');

  // Open Appointment
  document.querySelectorAll('.btn-navy, .btn-primary').forEach(btn => {
    if (btn.textContent.includes('Book') || btn.textContent.includes('Schedule')) {
      // Skip buttons inside forms that are type "submit"
      if (btn.closest('form') && btn.getAttribute('type') === 'submit') return;

      btn.addEventListener('click', (e) => {
        if (btn.closest('#contactForm')) return; // Don't trigger on contact form submit button
        e.preventDefault();
        appointmentModal.classList.add('active');
      });
    }
  });

  // Open Review
  const openReviewBtn = document.getElementById('openReviewBtn');
  if (openReviewBtn) {
    openReviewBtn.addEventListener('click', () => reviewModal.classList.add('active'));
  }

  // Close buttons
  document.getElementById('closeAppointmentBtn')?.addEventListener('click', () => appointmentModal.classList.remove('active'));
  document.getElementById('closeReviewBtn')?.addEventListener('click', () => reviewModal.classList.remove('active'));

  // Close on outside click
  window.addEventListener('click', (e) => {
    if (e.target === appointmentModal) appointmentModal.classList.remove('active');
    if (e.target === reviewModal) reviewModal.classList.remove('active');
  });
});

// ========================================
// Phone Formatting & Dynamic Content
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  // Phone Formatting
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 0) {
        if (v.length <= 3) v = '(' + v;
        else if (v.length <= 6) v = '(' + v.slice(0, 3) + ') ' + v.slice(3);
        else v = '(' + v.slice(0, 3) + ') ' + v.slice(3, 6) + '-' + v.slice(6, 10);
      }
      e.target.value = v;
    });
  });

  // Fetch Reviews
  const grid = document.getElementById('testimonialsGrid');
  if (grid) {
    async function fetchReviews() {
      try {
        const res = await window.happyDanApi.getReviews();
        const reviews = res.reviews || res.data || (Array.isArray(res) ? res : []);
        if (reviews.length === 0) return;

        // Randomize and limit to 3
        const displayReviews = reviews
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        grid.innerHTML = displayReviews.map(r => `
          <div class="testimonial-card">
            <div class="quote-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>
            </div>
            <div class="testimonial-stars">
              ${Array(5).fill(0).map((_, i) => `<svg class="star ${i < r.rating ? 'filled' : ''}" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>`).join('')}
            </div>
            <p class="testimonial-text">"${r.comment}"</p>
            <div class="testimonial-author">
              <p class="author-name">${r.name}</p>
              <p class="author-location">${r.location}</p>
            </div>
          </div>
        `).join('');
      } catch (err) { console.error(err); }
    }
    fetchReviews();
  }
});

// ========================================
// FAQ Accordion (Restored)
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        });
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
});

// ========================================
// Scroll Animations & Navbar
// ========================================
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .reason-item, .testimonial-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    observer.observe(el);
  });

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 100 ? '0 4px 20px -4px rgba(26, 35, 50, 0.15)' : '0 2px 10px -2px rgba(26, 35, 50, 0.1)';
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });
});
