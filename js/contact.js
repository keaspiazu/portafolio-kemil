/**
 * ==========================================================================
 * js/contact.js
 * Lógica interactiva para la página de Contacto (contact.html):
 * 1. Copiado de correo electrónico al portapapeles con feedback visual
 * 2. Validación de campos obligatorios y formato de correo electrónico
 * 3. Envío sin backend hacia Cliente de Correo (mailto:)
 * 4. Envío directo hacia WhatsApp (wa.me) con mensaje preformateado
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // Configuración de Contacto con los datos reales de Kemil Yair Aspiazu Ruiz
  // -------------------------------------------------------------------------
  const CONTACT_CONFIG = {
    // Dirección de correo oficial de Kemil
    email: 'kyar10@hotmail.com',
    // Teléfono celular / WhatsApp (Ecuador: +593 96 087 9165)
    whatsappNumber: '593960879165'
  };

  // Elementos del DOM
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactForm = document.getElementById('contact-form');
  const sendWhatsAppBtn = document.getElementById('send-whatsapp-btn');
  const formFeedback = document.getElementById('form-feedback');

  // -------------------------------------------------------------------------
  // 1. Copiar Correo al Portapapeles
  // -------------------------------------------------------------------------
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailToCopy = CONTACT_CONFIG.email;
      const originalText = copyEmailBtn.textContent;

      try {
        await navigator.clipboard.writeText(emailToCopy);
        copyEmailBtn.textContent = '¡Correo copiado!';
        copyEmailBtn.classList.add('btn-primary');
        copyEmailBtn.classList.remove('btn-outline');

        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
          copyEmailBtn.classList.remove('btn-primary');
          copyEmailBtn.classList.add('btn-outline');
        }, 2500);
      } catch (err) {
        console.error('Error al copiar correo:', err);
        alert(`Correo electrónico de Kemil: ${emailToCopy}`);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. Funciones Auxiliares de Validación y Feedback
  // -------------------------------------------------------------------------

  /**
   * Muestra mensajes de estado (éxito o error) en el contenedor #form-feedback
   * @param {string} message - Texto explicativo para el usuario
   * @param {'success'|'error'} type - Tipo de notificación
   */
  function showFeedback(message, type = 'error') {
    if (!formFeedback) return;

    formFeedback.textContent = message;
    formFeedback.classList.remove('is-success', 'is-error');

    if (type === 'success') {
      formFeedback.classList.add('is-success');
    } else {
      formFeedback.classList.add('is-error');
    }

    formFeedback.classList.add('is-visible');
    formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Limpia y oculta cualquier alerta mostrada previamente
   */
  function clearFeedback() {
    if (!formFeedback) return;
    formFeedback.textContent = '';
    formFeedback.classList.remove('is-visible', 'is-success', 'is-error');
  }

  /**
   * Valida los valores del formulario
   * @returns {{isValid: boolean, data?: {name: string, email: string, subject: string, message: string}}}
   */
  function validateFormFields() {
    clearFeedback();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name) {
      showFeedback('Por favor, ingresa tu nombre completo.', 'error');
      if (nameInput) nameInput.focus();
      return { isValid: false };
    }

    if (!email) {
      showFeedback('Por favor, ingresa tu dirección de correo electrónico.', 'error');
      if (emailInput) emailInput.focus();
      return { isValid: false };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Por favor, ingresa un correo electrónico válido (ejemplo: nombre@correo.com).', 'error');
      if (emailInput) emailInput.focus();
      return { isValid: false };
    }

    if (!subject) {
      showFeedback('Por favor, escribe el asunto de tu mensaje.', 'error');
      if (subjectInput) subjectInput.focus();
      return { isValid: false };
    }

    if (!message) {
      showFeedback('Por favor, escribe el contenido de tu mensaje.', 'error');
      if (messageInput) messageInput.focus();
      return { isValid: false };
    }

    return {
      isValid: true,
      data: { name, email, subject, message }
    };
  }

  // -------------------------------------------------------------------------
  // 3. Envío por Correo Electrónico (Submit del Formulario -> mailto:)
  // -------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const validation = validateFormFields();
      if (!validation.isValid) return;

      const { name, email, subject, message } = validation.data;

      const emailBody = `Hola Kemil,\n\nHas recibido un nuevo mensaje desde tu Portafolio Web:\n\n` +
        `• Remitente: ${name}\n` +
        `• Correo de contacto: ${email}\n` +
        `• Asunto: ${subject}\n\n` +
        `Mensaje:\n${message}\n\n---\nMensaje enviado desde el Portafolio Web de Kemil Yair Aspiazu Ruiz`;

      const mailtoUrl = `mailto:${encodeURIComponent(CONTACT_CONFIG.email)}?subject=${encodeURIComponent(`[Portafolio Kemil] ${subject}`)}&body=${encodeURIComponent(emailBody)}`;

      showFeedback('¡Validación exitosa! Abriendo tu cliente de correo para enviar...', 'success');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    });
  }

  // -------------------------------------------------------------------------
  // 4. Envío por WhatsApp (Clic en botón #send-whatsapp-btn -> wa.me)
  // -------------------------------------------------------------------------
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const validation = validateFormFields();
      if (!validation.isValid) return;

      const { name, email, subject, message } = validation.data;

      const whatsappText = `¡Hola Kemil! Te contacto desde tu Portafolio Web.\n\n` +
        `👤 *Nombre:* ${name}\n` +
        `📧 *Correo:* ${email}\n` +
        `📌 *Asunto:* ${subject}\n\n` +
        `💬 *Mensaje:* ${message}`;

      const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

      showFeedback('¡Validación exitosa! Redirigiéndote al WhatsApp de Kemil...', 'success');

      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 600);
    });
  }
});
