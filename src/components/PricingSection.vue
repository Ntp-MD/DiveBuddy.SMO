<template>
  <section class="section pricing" id="pricing">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Choose Your Adventure</h2>
        <p class="section-subtitle">Flexible pricing plans for every diving enthusiast</p>
      </div>
      <div class="pricing-grid">
        <div class="pricing-card card" v-for="plan in pricingPlans" :key="plan.id" :class="{ 'pricing-card-popular': plan.popular }">
          <div v-if="plan.popular" class="popular-badge">
            <span class="popular-text">Most Popular</span>
          </div>
          <div class="pricing-header">
            <h3 class="plan-name">{{ plan.name }}</h3>
            <div class="plan-price">
              <span class="price-currency">$</span>
              <span class="price-amount">{{ plan.price }}</span>
              <span class="price-period">{{ plan.period }}</span>
            </div>
            <p class="plan-description">{{ plan.description }}</p>
          </div>
          <div class="pricing-features">
            <ul class="features-list">
              <li class="feature-item" v-for="feature in plan.features" :key="feature">
                <span class="feature-check">✓</span>
                <span class="feature-text">{{ feature }}</span>
              </li>
            </ul>
          </div>
          <div class="pricing-footer">
            <button class="plan-btn" :class="{ 'plan-btn-popular': plan.popular }">
              {{ plan.buttonText }}
            </button>
          </div>
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
  --gap-base: var(--gap-md);
  display: grid;
  gap: var(--gap-base);
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      clamp(
        calc(100% / 4 - var(--gap-base)),
        (1200px - 100vw) * 999,
        clamp(calc(100% / 3 - var(--gap-base)), (992px - 100vw) * 999, clamp(calc(100% / 2 - var(--gap-base)), (480px - 100vw) * 999, 100%))
      ),
      1fr
    )
  );
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.pricing-card-popular {
  border-color: var(--orange);
  transform: scale(1.05);
}

.pricing-card-popular:hover {
  transform: scale(1.05) translateY(-8px);
}

.popular-badge {
  position: absolute;
  top: -1px;
  right: 20px;
  background: var(--orange);
  color: var(--white);
  padding: var(--gap-xs) var(--gap-sm);
  font-size: var(--font-xs);
  font-weight: 600;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  box-shadow: 0 4px 12px var(--shadow-orange);
}

.popular-text {
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pricing-header {
  text-align: center;
  margin-bottom: var(--gap-md);
}

.plan-name {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin: var(--gap-sm) 0;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: var(--gap-sm);
}

.price-currency {
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--gray);
}

.price-amount {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--orange);
  margin: 0 var(--gap-xs);
}

.price-period {
  font-size: var(--font-sm);
  color: var(--gray);
}

.plan-description {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.6;
}

.pricing-features {
  margin-bottom: var(--gap-md);
}

.features-list {
  list-style: none;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: var(--gap-xs) 0;
  border-bottom: 1px solid var(--lightgray);
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--gap-sm) * 1.25);
  height: calc(var(--gap-sm) * 1.25);
  background: var(--orange);
  color: var(--white);
  border-radius: 50%;
  font-size: var(--font-xs);
  font-weight: 700;
  margin-right: var(--gap-sm);
  flex-shrink: 0;
}

.feature-text {
  font-size: var(--font-sm);
  color: var(--deepblue);
  line-height: 1.5;
}

.pricing-footer {
  text-align: center;
}

.plan-btn {
  width: 100%;
  font-size: var(--font-md);
  font-weight: 600;
  display: inline-block;
  text-align: center;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  background: var(--white);
  color: var(--darkblue);
  border: 2px solid var(--darkblue);
  cursor: pointer;
}

.plan-btn:hover {
  background: var(--darkblue);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

.plan-btn-popular {
  background: var(--orange);
  color: var(--white);
  border-color: var(--orange);
}

.plan-btn-popular:hover {
  background: var(--darkblue);
  border-color: var(--darkblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

@media (max-width: 768px) {
  .pricing-card {
    padding: var(--gap-md);
  }
}

@media (max-width: 480px) {
  .pricing-card {
    padding: var(--gap-sm);
  }

  .price-amount {
    font-size: var(--font-lg);
  }
}
</style>
