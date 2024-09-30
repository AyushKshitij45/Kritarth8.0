import React, { useEffect, useRef } from "react";
import "./bg.css";

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 150; // Increase number of particles for more stars
    const mouse = { x: null, y: null, radius: 150 };

    // Handle mouse movement
    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    // Handle resizing
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    });

    // Create the Particle class
    class Particle {
      constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = x;
        this.baseY = y;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Star-like appearance
        ctx.fill();
      }

      update() {
        // Distance between particle and mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouse.radius;

        // If particle is within the mouse radius, move it away
        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxForce = (maxDistance - distance) / maxDistance;
          const force = maxForce * maxDistance * 0.1;

          this.x -= forceDirectionX * force;
          this.y -= forceDirectionY * force;
        } else {
          // Return to base position when the mouse is far
          if (this.x !== this.baseX) {
            this.x -= (this.x - this.baseX) / 10;
          }
          if (this.y !== this.baseY) {
            this.y -= (this.y - this.baseY) / 10;
          }
        }

        this.draw();
      }
    }

    // Initialize the particles
    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1; // Smaller stars
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y, size));
      }
    }

    // Animate particles
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => {
        particle.update();
      });
      connectParticles();
      requestAnimationFrame(animateParticles);
    }

    // Connect particles that are close to each other (constellations)
    function connectParticles() {
      let opacityValue = 1;
      const constellationPairs = [
        // Define constellations (pairs of particles)
        [0, 1], // Example constellation line
        [2, 3],
        [4, 5],
        // Add more pairs as desired
      ];

      for (let pair of constellationPairs) {
        const a = particlesArray[pair[0]];
        const b = particlesArray[pair[1]];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          opacityValue = 1 - distance / 150;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
          ctx.lineWidth = 2; // Thicker lines for constellations
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Initialize and start the animation
    initParticles();
    animateParticles();

    return () => {
      window.removeEventListener("mousemove", () => {});
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <>
      <div className="animated-gradient"></div>
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
    </>
  );
};

export default Background;
