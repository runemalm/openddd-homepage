
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  className,
}) => {
  const animationDelay = `${delay}ms`;
  
  return (
    <div 
      className={cn(
        "opacity-0 flex flex-col p-6 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-all animate-scaleIn",
        className
      )}
      style={{ animationDelay }}
    >
      <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
