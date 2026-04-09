<template>
  <section class="stats" aria-label="Trust metrics">
    <div class="container">
      <div class="stats-main">
        <div class="stats-hero">
          <div class="stats-hero-number">
            <span class="stats-hero-value" data-target="12500">0</span>
            <span class="stats-hero-plus">+</span>
          </div>
          <h3 class="stats-hero-label">Happy Divers</h3>
          <p class="stats-hero-desc">From 85 countries worldwide</p>
        </div>

        <div class="stats-secondary">
          <div class="stats-item">
            <div class="stats-item-value">
              <span class="stats-item-number" data-target="4.9">0</span>
              <span class="stats-item-decimal">/5</span>
            </div>
            <div class="stats-item-content">
              <h4 class="stats-item-label">Average Rating</h4>
              <div class="stats-item-stars">★★★★★</div>
              <p class="stats-item-desc">2,800+ verified reviews</p>
            </div>
          </div>

          <div class="stats-item">
            <div class="stats-item-value">
              <span class="stats-item-number" data-target="15">0</span>
              <span class="stats-item-unit">Years</span>
            </div>
            <div class="stats-item-content">
              <h4 class="stats-item-label">Experience</h4>
              <div class="stats-item-badges">
                <span class="badge badge-primary">PADI 5-Star</span>
                <span class="badge badge-primary">SSI Diamond</span>
              </div>
              <p class="stats-item-desc">Since 2010</p>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-trust">
        <div class="trust-label">As featured in</div>
        <div class="trust-logos">
          <span class="trust-logo">🏅 PADI</span>
          <span class="trust-logo">🌐 SSI</span>
          <span class="trust-logo">⭐ TripAdvisor</span>
          <span class="trust-logo">🏆 TAT</span>
          <span class="trust-logo">🛡️ DAN</span>
          <span class="trust-logo">🌿 Green Fins</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const finalValue = parseFloat(target.dataset.target || "0");
          animateCounter(target, finalValue);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.3 },
  );

  document.querySelectorAll(".stats-hero-value, .stats-item-number").forEach((el) => {
    observer.observe(el);
  });
});

function animateCounter(element: HTMLElement, target: number) {
  const duration = 2500;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (target < 10) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}
</script>

<style scoped>
.stats {
  background: var(--white);
  padding: var(--pad-section) 0;
}

.stats-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-md);
  margin-bottom: var(--gap-md);
  align-items: center;
}

.stats-hero {
  text-align: center;
  padding: var(--gap-md);
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--darkblue) 100%);
  border-radius: var(--radius-lg);
  color: var(--white);
  position: relative;
  overflow: hidden;
}

.stats-hero::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(239, 108, 51, 0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

.stats-hero-number {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  margin-bottom: var(--gap-sm);
  position: relative;
  z-index: 1;
}

.stats-hero-value {
  font-size: clamp(48px, 8vw, 72px);
  font-weight: 900;
  color: var(--orange);
  line-height: 1;
  text-shadow: 0 0 30px rgba(239, 108, 51, 0.3);
}

.stats-hero-plus {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: var(--orange);
  opacity: 0.8;
}

.stats-hero-label {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 800;
  color: var(--white);
  margin-bottom: var(--gap-xs);
  position: relative;
  z-index: 1;
}

.stats-hero-desc {
  font-size: var(--font-md);
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 1;
}

.stats-secondary {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.stats-item {
  display: flex;
  align-items: center;
  gap: var(--gap-md);
  padding: var(--gap-md);
  background: var(--lightgray);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.stats-item:hover {
  background: var(--white);
  box-shadow: 0 8px 24px var(--shadow-deepblue);
  transform: translateY(-2px);
}

.stats-item-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex-shrink: 0;
  min-width: 80px;
}

.stats-item-number {
  font-size: clamp(32px, 4vw, 40px);
  font-weight: 900;
  color: var(--orange);
  line-height: 1;
}

.stats-item-decimal,
.stats-item-unit {
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--gray);
}

.stats-item-content {
  flex: 1;
}

.stats-item-label {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: calc(var(--gap-xs) * 0.5);
}

.stats-item-stars {
  font-size: var(--font-sm);
  color: var(--orange);
  margin-bottom: calc(var(--gap-xs) * 0.5);
  letter-spacing: 2px;
}

.stats-item-badges {
  display: flex;
  gap: calc(var(--gap-xs) * 0.5);
  margin-bottom: calc(var(--gap-xs) * 0.5);
  flex-wrap: wrap;
}

.stats-item-desc {
  font-size: var(--font-sm);
  color: var(--gray);
}

.stats-trust {
  text-align: center;
  padding-top: var(--gap-md);
  border-top: 1px solid var(--lightgray);
}

.trust-label {
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--gray);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--gap-sm);
}

.trust-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gap-md);
  flex-wrap: wrap;
}

.trust-logo {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  background: var(--white);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
  transition: all 0.3s ease;
}

.trust-logo:hover {
  border-color: var(--orange);
  color: var(--orange);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-orange);
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
}

@media (max-width: 768px) {
  .stats-main {
    grid-template-columns: 1fr;
  }

  .stats-secondary {
    gap: var(--gap-sm);
  }

  .stats-item {
    padding: var(--gap-sm);
    gap: var(--gap-sm);
  }

  .trust-logos {
    gap: var(--gap-sm);
  }
}

@media (max-width: 480px) {
  .stats-hero {
    padding: var(--gap-sm);
  }

  .stats-item {
    flex-direction: column;
    text-align: center;
    gap: var(--gap-sm);
  }

  .trust-logos {
    grid-template-columns: repeat(2, 1fr);
    display: grid;
  }
}
</style>
