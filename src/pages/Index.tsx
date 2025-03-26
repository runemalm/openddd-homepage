import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodeBlock from "@/components/CodeBlock";
import FaqAccordion from "@/components/FaqAccordion";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";

const Index: React.FC = () => {
  return (
    <>
      <Navbar />

      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
            OpenDDD.NET: Your Modern .NET Framework
          </h1>
          <p className="text-lg text-center text-gray-700 mb-12">
            Build robust, scalable, and maintainable applications with Domain-Driven Design in ASP.NET Core.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Domain-Driven Design"
              description="Embrace DDD principles for a clear, maintainable architecture."
            />
            <FeatureCard
              title="ASP.NET Core"
              description="Leverage the power and flexibility of the .NET ecosystem."
            />
            <FeatureCard
              title="Clean Architecture"
              description="Promote separation of concerns for testability and maintainability."
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Code Examples</h2>
          <Tabs defaultValue="csharp" className="w-full">
            <TabsList className="justify-center">
              <TabsTrigger value="csharp">C#</TabsTrigger>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            </TabsList>
            <TabsContent value="csharp">
              <CodeBlock language="csharp" code={`
public class Order
{
    public Guid Id { get; set; }
    public DateTime OrderDate { get; set; }
    public string CustomerName { get; set; }
}
              `} />
            </TabsContent>
            <TabsContent value="typescript">
              <CodeBlock language="typescript" code={`
interface Order {
    id: string;
    orderDate: Date;
    customerName: string;
}
              `} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="OpenDDD has revolutionized the way we build .NET applications. The DDD approach has made our codebase more maintainable and scalable."
              author="David Runemalm, Founder of OpenDDD"
            />
            <TestimonialCard
              quote="The clean architecture principles promoted by OpenDDD have significantly improved our development workflow."
              author="John Doe, CTO"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">FAQ</h2>
          <FaqAccordion />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
