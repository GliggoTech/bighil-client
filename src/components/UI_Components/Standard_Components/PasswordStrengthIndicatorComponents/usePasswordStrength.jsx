"use client"
import { useState, useEffect } from 'react';

const usePasswordStrength = (password) => {
  const [strength, setStrength] = useState({
    score: 0,
    level: 'weak',
    requirements: {
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumbers: false,
      hasSpecialChars: false,
    },
  });

  useEffect(() => {
    const requirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    let score = 0;
    let level = 'weak';

    if (password.length === 0) {
      score = 0;
      level = 'none';
    } else if (metRequirements < 2) {
      score = 20;
      level = 'weak';
    } else if (metRequirements < 3) {
      score = 40;
      level = 'fair';
    } else if (metRequirements < 4) {
      score = 60;
      level = 'good';
    } else if (metRequirements === 5) {
      score = 100;
      level = 'strong';
    } else {
      score = 80;
      level = 'strong';
    }

    setStrength({ score, level, requirements });
  }, [password]);

  return strength;
};
export default usePasswordStrength;