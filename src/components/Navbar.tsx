
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github, Book, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Examples', href: '#examples' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Documentation', href: '#documentation' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsSheetOpen(false);
    
    // Add a small delay to allow the sheet to close before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="https://www.openddd.net" className="flex items-center space-x-2 shrink-0">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xl">
            O
          </div>
          <span className="font-semibold text-xl">OpenDDD.NET</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-primary after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a 
            href="https://github.com/runemalm/OpenDDD.NET" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <Button onClick={() => window.open("https://docs.openddd.net/en/latest/userguide.html", "_blank")}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu: Using Sheet component from shadcn/ui for better mobile experience */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden focus:outline-none">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
              <div className="flex flex-col space-y-6">
                <nav className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="flex flex-col space-y-4 pt-4 border-t">
                  <a 
                    href="https://github.com/runemalm/OpenDDD.NET" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    <Github className="h-5 w-5" />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <a 
                    href="https://docs.openddd.net" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    <Book className="h-5 w-5" />
                    <span className="font-medium">Documentation</span>
                  </a>
                  <Button className="w-full justify-center mt-2" onClick={() => window.open("https://docs.openddd.net/en/latest/userguide.html", "_blank")}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
