<template>
  <section class="section courses" id="courses">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Diving Courses & Packages</h2>
      </div>
      <div class="courses-grid">
        <div v-for="course in courses" :key="course.id" class="course-card card">
          <div class="course-badge" :class="`badge-${course.level.toLowerCase()}`">
            {{ course.level }}
          </div>
          <div class="course-icon">
            <div class="icon-circle">{{ course.icon }}</div>
          </div>
          <h3 class="course-title">{{ course.name }}</h3>
          <p class="course-desc">{{ course.description }}</p>
          <div class="course-details">
            <div class="detail-item">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">{{ course.duration }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Level:</span>
              <span class="detail-value">{{ course.level }}</span>
            </div>
          </div>
          <div class="course-price">
            <span class="price-amount">${{ course.price }}</span>
            <span class="price-label">per person</span>
          </div>
          <button class="course-btn">Enroll Now</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  icon: string;
}

const courses: Course[] = [
  {
    id: 1,
    name: "Open Water Diver",
    description: "Get certified and explore the underwater world with confidence",
    duration: "3-4 days",
    level: "Beginner",
    price: 450,
    icon: "🤿",
  },
  {
    id: 2,
    name: "Advanced Open Water",
    description: "Enhance your skills with deep diving and navigation",
    duration: "2-3 days",
    level: "Intermediate",
    price: 350,
    icon: "🏊",
  },
  {
    id: 3,
    name: "Rescue Diver",
    description: "Learn to prevent and manage diving emergencies",
    duration: "3-4 days",
    level: "Advanced",
    price: 400,
    icon: "🚨",
  },
  {
    id: 4,
    name: "Divemaster",
    description: "Become a professional dive leader and guide",
    duration: "4-6 weeks",
    level: "Professional",
    price: 1200,
    icon: "⭐",
  },
];
</script>

<style scoped>
.courses-grid {
  display: grid;
  gap: var(--gap-md);
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      clamp(
        calc(100% / 4 - var(--gap-md)),
        (1200px - 100vw) * 999,
        clamp(calc(100% / 3 - var(--gap-md)), (992px - 100vw) * 999, clamp(calc(100% / 2 - var(--gap-md)), (480px - 100vw) * 999, 100%))
      ),
      1fr
    )
  );
}

.courses {
  background: var(--white);
}

.course-card {
  padding: var(--gap-md) var(--gap-sm);
  text-align: center;
  border: 1px solid var(--lightgray);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.course-card:hover {
  border-color: var(--orange);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.course-badge {
  position: absolute;
  top: var(--gap-sm);
  right: var(--gap-sm);
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  font-size: var(--font-xs);
  font-weight: 600;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-beginner {
  background: var(--lightgray);
  color: var(--deepblue);
}

.badge-intermediate {
  background: var(--orange);
  color: var(--white);
}

.badge-advanced {
  background: var(--darkblue);
  color: var(--white);
}

.badge-professional {
  background: var(--blackblue);
  color: var(--white);
}

.course-icon {
  margin-bottom: var(--gap-sm);
}

.icon-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: linear-gradient(135deg, var(--darkblue), var(--deepblue));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.course-title {
  font-size: var(--font-xs);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-sm);
}

.course-desc {
  font-size: var(--font-sm);
  color: var(--gray);
  margin-bottom: var(--gap-sm);
  line-height: 1.5;
}

.course-details {
  margin-bottom: var(--gap-sm);
  padding: var(--gap-sm) 0;
  border-top: 1px solid var(--lightgray);
  border-bottom: 1px solid var(--lightgray);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--gap-sm);
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: var(--font-xs);
  color: var(--gray);
}

.detail-value {
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--darkblue);
}

.course-price {
  margin-bottom: var(--gap-md);
}

.price-amount {
  display: block;
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--orange);
}

.price-label {
  font-size: var(--font-xs);
  color: var(--gray);
}

.course-btn {
  display: inline-block;
  width: 100%;
  background-color: var(--orange);
  color: var(--white);
  text-align: center;
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.course-btn:hover {
  background-color: var(--darkblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

@media (max-width: 768px) and (orientation: portrait) {
  .course-card {
    padding: var(--gap-md);
  }

  .course-title {
    font-size: var(--font-md);
  }

  .course-desc {
    font-size: var(--font-sm);
  }
}

@media (max-width: 480px) {
  .course-card {
    padding: var(--gap-sm);
  }

  .icon-circle {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }

  .course-title {
    font-size: var(--font-sm);
  }

  .course-desc {
    font-size: var(--font-xs);
  }
}
</style>
