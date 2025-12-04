import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getOperators } from '@/lib/data';
import { OperatorCard } from '@/components/operators/operator-card';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const allOperators = getOperators();
  const featuredOperators = allOperators.slice(0, 3);
  const heroImage = placeholderImages.find(p => p.id === 'hero-jet');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-primary-foreground">
          <div className="relative z-10 mx-4 flex flex-col items-center rounded-lg bg-black/30 p-8 backdrop-blur-sm">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Find the Best in Private Aviation
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-200">
              Honest reviews. Unbiased ratings. Your trusted guide to private jet operators.
            </p>
            <div className="mt-8 flex w-full max-w-lg items-center space-x-2">
              <Input
                type="text"
                placeholder="Search for an operator..."
                className="flex-1 bg-white/90 text-foreground placeholder:text-muted-foreground focus:bg-white"
              />
              <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Operators
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Explore top-rated operators as reviewed by our community.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredOperators.map((operator) => (
              <OperatorCard key={operator.id} operator={operator} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/operators">View All Operators</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
