<template>
  <section class="section featured" id="experiences">
    <div class="container">
      <div class="featured-header">
        <div class="featured-header-text">
          <h2 class="featured-heading">Limited-Time Experiences</h2>
          <p class="featured-sub">Seasonal adventures you can't find anywhere else</p>
        </div>
        <a href="#pricing" class="featured-header-link">View All Packages →</a>
      </div>
      <div class="featured-grid">
        <article v-for="exp in experiences" :key="exp.id" :class="['featured-card', exp.wide && 'featured-card-wide']">
          <div class="featured-card-image">
            <img :src="exp.image" :alt="exp.title" loading="lazy" />
            <span v-if="exp.tag" class="featured-card-tag">{{ exp.tag }}</span>
          </div>
          <div class="featured-card-body">
            <div class="featured-card-meta">
              <span class="featured-card-category">{{ exp.category }}</span>
              <span class="featured-card-duration">{{ exp.duration }}</span>
            </div>
            <h3 class="featured-card-title">{{ exp.title }}</h3>
            <p class="featured-card-desc">{{ exp.description }}</p>
            <ul class="featured-card-perks">
              <li v-for="perk in exp.perks" :key="perk" class="featured-card-perk">✓ {{ perk }}</li>
            </ul>
            <div class="featured-card-action">
              <div class="featured-card-pricing">
                <span v-if="exp.originalPrice" class="featured-card-original">${{ exp.originalPrice }}</span>
                <span class="featured-card-price">${{ exp.price }}</span>
                <span class="featured-card-unit">/ person</span>
              </div>
              <button class="featured-card-btn">Book Now</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Experience {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  perks: string[];
  wide?: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Whale Shark Season Safari",
    description:
      "March-April is peak whale shark season at Richelieu Rock. Join a 3-day liveaboard expedition with guaranteed sightings or your next trip is free.",
    image: "/images/joakant-lemon-butterflyfish-380037_1280.jpg",
    category: "Liveaboard",
    duration: "3 Days / 2 Nights",
    price: 899,
    originalPrice: 1299,
    tag: "30% OFF — Ends Soon",
    perks: ["10 dives included", "Full board meals", "Whale shark guarantee", "Professional photography"],
    wide: true,
  },
  {
    id: 2,
    title: "Sunset Surf & Dive Combo",
    description: "Morning reef dive followed by afternoon surf lessons at Kata Beach. The perfect ocean day for thrill-seekers.",
    image: "/images/siamways-thailand-10122355_1920.jpg",
    category: "Combo Package",
    duration: "Full Day",
    price: 179,
    originalPrice: 249,
    tag: "New",
    perks: ["2-tank morning dive", "Surf lesson included", "Lunch at beach club", "Hotel transfer"],
  },
  {
    id: 3,
    title: "Bioluminescent Night Dive",
    description: "Dive into a glowing underwater world. Limited moonless-night departures with black-light torches and glow sticks.",
    image: "/images/joakant-fish-378286_1280.jpg",
    category: "Night Dive",
    duration: "Evening (6PM-10PM)",
    price: 149,
    tag: "Limited Spots",
    perks: ["UV torch provided", "Hot cocoa on boat", "Night photography", "Max 4 divers"],
  },
  {
    id: 4,
    title: "Honeymoon Dive & Stay",
    description: "5-star beachfront villa, private boat, champagne on board, and couples underwater photography session.",
    image: "/images/vibrant-coral-reefs.jpg",
    category: "Luxury",
    duration: "3 Days / 2 Nights",
    price: 1599,
    originalPrice: 2199,
    tag: "Couples Special",
    perks: ["Private villa", "Private boat charter", "Champagne & dinner", "Couples photo shoot"],
    wide: true,
  },
];
</script>

<style scoped>
.featured {
  background: var(--white);
}

.featured-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--gap-md);
  flex-wrap: wrap;
  gap: var(--gap-sm);
}

.featured-heading {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.featured-sub {
  font-size: var(--font-md);
  color: var(--gray);
}

.featured-header-link {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--orange);
  transition: color 0.3s ease;
  white-space: nowrap;
}

.featured-header-link:hover {
  color: var(--darkblue);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-md);
}

.featured-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--lightgray);
  display: grid;
  grid-template-columns: 1fr 1fr;
  transition: all 0.3s ease;
}

.featured-card:hover {
  border-color: var(--orange);
  box-shadow: 0 12px 32px var(--shadow-deepblue);
  transform: translateY(-4px);
}

.featured-card-wide {
  grid-column: span 2;
}

.featured-card-image {
  position: relative;
  min-height: 280px;
  overflow: hidden;
}

.featured-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.featured-card:hover .featured-card-image img {
  transform: scale(1.05);
}

.featured-card-tag {
  position: absolute;
  top: var(--gap-sm);
  left: var(--gap-sm);
  background: var(--orange);
  color: var(--white);
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.featured-card-body {
  padding: var(--gap-md);
  display: flex;
  flex-direction: column;
}

.featured-card-meta {
  display: flex;
  gap: var(--gap-xs);
  margin-bottom: var(--gap-sm);
}

.featured-card-category {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  background: var(--lightgray);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--darkblue);
}

.featured-card-duration {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  background: rgba(239, 108, 51, 0.1);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--orange);
}

.featured-card-title {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.featured-card-desc {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: var(--gap-sm);
}

.featured-card-perks {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-xs);
  margin-bottom: var(--gap-sm);
  flex: 1;
}

.featured-card-perk {
  font-size: var(--font-xs);
  color: var(--color2);
  font-weight: 500;
}

.featured-card-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--gap-sm);
  border-top: 1px solid var(--lightgray);
}

.featured-card-pricing {
  display: flex;
  align-items: baseline;
  gap: calc(var(--gap-xs) * 0.5);
}

.featured-card-original {
  font-size: var(--font-sm);
  color: var(--gray);
  text-decoration: line-through;
}

.featured-card-price {
  font-size: var(--font-lg);
  font-weight: 800;
  color: var(--orange);
}

.featured-card-unit {
  font-size: var(--font-xs);
  color: var(--gray);
}

.featured-card-btn {
  background: var(--darkblue);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-xs);
  font-weight: 700;
  transition: all 0.3s ease;
}

.featured-card-btn:hover {
  background: var(--orange);
}

@media (max-width: 1024px) {
  .featured-card-wide {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }

  .featured-card {
    grid-template-columns: 1fr;
  }

  .featured-card-wide {
    grid-column: auto;
  }

  .featured-card-image {
    min-height: 200px;
  }
}
</style>
