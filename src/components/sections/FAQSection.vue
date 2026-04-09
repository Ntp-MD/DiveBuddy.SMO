<template>
  <section class="section faq" id="faq">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Everything you need to know before your first dive</p>
      </div>
      <div class="faq-layout">
        <div class="faq-list">
          <div v-for="item in faqs" :key="item.id" :class="['faq-item', openId === item.id && 'faq-item-open']">
            <button class="faq-item-trigger" @click="toggle(item.id)" :aria-expanded="openId === item.id">
              <span class="faq-item-icon">{{ item.icon }}</span>
              <span class="faq-item-question">{{ item.question }}</span>
              <span class="faq-item-arrow">{{ openId === item.id ? "−" : "+" }}</span>
            </button>
            <div v-if="openId === item.id" class="faq-item-answer">
              <p class="faq-item-text">{{ item.answer }}</p>
            </div>
          </div>
        </div>
        <div class="faq-cta">
          <div class="faq-cta-card">
            <span class="faq-cta-icon">💬</span>
            <h3 class="faq-cta-title">Still Have Questions?</h3>
            <p class="faq-cta-desc">Our dive experts are available 7 days a week to help you plan the perfect underwater adventure.</p>
            <a href="#contact" class="faq-cta-btn">Talk to an Expert</a>
            <div class="faq-cta-contact">
              <span class="faq-cta-phone">📞 +66 123 456 789</span>
              <span class="faq-cta-email">✉️ info@divebuddy.smo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface FAQ {
  id: number;
  icon: string;
  question: string;
  answer: string;
}

const openId = ref<number | null>(1);

const toggle = (id: number) => {
  openId.value = openId.value === id ? null : id;
};

const faqs: FAQ[] = [
  {
    id: 1,
    icon: "🤿",
    question: "Do I need experience to go diving?",
    answer:
      "Not at all! Our Discover Scuba program lets complete beginners experience diving in just one day. You'll learn basic skills in a pool before heading to the ocean with your instructor. No certification required — just a sense of adventure.",
  },
  {
    id: 2,
    icon: "💰",
    question: "What's included in the dive packages?",
    answer:
      "All packages include full equipment rental, certified instructor/guide, boat transfers, insurance, drinking water and light refreshments. Premium packages add hotel pickup, lunch, underwater photos, and accommodation. Check each package for specific inclusions.",
  },
  {
    id: 3,
    icon: "📅",
    question: "When is the best time to dive in Thailand?",
    answer:
      "The Andaman Sea (Phuket, Similan Islands) is best from November to April with excellent visibility up to 30m. The Gulf of Thailand (Koh Tao, Koh Samui) offers year-round diving, with peak conditions from March to September. We operate 365 days a year.",
  },
  {
    id: 4,
    icon: "🏥",
    question: "Is diving safe? What about medical conditions?",
    answer:
      "Diving with DiveBuddy is extremely safe — we've maintained a perfect safety record for 15 years. All guests complete a medical questionnaire. Conditions like asthma, heart disease, or pregnancy may require a doctor's clearance. Our boats carry emergency oxygen and first-aid equipment.",
  },
  {
    id: 5,
    icon: "🎓",
    question: "How long does it take to get certified?",
    answer:
      "PADI Open Water certification takes 3-4 days with a mix of classroom, pool, and ocean sessions. Advanced certification is an additional 2 days. We also offer eLearning to complete theory at home, reducing your in-water course to just 2 days.",
  },
  {
    id: 6,
    icon: "🏨",
    question: "Do you offer hotel accommodation and transfers?",
    answer:
      "Yes! We provide free hotel pickup and drop-off from all major areas in Phuket, Krabi, and Khao Lak. Multi-day packages include beachfront hotel accommodation. We also partner with 4 and 5-star resorts for luxury dive-and-stay combos.",
  },
  {
    id: 7,
    icon: "🌊",
    question: "Can I combine diving with surfing or other activities?",
    answer:
      "Absolutely! Our combo packages pair morning dives with afternoon surf lessons, island hopping tours, Thai cooking classes, or spa treatments. The Sunset Surf & Dive combo is our most popular mixed-activity package.",
  },
  {
    id: 8,
    icon: "❌",
    question: "What is your cancellation policy?",
    answer:
      "Free cancellation up to 48 hours before your trip for a full refund. Cancellations within 24-48 hours receive a 50% refund or free rescheduling. Weather-related cancellations are always fully refunded or rescheduled at no charge.",
  },
];
</script>

<style scoped>
.faq {
  background: var(--lightgray);
}

.faq-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--gap-md);
  align-items: start;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.faq-item {
  background: var(--white);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item-open {
  border-color: var(--orange);
  box-shadow: 0 4px 16px var(--shadow-deepblue);
}

.faq-item-trigger {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  width: 100%;
  padding: var(--gap-sm);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
  transition: color 0.3s ease;
}

.faq-item-trigger:hover {
  color: var(--orange);
}

.faq-item-icon {
  font-size: var(--font-md);
  flex-shrink: 0;
}

.faq-item-question {
  flex: 1;
}

.faq-item-arrow {
  font-size: var(--font-lg);
  color: var(--orange);
  font-weight: 700;
  flex-shrink: 0;
}

.faq-item-answer {
  padding: 0 var(--gap-sm) var(--gap-sm);
}

.faq-item-text {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.7;
  padding-left: calc(var(--font-md) + var(--gap-sm));
}

.faq-cta {
  position: sticky;
  top: var(--gap-md);
}

.faq-cta-card {
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--darkblue) 100%);
  border-radius: var(--radius-lg);
  padding: var(--gap-md);
  text-align: center;
  color: var(--white);
}

.faq-cta-icon {
  font-size: var(--font-xl);
  display: block;
  margin-bottom: var(--gap-sm);
}

.faq-cta-title {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--white);
  margin-bottom: var(--gap-xs);
}

.faq-cta-desc {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: var(--gap-md);
}

.faq-cta-btn {
  display: inline-block;
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 700;
  padding: var(--gap-sm) var(--gap-md);
  transition: all 0.3s ease;
  margin-bottom: var(--gap-md);
}

.faq-cta-btn:hover {
  background: var(--white);
  color: var(--darkblue);
  transform: translateY(-2px);
}

.faq-cta-contact {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
  padding-top: var(--gap-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-cta-phone,
.faq-cta-email {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .faq-layout {
    grid-template-columns: 1fr;
  }

  .faq-cta {
    position: static;
  }
}
</style>
