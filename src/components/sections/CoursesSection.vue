<template>
  <section class="courses" id="courses">
    <div class="container">
      <div class="courses-header">
        <div class="courses-badge">
          <span class="courses-badge-icon">🎓</span>
          <span class="courses-badge-text">PADI CERTIFIED</span>
        </div>
        <h2 class="courses-title">Your Diving Journey</h2>
        <p class="courses-subtitle">From first breath to professional mastery</p>
        <div class="courses-progress">
          <div class="courses-progress-bar"></div>
          <div class="courses-progress-dots">
            <span v-for="n in 4" :key="n" class="progress-dot" :class="{ active: n <= currentStep }"></span>
          </div>
        </div>
      </div>

      <div class="courses-showcase">
        <div class="courses-path">
          <div
            v-for="(course, index) in courses"
            :key="course.id"
            class="course-card"
            :class="{ 'course-active': activeCourse === course.id, 'course-completed': index < currentStep }"
          >
            <div class="course-number">
              <span class="course-number-text">{{ String(index + 1).padStart(2, "0") }}</span>
              <div class="course-number-bg"></div>
            </div>

            <div class="course-content">
              <div class="course-header">
                <div class="course-icon-wrapper">
                  <span class="course-icon">{{ course.icon }}</span>
                  <div class="course-icon-glow"></div>
                </div>
                <div class="course-meta">
                  <h3 class="course-name">{{ course.name }}</h3>
                  <div class="course-badges">
                    <span class="course-badge duration">{{ course.duration }}</span>
                    <span class="course-badge level" :class="course.level.toLowerCase()">{{ course.level }}</span>
                  </div>
                </div>
              </div>

              <p class="course-description">{{ course.description }}</p>

              <div class="course-features">
                <div class="course-feature">
                  <span class="feature-icon">📚</span>
                  <span class="feature-text">{{ course.theory || "Theory & Pool" }}</span>
                </div>
                <div class="course-feature">
                  <span class="feature-icon">🌊</span>
                  <span class="feature-text">{{ course.dives || "Ocean Dives" }}</span>
                </div>
                <div class="course-feature">
                  <span class="feature-icon">🏆</span>
                  <span class="feature-text">PADI Certificate</span>
                </div>
              </div>

              <div class="course-footer">
                <div class="course-price">
                  <span class="price-label">From</span>
                  <span class="price-amount">${{ course.price }}</span>
                </div>
                <button class="course-btn" @click="selectCourse(course.id)" :class="{ 'course-btn-selected': activeCourse === course.id }">
                  <span class="btn-text">{{ activeCourse === course.id ? "Selected" : "Choose Course" }}</span>
                  <span class="btn-arrow">→</span>
                </button>
              </div>
            </div>

            <div class="course-decoration">
              <div class="course-line"></div>
              <div class="course-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="courses-summary">
        <div class="summary-card">
          <div class="summary-header">
            <h3 class="summary-title">Complete Journey Package</h3>
            <p class="summary-sub">Become a PADI Divemaster and save 25%</p>
          </div>
          <div class="summary-content">
            <div class="summary-stats">
              <div class="summary-stat">
                <span class="stat-number">4</span>
                <span class="stat-label">Certifications</span>
              </div>
              <div class="summary-stat">
                <span class="stat-number">20+</span>
                <span class="stat-label">Ocean Dives</span>
              </div>
              <div class="summary-stat">
                <span class="stat-number">6-8</span>
                <span class="stat-label">Weeks</span>
              </div>
            </div>
            <div class="summary-price">
              <span class="summary-original">$2,400</span>
              <span class="summary-current">$1,800</span>
              <span class="summary-save">Save $600</span>
            </div>
            <button class="summary-btn">Enroll in Complete Journey</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  icon: string;
  theory?: string;
  dives?: string;
}

const activeCourse = ref<number | null>(null);
const currentStep = ref(0);

const courses: Course[] = [
  {
    id: 1,
    name: "Open Water Diver",
    description: "Your gateway to the underwater world. Master essential skills in theory, pool sessions, and ocean dives.",
    duration: "3-4 days",
    level: "Beginner",
    price: 450,
    icon: "🤿",
    theory: "5 Theory Sessions",
    dives: "4 Ocean Dives",
  },
  {
    id: 2,
    name: "Advanced Open Water",
    description: "Deep dive to 30m, underwater navigation, and three adventure specialties. Expand your diving horizons.",
    duration: "2-3 days",
    level: "Intermediate",
    price: 350,
    icon: "🏊",
    theory: "Knowledge Reviews",
    dives: "5 Adventure Dives",
  },
  {
    id: 3,
    name: "Rescue Diver",
    description: "Learn to prevent and manage diving emergencies. Master self-rescue and assisting other divers.",
    duration: "3-4 days",
    level: "Advanced",
    price: 400,
    icon: "🚨",
    theory: "Emergency Scenarios",
    dives: "Rescue Exercises",
  },
  {
    id: 4,
    name: "Divemaster",
    description: "Go pro! Become a dive leader, guide certified divers, and assist instructors. Start your diving career.",
    duration: "4-6 weeks",
    level: "Professional",
    price: 1200,
    icon: "⭐",
    theory: "Leadership Training",
    dives: "60+ Total Dives",
  },
];

const selectCourse = (courseId: number) => {
  activeCourse.value = courseId;
  const courseIndex = courses.findIndex((c) => c.id === courseId);
  currentStep.value = courseIndex;
};
</script>

<style scoped>
.courses {
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--blackblue) 100%);
  padding: var(--pad-section) 0;
  position: relative;
  overflow: hidden;
}

.courses::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--orange), transparent);
  opacity: 0.3;
}

.courses-header {
  text-align: center;
  margin-bottom: var(--gap-md);
  position: relative;
}

.courses-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-xs);
  background: rgba(239, 108, 51, 0.1);
  border: 1px solid var(--orange);
  border-radius: var(--radius-md);
  padding: calc(var(--gap-xs) * 0.5) var(--gap-sm);
  margin-bottom: var(--gap-sm);
}

.courses-badge-icon {
  font-size: var(--font-sm);
}

.courses-badge-text {
  font-size: var(--font-xs);
  font-weight: 700;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.courses-title {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--white);
  margin-bottom: var(--gap-xs);
  text-shadow: 0 0 30px rgba(239, 108, 51, 0.2);
}

.courses-subtitle {
  font-size: var(--font-md);
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: var(--gap-md);
}

.courses-progress {
  max-width: 400px;
  margin: 0 auto;
  position: relative;
}

.courses-progress-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  position: relative;
  overflow: hidden;
}

.courses-progress-bar::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 25%;
  background: var(--orange);
  border-radius: 1px;
  transition: width 0.5s ease;
}

.courses-progress-dots {
  display: flex;
  justify-content: space-between;
  margin-top: var(--gap-xs);
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: var(--orange);
  box-shadow: 0 0 10px var(--orange);
}

.courses-showcase {
  margin-bottom: var(--gap-md);
}

.courses-path {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--gap-md);
  max-width: 1400px;
  margin: 0 auto;
}

/* Small Mobile */
@media (max-width: 480px) {
  .courses-path {
    grid-template-columns: 1fr;
    max-width: 400px;
    gap: var(--gap-sm);
  }

  .course-card {
    padding: calc(var(--gap-md) * 0.8);
  }

  .course-header {
    flex-direction: column;
    gap: var(--gap-sm);
  }

  .course-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .course-icon {
    font-size: 24px;
  }

  .course-footer {
    flex-direction: column;
    gap: var(--gap-sm);
    align-items: stretch;
  }

  .course-features {
    grid-template-columns: 1fr;
    gap: calc(var(--gap-xs) * 0.5);
  }
}

/* Large Mobile */
@media (min-width: 481px) and (max-width: 767px) {
  .courses-path {
    grid-template-columns: 1fr;
    max-width: 500px;
    gap: var(--gap-md);
  }

  .course-card {
    padding: var(--gap-md);
  }
}

/* Tablet Portrait */
@media (min-width: 768px) and (max-width: 991px) {
  .courses-path {
    grid-template-columns: repeat(2, 1fr);
    max-width: 700px;
    gap: var(--gap-md);
  }

  .course-card {
    padding: calc(var(--gap-md) * 0.9);
  }
}

/* Tablet Landscape */
@media (min-width: 992px) and (max-width: 1199px) {
  .courses-path {
    grid-template-columns: repeat(2, 1fr);
    max-width: 900px;
    gap: var(--gap-md);
  }
}

/* Small Desktop */
@media (min-width: 1200px) and (max-width: 1399px) {
  .courses-path {
    grid-template-columns: repeat(2, 1fr);
    max-width: 1100px;
    gap: var(--gap-md);
  }
}

/* Large Desktop */
@media (min-width: 1400px) {
  .courses-path {
    grid-template-columns: repeat(2, 1fr);
    max-width: 1300px;
    gap: var(--gap-lg);
  }

  .course-card {
    padding: calc(var(--gap-md) * 1.1);
  }
}

.course-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  position: relative;
  transition: all 0.4s ease;
  overflow: hidden;
}

.course-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(239, 108, 51, 0.3);
  transform: translateY(-2px);
}

.course-card.course-active {
  background: rgba(239, 108, 51, 0.05);
  border-color: var(--orange);
  box-shadow: 0 0 30px rgba(239, 108, 51, 0.2);
}

.course-card.course-completed {
  opacity: 0.7;
}

.course-number {
  position: absolute;
  top: var(--gap-sm);
  right: var(--gap-sm);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-number-text {
  font-size: var(--font-sm);
  font-weight: 800;
  color: var(--orange);
  position: relative;
  z-index: 1;
}

.course-number-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(239, 108, 51, 0.1);
  border-radius: 50%;
  border: 2px solid rgba(239, 108, 51, 0.2);
}

.course-content {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.course-header {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-sm);
}

.course-icon-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.course-icon {
  font-size: 28px;
  z-index: 1;
}

.course-icon-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(239, 108, 51, 0.2) 0%, transparent 70%);
  border-radius: var(--radius-md);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.course-card:hover .course-icon-glow {
  opacity: 1;
}

.course-meta {
  flex: 1;
}

.course-name {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--white);
  margin-bottom: var(--gap-xs);
}

.course-badges {
  display: flex;
  gap: var(--gap-xs);
  flex-wrap: wrap;
}

.course-badge {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-badge.duration {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.course-badge.level.beginner {
  background: rgba(34, 197, 94, 0.2);
  color: var(--level-beginner);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.course-badge.level.intermediate {
  background: rgba(59, 130, 246, 0.2);
  color: var(--level-intermediate);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.course-badge.level.advanced {
  background: rgba(239, 108, 51, 0.2);
  color: var(--orange);
  border: 1px solid rgba(239, 108, 51, 0.3);
}

.course-badge.level.professional {
  background: rgba(168, 85, 247, 0.2);
  color: var(--level-professional);
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.course-description {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.course-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-xs);
}

.course-feature {
  display: flex;
  align-items: center;
  gap: calc(var(--gap-xs) * 0.5);
}

.feature-icon {
  font-size: var(--font-sm);
}

.feature-text {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.6);
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--gap-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.course-price {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap-xs) * 0.5);
}

.price-label {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-amount {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--orange);
}

.course-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  background: var(--orange);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--gap-xs) var(--gap-sm);
  font-size: var(--font-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.course-btn:hover {
  background: var(--white);
  color: var(--darkblue);
  transform: translateY(-1px);
}

.course-btn.course-btn-selected {
  background: var(--white);
  color: var(--darkblue);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.course-btn:hover .btn-arrow {
  transform: translateX(2px);
}

.course-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.course-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(239, 108, 51, 0.2), transparent);
  transform: translateY(-50%);
}

.course-pulse {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--orange);
  transform: translateY(-50%) scaleX(0);
  transition: transform 0.6s ease;
}

.course-card:hover .course-pulse {
  transform: translateY(-50%) scaleX(1);
}

.courses-summary {
  max-width: 600px;
  margin: 0 auto;
}

.summary-card {
  background: rgba(239, 108, 51, 0.05);
  border: 1px solid rgba(239, 108, 51, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  position: relative;
  overflow: hidden;
}

.summary-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--orange), transparent);
}

.summary-header {
  text-align: center;
  margin-bottom: var(--gap-md);
}

.summary-title {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--white);
  margin-bottom: var(--gap-xs);
}

.summary-sub {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.6);
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-sm);
}

.summary-stat {
  text-align: center;
  padding: var(--gap-xs);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
}

.stat-number {
  display: block;
  font-size: var(--font-lg);
  font-weight: 800;
  color: var(--orange);
  margin-bottom: calc(var(--gap-xs) * 0.5);
}

.stat-label {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-sm);
  flex-wrap: wrap;
}

.summary-original {
  font-size: var(--font-md);
  color: rgba(255, 255, 255, 0.4);
  text-decoration: line-through;
}

.summary-current {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--orange);
}

.summary-save {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  background: rgba(34, 197, 94, 0.2);
  color: var(--level-beginner);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-btn {
  background: var(--orange);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--gap-sm) var(--gap-md);
  font-size: var(--font-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.summary-btn:hover {
  background: var(--white);
  color: var(--darkblue);
  transform: translateY(-2px);
}

/* Responsive Debug Helper - Uncomment for testing */
/*
.courses::before {
  content: "Screen: " attr(data-width);
  position: fixed;
  top: 10px;
  right: 10px;
  background: var(--orange);
  color: var(--white);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 9999;
}
*/

/* Summary Responsive */
@media (max-width: 991px) {
  .summary-stats {
    grid-template-columns: 1fr;
    gap: var(--gap-xs);
  }

  .summary-price {
    flex-direction: column;
    gap: var(--gap-xs);
    align-items: center;
  }
}

@media (max-width: 767px) {
  .course-features {
    grid-template-columns: 1fr;
    gap: var(--gap-xs);
  }

  .summary-stats {
    grid-template-columns: 1fr;
    gap: var(--gap-xs);
  }

  .summary-price {
    flex-direction: column;
    gap: var(--gap-xs);
  }
}
</style>
