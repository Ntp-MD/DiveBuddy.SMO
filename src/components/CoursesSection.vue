<template>
  <section class="section courses" id="courses">
    <div class="container">
      <div class="courses-header">
        <h2 class="courses-heading">Your Diving Journey</h2>
        <p class="courses-sub">From first breath underwater to professional divemaster</p>
      </div>
      <div class="courses-grid">
        <div v-for="(course, index) in courses" :key="course.id" class="course-item">
          <div class="course-item-step">{{ String(index + 1).padStart(2, "0") }}</div>
          <div class="course-item-icon">{{ course.icon }}</div>
          <h3 class="course-item-name">{{ course.name }}</h3>
          <p class="course-item-desc">{{ course.description }}</p>
          <div class="course-item-info">
            <span class="course-item-tag">{{ course.duration }}</span>
            <span class="course-item-tag">{{ course.level }}</span>
          </div>
          <div class="course-item-footer">
            <span class="course-item-price">${{ course.price }}</span>
            <button class="course-item-btn">Enroll</button>
          </div>
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
.courses {
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--blackblue) 100%);
}

.courses-header {
  text-align: center;
  margin-bottom: var(--gap-md);
}

.courses-heading {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--white);
  margin-bottom: var(--gap-xs);
}

.courses-sub {
  font-size: var(--font-md);
  color: rgba(255, 255, 255, 0.6);
}

.courses-grid {
  display: grid;
  gap: var(--gap-md);
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.course-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.course-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--orange);
  transform: translateY(-4px);
}

.course-item-step {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--orange);
  opacity: 0.3;
  position: absolute;
  top: var(--gap-sm);
  right: var(--gap-sm);
  line-height: 1;
}

.course-item-icon {
  font-size: 40px;
  margin-bottom: var(--gap-sm);
}

.course-item-name {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--white);
  margin-bottom: var(--gap-xs);
}

.course-item-desc {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin-bottom: var(--gap-sm);
}

.course-item-info {
  display: flex;
  justify-content: center;
  gap: var(--gap-xs);
  margin-bottom: var(--gap-sm);
}

.course-item-tag {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.course-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--gap-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.course-item-price {
  font-size: var(--font-lg);
  font-weight: 800;
  color: var(--orange);
}

.course-item-btn {
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-xs);
  font-weight: 700;
  transition: all 0.3s ease;
}

.course-item-btn:hover {
  background: var(--white);
  color: var(--darkblue);
}

@media (max-width: 480px) {
  .course-item-icon {
    font-size: 28px;
  }

  .course-item-name {
    font-size: var(--font-sm);
  }
}
</style>
