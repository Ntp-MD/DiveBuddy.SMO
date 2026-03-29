<template>
  <section class="section pricing" id="pricing">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Dive Packages</h2>
        <p class="section-subtitle">Transparent pricing for every level of adventure</p>
      </div>
      <div class="pricing-grid">
        <div v-for="plan in pricingPlans" :key="plan.id" :class="['price-card', plan.popular && 'price-card-featured']">
          <div v-if="plan.popular" class="price-card-ribbon">Best Value</div>
          <h3 class="price-card-name">{{ plan.name }}</h3>
          <div class="price-card-amount">
            <span class="price-card-dollar">$</span>{{ plan.price }}<span class="price-card-period">{{ plan.period }}</span>
          </div>
          <p class="price-card-desc">{{ plan.description }}</p>
          <ul class="price-card-list">
            <li v-for="feature in plan.features" :key="feature" class="price-card-feature"><span class="price-card-check">✓</span>{{ feature }}</li>
          </ul>
          <button :class="['price-card-btn', plan.popular && 'price-card-btn-featured']">{{ plan.buttonText }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PricingPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Fun Dive",
    price: 89,
    period: "/ dive",
    description: "Perfect for experienced divers looking for a single adventure",
    features: ["2-tank dive trip", "All equipment included", "Certified dive guide", "Hotel transfer", "Light refreshments", "Dive insurance"],
    popular: false,
    buttonText: "Book Now",
  },
  {
    id: 2,
    name: "Discovery Package",
    price: 299,
    period: "/ 4 dives",
    description: "Ideal for divers wanting to explore multiple sites with premium service",
    features: [
      "4-tank dive package",
      "Premium equipment",
      "Personal dive guide",
      "Hotel transfer",
      "Full lunch included",
      "Underwater photos",
      "Dive insurance",
    ],
    popular: true,
    buttonText: "Get Started",
  },
  {
    id: 3,
    name: "Adventure Week",
    price: 899,
    period: "/ week",
    description: "The ultimate diving experience with unlimited dives and full accommodation",
    features: [
      "Unlimited diving",
      "Full equipment set",
      "Expert dive master",
      "Daily boat trips",
      "All meals included",
      "Underwater photography",
      "Dive certification course",
      "Free accommodation",
    ],
    popular: false,
    buttonText: "Learn More",
  },
  {
    id: 4,
    name: "Private Charter",
    price: 1299,
    period: "/ day",
    description: "Exclusive private diving experience with personalized service and luxury amenities",
    features: [
      "Private boat charter",
      "Custom dive sites",
      "Personal instructor",
      "Gourmet meals",
      "Premium equipment",
      "Professional photographer",
      "Flexible schedule",
      "VIP service",
    ],
    popular: false,
    buttonText: "Contact Us",
  },
];
</script>

<style scoped>
.pricing {
  background: var(--lightgray);
}

.pricing-grid {
  display: grid;
  gap: var(--gap-md);
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
}

.price-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  border: 1px solid var(--lightgray);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.price-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--shadow-deepblue);
}

.price-card-featured {
  border-color: var(--orange);
  border-width: 2px;
}

.price-card-ribbon {
  position: absolute;
  top: -1px;
  right: var(--gap-sm);
  background: var(--orange);
  color: var(--white);
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  font-size: var(--font-xs);
  font-weight: 700;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-card-name {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.price-card-amount {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--orange);
  margin-bottom: var(--gap-xs);
}

.price-card-dollar {
  font-size: var(--font-md);
  color: var(--gray);
  font-weight: 600;
}

.price-card-period {
  font-size: var(--font-xs);
  color: var(--gray);
  font-weight: 500;
  margin-left: var(--gap-xs);
}

.price-card-desc {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.5;
  margin-bottom: var(--gap-sm);
}

.price-card-list {
  list-style: none;
  margin-bottom: var(--gap-md);
  flex: 1;
}

.price-card-feature {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-xs) 0;
  font-size: var(--font-sm);
  color: var(--deepblue);
  border-bottom: 1px solid var(--lightgray);
}

.price-card-feature:last-child {
  border-bottom: none;
}

.price-card-check {
  color: var(--orange);
  font-weight: 700;
  flex-shrink: 0;
}

.price-card-btn {
  width: 100%;
  background: var(--white);
  color: var(--darkblue);
  border: 2px solid var(--darkblue);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 700;
  transition: all 0.3s ease;
}

.price-card-btn:hover {
  background: var(--darkblue);
  color: var(--white);
  transform: translateY(-2px);
}

.price-card-btn-featured {
  background: var(--orange);
  color: var(--white);
  border-color: var(--orange);
}

.price-card-btn-featured:hover {
  background: var(--darkblue);
  border-color: var(--darkblue);
}

@media (max-width: 480px) {
  .price-card {
    padding: var(--gap-sm);
  }

  .price-card-amount {
    font-size: var(--font-lg);
  }
}
</style>
