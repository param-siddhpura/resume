/**
 * Param Siddhpura - Portfolio Interactive Logic
 * Plain Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // 1. Sticky Header Scroll Effect
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('open');
    });

    // Close drawer when clicking nav links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('open');
      });
    });

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && mobileDrawer.classList.contains('open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('open');
      }
    });
  }

  // 3. Active Nav Link Observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // 4. Scroll Reveal Animations
  const animateElements = document.querySelectorAll('.info-card, .timeline-card, .category-card, .research-card, .skill-group-card, .education-card, .reference-card, .strength-card, .contact-info-panel, .contact-form-panel');

  animateElements.forEach(el => {
    el.classList.add('fade-in-up');
  });

  const revealObserverOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  animateElements.forEach(el => revealObserver.observe(el));

  // 5. Contact Form Handler (Frontend-Ready)
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('user-name').value.trim();
      const email = document.getElementById('user-email').value.trim();
      const message = document.getElementById('user-message').value.trim();

      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields marked with *';
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please enter a valid email address.';
        return;
      }

      // Show success message
      formStatus.className = 'form-status success';
      formStatus.textContent = `Thank you, ${name}! Your message has been prepared. You can also reach Param directly at prasidd1965@gmail.com.`;
      
      contactForm.reset();

      setTimeout(() => {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
      }, 7000);
    });
  }
});
