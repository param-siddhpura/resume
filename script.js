/**
 * Param Siddhpura - Applied AI Engineer Portfolio Logic
 * Plain Vanilla JavaScript (No external dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Filter Buttons & Cards
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Case Study Tabs
  const caseTabButtons = document.querySelectorAll('.case-tab-btn');
  const casePanels = document.querySelectorAll('.case-study-panel');

  // 2. Sticky Header Scroll Effect
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Drawer Toggle
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('open');
    });

    // Close drawer when clicking mobile nav links
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

  // 4. Active Navigation Link Observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
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
        mobileNavLinks.forEach(link => {
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

  // 5. Project Filtering Logic
  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Case Study Tabs Switcher
  if (caseTabButtons.length > 0 && casePanels.length > 0) {
    caseTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTabId = btn.getAttribute('data-tab');

        caseTabButtons.forEach(b => b.classList.remove('active'));
        casePanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetTabId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  // 7. Scroll Reveal Fade-in Animations
  const animateElements = document.querySelectorAll(
    '.project-card, .skill-category-card, .info-card, .timeline-card, .education-card, .reference-card, .milestone-card, .arch-layer-card'
  );

  animateElements.forEach(el => {
    el.classList.add('fade-in-up');
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animateElements.forEach(el => revealObserver.observe(el));

  // 8. Contact Form - Native Client-Side Email Preparer
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const subjectInput = document.getElementById('user-subject');
      const messageInput = document.getElementById('user-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'AI Engineering Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please complete all required fields marked with *';
        formStatus.style.display = 'block';
        return;
      }

      // Basic email pattern check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.style.display = 'block';
        return;
      }

      // Format clean body with sender attribution
      const formattedBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent via Param Siddhpura Portfolio`;
      const mailtoUrl = `mailto:prasidd1965@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

      // Show friendly confirmation
      formStatus.className = 'form-status success';
      formStatus.textContent = `Opening your default email client with your message for prasidd1965@gmail.com...`;
      formStatus.style.display = 'block';

      // Launch default email application
      window.location.href = mailtoUrl;

      setTimeout(() => {
        contactForm.reset();
      }, 1000);
    });
  }
});
