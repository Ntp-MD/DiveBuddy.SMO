<template>
  <section class="section testimonials">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">What Our Divers Say</h2>
      </div>
      <div class="testimonials-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-icon">"</div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
          </div>
          <div class="testimonial-author">
            <div class="author-avatar">
              <img :src="testimonial.avatar" :alt="testimonial.name" />
            </div>
            <div class="author-info">
              <h4 class="author-name">{{ testimonial.name }}</h4>
              <p class="author-role">{{ testimonial.role }}</p>
              <div class="rating">
                <span v-for="star in 5" :key="star" class="star">★</span>
              </div>
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
.testimonials-grid {
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
}

.testimonials {
  background: var(--lightgray);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-md);
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background: var(--white);
  padding: var(--gap-md);
  border-radius: var(--radius-sm);
  box-shadow: 0 var(--gap-xs) var(--gap-md) rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.testimonial-content {
  position: relative;
  margin-bottom: 24px;
}

.quote-icon {
  font-size: var(--font-xl);
  color: var(--orange);
  opacity: 0.3;
  position: absolute;
  top: calc(var(--gap-md) * -1);
  left: var(--gap-sm);
  font-family: serif;
}

.testimonial-text {
  font-size: var(--font-sm);
  line-height: 1.6;
  color: var(--deepblue);
  position: relative;
  z-index: 1;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
}

.author-avatar {
  width: calc(var(--gap-md) * 3);
  height: calc(var(--gap-md) * 3);
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: var(--font-xs);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-sm);
}

.author-role {
  font-size: var(--font-xs);
  color: var(--gray);
  margin-bottom: var(--gap-sm);
}

.rating {
  color: var(--orange);
  font-size: var(--font-md);
}

.star {
  margin-right: var(--gap-xs);
}

@media (max-width: 1023px) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) and (orientation: portrait) {
  .testimonials-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--gap-md);
  }

  .testimonial-card {
    padding: var(--gap-md);
  }

  .quote-icon {
    font-size: var(--font-lg);
  }

  .testimonial-text {
    font-size: var(--font-sm);
  }
}

@media (max-width: 1023px) and (orientation: landscape) {
  .testimonials-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap-md);
  }
}

@media (max-width: 480px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: var(--gap-sm);
  }

  .testimonial-card {
    padding: var(--gap-md);
  }

  .testimonial-content {
    margin-bottom: var(--gap-md);
  }

  .quote-icon {
    font-size: var(--font-md);
    top: calc(var(--gap-md) * -0.75);
    left: calc(var(--gap-sm) * -0.5);
  }

  .author-avatar {
    width: calc(var(--gap-md) * 2.5);
    height: calc(var(--gap-md) * 2.5);
  }

  .testimonial-text {
    font-size: var(--font-xs);
  }
}
</style>
