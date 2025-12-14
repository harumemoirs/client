"use client";
import NewsletterPopup, { useNewsletterPopup } from "@/custom/NewsLetterPopUp";

export default function NewsletterPopupWrapper() {
  const { isOpen, closePopup } = useNewsletterPopup();
  return <NewsletterPopup isOpen={isOpen} onClose={closePopup} />;
}
