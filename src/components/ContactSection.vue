<template>
  <section class="section contact" id="contact">
    <div class="container">
      <div class="contact-header">
        <h2 class="section-title">Get in Touch</h2>
        <p class="section-subtitle">Ready for your next diving adventure? We're here to help!</p>
      </div>

      <div class="contact-wrapper">
        <div class="contact-info-section">
          <div class="info-header">
            <h3 class="info-title">Contact Information</h3>
            <p class="info-subtitle">Reach out to us through any of these channels</p>
          </div>

          <div class="info-cards">
            <div class="info-card">
              <div class="info-icon-wrapper">
                <span class="info-icon">📍</span>
              </div>
              <div class="info-content">
                <h4 class="info-label">Visit Our Dive Center</h4>
                <p class="info-detail">123 Ocean Drive<br />Beach City, BC 12345</p>
                <a href="#" class="info-link">Get Directions →</a>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon-wrapper">
                <span class="info-icon">📞</span>
              </div>
              <div class="info-content">
                <h4 class="info-label">Call Us</h4>
                <p class="info-detail">+1 (555) 123-4567<br />Mon-Fri: 9AM-6PM PST</p>
                <a href="tel:+15551234567" class="info-link">Call Now →</a>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon-wrapper">
                <span class="info-icon">✉️</span>
              </div>
              <div class="info-content">
                <h4 class="info-label">Email Us</h4>
                <p class="info-detail">info@divebuddy.smo<br />We respond within 24 hours</p>
                <a href="mailto:info@divebuddy.smo" class="info-link">Send Email →</a>
              </div>
            </div>
          </div>

          <div class="social-section">
            <h4 class="social-title">Follow Our Adventures</h4>
            <div class="social-links">
              <a href="#" class="social-link">
                <span class="social-icon">📘</span>
                <span class="social-text">Facebook</span>
              </a>
              <a href="#" class="social-link">
                <span class="social-icon">📷</span>
                <span class="social-text">Instagram</span>
              </a>
              <a href="#" class="social-link">
                <span class="social-icon">🐦</span>
                <span class="social-text">Twitter</span>
              </a>
              <a href="#" class="social-link">
                <span class="social-icon">📹</span>
                <span class="social-text">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form-section">
          <div class="form-header">
            <h3 class="form-title">Send Us a Message</h3>
            <p class="form-subtitle">Tell us about your diving interests and we'll get back to you</p>
          </div>

          <form class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First Name *</label>
                <input type="text" placeholder="John" class="form-input" required />
              </div>
              <div class="form-group">
                <label class="form-label">Last Name *</label>
                <input type="text" placeholder="Doe" class="form-input" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input type="email" placeholder="john.doe@example.com" class="form-input" required />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 123-4567" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Subject *</label>
              <select class="form-input" required>
                <option value="">Select a topic</option>
                <option value="booking">Booking Inquiry</option>
                <option value="course">Course Information</option>
                <option value="equipment">Equipment Questions</option>
                <option value="group">Group Booking</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Message *</label>
              <textarea
                placeholder="Tell us about your diving experience, what you're looking for, or any questions you have..."
                rows="5"
                class="form-input"
                required
              ></textarea>
            </div>

            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" class="checkbox" />
                <span class="checkbox-text">I'd like to receive updates about special offers and new courses</span>
              </label>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn">Send Message</button>
              <button type="button" class="chat-btn">
                <span class="chat-icon">💬</span>
                <span class="chat-text">Start Live Chat</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.contact {
  background: linear-gradient(135deg, var(--lightgray) 0%, var(--white) 100%);
  padding: var(--pad-section) 0;
}

.contact-header {
  text-align: center;
  margin-bottom: var(--gap-md);
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-md);
  max-width: 75em;
  margin: 0 auto;
}

.contact-info-section {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.info-header {
  text-align: left;
}

.info-title {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.info-subtitle {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.6;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.info-card {
  background: var(--white);
  padding: var(--gap-md);
  border-radius: var(--radius-lg);
  box-shadow: 0 var(--gap-xs) var(--gap-md) rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-start;
  gap: var(--gap-md);
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-color: var(--orange);
}

.info-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--gap-sm) * 3);
  height: calc(var(--gap-sm) * 3);
  background: linear-gradient(135deg, var(--orange), #ff8c42);
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 4px 6px var(--shadow-orange);
}

.info-icon {
  font-size: var(--font-lg);
}

.info-content {
  flex: 1;
}

.info-label {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.info-detail {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.6;
  margin-bottom: var(--gap-sm);
}

.info-link {
  display: inline-flex;
  align-items: center;
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--orange);
  transition: all 0.3s ease;
}

.info-link:hover {
  color: var(--darkblue);
  transform: translateX(2px);
}

.social-section {
  background: var(--white);
  padding: var(--gap-md);
  border-radius: var(--radius-lg);
  box-shadow: 0 var(--gap-xs) var(--gap-md) rgba(0, 0, 0, 0.08);
}

.social-title {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-sm);
}

.social-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-sm);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  padding: var(--gap-sm);
  background: var(--lightgray);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--orange);
  transform: translateY(-1px);
}

.social-icon {
  font-size: var(--font-md);
}

.social-text {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
}

.social-link:hover .social-text {
  color: var(--white);
}

.contact-form-section {
  background: var(--white);
  padding: var(--gap-md);
  border-radius: var(--radius-lg);
  box-shadow: 0 var(--gap-xs) var(--gap-md) rgba(0, 0, 0, 0.08);
}

.form-header {
  margin-bottom: var(--gap-md);
}

.form-title {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--darkblue);
  margin-bottom: var(--gap-xs);
}

.form-subtitle {
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.6;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--gap-xs);
}

.form-label {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
}

.form-input {
  padding: var(--gap-sm);
  border: 1px solid var(--lightgray);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  background: var(--white);
  color: var(--deepblue);
  font-weight: 500;
  transition: all 0.3s ease;
  resize: vertical;
}

.form-input:focus {
  border-color: var(--orange);
  box-shadow: 0 0 0 2px rgba(239, 108, 51, 0.1);
}

.form-input::placeholder {
  color: var(--gray);
}

.form-options {
  margin: var(--gap-sm) 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-xs);
  font-size: var(--font-sm);
  color: var(--gray);
  line-height: 1.5;
}

.checkbox {
  margin-top: 1px;
  flex-shrink: 0;
}

.checkbox-text {
  flex: 1;
}

.form-actions {
  display: flex;
  gap: var(--gap-md);
  align-items: center;
  margin-top: var(--gap-md);
}

.submit-btn {
  font-size: var(--font-md);
  font-weight: 600;
  transition: all 0.3s ease;
  flex: 1;
}

.chat-btn {
  display: flex;
  align-items: center;
  gap: var(--gap-xs);
  background: var(--white);
  border: 1px solid var(--darkblue);
  border-radius: var(--radius-md);
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--darkblue);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.chat-btn:hover {
  background: var(--darkblue);
  color: var(--white);
  transform: translateY(-1px);
}

.chat-icon {
  font-size: var(--font-sm);
}

@media (max-width: 968px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: var(--gap-md);
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .social-links {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .contact-form-section {
    padding: var(--gap-md);
  }

  .info-card {
    flex-direction: column;
    text-align: center;
    padding: var(--gap-md);
  }

  .info-icon-wrapper {
    margin: 0 auto var(--gap-sm);
  }

  .form-actions {
    flex-direction: column;
  }

  .submit-btn,
  .chat-btn {
    width: 100%;
    justify-content: center;
  }

  .checkbox-label {
    flex-direction: column;
  }
}
</style>
