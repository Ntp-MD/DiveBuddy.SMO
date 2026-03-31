<template>
  <section class="hero">
    <video class="hero-video" autoplay muted loop playsinline controlsList="nodownload" disablePictureInPicture>
      <source src="@/assets/vdo/pov-on-bleach.mp4" type="video/mp4" />
    </video>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Discover the Ocean's Wonders</h1>
      <p class="hero-subtitle">Professional diving courses and unforgettable underwater adventures</p>
      <div class="hero-buttons">
        <button class="hero-section__btn hero-section__btn--primary">
          <a href="#courses">Explore Courses</a>
        </button>
        <button class="hero-section__btn hero-section__btn--secondary">
          <a href="#contact">Book Now</a>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--blackblue) 100%);
  opacity: 0.7;
  z-index: -1;
}

.hero-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 var(--gap-md);
  z-index: 1;
}

.hero-title {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--font-white);
  margin-bottom: var(--gap-md);
  line-height: 1.2;
  text-shadow: var(--shadow-lg);
}

.hero-subtitle {
  font-size: var(--font-lg);
  color: var(--font-white);
  margin-bottom: var(--gap-md);
  max-width: 600px;
  line-height: 1.6;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: var(--gap-md);
}

.hero-section__btn {
  padding: var(--gap-sm) var(--gap-lg);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-normal);
  cursor: pointer;
  border: none;
  display: inline-block;
}

.hero-section__btn--primary {
  background-color: var(--accent-primary);
  color: var(--font-white);
}

.hero-section__btn--primary:hover {
  background-color: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero-section__btn--secondary {
  background-color: var(--main-color-2);
  color: var(--font-white);
}

.hero-section__btn--secondary:hover {
  background-color: var(--main-color-3);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hero-section__btn a {
  color: var(--font-white);
  text-decoration: none;
}

/* Mobile Responsive */
@media (max-width: 480px) {
  .hero-content {
    padding: 0 var(--gap-sm);
  }

  .hero-title {
    font-size: var(--font-lg);
  }

  .hero-subtitle {
    font-size: var(--font-md);
  }

  .hero-buttons {
    flex-direction: column;
    gap: var(--gap-sm);
  }

  .hero-section__btn {
    width: 100%;
  }
}
</style>
