<template>
  <section class="trust" aria-label="Certifications and partners">
    <div class="container">
      <div class="trust-header">
        <h2 class="trust-heading">World-Class Certifications</h2>
        <p class="trust-sub">Partnered with the most respected organizations in diving</p>
      </div>

      <div class="trust-showcase">
        <div class="trust-featured">
          <div class="featured-badge">
            <div class="featured-badge-icon">🏅</div>
            <div class="featured-badge-content">
              <h3 class="featured-badge-title">PADI 5-Star IDC</h3>
              <p class="featured-badge-desc">Highest rating for dive centers worldwide</p>
              <div class="featured-badge-meta">
                <span class="featured-badge-year">Since 2015</span>
                <span class="featured-badge-status">Premium</span>
              </div>
            </div>
            <div class="featured-badge-accent"></div>
          </div>
        </div>

        <div class="trust-grid">
          <div v-for="badge in badges" :key="badge.id" class="trust-card" :class="`trust-card-${badge.id}`">
            <div class="trust-card-icon">{{ badge.icon }}</div>
            <div class="trust-card-content">
              <span class="trust-card-name">{{ badge.name }}</span>
              <span class="trust-card-detail">{{ badge.detail }}</span>
            </div>
            <div class="trust-card-glow"></div>
          </div>
        </div>
      </div>

      <div class="trust-footer">
        <p class="trust-footer-text">
          <span class="trust-highlight">15+</span> years of certified excellence
          <span class="trust-separator">•</span>
          <span class="trust-highlight">100%</span> safety compliance
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Badge {
  id: number;
  icon: string;
  name: string;
  detail: string;
}

const badges: Badge[] = [
  { id: 1, icon: "", name: "SSI", detail: "Diamond Center" },
  { id: 2, icon: "🛡️", name: "DAN", detail: "Insured Provider" },
  { id: 3, icon: "🌿", name: "Green Fins", detail: "Eco Certified" },
  { id: 4, icon: "⭐", name: "TripAdvisor", detail: "Travelers' Choice 2024" },
  { id: 5, icon: "🏆", name: "TAT", detail: "Tourism Authority" },
];
</script>

<style scoped>
.trust {
  background: linear-gradient(135deg, var(--lightgray) 0%, var(--white) 100%);
  padding: var(--pad-section) 0;
  position: relative;
  overflow: hidden;
}

.trust::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--orange), transparent);
  opacity: 0.3;
}

.trust-header {
  text-align: center;
  margin-bottom: var(--gap-md);
}

.trust-heading {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.trust-sub {
  font-size: var(--font-md);
  color: var(--gray);
}

.trust-showcase {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--gap-md);
  margin-bottom: var(--gap-md);
  align-items: start;
}

.trust-featured {
  position: relative;
}

.featured-badge {
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--darkblue) 100%);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  color: var(--white);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.featured-badge:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--shadow-deepblue);
}

.featured-badge-icon {
  font-size: 48px;
  margin-bottom: var(--gap-sm);
  filter: drop-shadow(0 0 20px rgba(239, 108, 51, 0.3));
}

.featured-badge-content {
  position: relative;
  z-index: 1;
}

.featured-badge-title {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--white);
  margin-bottom: var(--gap-xs);
}

.featured-badge-desc {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  margin-bottom: var(--gap-sm);
}

.featured-badge-meta {
  display: flex;
  gap: var(--gap-sm);
  align-items: center;
}

.featured-badge-year {
  font-size: var(--font-xs);
  color: var(--orange);
  font-weight: 600;
}

.featured-badge-status {
  padding: 2px 8px;
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-xs);
  font-size: var(--font-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.featured-badge-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(239, 108, 51, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(30%, -30%);
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--gap-sm);
}

.trust-card {
  background: var(--white);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-lg);
  padding: var(--gap-sm);
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.trust-card:hover {
  border-color: var(--orange);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--shadow-deepblue);
}

.trust-card-icon {
  font-size: var(--font-lg);
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.trust-card:hover .trust-card-icon {
  transform: scale(1.1);
}

.trust-card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.trust-card-name {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--darkblue);
  line-height: 1.2;
}

.trust-card-detail {
  font-size: var(--font-xs);
  color: var(--gray);
}

.trust-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(239, 108, 51, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.trust-card:hover .trust-card-glow {
  transform: translateX(100%);
}

.trust-footer {
  text-align: center;
  padding-top: var(--gap-md);
  border-top: 1px solid var(--lightgray);
}

.trust-footer-text {
  font-size: var(--font-sm);
  color: var(--gray);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-sm);
  flex-wrap: wrap;
}

.trust-highlight {
  color: var(--orange);
  font-weight: 700;
}

.trust-separator {
  color: var(--lightgray);
  font-weight: 400;
}

@media (max-width: 768px) {
  .trust-showcase {
    grid-template-columns: 1fr;
  }

  .trust-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .trust-footer-text {
    flex-direction: column;
    gap: calc(var(--gap-xs) * 0.5);
  }
}

@media (max-width: 480px) {
  .trust-grid {
    grid-template-columns: 1fr;
  }
}
</style>
