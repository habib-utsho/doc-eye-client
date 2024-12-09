"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

const FAQuestions = ({ limit }: { limit?: number }) => {
  const faq = [
    {
      question: "How do I schedule an online consultation?",
      answer:
        "You can easily schedule an online consultation by logging into your account and selecting the 'Schedule Consultation' option. Choose your preferred doctor, date, and time, and you're all set!",
    },
    {
      question: "Is my medical information secure?",
      answer:
        "Absolutely! We take the security of your medical information seriously. Our platform uses advanced encryption and follows strict privacy protocols to ensure your data remains confidential.",
    },
    {
      question: "Can I view my past medical records?",
      answer:
        "Yes, you can. Our platform allows you to access and review your past medical records anytime. Simply log into your account and navigate to the 'Medical Records' section.",
    },
    {
      question: "How do I get medication reminders?",
      answer:
        "Getting medication reminders is easy. When you schedule an online consultation, you can set up medication reminders as well. You'll receive timely notifications to help you stay on track with your medications.",
    },
    {
      question: "What if I need to reschedule my appointment?",
      answer:
        "If you need to reschedule your appointment, simply log into your account and navigate to the 'My Appointments' section. There, you can choose a new date and time that works for you.",
    },
    {
      question: "Do you offer specialized medical services?",
      answer:
        "Yes, we have a range of specialized medical services available. You can find information about our specialized doctors and services on our website or contact our support team for assistance.",
    },
    {
      question: "Can I get prescriptions through online consultations?",
      answer:
        "Yes, our doctors can provide prescriptions through online consultations if necessary. Your prescription will be sent electronically to a pharmacy of your choice for easy pickup.",
    },
    {
      question: "How can I update my personal information?",
      answer:
        "You can update your personal information by logging into your account and navigating to the 'Profile' section. There, you can edit your details, including contact information and address.",
    },
    {
      question: "Is technical support available for using the platform?",
      answer:
        "Of course! We offer technical support to assist you with any issues you encounter while using our platform. Feel free to reach out to our support team through the provided contact methods.",
    },
    {
      question: "What if I have an emergency medical situation?",
      answer:
        "For emergency medical situations, it's important to call your local emergency number immediately. Our platform is designed for non-emergency medical care. If you need urgent assistance, please seek help through appropriate channels.",
    },
  ];

  return (
    <Accordion>
      {faq.slice(0, limit ? limit : faq.length).map((fa, ind) => {
        return (
          <AccordionItem key={ind} aria-label={fa.question} title={fa.question}>
            {/* <input type="radio" name={`my-accordion-3`} /> */}

            {fa.answer}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default FAQuestions;
