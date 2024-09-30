import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import "./styles.css";

const ComingSoon = () => {
  const launchFireworks = () => {
    // Fireworks effect
    const duration = 5 * 1000; // Duration in milliseconds
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 150 * (timeLeft / duration);
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 }, // Launch fireworks from random positions
      });
    }, 250);
  };

  useEffect(() => {
    launchFireworks(); // Launch fireworks on component mount
  }, []);

  const handleClick = () => {
    // Fire confetti on click
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="coming-soon-container" onClick={handleClick}>
      <h1 className="coming-soon-text">COMING SOON</h1>
      <p className="coming-soon-subtext">Stay tuned for something awesome!</p>
    </div>
  );
};

export default ComingSoon;
