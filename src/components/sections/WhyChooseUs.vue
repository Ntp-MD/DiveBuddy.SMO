<template>
  <section class="section why" id="why">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Why Divers Choose Us</h2>
        <p class="section-subtitle">What sets DiveBuddy apart from every other dive operator in Thailand</p>
      </div>
      <div class="why-grid">
        <div v-for="item in reasons" :key="item.id" class="why-card">
          <div class="why-card-icon">{{ item.icon }}</div>
          <h3 class="why-card-title">{{ item.title }}</h3>
          <p class="why-card-desc">{{ item.description }}</p>
          <span class="why-card-highlight">{{ item.highlight }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Reason {
  id: number;
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

const reasons: Reason[] = [
  {
    id: 1,
    icon: "🛡️",
    title: "Safety First, Always",
    description: "Triple-checked equipment, emergency oxygen on every boat, and instructors trained in rescue diving. Your safety is non-negotiable.",
    highlight: "Zero incidents in 15 years",
  },
  {
    id: 2,
    icon: "🎓",
    title: "PADI 5-Star Center",
    description: "Our instructors hold the highest PADI certifications. Small group sizes mean personalized attention on every dive.",
    highlight: "Max 4 divers per instructor",
  },
  {
    id: 3,
    icon: "⚙️",
    title: "Premium Equipment",
    description: "Brand-new regulators, BCDs, and wetsuits replaced annually. We invest in Aqualung and Scubapro gear — the best in the industry.",
    highlight: "Replaced every 12 months",
  },
  {
    id: 4,
    icon: "🚤",
    title: "Private Speedboats",
    description: "Skip the crowded ferries. Our fleet of private speedboats gets you to dive sites faster, with more time underwater.",
    highlight: "45 min to Similan Islands",
  },
  {
    id: 5,
    icon: "📸",
    title: "Free Dive Photos",
    description: "Every dive includes complimentary underwater photography. Professional-grade GoPro footage delivered to your phone same-day.",
    highlight: "HD photos & 4K video included",
  },
  {
    id: 6,
    icon: "🏨",
    title: "Hotel Pickup & Stay",
    description: "Door-to-door transfers from any hotel in Phuket, Krabi, or Khao Lak. Multi-day packages include beachfront accommodation.",
    highlight: "Free hotel transfers",
  },
];
</script>

<style scoped>
.why {
  background: var(--lightgray);
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--gap-md);
}

.why-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  position: relative;
}

.why-card:hover {
  border-color: var(--orange);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--shadow-deepblue);
}

.why-card-icon {
  font-size: var(--font-xl);
  margin-bottom: var(--gap-sm);
}

.why-card-title {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.why-card-desc {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: var(--gap-sm);
}

.why-card-highlight {
  display: inline-block;
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  background: rgba(239, 108, 51, 0.1);
  color: var(--orange);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 700;
}

@media (max-width: 480px) {
  .why-grid {
    grid-template-columns: 1fr;
  }
}
</style>
