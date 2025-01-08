"use client";

import { useEffect, useRef, useState } from "react";

type TypeWriterProps = {
  text: string;
};

export default function TypeWriter({ text }: TypeWriterProps) {
  const [typing, setTyping] = useState("");
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (text.length) {
        let typingIndex = 0;
        const typingInterval = setInterval(() => {
          if (typingIndex < text.length - 1) {
            if (typingIndex === 0) {
              setTyping(text[typingIndex]);
            }
            setTyping((prev) => prev + text[typingIndex]);
            typingIndex++;
          } else {
            clearInterval(typingInterval);
          }
        }, 100);
      }
    }
  }, []);

  return <span>{typing}</span>;
}
