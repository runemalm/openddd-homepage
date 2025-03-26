
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items?: FaqItem[];
  className?: string;
}

const defaultFaqItems: FaqItem[] = [
  {
    question: "What is OpenDDD?",
    answer: "OpenDDD is a powerful, lightweight framework for Domain-Driven Design in ASP.NET Core. It helps you build clean, scalable, and maintainable .NET applications with ease."
  },
  {
    question: "How do I get started with OpenDDD?",
    answer: "You can get started by visiting our documentation at docs.openddd.net and following the quick start guide. You can also check out our GitHub repository for examples and code samples."
  },
  {
    question: "Is OpenDDD free to use?",
    answer: "Yes, OpenDDD is an open-source project and is completely free to use in your projects, both personal and commercial."
  },
  {
    question: "Can I contribute to OpenDDD?",
    answer: "Absolutely! We welcome contributions from the community. Check out our GitHub repository and look for issues labeled 'good first issue' to get started."
  }
];

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items = defaultFaqItems, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item, index) => (
        <div key={index} className="py-4">
          <button
            className="flex justify-between items-center w-full text-left focus:outline-none"
            onClick={() => toggleItem(index)}
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-medium">{item.question}</h3>
            <span className="ml-4 flex-shrink-0">
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-foreground/60" />
              ) : (
                <ChevronDown className="h-5 w-5 text-foreground/60" />
              )}
            </span>
          </button>
          <div
            className={cn(
              "mt-2 overflow-hidden transition-all duration-300",
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="text-foreground/70 pb-2">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
