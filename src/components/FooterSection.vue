<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer-top">
        <div class="site-footer-brand">
          <h3 class="site-footer-logo">DiveBuddy.SMO</h3>
          <p class="site-footer-tagline">Your trusted partner for unforgettable diving experiences in Thailand.</p>
        </div>
        <div class="site-footer-nav">
          <h4 class="site-footer-heading">Explore</h4>
          <ul class="site-footer-list">
            <li><a href="#destinations" class="site-footer-link">Destinations</a></li>
            <li><a href="#courses" class="site-footer-link">Courses</a></li>
            <li><a href="#pricing" class="site-footer-link">Pricing</a></li>
            <li><a href="#gallery" class="site-footer-link">Gallery</a></li>
          </ul>
        </div>
        <div class="site-footer-nav">
          <h4 class="site-footer-heading">Certifications</h4>
          <ul class="site-footer-list">
            <li><a href="#courses" class="site-footer-link">Open Water</a></li>
            <li><a href="#courses" class="site-footer-link">Advanced</a></li>
            <li><a href="#courses" class="site-footer-link">Rescue Diver</a></li>
            <li><a href="#courses" class="site-footer-link">Divemaster</a></li>
          </ul>
        </div>
        <div class="site-footer-nav">
          <h4 class="site-footer-heading">Contact</h4>
          <ul class="site-footer-list">
            <li class="site-footer-info">📍 123 Beach Road, Phuket</li>
            <li class="site-footer-info">📞 +66 123 456 789</li>
            <li class="site-footer-info">✉️ info@divebuddy.smo</li>
          </ul>
        </div>
      </div>
      <div class="site-footer-bottom">
        <p class="site-footer-copy">&copy; 2024 DiveBuddy.SMO. All rights reserved.</p>
        <div class="site-footer-social">
          <a href="#" class="site-footer-social-link">Facebook</a>
          <a href="#" class="site-footer-social-link">Instagram</a>
          <a href="#" class="site-footer-social-link">YouTube</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.site-footer {
  background: var(--blackblue);
  color: var(--white);
  padding: var(--pad-section) 0 var(--gap-md);
}

.site-footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--gap-md);
  padding-bottom: var(--gap-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.site-footer-logo {
  font-size: var(--font-lg);
  font-weight: 800;
  color: var(--white);
  margin-bottom: var(--gap-xs);
}

.site-footer-tagline {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  max-width: 300px;
}

.site-footer-heading {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--white);
  margin-bottom: var(--gap-sm);
}

.site-footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.site-footer-link {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.site-footer-link:hover {
  color: var(--orange);
}

.site-footer-info {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.5);
}

.site-footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--gap-md);
}

.site-footer-copy {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.3);
}

.site-footer-social {
  display: flex;
  gap: var(--gap-sm);
}

.site-footer-social-link {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.site-footer-social-link:hover {
  color: var(--orange);
}

@media (max-width: 768px) {
  .site-footer-top {
    grid-template-columns: 1fr 1fr;
  }

  .site-footer-brand {
    grid-column: span 2;
  }
}

@media (max-width: 480px) {
  .site-footer-top {
    grid-template-columns: 1fr;
  }

  .site-footer-brand {
    grid-column: auto;
  }

  .site-footer-bottom {
    flex-direction: column;
    gap: var(--gap-sm);
    text-align: center;
  }
}
</style>
