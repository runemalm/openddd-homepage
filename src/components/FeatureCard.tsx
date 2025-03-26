
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, Code, Layout, Layers } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
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
  // If no icon is provided, use a default one based on the title
  const IconComponent = Icon || getDefaultIcon(title);
  
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
        <IconComponent className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  );
};

// Helper function to get a default icon based on title
function getDefaultIcon(title: string): LucideIcon {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('design') || lowerTitle.includes('ddd') || lowerTitle.includes('domain')) {
    return Layers;
  } else if (lowerTitle.includes('core') || lowerTitle.includes('asp')) {
    return Layout;
  } else if (lowerTitle.includes('architecture') || lowerTitle.includes('clean')) {
    return Code;
  }
  
  // Default icon if no match
  return Code;
}

export default FeatureCard;
