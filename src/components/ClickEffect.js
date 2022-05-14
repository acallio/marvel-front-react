import React from "react";
import { useState, useEffect } from "react";

import ce from "../assets/img/comic-effects";

import "./clickEffect.scss";

const ClickEffect = () => {
  const [root] = useState(document.documentElement);
  const [effect] = useState(ce);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    root.addEventListener("mousemove", (e) => {
      root.style.setProperty("--mouse-x", e.clientX + "px");
      root.style.setProperty("--mouse-y", e.clientY + "px");
    });
  }, [root]);

  const playEffect = () => {
    setHidden(true);
  };
  return (
    <div
      className={hidden ? `click-effect hidden` : "click-effect fade-out"}
      onClick={() => {
        if (hidden) {
          setHidden(false);
          setTimeout(playEffect, 1100);
        }
      }}
    >
      <img
        // src={effect[Math.floor(Math.random() * effect.length)]}
        src={effect[0]}
        alt="effect"
      />
    </div>
  );
};

export default ClickEffect;
