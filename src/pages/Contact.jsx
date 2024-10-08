'use client';

import React, { useState } from 'react';
import Tooltip from '../components/ui/CustomTooltip';
// Corrected the import paths to match standard conventions
const contactLogo = '/contactLogo.svg';

const Contact = () => {
  const inputStyling = `font-sansb border-2 border-primary px-2 text-sm py-2 w-full
    rounded-lg `;
  const errorStyling = 'text-red-500 text-sm';
  const labelStyling = 'text-xl ';

  const [isWhatsappChecked, setIsWhatsappChecked] = useState(true);
  const [isTelegramChecked, setIsTelegramChecked] = useState(false);
  const [isLineChecked, setIsLineChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    social: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    social: '',
    email: '',
    message: '',
  });

  const [submitMessage, setSubmitMessage] = useState(
    'Confirm FORMSUBMIT reCAPTCHA after pressing submit'
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: '',
      phone: '',
      social: '',
      email: '',
      message: '',
    };

    if (!(isWhatsappChecked || isTelegramChecked || isLineChecked)) {
      newErrors.phone = 'Please atleast one social media';
    }

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required'; // Corrected the error key to match 'phone'
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
    }

    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.phone || // Included phone error check here
      newErrors.message
    ) {
      setErrors(newErrors);
      return;
    }

    setSubmitMessage('Confirm reCAPTCHA and return to original site');

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.submit();
    }
  };

  return (
    <div className="pt-[12svh] sm:min-h-[88svh]">
      <div className="sm:items flex flex-col items-center justify-center">
        <h1 className="mb-6 font-anton text-3xl">CONTACT US</h1>
      </div>
      <div className="flex h-[68svh] w-[100svw] flex-col space-y-5 px-8 sm:flex-row">
        <div className="flex flex-[2] flex-col place-content-center sm:place-content-start">
          <form
            id="contactForm"
            className="flex w-full min-w-fit flex-col gap-2 px-4 sm:min-w-[400px]"
            action="https://api.web3forms.com/submit"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="access_key"
              value="37fcb63c-17a3-4af2-abaa-3a1ec7f08421"
            />
            <div className="text-2xl">
              <div className={labelStyling}>Name</div>
              <input
                type="text"
                className={inputStyling}
                name="name"
                placeholder=""
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className={errorStyling}>{errors.name}</p>}
            </div>
            <div>
              <div className={labelStyling}>Email</div>
              <input
                type="email"
                name="email"
                className={inputStyling}
                placeholder=""
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className={errorStyling}>{errors.email}</p>}
            </div>
            <div>
              <div className={labelStyling}>
                <div className="flex place-content-center items-center justify-between">
                  <div className="">Phone</div>
                  <div className="flex gap-3 font-sans text-sm">
                    <label
                      htmlFor="whatsapp"
                      className="flex items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        id="whatsapp"
                        name="social"
                        value={`Whatsapp`}
                        className="accent-primary"
                        checked={isWhatsappChecked}
                        onChange={() =>
                          setIsWhatsappChecked(!isWhatsappChecked)
                        }
                      />
                      <div>WhatsApp</div>
                    </label>
                    <label
                      htmlFor="telegram"
                      className="flex items-center gap-1"
                    >
                      <input
                        type="checkbox"
                        id="telegram"
                        name="social"
                        value={`Telegram`}
                        checked={isTelegramChecked}
                        onChange={() =>
                          setIsTelegramChecked(!isTelegramChecked)
                        }
                        className="accent-primary"
                      />
                      <div>Telegram</div>
                    </label>
                    <label htmlFor="line" className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        id="line"
                        name="social"
                        value={`Line`}
                        checked={isLineChecked}
                        onChange={() => setIsLineChecked(!isLineChecked)}
                        className="accent-primary"
                      />
                      <div>Line</div>
                    </label>
                  </div>
                </div>
              </div>
              <input
                type="tel" // Changed type from "phone" to "tel" for correct input type
                name="phone"
                className={inputStyling}
                placeholder=""
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <p className={errorStyling}>{errors.phone}</p>}
            </div>
            <div>
              <div className={labelStyling}>Query/Question</div>
              <textarea
                placeholder="(This is resizable on bottom right)"
                className={inputStyling}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && (
                <p className={errorStyling}>{errors.message}</p>
              )}
            </div>
            <button className="flex w-full place-content-center rounded-lg bg-primary py-2 text-center text-white transition-all hover:cursor-pointer hover:bg-primary/80">
              Submit
            </button>
          </form>
          {/* {<p className="flex place-content-center">{submitMessage}</p>} */}
        </div>
        <div className="sm: relative flex flex-[1] place-content-center text-center">
          <img src={contactLogo} className="w-fit pt-16 sm:pt-0" />
          <div className="absolute right-[23%] top-0 sm:bottom-0 sm:top-auto">
            <div className="flex h-16 space-x-2">
              <Tooltip content="+92 308 3872646">
                <button className="h-full w-full">
                  <img
                    src="/contact/phone.svg"
                    className="h-full w-full"
                    alt=""
                  />
                </button>
              </Tooltip>
              <Tooltip content="+92 308 3872646">
                <button className="h-full w-full">
                  <img
                    src="/contact/whatsapp.png"
                    className="h-full w-full"
                    alt=""
                  />
                </button>
              </Tooltip>
              <Tooltip content="support@bluseel.com">
                <button className="h-full w-full">
                  <img
                    src="/contact/mail.svg"
                    className="h-full w-full"
                    alt=""
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
