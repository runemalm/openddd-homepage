
import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  rating = 5,
  className,
}) => {
  return (
    <div className={cn(
      "flex flex-col p-6 rounded-xl border border-border bg-white shadow-sm",
      className
    )}>
      {rating > 0 && (
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
      )}
      
      <blockquote className="text-foreground/90 mb-4 italic">"{quote}"</blockquote>
      
      <div className="mt-auto">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-foreground/70">{role}, {company}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
