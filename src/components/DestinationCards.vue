<template>
  <section class="section destinations" id="destinations">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Top Dive Destinations</h2>
        <p class="section-subtitle">Handpicked underwater paradises across Thailand</p>
      </div>
      <div class="destinations-grid">
        <article v-for="destination in destinations" :key="destination.id" class="dest-card">
          <div class="dest-card-image">
            <img :src="destination.image" :alt="destination.name" />
            <span class="dest-card-badge">{{ destination.badge }}</span>
            <span class="dest-card-level" :class="destination.difficulty?.toLowerCase()">{{ destination.difficulty || "All Levels" }}</span>
          </div>
          <div class="dest-card-body">
            <h3 class="dest-card-name">{{ destination.name }}</h3>
            <p class="dest-card-desc">{{ destination.description }}</p>
            <div class="dest-card-meta">
              <span class="dest-card-stat">🤿 {{ destination.depth || "5-30m" }}</span>
              <span class="dest-card-stat">⏱ {{ destination.duration || "45min" }}</span>
              <span class="dest-card-stat">👥 {{ destination.groupSize || "Max 8" }}</span>
            </div>
            <div class="dest-card-action">
              <span class="dest-card-price">${{ destination.price }}</span>
              <button class="dest-card-btn">Book Now</button>
            </div>
          </div>
        </article>
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
    image: "/images/similan-islands-diving.jpg",
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
    image: "/images/phi-phi-islands.jpg",
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
    image: "/images/koh-tao-diving.jpg",
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
    image: "/images/1957.jpg",
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
    image: "/images/2216.jpg",
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
    image: "/images/2272.jpg",
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
.destinations {
  background: var(--white);
}

.destinations-grid {
  display: grid;
  gap: var(--gap-md);
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
}

.dest-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--lightgray);
  transition: all 0.3s ease;
}

.dest-card:hover {
  border-color: var(--orange);
  box-shadow: 0 12px 32px var(--shadow-deepblue);
  transform: translateY(-4px);
}

.dest-card-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.dest-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.dest-card:hover .dest-card-image img {
  transform: scale(1.06);
}

.dest-card-badge {
  position: absolute;
  top: var(--gap-sm);
  left: var(--gap-sm);
  background: var(--orange);
  color: var(--white);
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 700;
}

.dest-card-level {
  position: absolute;
  top: var(--gap-sm);
  right: var(--gap-sm);
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dest-card-level.beginner {
  background: var(--lightgray);
  color: var(--darkblue);
}

.dest-card-level.advanced {
  background: var(--darkblue);
  color: var(--white);
}

.dest-card-level.expert {
  background: var(--blackblue);
  color: var(--white);
}

.dest-card-body {
  padding: var(--gap-sm);
}

.dest-card-name {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.dest-card-desc {
  font-size: var(--font-xs);
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: var(--gap-sm);
}

.dest-card-meta {
  display: flex;
  gap: var(--gap-sm);
  margin-bottom: var(--gap-sm);
  flex-wrap: wrap;
}

.dest-card-stat {
  font-size: var(--font-xs);
  color: var(--color2);
  font-weight: 500;
}

.dest-card-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--gap-sm);
  border-top: 1px solid var(--lightgray);
}

.dest-card-price {
  font-size: var(--font-lg);
  font-weight: 800;
  color: var(--orange);
}

.dest-card-btn {
  background: var(--darkblue);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-xs);
  font-weight: 700;
  transition: all 0.3s ease;
}

.dest-card-btn:hover {
  background: var(--orange);
}

@media (max-width: 768px) {
  .destinations-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .destinations-grid {
    grid-template-columns: 1fr;
  }

  .dest-card-image {
    height: 180px;
  }
}
</style>
