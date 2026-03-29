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
        <button class="btn-explore"><a href="#courses">Explore Courses</a></button>
        <button class="btn-booknow"><a href="#contact">Book Now</a></button>
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
  color: var(--white);
  margin-bottom: var(--gap-md);
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: var(--font-lg);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--gap-md);
  max-width: 600px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: var(--gap-md);
}

.btn-explore {
  background-color: var(--orange);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-explore:hover {
  background-color: var(--darkblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

.btn-booknow {
  background-color: var(--darkblue);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-booknow:hover {
  background-color: var(--deepblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-darkblue);
}

.btn-explore a,
.btn-booknow a {
  color: var(--white);
}

/* Small Mobile */
@media (max-width: 480px) {
  .hero {
    height: 60vh;
    padding: var(--gap-sm);
  }

  .hero-content {
    padding: var(--gap-md);
  }

  .hero-title {
    font-size: var(--font-lg);
  }

  .hero-subtitle {
    font-size: var(--font-sm);
  }

  .hero-buttons {
    flex-direction: column;
    gap: var(--gap-sm);
  }

  .btn-explore,
  .btn-booknow {
    width: 100%;
    text-align: center;
  }
}

/* Large Mobile */
@media (min-width: 481px) and (max-width: 767px) {
  .hero {
    height: 65vh;
    padding: var(--gap-md);
  }

  .hero-content {
    padding: var(--gap-lg);
  }

  .hero-title {
    font-size: calc(var(--font-xl) * 1.1);
  }

  .hero-buttons {
    gap: var(--gap-md);
  }
}

/* Tablet Portrait */
@media (min-width: 768px) and (max-width: 991px) {
  .hero {
    height: 70vh;
    padding: var(--gap-md);
  }

  .hero-content {
    padding: var(--gap-xl);
  }

  .hero-title {
    font-size: calc(var(--font-xl) * 1.2);
  }

  .hero-subtitle {
    font-size: calc(var(--font-md) * 1.1);
  }
}

/* Tablet Landscape */
@media (min-width: 992px) and (max-width: 1199px) {
  .hero {
    height: 75vh;
    padding: var(--gap-lg);
  }

  .hero-content {
    padding: var(--gap-xl);
  }

  .hero-title {
    font-size: calc(var(--font-xl) * 1.3);
  }

  .hero-buttons {
    gap: var(--gap-lg);
  }
}

/* Small Desktop */
@media (min-width: 1200px) and (max-width: 1399px) {
  .hero {
    height: 80vh;
    padding: var(--gap-lg);
  }

  .hero-content {
    padding: calc(var(--gap-xl) * 1.2);
  }

  .hero-title {
    font-size: calc(var(--font-xl) * 1.4);
  }
}

/* Large Desktop */
@media (min-width: 1400px) {
  .hero {
    height: 85vh;
    padding: var(--gap-xl);
  }

  .hero-content {
    padding: calc(var(--gap-xl) * 1.5);
  }

  .hero-title {
    font-size: calc(var(--font-xl) * 1.5);
  }

  .hero-subtitle {
    font-size: calc(var(--font-md) * 1.2);
  }
}
</style>
