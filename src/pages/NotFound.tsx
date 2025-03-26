
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="inline-block rounded-full bg-primary/10 p-3 mb-4">
          <div className="rounded-full bg-primary/20 p-3">
            <div className="text-5xl font-bold text-primary">404</div>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-lg text-foreground/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild size="lg">
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
