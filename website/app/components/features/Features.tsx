"use client";
import BurnerWallet from "./BurnerWallet";
import Connect from "./Connect";
import Faucet from "./Faucet";
import Wikipedia from "./Wikipedia";
import { useEffect } from "react";

const Features = () => {
  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.2,
    };
    const targets = document.querySelectorAll(".feature");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rightChild = entry.target.querySelector(".feat-img-right");
          rightChild && rightChild.classList.add("in-view");
          const leftChild = entry.target.querySelector(".feat-img-left");
          leftChild && leftChild.classList.add("in-view");
        }
      });
    }, options);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion:reduce)"
    ).matches;

    if (targets && prefersReducedMotion === false)
      targets.forEach((target) => {
        observer.observe(target);
      });
    return () => {
      if (targets && prefersReducedMotion === false)
        targets.forEach((target) => {
          observer.unobserve(target);
        });
    };
  }, []);
  return (
    <section className="px-4 py-16 md:py-16  md:px-20  flex flex-col gap-16 overflow-hidden">
      <BurnerWallet />
      <Faucet />
      <Wikipedia />
      <Connect />
    </section>
  );
};

export default Features;
