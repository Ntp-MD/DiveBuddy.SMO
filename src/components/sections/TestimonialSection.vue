<template>
  <section class="section testi" id="testimonials">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Diver Stories</h2>
        <p class="section-subtitle">Real experiences from our diving community</p>
      </div>
      <div class="testi-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testi-card">
          <div class="testi-card-stars">
            <span v-for="star in 5" :key="star" class="testi-card-star">★</span>
          </div>
          <p class="testi-card-text">"{{ testimonial.text }}"</p>
          <div class="testi-card-author">
            <img :src="testimonial.avatar" :alt="testimonial.name" class="testi-card-avatar" />
            <div class="testi-card-info">
              <h4 class="testi-card-name">{{ testimonial.name }}</h4>
              <p class="testi-card-role">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Open Water Diver",
    text: "Amazing experience! The instructors were professional and patient. I felt completely safe while exploring the beautiful coral reefs. Can't wait for my next dive!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b7c2?w=100",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Advanced Diver",
    text: "Best diving school in Thailand! The equipment is top-notch and the dive sites are incredible. Saw my first whale shark here - a lifetime memory!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Divemaster Trainee",
    text: "The divemaster course exceeded my expectations. Comprehensive training, amazing instructors, and the best dive sites. Highly recommend for anyone serious about diving!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    role: "Rescue Diver",
    text: "The rescue course gave me so much confidence. The instructors are knowledgeable and the scenarios were realistic. Essential skills for any serious diver!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Beginner Diver",
    text: "Never thought I'd overcome my fear of water, but the team made it possible! Patient, encouraging, and professional. The underwater world is breathtaking!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Photography Diver",
    text: "Perfect for underwater photography! Clear waters, abundant marine life, and guides who know the best spots for capturing amazing shots.",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100",
  },
];
</script>

<style scoped>
.testi {
  background: var(--white);
}

.testi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--gap-md);
  max-width: 1200px;
  margin: 0 auto;
}

.testi-card {
  background: var(--white);
  padding: var(--gap-md);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--orange);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.testi-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px var(--shadow-deepblue);
}

.testi-card-stars {
  margin-bottom: var(--gap-xs);
}

.testi-card-star {
  color: var(--orange);
  font-size: var(--font-sm);
}

.testi-card-text {
  font-size: var(--font-sm);
  color: var(--deepblue);
  line-height: 1.7;
  font-style: italic;
  margin-bottom: var(--gap-sm);
}

.testi-card-author {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding-top: var(--gap-sm);
  border-top: 1px solid var(--lightgray);
}

.testi-card-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.testi-card-name {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--darkblue);
}

.testi-card-role {
  font-size: var(--font-xs);
  color: var(--gray);
}

@media (max-width: 768px) {
  .testi-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .testi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
