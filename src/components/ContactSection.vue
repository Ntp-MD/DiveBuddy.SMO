<template>
  <section class="section contact" id="contact">
    <div class="container">
      <div class="contact-split">
        <div class="contact-left">
          <h2 class="contact-left-heading">Let's Plan Your Next Dive</h2>
          <p class="contact-left-desc">Whether you're a beginner or an experienced diver, we'll craft the perfect underwater adventure for you.</p>
          <div class="contact-left-items">
            <div class="contact-left-item">
              <span class="contact-left-icon">📍</span>
              <div class="contact-left-detail">
                <h4 class="contact-left-label">Dive Center</h4>
                <p class="contact-left-value">123 Ocean Drive, Phuket</p>
              </div>
            </div>
            <div class="contact-left-item">
              <span class="contact-left-icon">📞</span>
              <div class="contact-left-detail">
                <h4 class="contact-left-label">Call Us</h4>
                <p class="contact-left-value">+66 123 456 789</p>
              </div>
            </div>
            <div class="contact-left-item">
              <span class="contact-left-icon">✉️</span>
              <div class="contact-left-detail">
                <h4 class="contact-left-label">Email</h4>
                <p class="contact-left-value">info@divebuddy.smo</p>
              </div>
            </div>
          </div>
          <div class="contact-left-social">
            <a href="#" class="contact-social-link">📘 Facebook</a>
            <a href="#" class="contact-social-link">📷 Instagram</a>
            <a href="#" class="contact-social-link">📹 YouTube</a>
          </div>
        </div>
        <div class="contact-right">
          <h3 class="contact-right-heading">Send a Message</h3>
          <form class="contact-form">
            <div class="contact-form-row">
              <div class="contact-form-group">
                <label class="contact-form-label">First Name *</label>
                <input type="text" placeholder="John" class="contact-form-input" required />
              </div>
              <div class="contact-form-group">
                <label class="contact-form-label">Last Name *</label>
                <input type="text" placeholder="Doe" class="contact-form-input" required />
              </div>
            </div>
            <div class="contact-form-group">
              <label class="contact-form-label">Email *</label>
              <input type="email" placeholder="john@example.com" class="contact-form-input" required />
            </div>
            <div class="contact-form-group">
              <label class="contact-form-label">Subject</label>
              <select class="contact-form-input" required>
                <option value="">Select a topic</option>
                <option value="booking">Booking Inquiry</option>
                <option value="course">Course Information</option>
                <option value="group">Group Booking</option>
              </select>
            </div>
            <div class="contact-form-group">
              <label class="contact-form-label">Message *</label>
              <textarea placeholder="Tell us about your diving interests..." rows="4" class="contact-form-input" required></textarea>
            </div>
            <button type="submit" class="contact-form-submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.contact {
  background: var(--lightgray);
}

.contact-split {
  display: grid;
  grid-template-columns: 2fr 3fr;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 4px 24px var(--shadow-deepblue);
}

.contact-left {
  background: linear-gradient(135deg, var(--deepblue) 0%, var(--darkblue) 100%);
  padding: var(--pad-container);
  color: var(--white);
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.contact-left-heading {
  font-size: var(--font-lg);
  font-weight: 800;
  color: var(--white);
}

.contact-left-desc {
  font-size: var(--font-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.contact-left-items {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.contact-left-item {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-sm);
}

.contact-left-icon {
  font-size: var(--font-md);
  flex-shrink: 0;
}

.contact-left-label {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--white);
}

.contact-left-value {
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.7);
}

.contact-left-social {
  display: flex;
  gap: var(--gap-sm);
  margin-top: auto;
  flex-wrap: wrap;
}

.contact-social-link {
  padding: calc(var(--gap-xs) * 0.5) var(--gap-xs);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.contact-social-link:hover {
  background: var(--orange);
  color: var(--white);
}

.contact-right {
  background: var(--white);
  padding: var(--pad-container);
}

.contact-right-heading {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-md);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
}

.contact-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-sm);
}

.contact-form-group {
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap-xs) * 0.5);
}

.contact-form-label {
  font-size: var(--font-xs);
  font-weight: 600;
  color: var(--darkblue);
}

.contact-form-input {
  padding: var(--gap-sm);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  background: var(--lightgray);
  color: var(--deepblue);
  transition: all 0.3s ease;
  resize: vertical;
}

.contact-form-input:focus {
  border-color: var(--orange);
  background: var(--white);
}

.contact-form-input::placeholder {
  color: var(--gray);
}

.contact-form-submit {
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-md);
  font-size: var(--font-md);
  font-weight: 700;
  transition: all 0.3s ease;
  margin-top: var(--gap-xs);
}

.contact-form-submit:hover {
  background: var(--darkblue);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-orange);
}

/* Small Mobile */
@media (max-width: 480px) {
  .contact-split {
    grid-template-columns: 1fr;
    gap: var(--gap-md);
  }

  .contact-left {
    padding: var(--gap-md);
  }

  .contact-right {
    padding: var(--gap-md);
  }

  .contact-left-heading {
    font-size: var(--font-lg);
  }

  .contact-left-desc {
    font-size: var(--font-sm);
  }

  .contact-form-group {
    margin-bottom: var(--gap-sm);
  }

  .contact-form-submit {
    width: 100%;
  }

  .contact-form-row {
    grid-template-columns: 1fr;
  }
}

/* Large Mobile */
@media (min-width: 481px) and (max-width: 767px) {
  .contact-split {
    grid-template-columns: 1fr;
    gap: var(--gap-lg);
  }

  .contact-left {
    padding: calc(var(--gap-md) * 1.2);
  }

  .contact-right {
    padding: calc(var(--gap-md) * 1.2);
  }

  .contact-form-row {
    grid-template-columns: 1fr;
  }
}

/* Tablet Portrait */
@media (min-width: 768px) and (max-width: 991px) {
  .contact-split {
    grid-template-columns: 1fr 1fr;
    gap: var(--gap-lg);
  }

  .contact-left {
    padding: var(--gap-lg);
  }

  .contact-right {
    padding: var(--gap-lg);
  }
}

/* Tablet Landscape */
@media (min-width: 992px) and (max-width: 1199px) {
  .contact-split {
    grid-template-columns: 1fr 1fr;
    gap: var(--gap-xl);
  }

  .contact-left {
    padding: var(--gap-lg);
  }

  .contact-right {
    padding: var(--gap-lg);
  }
}

/* Small Desktop */
@media (min-width: 1200px) and (max-width: 1399px) {
  .contact-split {
    grid-template-columns: 1fr 1fr;
    gap: var(--gap-xl);
    max-width: 1200px;
    margin: 0 auto;
  }

  .contact-left {
    padding: calc(var(--gap-lg) * 1.2);
  }

  .contact-right {
    padding: calc(var(--gap-lg) * 1.2);
  }
}

/* Large Desktop */
@media (min-width: 1400px) {
  .contact-split {
    grid-template-columns: 1fr 1fr;
    gap: var(--gap-xl);
    max-width: 1400px;
    margin: 0 auto;
  }

  .contact-left {
    padding: calc(var(--gap-lg) * 1.5);
  }

  .contact-right {
    padding: calc(var(--gap-lg) * 1.5);
  }
}
</style>
