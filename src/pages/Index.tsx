import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Package, 
  Database, 
  Code, 
  Layers, 
  GitBranch, 
  Zap, 
  Github 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CodeBlock from '@/components/CodeBlock';
import FeatureCard from '@/components/FeatureCard';
import FaqAccordion from '@/components/FaqAccordion';
import Navbar from '@/components/Navbar';

const Index = () => {
  // Example code for our code blocks
  const domainModelCode = `public class Order : Aggregate<OrderId>
{
    public Customer Customer { get; private set; }
    public List<OrderLine> OrderLines { get; } = new();
    public OrderStatus Status { get; private set; }
    public Money TotalAmount => OrderLines.Sum(l => l.LineTotal);

    private Order() { }

    public static Order Create(Customer customer)
    {
        var order = new Order
        {
            Id = OrderId.New(),
            Customer = customer,
            Status = OrderStatus.Draft
        };
        
        order.AddDomainEvent(new OrderCreatedEvent(order));
        return order;
    }

    public void AddOrderLine(Product product, int quantity)
    {
        var line = new OrderLine(product, quantity);
        OrderLines.Add(line);
    }

    public void Submit()
    {
        // Business rules and validations...
        Status = OrderStatus.Submitted;
        AddDomainEvent(new OrderSubmittedEvent(this));
    }
}`;

  const repositoryCode = `public class OrderRepository : Repository<Order, OrderId>
{
    private readonly ApplicationDbContext _context;
    
    public OrderRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<Order> GetByIdAsync(OrderId id)
    {
        return await _context.Orders
            .Include(o => o.Customer)
            .Include(o => o.OrderLines)
            .FirstOrDefaultAsync(o => o.Id == id);
    }
    
    public async Task SaveAsync(Order order)
    {
        _context.Update(order);
        await _context.SaveChangesAsync();
    }
}`;

  const handlerCode = `public class SubmitOrderHandler : ICommandHandler<SubmitOrderCommand>
{
    private readonly IRepository<Order, OrderId> _orderRepository;
    
    public SubmitOrderHandler(IRepository<Order, OrderId> orderRepository)
    {
        _orderRepository = orderRepository;
    }
    
    public async Task HandleAsync(SubmitOrderCommand command)
    {
        var order = await _orderRepository.GetByIdAsync(command.OrderId);
        if (order == null)
            throw new OrderNotFoundException(command.OrderId);
            
        order.Submit();
        await _orderRepository.SaveAsync(order);
    }
}`;

  // FAQ items
  const faqItems = [
    {
      question: "What is Domain-Driven Design?",
      answer: "Domain-Driven Design (DDD) is an approach to software development that focuses on understanding the business domain and creating software models that reflect it. It emphasizes collaboration between domain experts and developers to create a shared language and model that accurately represents the business."
    },
    {
      question: "How does OpenDDD differ from other DDD frameworks?",
      answer: "OpenDDD provides a lightweight, non-intrusive approach to implementing DDD patterns in ASP.NET Core applications. It focuses on simplicity, performance, and developer experience while adhering to DDD principles. It integrates seamlessly with the .NET ecosystem and provides customizable abstractions."
    },
    {
      question: "Is OpenDDD suitable for small projects?",
      answer: "Yes, OpenDDD is designed to be lightweight and scalable, making it suitable for projects of all sizes. You can adopt only the parts you need and gradually expand your use of DDD patterns as your project grows."
    },
    {
      question: "Can I use OpenDDD with existing projects?",
      answer: "Absolutely! OpenDDD is designed to work alongside your existing code. You can gradually introduce DDD concepts to specific parts of your application without rewriting everything."
    },
    {
      question: "Does OpenDDD require a specific database?",
      answer: "No, OpenDDD is database-agnostic. It works with Entity Framework Core, Dapper, or any other data access technology you prefer."
    }
  ];
  
  // Animation helpers - to trigger animations as elements scroll into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-slideUp">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Modern Domain-Driven Design for .NET
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Build Elegant, Domain-Focused Applications
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              OpenDDD provides a lightweight framework for implementing Domain-Driven Design patterns in your ASP.NET Core applications with clarity and precision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button size="lg" className="px-6">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-6" onClick={() => window.open("https://github.com/runemalm/OpenDDD.NET", "_blank")}>
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
          
          <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl opacity-0 animate-scaleIn animate-delay-300">
            <div className="bg-zinc-900 text-white flex gap-2 px-4 py-2 text-xs">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-2 opacity-70">Domain Model Example</span>
            </div>
            <CodeBlock 
              code={domainModelCode} 
              title="Order.cs"
              language="csharp"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose OpenDDD?
            </h2>
            <p className="text-lg text-foreground/70">
              Our framework embraces modern .NET patterns while staying true to Domain-Driven Design principles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Layers}
              title="Rich Domain Models"
              description="Build expressive, behavior-rich domain models that encapsulate business logic and enforce invariants."
              delay={100}
            />
            <FeatureCard 
              icon={Package}
              title="Clean Architecture"
              description="Organize your application into distinct layers with clear boundaries and dependencies flowing inward."
              delay={200}
            />
            <FeatureCard 
              icon={Database}
              title="Flexible Persistence"
              description="Works with any data storage solution while maintaining a clear separation between domain and data access logic."
              delay={300}
            />
            <FeatureCard 
              icon={Code}
              title="Modern C# Support"
              description="Takes full advantage of the latest C# features like records, init-only properties, and pattern matching."
              delay={400}
            />
            <FeatureCard 
              icon={GitBranch}
              title="Extensible Core"
              description="Built with extensibility in mind, allowing you to customize or replace any component as needed."
              delay={500}
            />
            <FeatureCard 
              icon={Zap}
              title="Performance Focused"
              description="Designed with performance in mind, with minimal overhead and efficient implementations."
              delay={600}
            />
          </div>
        </div>
      </section>
      
      {/* Examples Section */}
      <section id="examples" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See OpenDDD in Action
            </h2>
            <p className="text-lg text-foreground/70">
              Explore examples of how OpenDDD helps you implement clean, maintainable DDD patterns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold mb-4">Repository Pattern</h3>
              <p className="text-foreground/70 mb-4">
                Implement a clean repository pattern to abstract data access logic from your domain.
              </p>
              <CodeBlock 
                code={repositoryCode} 
                title="OrderRepository.cs"
                language="csharp"
              />
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold mb-4">Command Handlers</h3>
              <p className="text-foreground/70 mb-4">
                Keep your application services clean and focused with dedicated command handlers.
              </p>
              <CodeBlock 
                code={handlerCode} 
                title="SubmitOrderHandler.cs"
                language="csharp"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/70">
              Get answers to common questions about OpenDDD and Domain-Driven Design.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto animate-on-scroll opacity-0">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
      
      {/* Documentation Section */}
      <section id="documentation" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Documentation
            </h2>
            <p className="text-lg text-foreground/70">
              From getting started guides to advanced usage patterns, our documentation has you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll opacity-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
              <p className="text-foreground/70 mb-4">New to OpenDDD? Start here with our step-by-step guide.</p>
              <Button variant="outline" className="w-full">
                View Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-2">Core Concepts</h3>
              <p className="text-foreground/70 mb-4">Learn about the fundamental principles behind OpenDDD.</p>
              <Button variant="outline" className="w-full">
                Explore Concepts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-2">API Reference</h3>
              <p className="text-foreground/70 mb-4">Detailed documentation of all OpenDDD APIs and abstractions.</p>
              <Button variant="outline" className="w-full">
                View API <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Better Software?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Start building maintainable, domain-focused applications today with OpenDDD.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="px-6">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center text-foreground font-bold text-xl">
                  O
                </div>
                <span className="font-semibold text-xl">OpenDDD</span>
              </div>
              <p className="text-sm text-white/70">
                A modern Domain-Driven Design framework for ASP.NET Core applications.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Stack Overflow</a></li>
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-white/70 hover:text-white transition-colors">License</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-white/20 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} OpenDDD. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/runemalm/OpenDDD.NET" className="text-white/70 hover:text-white">
                <span className="sr-only">Github</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-7.6 7.9-4.9 1.1-.8 2.1-.8 2.1-.8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

