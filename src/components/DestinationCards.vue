<template>
  <section class="section destinations" id="destinations">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Popular Dive Destinations</h2>
        <p class="section-subtitle">Explore the world's most breathtaking underwater paradises</p>
      </div>
      <div class="destinations-grid">
        <div v-for="destination in destinations" :key="destination.id" class="destination-card">
          <div class="card-image-wrapper">
            <img :src="destination.image" :alt="destination.name" class="card-image" />
            <div class="card-overlay">
              <div class="card-badge">{{ destination.badge }}</div>
              <div class="card-rating">
                <div class="stars">
                  <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= 4 }">★</span>
                </div>
                <span class="rating-text">(4.8)</span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">{{ destination.name }}</h3>
              <div class="card-difficulty" :class="destination.difficulty?.toLowerCase()">
                {{ destination.difficulty || "All Levels" }}
              </div>
            </div>
            <p class="card-desc">{{ destination.description }}</p>
            <div class="card-features">
              <span class="feature-tag">
                {{ destination.depth || "5-30m" }}
              </span>
              <span class="feature-tag">
                {{ destination.duration || "45min" }}
              </span>
              <span class="feature-tag">
                {{ destination.groupSize || "Max 8" }}
              </span>
            </div>
            <div class="card-footer">
              <div class="price-wrapper">
                <span class="price-label">From</span>
                <span class="card-price">${{ destination.price }}</span>
              </div>
              <button class="card-btn">Explore →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  badge: string;
  difficulty?: string;
  depth?: string;
  duration?: string;
  groupSize?: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Similan Islands",
    description: "Crystal clear waters with vibrant coral reefs and diverse marine life including whale sharks and manta rays",
    image: "https://images.unsplash.com/photo-1583878928698-e7342c1e8d6d?w=600",
    price: 299,
    badge: "Popular",
    difficulty: "Advanced",
    depth: "5-40m",
    duration: "60min",
    groupSize: "Max 6",
  },
  {
    id: 2,
    name: "Phi Phi Islands",
    description: "Stunning limestone cliffs and excellent visibility for diving with colorful reef fish",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600",
    price: 249,
    badge: "Best Value",
    difficulty: "Beginner",
    depth: "5-25m",
    duration: "45min",
    groupSize: "Max 8",
  },
  {
    id: 3,
    name: "Koh Tao",
    description: "Perfect for beginners with calm waters and abundant sea turtles and reef sharks",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
    price: 199,
    badge: "Beginner Friendly",
    difficulty: "Beginner",
    depth: "3-18m",
    duration: "40min",
    groupSize: "Max 10",
  },
  {
    id: 4,
    name: "Richelieu Rock",
    description: "World-class dive site known for whale shark encounters and pelagic species",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    price: 399,
    badge: "Advanced",
    difficulty: "Expert",
    depth: "10-50m",
    duration: "70min",
    groupSize: "Max 4",
  },
  {
    id: 5,
    name: "Shark Point",
    description: "Exciting drift dives with leopard sharks and colorful soft corals",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600",
    price: 279,
    badge: "Thrilling",
    difficulty: "Advanced",
    depth: "8-30m",
    duration: "55min",
    groupSize: "Max 6",
  },
  {
    id: 6,
    name: "Hin Daeng",
    description: "Deep wall diving with manta rays and pelagic species in pristine conditions",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600",
    price: 349,
    badge: "Expert Level",
    difficulty: "Expert",
    depth: "15-60m",
    duration: "65min",
    groupSize: "Max 4",
  },
];
</script>

<style scoped>
.destinations-grid {
  --gap-base: var(--gap-md);
  display: grid;
  gap: var(--gap-base);
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      clamp(
        calc(100% / 3 - var(--gap-base)),
        (1200px - 100vw) * 999,
        clamp(calc(100% / 3 - var(--gap-base)), (992px - 100vw) * 999, clamp(calc(100% / 2 - var(--gap-base)), (480px - 100vw) * 999, 100%))
      ),
      1fr
    )
  );
}

.destinations {
  background: linear-gradient(180deg, var(--lightgray) 0%, var(--white) 100%);
  padding: var(--pad-section) 0;
}

.destination-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
}

.destination-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-image-wrapper {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.destination-card:hover .card-image {
  transform: scale(1.08);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--gap-sm);
}

.card-badge {
  background: var(--orange);
  color: var(--white);
  padding: var(--gap-xs) var(--gap-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-xs);
  font-weight: 600;
  align-self: flex-start;
  backdrop-filter: blur(10px);
}

.card-rating {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  align-self: flex-end;
  background: rgba(255, 255, 255, 0.9);
  padding: var(--gap-xs) var(--gap-sm);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
}

.stars {
  display: flex;
  gap: calc(var(--gap-xs) * 0.5);
}

.star {
  color: var(--lightgray);
  font-size: var(--font-xs);
}

.star.filled {
  color: var(--orange);
}

.rating-text {
  font-size: var(--font-xs);
  color: var(--gray);
  font-weight: 600;
}

.card-content {
  padding: var(--gap-md);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-sm);
}

.card-title {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin: 0;
}

.card-difficulty {
  padding: var(--gap-xs) var(--gap-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.card-difficulty.beginner {
  background: var(--lightgray);
  color: var(--darkblue);
}

.card-difficulty.advanced {
  background: var(--orange);
  color: var(--white);
}

.card-difficulty.expert {
  background: var(--darkblue);
  color: var(--white);
}

.card-desc {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: var(--gap-md);
}

.card-features {
  display: flex;
  gap: var(--gap-sm);
  margin-bottom: var(--gap-md);
  flex-wrap: wrap;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-xs) var(--gap-sm);
  background: var(--lightgray);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  color: var(--gray);
  font-weight: 500;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--gap-sm);
  border-top: 1px solid var(--lightgray);
}

.price-wrapper {
  display: flex;
  align-items: baseline;
  gap: var(--gap-xs);
}

.price-label {
  font-size: var(--font-xs);
  color: var(--gray);
}

.card-price {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--orange);
}

.card-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  background: var(--darkblue);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
}

.card-btn:hover {
  background: var(--orange);
  transform: translateX(2px);
}

@media (max-width: 768px) and (orientation: portrait) {
  .card-image-wrapper {
    height: 220px;
  }

  .card-content {
    padding: var(--gap-sm);
  }

  .card-title {
    font-size: var(--font-md);
  }

  .card-desc {
    font-size: var(--font-sm);
  }

  .card-features {
    justify-content: space-between;
    gap: var(--gap-sm);
  }
}

@media (max-width: 1023px) and (orientation: landscape) {
  .card-image-wrapper {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .card-image-wrapper {
    height: 180px;
  }

  .card-content {
    padding: var(--gap-sm);
  }

  .card-title {
    font-size: var(--font-md);
  }

  .card-desc {
    font-size: var(--font-xs);
  }

  .card-features {
    gap: var(--gap-xs);
  }

  .feature-tag {
    font-size: var(--font-xs);
    padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  }
}
</style>
