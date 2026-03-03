<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3 class="footer-title">DiveBuddy.SMO</h3>
          <p class="footer-desc">Your trusted partner for unforgettable diving experiences in Thailand's most beautiful waters.</p>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Courses</h4>
          <ul class="footer-links">
            <li><a href="#open-water">Open Water</a></li>
            <li><a href="#advanced">Advanced</a></li>
            <li><a href="#rescue">Rescue Diver</a></li>
            <li><a href="#divemaster">Divemaster</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Contact</h4>
          <ul class="footer-links">
            <li>123 Beach Road, Phuket</li>
            <li>+66 123 456 789</li>
            <li>info@divebuddy.smo</li>
          </ul>
        </div>
      </div>

      <!-- Mobile Footer - Simplified Version -->
      <div class="footer-mobile">
        <div class="footer-bottom-mobile">
          <p>&copy; 2024 DiveBuddy.SMO. All rights reserved.</p>
          <div class="footer-social">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">YouTube</a>
          </div>
        </div>
      </div>

      <!-- Desktop Footer - Full Version -->
      <div class="footer-desktop">
        <div class="footer-bottom">
          <p>&copy; 2024 DiveBuddy.SMO. All rights reserved.</p>
          <div class="footer-social">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  background: var(--blackblue);
  color: var(--white);
  padding: var(--pad-section) 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-md);
  margin-bottom: var(--gap-xl);
}

.footer-title {
  font-size: var(--font-md);
  font-weight: 700;
  margin-bottom: var(--gap-sm);
}

.footer-desc {
  color: var(--lightgray);
  font-size: var(--font-sm);
  line-height: 1.6;
}

.footer-heading {
  font-size: var(--font-xs);
  font-weight: 700;
  margin-bottom: var(--gap-sm);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: var(--gap-sm);
}

.footer-links a {
  color: var(--lightgray);
  font-size: var(--font-sm);
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--orange);
}

.footer-bottom {
  padding-top: var(--gap-md);
  border-top: 1px solid var(--deepblue);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap-sm);
}

.footer-bottom p {
  color: var(--lightgray);
  font-size: var(--font-xs);
}

.footer-social {
  display: flex;
  gap: var(--gap-md);
}

.social-link {
  color: var(--lightgray);
  font-size: var(--font-xs);
  transition: color 0.3s ease;
}

.social-link:hover {
  color: var(--orange);
}

/* Footer visibility control */
.footer-mobile {
  display: none;
}

.footer-desktop {
  display: block;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap-md);
  }
}

@media (max-width: 768px) {
  .footer-grid {
    display: none;
  }

  .footer-mobile {
    display: block;
  }

  .footer-desktop {
    display: none;
  }

  .footer-bottom-mobile {
    padding: var(--gap-sm) 0;
    border-top: 1px solid var(--deepblue);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gap-sm);
    text-align: center;
  }

  .footer-bottom-mobile p {
    color: var(--lightgray);
    font-size: var(--font-xs);
    order: 2;
  }

  .footer-mobile .footer-social {
    justify-content: center;
    gap: var(--gap-sm);
    order: 1;
  }

  .footer {
    padding: var(--gap-sm) 0;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: var(--gap-md) 0 var(--gap-sm);
  }

  .footer-grid {
    gap: var(--gap-sm);
  }

  .footer-title,
  .footer-heading {
    font-size: var(--font-sm);
  }

  .footer-desc,
  .footer-links a,
  .footer-bottom p,
  .social-link {
    font-size: var(--font-xs);
  }
}
</style>
