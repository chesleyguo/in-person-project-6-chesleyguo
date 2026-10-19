// State: what has the user typed, and which fields have errors? -> formData and errors (two objects)
import { useState } from 'react';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };
const REQUIRED_FIELDS = ['name', 'email', 'message'];

/**
 * Returns an error message for the field, or '' when it is valid
 * @param {string} name
 * @param {string} value
 */
const validateField = (name, value) => {
  const trimmed = value.trim();

  if (name === 'name') {
    if (!trimmed) return 'Name is required';
  } else if (name === 'email') {
    if (!trimmed) return 'Email is required';
    if (!trimmed.includes('@')) return 'Please enter a valid email address';
  } else if (name === 'message') {
    if (!trimmed) return 'Message is required';
    if (trimmed.length < 10) return 'Message must be at least 10 characters';
  }
  return '';
};

function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSubmitted(false);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    REQUIRED_FIELDS.forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) newErrors[field] = message;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    setFormData(EMPTY_FORM);
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <p>Feel free to reach out for collaborations, project inquiries, or just to say hello!</p>

          <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={errors.name ? 'error' : ''}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={errors.email ? 'error' : ''}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className={errors.message ? 'error' : ''}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <div className="form-group form-group-full">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </div>
          </form>

          {isSubmitted && (
            <p className="success-message">Thank you for reaching out! Your message has been sent.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
