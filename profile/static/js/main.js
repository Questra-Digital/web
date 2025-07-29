window.addEventListener('load', () => {
  const tracks = document.getElementsByClassName('ticker');
  [...tracks].forEach((track, index) => {
    const container = track.parentElement;

    // Remove previous animation (in case of reload or resize)
    track.style.animation = 'none';

    const trackOriginalWidth = track.scrollWidth;
    const containerWidth = container.offsetWidth;

    // If content is smaller than container, DO NOT animate
    if (trackOriginalWidth <= containerWidth) {
      track.style.transform = 'translateX(0)';
      return;
    }

    // Clone items to make seamless loop
    // track.innerHTML += track.innerHTML;
    
    const trackFullWidth = track.scrollWidth;

    // Set the speed: how many pixels per second
    const speedPerPixel = 50; // Adjust speed here
    const animationDuration = trackFullWidth / speedPerPixel;

    // Set animation properties dynamically
    track.style.animation = `scrollTicker${index} ${animationDuration}s linear infinite`;

    // Inject dynamic keyframes
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
      @keyframes scrollTicker${index} {
        0% { transform: translateX(${trackFullWidth }px); }
        100% { transform: translateX(-${trackFullWidth }px); }
      }
    `;
    document.head.appendChild(styleSheet);

    // (Optional) Touch support for mobile devices
    let startX = 0;
    container.addEventListener('touchstart', (e) => {
      track.style.animationPlayState = 'paused';
      startX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
      track.style.animationPlayState = 'running';
    });

  });
  
});


document.addEventListener('DOMContentLoaded', function() {
  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    inertia: 0.3
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Hero Section Animations
  gsap.utils.toArray('.animate-in').forEach((element, i) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        delay: i * 0.2,
        ease: "power3.out"
      }
    );
  });

  // Update Locomotive Scroll after GSAP animations
  gsap.utils.toArray('[data-scroll-section]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => scroll.update()
    });
  });

  // Vision Cards Flip Animation
  const visionCards = document.querySelectorAll('.vision-card');
  visionCards.forEach(card => {
    const toggleButtons = card.querySelectorAll('.card-toggle');
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Contact Form Submission Animation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formElements = contactForm.elements;
      let isValid = true;
      
      // Basic validation
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].required && !formElements[i].value) {
          isValid = false;
          formElements[i].classList.add('error');
        } else {
          formElements[i].classList.remove('error');
        }
      }
      
      if (isValid) {
        // Animation for successful submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
          submitBtn.textContent = 'Message Sent!';
          submitBtn.classList.add('success');
          
          // Reset form
          contactForm.reset();
          
          // Reset button after delay
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
          }, 3000);
        }, 1500);
      }
    });
  }

  // Hexagon hover animations
  const hexagons = document.querySelectorAll('.hexagon');
  hexagons.forEach(hexagon => {
    hexagon.addEventListener('mouseenter', () => {
      gsap.to(hexagon.querySelector('.project-items'), {
        maxHeight: '500px',
        duration: 0.5,
        ease: "power2.out"
      });
    });
    
    hexagon.addEventListener('mouseleave', () => {
      gsap.to(hexagon.querySelector('.project-items'), {
        maxHeight: '0',
        duration: 0.5,
        ease: "power2.in"
      });
    });
  });

  // Initialize ScrollTrigger animations for cards
  gsap.utils.toArray('.card, .gig-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out"
    });
  });

  // Animate section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top bottom-=50',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // Update Locomotive Scroll for smooth scrolling
  window.addEventListener('resize', () => {
    scroll.update();
  });

  // Handle anchor links with smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        scroll.scrollTo(targetElement);
      }
    });
  });
});

// Menu bar dynamic behavior
let lastScrollY = window.scrollY;
const navbar = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY === 0) {
    // At the top
    navbar.classList.remove('fixed', 'hide');
  } else if (currentScrollY > lastScrollY) {
    // Scrolling down
    navbar.classList.add('fixed');
    navbar.classList.add('hide');
  } else {
    // Scrolling up
    navbar.classList.add('fixed');
    navbar.classList.remove('hide');
  }

  lastScrollY = currentScrollY;
});
