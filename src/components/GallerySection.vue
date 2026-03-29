<template>
  <section class="gallery" id="gallery">
    <div class="container">
      <div class="gallery-header">
        <h2 class="gallery-title">Underwater Gallery</h2>
        <p class="gallery-subtitle">Discover the magic beneath the waves</p>
      </div>

      <div class="gallery-categories">
        <button
          v-for="category in categories"
          :key="category"
          @click="activeCategory = category"
          :class="['category-btn', activeCategory === category && 'active']"
        >
          {{ category }}
        </button>
      </div>

      <div class="gallery-grid">
        <div v-for="(image, index) in displayImages" :key="index" class="gallery-item" @click="openLightbox(index)">
          <div class="gallery-image">
            <img :src="image.url" :alt="image.title" loading="lazy" />
            <div class="gallery-overlay">
              <div class="gallery-overlay-content">
                <span class="gallery-category">{{ image.category }}</span>
                <h3 class="gallery-title-text">{{ image.title }}</h3>
                <div class="gallery-stats">
                  <span class="gallery-stat">👁 {{ image.views }}</span>
                  <span class="gallery-stat">❤️ {{ image.likes }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="gallery-footer">
        <button class="gallery-load-more" @click="loadMore">
          <span>Load More Photos</span>
          <span class="load-more-icon">→</span>
        </button>
      </div>
    </div>

    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <div class="lightbox-image">
          <img :src="images[currentImageIndex]?.url" :alt="images[currentImageIndex]?.title" />
        </div>
        <div class="lightbox-info">
          <h3>{{ images[currentImageIndex]?.title }}</h3>
          <p>{{ images[currentImageIndex]?.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface GalleryImage {
  url: string;
  title: string;
  description: string;
  category: string;
  views: string;
  likes: string;
}

const activeCategory = ref("All");
const lightboxOpen = ref(false);
const currentImageIndex = ref(0);
const itemsToShow = ref(9);

const categories = ["All", "Marine Life", "Coral Reefs", "Cave Diving", "Deep Sea", "Night Dive"];

const images: GalleryImage[] = [
  {
    url: "/DiveBuddy.SMO/images/vibrant-coral-reefs.jpg",
    title: "Vibrant Coral Reefs",
    description: "Explore the colorful underwater gardens of Thailand",
    category: "Coral Reefs",
    views: "1.2k",
    likes: "89",
  },
  {
    url: "/DiveBuddy.SMO/images/marine-life-turtles.jpg",
    title: "Marine Life Encounters",
    description: "Swimming with majestic sea turtles in their natural habitat",
    category: "Marine Life",
    views: "2.5k",
    likes: "156",
  },
  {
    url: "/DiveBuddy.SMO/images/2273.jpg",
    title: "Cave Exploration",
    description: "Discovering hidden underwater caverns and tunnels",
    category: "Cave Diving",
    views: "1.8k",
    likes: "124",
  },
  {
    url: "/DiveBuddy.SMO/images/29626.jpg",
    title: "Deep Blue Adventures",
    description: "Exploring the mysteries of the deep ocean",
    category: "Deep Sea",
    views: "3.1k",
    likes: "201",
  },
  {
    url: "/DiveBuddy.SMO/images/franziska_stier-diver-9328628_1280.jpg",
    title: "Island Hopping",
    description: "Multiple dive sites around tropical islands",
    category: "Coral Reefs",
    views: "1.5k",
    likes: "98",
  },
  {
    url: "/DiveBuddy.SMO/images/joakant-fish-378286_1280.jpg",
    title: "Night Dive Magic",
    description: "Bioluminescent creatures under moonlight",
    category: "Night Dive",
    views: "2.2k",
    likes: "178",
  },
  {
    url: "/DiveBuddy.SMO/images/joakant-lemon-butterflyfish-380037_1280.jpg",
    title: "Gentle Giants",
    description: "Once-in-a-lifetime whale shark encounter",
    category: "Marine Life",
    views: "4.5k",
    likes: "342",
  },
  {
    url: "/DiveBuddy.SMO/images/siamways-thailand-10122355_1920.jpg",
    title: "Coral Paradise",
    description: "Vibrant coral gardens teeming with tropical fish",
    category: "Coral Reefs",
    views: "890",
    likes: "67",
  },
  {
    url: "/DiveBuddy.SMO/images/2216.jpg",
    title: "Fish Symphony",
    description: "Thousands of fish moving in perfect harmony",
    category: "Marine Life",
    views: "3.2k",
    likes: "287",
  },
  {
    url: "/DiveBuddy.SMO/images/2272.jpg",
    title: "Abyss Explorer",
    description: "Deep diving into the mysterious blue abyss",
    category: "Deep Sea",
    views: "2.8k",
    likes: "198",
  },
  {
    url: "/DiveBuddy.SMO/images/reef-rainbow-coral.jpg",
    title: "Reef Rainbow",
    description: "Colorful tropical reef with diverse marine ecosystem",
    category: "Coral Reefs",
    views: "1.9k",
    likes: "145",
  },
  {
    url: "/DiveBuddy.SMO/images/u_4pyuk3butj-nature-10144693_1280.jpg",
    title: "Manta Dance",
    description: "Graceful manta rays gliding through ocean currents",
    category: "Marine Life",
    views: "2.1k",
    likes: "156",
  },
];

const filteredImages = computed(() => {
  if (activeCategory.value === "All") {
    return images;
  }
  return images.filter((image) => image.category === activeCategory.value);
});

const displayImages = computed(() => {
  return filteredImages.value.slice(0, itemsToShow.value);
});

const openLightbox = (index: number) => {
  currentImageIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = "auto";
};

const loadMore = () => {
  itemsToShow.value += 6;
};
</script>

<style scoped>
.gallery {
  background: var(--white);
  padding: var(--pad-section) 0;
  min-height: 100vh;
}

.gallery-header {
  text-align: center;
  margin-bottom: var(--gap-md);
}

.gallery-title {
  font-size: var(--font-xl);
  font-weight: 800;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.gallery-subtitle {
  font-size: var(--font-md);
  color: var(--gray);
}

.gallery-categories {
  display: flex;
  justify-content: center;
  gap: var(--gap-sm);
  margin-bottom: var(--gap-md);
  flex-wrap: wrap;
}

.category-btn {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-sm);
  background: var(--white);
  border: 2px solid var(--lightgray);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--gray);
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-btn:hover {
  border-color: var(--orange);
  color: var(--orange);
}

.category-btn.active {
  background: var(--orange);
  border-color: var(--orange);
  color: var(--white);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--gap-md);
  margin-bottom: var(--gap-md);
}

.gallery-item {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 4/3;
}

.gallery-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px var(--shadow-deepblue);
}

.gallery-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .gallery-image img {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  align-items: flex-end;
  padding: var(--gap-md);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-overlay-content {
  color: var(--white);
  width: 100%;
}

.gallery-category {
  display: inline-block;
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 600;
  margin-bottom: var(--gap-xs);
}

.gallery-title-text {
  font-size: var(--font-md);
  font-weight: 700;
  margin-bottom: var(--gap-xs);
  line-height: 1.3;
}

.gallery-stats {
  display: flex;
  gap: var(--gap-sm);
}

.gallery-stat {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.8);
}

.gallery-footer {
  text-align: center;
}

.gallery-load-more {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-xs);
  background: var(--darkblue);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--gap-sm) var(--gap-md);
  font-size: var(--font-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-load-more:hover {
  background: var(--orange);
  transform: translateY(-2px);
}

.load-more-icon {
  transition: transform 0.3s ease;
}

.gallery-load-more:hover .load-more-icon {
  transform: translateX(4px);
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gap-md);
}

.lightbox-content {
  position: relative;
  max-width: 900px;
  width: 100%;
  background: var(--white);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.lightbox-close {
  position: absolute;
  top: var(--gap-md);
  right: var(--gap-md);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s ease;
}

.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.7);
}

.lightbox-image img {
  width: 100%;
  height: auto;
  max-height: 60vh;
  object-fit: cover;
}

.lightbox-info {
  padding: var(--gap-md);
}

.lightbox-info h3 {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-sm);
}

.lightbox-info p {
  font-size: var(--font-md);
  color: var(--gray);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--gap-sm);
  }

  .gallery-categories {
    gap: var(--gap-xs);
  }

  .category-btn {
    padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
    font-size: var(--font-xs);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-categories {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: var(--gap-sm);
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .gallery-categories::-webkit-scrollbar {
    display: none;
  }

  .lightbox {
    padding: var(--gap-sm);
  }
}
</style>
