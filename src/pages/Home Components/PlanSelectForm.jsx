import React, { useState, useEffect } from 'react';

const PlanSelectForm = ({ selectedPackage }) => {
  const inputStyling = `font-sans border-2 border-primary px-2 text-sm py-2 w-full rounded-lg `;
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
    plan: selectedPackage || '', // Use selectedPackage as default plan
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    social: '',
    email: '',
    message: '',
    plan: '', // Added plan error
  });

  const [submitMessage, setSubmitMessage] = useState(
    'Confirm FORMSUBMIT reCAPTCHA after pressing submit'
  );

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      plan: selectedPackage,
    }));
  }, [selectedPackage]);

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
      plan: '', // Added plan error
    };

    if (!formData.plan) {
      newErrors.plan = 'Please select a plan';
    }

    if (!(isWhatsappChecked || isTelegramChecked || isLineChecked)) {
      newErrors.phone = 'Please select at least one social media';
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
      newErrors.phone = 'Phone is required';
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
    }

    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.phone ||
      newErrors.message ||
      newErrors.plan // Plan validation
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
    <form
      id="contactForm"
      className="flex w-full min-w-[400px] flex-col gap-2 px-4"
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
              <label htmlFor="whatsapp" className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="whatsapp"
                  name="social"
                  value={`Whatsapp`}
                  className="accent-primary"
                  checked={isWhatsappChecked}
                  onChange={() => setIsWhatsappChecked(!isWhatsappChecked)}
                />
                <div>WhatsApp</div>
              </label>
              <label htmlFor="telegram" className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="telegram"
                  name="social"
                  value={`Telegram`}
                  checked={isTelegramChecked}
                  onChange={() => setIsTelegramChecked(!isTelegramChecked)}
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
          type="tel"
          name="phone"
          className={inputStyling}
          placeholder=""
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <p className={errorStyling}>{errors.phone}</p>}
      </div>

      <div className="text-2xl">
        <div className={labelStyling}>Select a plan</div>
        <select
          name="plan"
          className={inputStyling}
          value={formData.plan}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select a plan
          </option>
          <option value="presence">Presence</option>
          <option value="startup">Startup</option>
          <option value="business">Business</option>
        </select>
        {errors.plan && <p className={errorStyling}>{errors.plan}</p>}
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
        {errors.message && <p className={errorStyling}>{errors.message}</p>}
      </div>

      <button className="flex w-full place-content-center rounded-lg bg-primary py-2 text-center text-white transition-all hover:cursor-pointer hover:bg-primary/80">
        Submit
      </button>
    </form>
  );
};

export default PlanSelectForm;
