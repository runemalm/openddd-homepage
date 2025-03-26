
import React from 'react';
import { cn } from '@/lib/utils';
import { Star, Users, User, Lightbulb, Quote } from 'lucide-react';

interface TestimonialCardProps {
  title?: string;
  description?: string;
  quote?: string;
  author?: string;
  icon?: React.ElementType;
  scenario?: string;
  rating?: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  title,
  description,
  quote,
  author,
  icon: Icon = Quote,
  scenario,
  rating = 0,
  className,
}) => {
  // If quote and author are provided, but title and description aren't,
  // use the quote as description and author as title
  const displayTitle = title || author || '';
  const displayDescription = description || quote || '';

  return (
    <div className={cn(
      "flex flex-col p-6 rounded-xl border border-border bg-white shadow-sm",
      className
    )}>
      <div className="flex items-center mb-4">
        <div className="bg-primary/10 p-2 rounded-full mr-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{displayTitle}</h3>
      </div>
      
      {rating > 0 && (
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
      )}
      
      <p className="text-foreground/90 mb-4">{displayDescription}</p>
      
      {scenario && (
        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-sm text-foreground/70 italic">{scenario}</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
