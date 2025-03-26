
import React from 'react';
import { cn } from '@/lib/utils';
import { Star, Users, User, Lightbulb } from 'lucide-react';

interface TestimonialCardProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  scenario?: string;
  rating?: number;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  title,
  description,
  icon: Icon = Lightbulb,
  scenario,
  rating = 0,
  className,
}) => {
  return (
    <div className={cn(
      "flex flex-col p-6 rounded-xl border border-border bg-white shadow-sm",
      className
    )}>
      <div className="flex items-center mb-4">
        <div className="bg-primary/10 p-2 rounded-full mr-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      
      {rating > 0 && (
        <div className="flex mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
      )}
      
      <p className="text-foreground/90 mb-4">{description}</p>
      
      {scenario && (
        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-sm text-foreground/70 italic">{scenario}</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
