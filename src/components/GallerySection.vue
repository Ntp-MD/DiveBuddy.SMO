<template>
  <section class="section gallery" id="gallery">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Dive Gallery</h2>
        <p class="section-subtitle">Experience the underwater world through our divers' eyes</p>
      </div>

      <div class="gallery-categories">
        <button
          v-for="category in categories"
          :key="category"
          @click="activeCategory = category"
          class="category-btn"
          :class="{ active: activeCategory === category }"
        >
          {{ category }}
        </button>
      </div>

      <div class="gallery-grid">
        <div v-for="(image, index) in filteredImages" :key="index" class="gallery-item" :class="image.size" @click="openLightbox(index)">
          <div class="image-wrapper">
            <img
              :src="image.url"
              :alt="image.alt"
              loading="lazy"
              :class="{ loaded: image.loaded, loading: !image.loaded }"
              @load="onImageLoad(image)"
              @error="onImageError(image)"
            />
            <div class="image-overlay">
              <div class="overlay-content">
                <div class="image-meta">
                  <span class="image-category">{{ image.category }}</span>
                  <span class="image-date">{{ image.date }}</span>
                </div>
                <h3 class="image-title">{{ image.title }}</h3>
                <p class="image-desc">{{ image.description }}</p>
                <div class="image-stats">
                  <span class="stat">
                    {{ image.views }}
                  </span>
                  <span class="stat">
                    {{ image.likes }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="gallery-footer">
        <button class="load-more-btn">Load More Photos</button>
      </div>
    </div>

    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <div class="lightbox-image">
          <img :src="images[currentImageIndex]?.url" :alt="images[currentImageIndex]?.alt" />
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
  alt: string;
  title: string;
  description: string;
  category: string;
  date: string;
  views: string;
  likes: string;
  size: "small" | "medium" | "large";
  loaded?: boolean;
}

const activeCategory = ref("All");
const lightboxOpen = ref(false);
const currentImageIndex = ref(0);

const categories = ["All", "Marine Life", "Coral Reefs", "Cave Diving", "Deep Sea", "Night Dive"];

const images: GalleryImage[] = [
  {
    url: "/DiveBuddy.SMO/images/vibrant-coral-reefs.jpg",
    alt: "Coral reef diving",
    title: "Vibrant Coral Reefs",
    description: "Explore the colorful underwater gardens of Thailand",
    category: "Coral Reefs",
    date: "2 days ago",
    views: "1.2k",
    likes: "89",
    size: "large",
  },
  {
    url: "/DiveBuddy.SMO/images/marine-life-turtles.jpg",
    alt: "Sea turtle",
    title: "Marine Life Encounters",
    description: "Swimming with majestic sea turtles in their natural habitat",
    category: "Marine Life",
    date: "1 week ago",
    views: "2.5k",
    likes: "156",
    size: "medium",
  },
  {
    url: "/DiveBuddy.SMO/images/2273.jpg",
    alt: "Underwater cave",
    title: "Cave Exploration",
    description: "Discovering hidden underwater caverns and tunnels",
    category: "Cave Diving",
    date: "5 days ago",
    views: "1.8k",
    likes: "124",
    size: "large",
  },
  {
    url: "/DiveBuddy.SMO/images/29626.jpg",
    alt: "Deep sea diving",
    title: "Deep Blue Adventures",
    description: "Exploring the mysteries of the deep ocean",
    category: "Deep Sea",
    date: "1 week ago",
    views: "3.1k",
    likes: "201",
    size: "medium",
  },
  {
    url: "/DiveBuddy.SMO/images/franziska_stier-diver-9328628_1280.jpg",
    alt: "Island diving",
    title: "Island Hopping",
    description: "Multiple dive sites around tropical islands",
    category: "Coral Reefs",
    date: "4 days ago",
    views: "1.5k",
    likes: "98",
    size: "small",
  },
  {
    url: "/DiveBuddy.SMO/images/joakant-fish-378286_1280.jpg",
    alt: "Night diving",
    title: "Night Dive Magic",
    description: "Bioluminescent creatures under moonlight",
    category: "Night Dive",
    date: "2 weeks ago",
    views: "2.2k",
    likes: "178",
    size: "large",
  },
  {
    url: "/DiveBuddy.SMO/images/joakant-lemon-butterflyfish-380037_1280.jpg",
    alt: "Whale shark",
    title: "Gentle Giants",
    description: "Once-in-a-lifetime whale shark encounter",
    category: "Marine Life",
    date: "6 days ago",
    views: "4.5k",
    likes: "342",
    size: "medium",
  },
  {
    url: "/DiveBuddy.SMO/images/siamways-thailand-10122355_1920.jpg",
    alt: "Coral reef",
    title: "Coral Paradise",
    description: "Vibrant coral gardens teeming with tropical fish",
    category: "Coral Reefs",
    date: "1 day ago",
    views: "890",
    likes: "67",
    size: "small",
  },
  {
    url: "/DiveBuddy.SMO/images/spinheike-thai-massage-274908_1280.jpg",
    alt: "Underwater wreck",
    title: "Shipwreck Discovery",
    description: "Exploring ancient shipwrecks and maritime history",
    category: "Cave Diving",
    date: "4 days ago",
    views: "1.3k",
    likes: "98",
    size: "large",
  },
  {
    url: "/DiveBuddy.SMO/images/u_4pyuk3butj-nature-10144693_1280.jpg",
    alt: "Manta ray",
    title: "Manta Dance",
    description: "Graceful manta rays gliding through ocean currents",
    category: "Marine Life",
    date: "2 days ago",
    views: "2.1k",
    likes: "156",
    size: "medium",
  },
  {
    url: "/DiveBuddy.SMO/images/1957.jpg",
    alt: "Underwater tunnel",
    title: "Cave Explorer",
    description: "Mysterious underwater caves and hidden tunnels",
    category: "Cave Diving",
    date: "5 days ago",
    views: "1.7k",
    likes: "134",
    size: "small",
  },
  {
    url: "/DiveBuddy.SMO/images/2216.jpg",
    alt: "School of fish",
    title: "Fish Symphony",
    description: "Thousands of fish moving in perfect harmony",
    category: "Marine Life",
    date: "3 days ago",
    views: "3.2k",
    likes: "287",
    size: "large",
  },
  {
    url: "/DiveBuddy.SMO/images/2272.jpg",
    alt: "Deep blue",
    title: "Abyss Explorer",
    description: "Deep diving into the mysterious blue abyss",
    category: "Deep Sea",
    date: "1 week ago",
    views: "2.8k",
    likes: "198",
    size: "medium",
  },
  {
    url: "/DiveBuddy.SMO/images/reef-rainbow-coral.jpg",
    alt: "Tropical reef",
    title: "Reef Rainbow",
    description: "Colorful tropical reef with diverse marine ecosystem",
    category: "Coral Reefs",
    date: "6 days ago",
    views: "1.9k",
    likes: "145",
    size: "small",
  },
];

const filteredImages = computed(() => {
  if (activeCategory.value === "All") {
    return images;
  }
  return images.filter((image) => image.category === activeCategory.value);
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

const onImageLoad = (image: GalleryImage) => {
  image.loaded = true;
};

const onImageError = (image: GalleryImage) => {
  image.loaded = false;
  console.error("Image failed to load:", image.url);
};
</script>

<style scoped>
.gallery-grid {
  display: grid;
  gap: var(--gap-sm);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 200px;
  grid-auto-flow: dense;
}

.gallery {
  background: linear-gradient(180deg, var(--lightgray) 0%, var(--white) 100%);
  padding: var(--pad-section) 0;
}

.gallery-categories {
  display: flex;
  justify-content: center;
  gap: var(--gap-sm);
  margin-bottom: var(--gap-md);
  flex-wrap: wrap;
}

.category-btn {
  border: 2px solid var(--lightgray);
  background: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--gray);
  transition: all 0.3s ease;
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

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.gallery-item.small {
  grid-row: span 1;
}

.gallery-item.medium {
  grid-row: span 2;
}

.gallery-item.large {
  grid-row: span 3;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover .image-wrapper img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  padding: var(--gap-md);
  opacity: 1;
}

.overlay-content {
  color: var(--white);
  width: 100%;
}

.image-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-sm);
}

.image-category {
  background: var(--orange);
  color: var(--white);
  padding: var(--gap-xs) var(--gap-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 600;
}

.image-date {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.8);
}

.image-title {
  font-size: var(--font-md);
  font-weight: 700;
  margin-bottom: var(--gap-xs);
  line-height: 1.3;
}

.image-desc {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin-bottom: var(--gap-sm);
}

.image-stats {
  display: flex;
  gap: var(--gap-md);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.8);
}

.gallery-footer {
  text-align: center;
  margin-top: var(--gap-md);
}

.load-more-btn {
  background: transparent;
  border: 2px solid var(--darkblue);
  color: var(--darkblue);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: var(--darkblue);
  color: var(--white);
  transform: translateY(-2px);
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
  border-radius: 50%;
  width: calc(var(--gap-md) * 2.5);
  height: calc(var(--gap-md) * 2.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
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

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.4s ease,
    opacity 0.3s ease;
  opacity: 0;
}

.image-wrapper img.loaded {
  opacity: 1;
}

.image-wrapper img.loading {
  opacity: 0.8;
  filter: blur(5px);
}

.gallery-item:hover .image-wrapper img {
  transform: scale(1.05);
  filter: blur(0);
  opacity: 1;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  padding: var(--gap-md);
  opacity: 1;
}

.overlay-content {
  color: var(--white);
  width: 100%;
}

.image-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gap-sm);
}

.image-category {
  background: var(--orange);
  color: var(--white);
  padding: var(--gap-xs) var(--gap-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  font-weight: 600;
}

.image-date {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.8);
}

.image-title {
  font-size: var(--font-md);
  font-weight: 700;
  margin-bottom: var(--gap-xs);
  line-height: 1.3;
}

.image-desc {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin-bottom: var(--gap-sm);
}

.image-stats {
  display: flex;
  gap: var(--gap-md);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.8);
}

.gallery-footer {
  text-align: center;
  margin-top: var(--gap-md);
}

.load-more-btn {
  background: transparent;
  border: 2px solid var(--darkblue);
  color: var(--darkblue);
  border-radius: var(--radius-sm);
  font-size: var(--font-sm);
  font-weight: 600;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: var(--darkblue);
  color: var(--white);
  transform: translateY(-2px);
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
  border-radius: 50%;
  width: calc(var(--gap-md) * 2.5);
  height: calc(var(--gap-md) * 2.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
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

@media (max-width: 768px) and (orientation: portrait) {
  .gallery-categories {
    gap: var(--gap-xs);
    margin-bottom: var(--gap-md);
  }

  .category-btn {
    padding: var(--gap-xs) var(--gap-sm);
    font-size: var(--font-xs);
  }

  .gallery-item.medium,
  .gallery-item.large {
    grid-row: span 2;
  }

  .image-overlay {
    padding: var(--gap-sm);
  }

  .image-title {
    font-size: var(--font-sm);
  }

  .image-desc {
    font-size: var(--font-xs);
  }

  .lightbox {
    padding: var(--gap-md);
  }
}

@media (max-width: 1023px) and (orientation: landscape) {
  .gallery-categories {
    gap: var(--gap-sm);
  }

  .gallery-item.medium {
    grid-row: span 2;
  }

  .gallery-item.large {
    grid-row: span 3;
  }

  .image-overlay {
    padding: var(--gap-sm);
  }
}

@media (max-width: 480px) {
  .gallery-categories {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: var(--gap-sm);
  }

  .gallery-item.medium,
  .gallery-item.large {
    grid-row: span 1;
  }

  .image-overlay {
    padding: var(--gap-sm);
  }

  .image-title {
    font-size: var(--font-sm);
  }

  .image-desc {
    font-size: var(--font-xs);
  }
}
</style>
