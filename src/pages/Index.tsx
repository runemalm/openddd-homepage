import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Package, 
  Database, 
  Code, 
  Layers, 
  MessageSquare, 
  Zap, 
  Github,
  ExternalLink,
  User,
  Users,
  Briefcase,
  Building,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CodeBlock from '@/components/CodeBlock';
import FeatureCard from '@/components/FeatureCard';
import FaqAccordion from '@/components/FaqAccordion';
import Navbar from '@/components/Navbar';

const Index = () => {
  const startupCode = `using OpenDDD.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add OpenDDD services
builder.Services.AddOpenDDD(builder.Configuration, options =>  
{  
    options.UseInMemoryDatabase()    
           .UseInMemoryMessaging()
           .SetEventTopics(  
              "Bookstore.Domain.{EventName}",  
              "Bookstore.Interchange.{EventName}"  
           )
           .SetEventListenerGroup("Default")
           .EnableAutoRegistration();
});

var app = builder.Build();

// Use OpenDDD Middleware
app.UseOpenDDD();

app.Run();`;

  const domainModelCode = `using OpenDDD.Domain.Model.Base;

namespace Bookstore.Domain.Model
{
    public class Customer : AggregateRootBase<Guid>
    {
        public string Name { get; private set; }
        public string Email { get; private set; }

        private Customer(Guid id, string name, string email) : base(id)
        {
            Name = name;
            Email = email;
        }

        public static Customer Create(string name, string email)
        {
            return new Customer(Guid.NewGuid(), name, email);
        }

        public void ChangeName(string name)
        {
            Name = name;
        }
    }
}`;

  const handlerCode = `using OpenDDD.Application;
using Bookstore.Domain.Model;
using Bookstore.Domain.Service;

namespace Bookstore.Application.Actions.RegisterCustomer
{
    public class RegisterCustomerAction : IAction<RegisterCustomerCommand, Customer>
    {
        private readonly ICustomerDomainService _customerDomainService;
        private readonly ICustomerRepository _customerRepository;

        public RegisterCustomerAction(
            ICustomerDomainService customerDomainService,
            ICustomerRepository customerRepository)
        {
            _customerDomainService = customerDomainService;
            _customerRepository = customerRepository;
        }

        public async Task<Customer> ExecuteAsync(RegisterCustomerCommand command, CancellationToken ct)
        {
            var customer = await _customerDomainService.RegisterAsync(command.Name, command.Email, ct);
            await _customerRepository.SaveAsync(customer, ct);
            return customer;
        }
    }
}`;

  const eventListenerCode = `using OpenDDD.Infrastructure.Events.Base;
using OpenDDD.Infrastructure.Events;
using OpenDDD.API.Options;
using OpenDDD.API.HostedServices;
using Bookstore.Application.Actions.SendWelcomeEmail;
using Bookstore.Domain.Model.Events;

namespace Bookstore.Application.Listeners.Domain
{
    public class CustomerRegisteredListener : EventListenerBase<CustomerRegistered, SendWelcomeEmailAction>
    {
        public CustomerRegisteredListener(
            IMessagingProvider messagingProvider,
            OpenDddOptions options,
            IServiceScopeFactory serviceScopeFactory,
            StartupHostedService startupService,
            ILogger<CustomerRegisteredListener> logger)
            : base(messagingProvider, options, serviceScopeFactory, startupService, logger) { }

        public override async Task HandleAsync(CustomerRegistered domainEvent, SendWelcomeEmailAction action, CancellationToken ct)
        {
            var command = new SendWelcomeEmailCommand(domainEvent.Email, domainEvent.Name);
            await action.ExecuteAsync(command, ct);
        }
    }
}`;

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
      question: "What database technologies does OpenDDD support?",
      answer: "OpenDDD is designed with a flexible persistence approach offering two persistence providers: Entity Framework Core and OpenDDD's own persistence provider. It supports multiple database technologies through database providers, with current support for InMemory, SQLite and PostgreSQL. This design allows for clean separation between your domain model and the underlying database technology."
    },
    {
      question: "What messaging technologies does OpenDDD support?",
      answer: "OpenDDD provides built-in support for multiple messaging providers to enable event-driven architecture and integration between services. The framework supports InMemory messaging for development and testing, as well as production-ready options including Kafka, RabbitMQ, and Azure Service Bus. This flexibility allows you to choose the messaging infrastructure that best fits your application's needs and operational environment."
    }
  ];

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
      
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-slideUp">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Modern Domain-Driven Design for .NET
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Simplify Domain-Driven Design with OpenDDD.NET
            </h1>
            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              OpenDDD.NET provides a lightweight framework for implementing Domain-Driven Design patterns in your ASP.NET Core applications with clarity and precision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button size="lg" className="px-6" onClick={() => window.open("https://docs.openddd.net/en/latest/userguide.html", "_blank")}>
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
              <span className="ml-2 opacity-70">Startup Configuration</span>
            </div>
            <CodeBlock 
              code={startupCode} 
              title="Program.cs"
              language="csharp"
            />
          </div>
        </div>
      </section>
      
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose OpenDDD.NET?
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
              description="Supports multiple database technologies including PostgreSQL, SQLite, and InMemory, with a clean separation between domain and persistence concerns."
              delay={300}
            />
            <FeatureCard 
              icon={Code}
              title="Modern C# Support"
              description="Takes full advantage of the latest C# features like records, init-only properties, and pattern matching."
              delay={400}
            />
            <FeatureCard 
              icon={MessageSquare}
              title="Flexible Messaging"
              description="Support for multiple messaging providers including InMemory, Kafka, RabbitMQ and Azure Service Bus."
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
      
      <section id="examples" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See OpenDDD in Action
            </h2>
            <p className="text-lg text-foreground/70">
              Explore examples of how OpenDDD.NET helps you implement clean, maintainable DDD patterns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 mb-16">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold mb-4">Domain Model</h3>
              <p className="text-foreground/70 mb-4">
                Build rich domain models with encapsulated business logic using Aggregates.
              </p>
              <CodeBlock 
                code={domainModelCode} 
                title="Customer.cs"
                language="csharp"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold mb-4">Actions</h3>
              <p className="text-foreground/70 mb-4">
                Create focused, single-responsibility commands that orchestrate domain operations, promoting maintainability and testability through clear separation of concerns.
              </p>
              <CodeBlock 
                code={handlerCode} 
                title="RegisterCustomerAction.cs"
                language="csharp"
              />
            </div>

            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold mb-4">Listeners</h3>
              <p className="text-foreground/70 mb-4">
                Implement event listeners to react to domain events and perform side effects, like sending emails when a customer registers.
              </p>
              <CodeBlock 
                code={eventListenerCode} 
                title="CustomerRegisteredListener.cs"
                language="csharp"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section id="faq" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/70">
              Get answers to common questions about OpenDDD.NET and Domain-Driven Design.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto animate-on-scroll opacity-0">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
      
      <section id="documentation" className="py-20 bg-white">
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
              <Button variant="outline" className="w-full" onClick={() => window.open("https://docs.openddd.net/en/latest/userguide.html", "_blank")}>
                View Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-2">Sample Project</h3>
              <p className="text-foreground/70 mb-4">See OpenDDD in action with a complete working example.</p>
              <Button variant="outline" className="w-full" onClick={() => window.open("https://docs.openddd.net/en/latest/userguide.html#run-sample-project", "_blank")}>
                Explore Sample <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-2">Configuration Guide</h3>
              <p className="text-foreground/70 mb-4">Learn how to configure OpenDDD for your project needs.</p>
              <Button variant="outline" className="w-full" onClick={() => window.open("https://docs.openddd.net/en/latest/configuration.html", "_blank")}>
                View Configuration <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 relative overflow-hidden bg-secondary/50">
        <div className="absolute inset-0 bg-primary/5 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Better Software?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Start building maintainable, domain-focused applications today with OpenDDD.NET.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="px-6" onClick={() => window.open("https://docs.openddd.net/en/latest/userguide.html", "_blank")}>
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-6" onClick={() => window.open("https://docs.openddd.net", "_blank")}>
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center text-foreground font-bold text-xl">
                  O
                </div>
                <span className="font-semibold text-xl">OpenDDD.NET</span>
              </div>
              <p className="text-sm text-white/70">
                A modern Domain-Driven Design framework for ASP.NET Core applications.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="https://docs.openddd.net" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://docs.openddd.net/en/latest/userguide.html" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="https://docs.openddd.net/en/latest/userguide.html#run-sample-project" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Examples</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-3">
                <li><a href="https://github.com/runemalm/OpenDDD.NET" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">GitHub</a></li>
                <li><span className="text-sm text-white/50 cursor-not-allowed">Stack Overflow</span></li>
                <li><a href="https://github.com/runemalm/OpenDDD.NET/discussions" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Discussions</a></li>
                <li><span className="text-sm text-white/50 cursor-not-allowed">X</span></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><span className="text-sm text-white/50 cursor-not-allowed">Privacy Policy</span></li>
                <li><span className="text-sm text-white/50 cursor-not-allowed">Terms of Service</span></li>
                <li><a href="https://github.com/runemalm/OpenDDD.NET/blob/master/LICENSE.md" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">License</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-white/20 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} David Runemalm. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/runemalm/OpenDDD.NET" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                <span className="sr-only">Github</span>
                <Github className="h-5 w-5" />
              </a>
              <span className="text-white/50 cursor-not-allowed">
                <span className="sr-only">X</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-7.6 7.9-4.9 1.1-.8 2.1-.8 2.1-.8z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
