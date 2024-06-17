"use client";

import React, { useState } from "react";
import styles from "./FAQ.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const faqs = [
  {
    id: "1",
    question: "What is My Wall?",
    answer:
      "My Wall turns your bio link into a digital showcase, where you or your brand can share many things in one place. It's an easy way to create a portfolio and connect all your online stuff. Great for anyone wanting to show their work and brand in a simple, effective way.",
  },
  {
    id: "2",
    question: "How can I sign up for My Wall?",
    answer: `Signing up for My Wall is easy. Visit the My Wall website, click on the "Sign Up" button, and follow the instructions to create your account.`,
  },
  {
    id: "3",
    question: "Can I customize My Wall page?",
    answer:
      "Yes, My Wall offers a range of customization options, from templates to multimedia integration, enabling you to personalize your page to reflect your unique style and brand.",
  },
  {
    id: "4",
    question: "Is My Wall suitable for businesses and individuals?",
    answer:
      "Absolutely! My Wall is designed for both individuals and businesses looking to expand their digital footprint and showcase their content creatively and effectively.",
  },
  {
    id: "5",
    question: "How does My Wall help in growing my audience?",
    answer:
      "My Wall enhances your online visibility by allowing you to share a broader array of content, engaging with your audience more deeply and driving traffic across your digital platforms.",
  },
  {
    id: "6",
    question: "What kind of content can I share on My Wall?",
    answer:
      "On My Wall, you can share various types of content, including reels, videos, project portfolios, articles, favourite books and more, all organized on your personalized wall.",
  },
  {
    id: "7",
    question: "Does My Wall provide analytics?",
    answer:
      "Yes, My Wall offers analytics tools to track engagement and understand how your audience interacts with your content, helping you to refine your strategy and boost your online presence.",
  },
  {
    id: "8",
    question: "Can I link my social media profiles on My Wall?",
    answer:
      "Definitely. My Wall allows you to link your social media profiles, making it a central hub for all your digital platforms and making it easier for your audience to connect with you.",
  },
  {
    id: "9",
    question: "How often can I update My Wall page?",
    answer:
      "You can update your My Wall page as often as you like. The platform is designed for flexibility, allowing you to add new content, adjust layouts, and refresh your wall anytime.",
  },
  {
    id: "10",
    question: "How can influencers benefit from My Wall?",
    answer:
      "Influencers can amplify their reach and engagement by using My Wall to consolidate their content and collaborations into one personalized space, making it easier for followers to connect with their entire digital presence.",
  },
];

const FAQ = () => {
  const [expanded, setExpanded] = useState<null | string>(null);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqContainer}>
          {faqs.map((f) => (
            <div key={f.id} className={styles.faq}>
              <div
                onClick={() => setExpanded(expanded === f.id ? null : f.id)}
                className={` ${styles.question} ${
                  f.id === expanded && styles.selected
                }`}
              >
                <p className={styles.questionText}>
                  {f.id}. {f.question}
                </p>
                <div
                  className={`${styles.chevron} ${
                    expanded === f.id ? styles.rotateUp : styles.rotateDown
                  }`}
                >
                  <Image
                    src={"/images/svg/chevron.svg"}
                    height={8}
                    width={15}
                    alt="chevron"
                  />
                </div>
              </div>
              <AnimatePresence>
                {expanded === f.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className={styles.answer}>{f.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
