<template>
  <section class="newsletter" aria-label="Newsletter signup">
    <div class="container">
      <div class="newsletter-inner">
        <div class="newsletter-content">
          <h2 class="newsletter-heading">Get 15% Off Your First Dive</h2>
          <p class="newsletter-desc">Join 12,000+ ocean lovers. Receive exclusive deals, new dive site alerts, and seasonal whale shark updates straight to your inbox.</p>
        </div>
        <form class="newsletter-form" @submit.prevent>
          <div class="newsletter-form-row">
            <input type="email" placeholder="Enter your email address" class="newsletter-form-input" required aria-label="Email address" />
            <button type="submit" class="newsletter-form-btn">Subscribe</button>
          </div>
          <p class="newsletter-form-note">No spam. Unsubscribe anytime. We respect your privacy.</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.newsletter {
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--darkblue) 100%);
  padding: var(--pad-section) 0;
}

.newsletter-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-md);
  align-items: center;
}

.newsletter-heading {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--white);
  margin-bottom: var(--gap-xs);
}

.newsletter-desc {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.newsletter-form-row {
  display: flex;
  gap: var(--gap-xs);
}

.newsletter-form-input {
  flex: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  transition: all 0.3s ease;
}

.newsletter-form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.newsletter-form-input:focus {
  border-color: var(--orange);
  background: rgba(255, 255, 255, 0.12);
}

.newsletter-form-btn {
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 700;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.newsletter-form-btn:hover {
  background: var(--white);
  color: var(--darkblue);
  transform: translateY(-1px);
}

.newsletter-form-note {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.4);
  margin-top: var(--gap-xs);
}

@media (max-width: 768px) {
  .newsletter-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .newsletter-form-row {
    flex-direction: column;
  }
}
</style>
