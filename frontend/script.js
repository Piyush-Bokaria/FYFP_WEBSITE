function showTab(tabName, clickedElement) {
  document.querySelectorAll(".events-content").forEach((content) => {
    content.classList.remove("active");
  });

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active");
  });

  const targetContent = document.getElementById(tabName + "-events");
  if (targetContent) {
    targetContent.classList.add("active");
  }

  if (clickedElement) {
    clickedElement.classList.add("active");
  }
}

// Gallery Filter Functionality
function filterGallery(category, clickedElement) {
  console.log("filterGallery called with:", category);

  const items = document.querySelectorAll(".gallery-item");
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => btn.classList.remove("active"));

  if (clickedElement) {
    clickedElement.classList.add("active");
  }

  items.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      }, 100);
    } else {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";
      setTimeout(() => {
        item.style.display = "none";
      }, 300);
    }
  });
}

// FAQ Toggle Functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector(".faq-answer");
  const icon = element.querySelector(".faq-icon");

  // Close all other FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== faqItem) {
      item.querySelector(".faq-answer").classList.remove("active");
      item.querySelector(".faq-icon").textContent = "+";
      item.querySelector(".faq-icon").style.transform = "rotate(0deg)";
    }
  });

  // Toggle current FAQ item
  if (answer.classList.contains("active")) {
    answer.classList.remove("active");
    icon.textContent = "+";
    icon.style.transform = "rotate(0deg)";
  } else {
    answer.classList.add("active");
    icon.textContent = "−";
    icon.style.transform = "rotate(180deg)";
  }
}

// Make functions globally available immediately
window.showTab = showTab;
window.filterGallery = filterGallery;
window.toggleFAQ = toggleFAQ;

// Enhanced Mobile Navigation Toggle with animations
const threedots = document.querySelector(".threedots");
const navMenu = document.querySelector(".nav-menu");
const navbar = document.querySelector(".navbar");

threedots.addEventListener("click", () => {
  threedots.classList.toggle("active");
  navMenu.classList.toggle("active");

  const spans = threedots.querySelectorAll("span");
  if (threedots.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    threedots.classList.remove("active");
    navMenu.classList.remove("active");

    // Reset threedots animation
    const spans = threedots.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  })
);

// Throttled scroll handler for better performance
let scrollTimeout;
const handleScroll = () => {
  if (scrollTimeout) return;
  
  scrollTimeout = setTimeout(() => {
    const scrollY = window.scrollY;
    
    // Navbar scroll effect
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add("scrolled");
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.classList.remove("scrolled");
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
      }
    }
    
    // Scroll progress indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
      const scrollTop = scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }
    
    scrollTimeout = null;
  }, 16); // ~60fps
};

window.addEventListener("scroll", handleScroll, { passive: true });

// Parallax effect removed to improve performance and eliminate scroll-linked positioning warning

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Functions already defined at the top of the file

// Contact Form Handling
document
  .querySelector(".contact-form form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelector('input[placeholder="Subject"]').value;
    const message = this.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate form submission
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });

// Navbar scroll effect now handled in the combined scroll handler above

// Enhanced scroll animations with stagger effect
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
        entry.target.classList.add("animate-in");
      }, index * 100); // Stagger animation
    }
  });
}, observerOptions);

// Counter animation for impact stats
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ""));
    const suffix = counter.textContent.replace(/\d/g, "");
    let current = 0;
    const increment = target / 50;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  });
};

// Typing effect for hero text
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = "";

  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".event-card, .faq-item, .about-content, .team-member, .gallery-item, .story-card"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px) scale(0.95)";
    el.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    observer.observe(el);
  });

  // Animate impact stats when they come into view
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".impact-stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Add floating animation to CTA button
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    setInterval(() => {
      ctaButton.style.transform = "translateY(-2px)";
      setTimeout(() => {
        ctaButton.style.transform = "translateY(0)";
      }, 1000);
    }, 3000);
  }
});

// Particle effect for hero section
const createParticles = () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${
              5 + Math.random() * 10
            }s linear infinite;
        `;
    hero.appendChild(particle);
  }
};

// Add particle animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: bounceIn 0.6s ease-out;
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3) translateY(30px);
            opacity: 0;
        }
        50% {
            transform: scale(1.05) translateY(-10px);
        }
        70% {
            transform: scale(0.9) translateY(5px);
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
setTimeout(createParticles, 1000);

// Gallery filter function already defined at the top

// Initialize gallery items with transition styles
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    item.style.opacity = "1";
    item.style.transform = "scale(1)";
  });

  // Add event listeners for tab buttons as backup
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const tabName = this.textContent.toLowerCase().includes("past")
        ? "past"
        : "upcoming";
      showTab(tabName, this);
    });
  });

  // Add event listeners for gallery filter buttons as backup
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.textContent
        .toLowerCase()
        .replace(" ", "")
        .replace("events", "")
        .replace("service", "");
      let filterCategory = "all";

      if (this.textContent.includes("Community")) filterCategory = "community";
      else if (this.textContent.includes("Workshops"))
        filterCategory = "workshops";
      else if (this.textContent.includes("Fundraising"))
        filterCategory = "fundraising";
      else if (this.textContent.includes("All")) filterCategory = "all";

      filterGallery(filterCategory, this);
    });
  });

  // Add click handlers for gallery items (for future lightbox functionality)
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Placeholder for lightbox functionality
      console.log(
        "Gallery item clicked:",
        item.querySelector(".gallery-overlay h4").textContent
      );
    });
  });
});

// Animate timeline items on scroll
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe timeline items for animation
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item, index) => {
    // Set initial state for animation
    item.style.opacity = "0";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    // Alternate slide directions
    if (index % 2 === 0) {
      item.style.transform = "translateX(-50px)";
    } else {
      item.style.transform = "translateX(50px)";
    }

    timelineObserver.observe(item);
  });
});

// Scroll progress indicator now handled in the combined scroll handler above

// Enhanced smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Add loading states to buttons
document.querySelectorAll('button[type="submit"]').forEach((button) => {
  button.addEventListener("click", function (e) {
    if (this.form && this.form.checkValidity()) {
      const originalText = this.textContent;
      this.innerHTML = '<span class="loading-spinner"></span> Sending...';
      this.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
      }, 2000);
    }
  });
});

// Add ripple effect to buttons
document
  .querySelectorAll(".cta-button, .submit-button, .tab-button, .filter-btn")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Enhanced page load animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1";

  // Animate elements in sequence
  const elements = document.querySelectorAll(".hero-content > *");
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";

    setTimeout(() => {
      el.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Add mouse trail effect
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener("mousemove", (e) => {
  mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

  if (mouseTrail.length > maxTrailLength) {
    mouseTrail.shift();
  }

  // Remove old trail points
  mouseTrail = mouseTrail.filter((point) => Date.now() - point.time < 1000);
});

// Intersection Observer for better performance
const createObserver = (callback, options = {}) => {
  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    ...options,
  });
};

// Initialize all observers
document.addEventListener("DOMContentLoaded", () => {
  // Performance optimization: only animate visible elements
  const performanceObserver = createObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-viewport");
      }
    });
  });

  document
    .querySelectorAll(".event-card, .team-member, .gallery-item")
    .forEach((el) => {
      performanceObserver.observe(el);
    });
});

// Make functions globally available for onclick attributes
window.showTab = showTab;
window.filterGallery = filterGallery;
window.toggleFAQ = toggleFAQ;
// Donation Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Amount selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountDiv = document.querySelector('.custom-amount');
    const customAmountInput = document.getElementById('customAmount');
    const donateButtons = document.querySelectorAll('.donate-button');
    const donateAmountSpans = document.querySelectorAll('.donate-amount');
    
    let selectedAmount = 50; // Default amount
    
    amountButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            amountButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const amount = btn.dataset.amount;
            if (amount === 'custom') {
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
            } else {
                customAmountDiv.style.display = 'none';
                selectedAmount = parseInt(amount);
                updateDonateButtons();
            }
        });
    });
    
    // Custom amount input
    customAmountInput.addEventListener('input', () => {
        const value = parseInt(customAmountInput.value);
        if (value && value > 0) {
            selectedAmount = value;
            updateDonateButtons();
        }
    });
    
    // Payment method selection
    const paymentButtons = document.querySelectorAll('.payment-btn');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    paymentButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentButtons.forEach(b => b.classList.remove('active'));
            paymentForms.forEach(f => f.classList.remove('active'));
            
            btn.classList.add('active');
            const method = btn.dataset.method;
            document.querySelector(`.${method}-form`).classList.add('active');
        });
    });
    
    // Update donate button amounts
    function updateDonateButtons() {
        donateAmountSpans.forEach(span => {
            if (span.textContent.includes('PayPal')) {
                span.textContent = `Donate $${selectedAmount} via PayPal`;
            } else if (span.textContent.includes('UPI')) {
                span.textContent = `Donate $${selectedAmount} via UPI`;
            } else {
                span.textContent = `Donate $${selectedAmount}`;
            }
        });
    }
    
    // Card form validation and formatting
    const cardNumberInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
    const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
    const cvvInput = document.querySelector('input[placeholder="123"]');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Form submissions
    const cardForm = document.getElementById('cardPaymentForm');
    if (cardForm) {
        cardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleCardPayment();
        });
    }
    
    // PayPal button
    const paypalBtn = document.querySelector('.paypal-btn');
    if (paypalBtn) {
        paypalBtn.addEventListener('click', () => {
            handlePayPalPayment();
        });
    }
    
    // UPI button
    const upiBtn = document.querySelector('.upi-btn');
    if (upiBtn) {
        upiBtn.addEventListener('click', () => {
            handleUPIPayment();
        });
    }
    
    // Payment handlers (integrate with actual payment gateways)
    function handleCardPayment() {
        // Add loading state
        const submitBtn = cardForm.querySelector('.donate-button');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
        submitBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            alert(`Thank you for your donation of $${selectedAmount}! Your contribution helps us make a difference.`);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            cardForm.reset();
        }, 2000);
        
        // In real implementation, integrate with Stripe, Square, or other payment processor
        // Example: stripe.createToken(card).then(handleStripeResponse);
    }
    
    function handlePayPalPayment() {
        // In real implementation, redirect to PayPal or use PayPal SDK
        alert(`Redirecting to PayPal for $${selectedAmount} donation...`);
        // window.location.href = `https://www.paypal.com/donate?amount=${selectedAmount}&currency_code=USD`;
    }
    
    function handleUPIPayment() {
        // In real implementation, generate UPI payment link or QR code
        alert(`UPI payment of $${selectedAmount} initiated. Please complete the payment in your UPI app.`);
        // Example: window.open(`upi://pay?pa=yourclub@upi&pn=FYFP&am=${selectedAmount}&cu=USD`);
    }
});

// Add donation success animation
function showDonationSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'donation-success';
    successDiv.innerHTML = `
        <div class="success-content">
            <div class="success-icon">🎉</div>
            <h3>Thank You!</h3>
            <p>Your donation makes a real difference in our community.</p>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}