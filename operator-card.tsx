import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Operator } from '@/lib/types';
import { RatingStars } from './rating-stars';
import { MapPin } from 'lucide-react';

interface OperatorCardProps {
  operator: Operator;
}

export function OperatorCard({ operator }: OperatorCardProps) {
  const logo = placeholderImages.find(p => p.id === operator.logoId);
  const totalReviews = operator.reviews.length;
  const avgRating = totalReviews > 0
    ? operator.reviews.reduce((acc, review) => acc + review.ratings.overall, 0) / totalReviews
    : 0;

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        {logo && (
          <div className="relative h-16 w-16">
            <Image
              src={logo.imageUrl}
              alt={`${operator.name} logo`}
              data-ai-hint={logo.imageHint}
              fill
              className="rounded-full object-cover border"
            />
          </div>
        )}
        <div className="flex-1">
          <CardTitle className="text-2xl font-headline">
            <Link href={`/operators/${operator.id}`} className="hover:text-primary transition-colors">
              {operator.name}
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
             <MapPin className="h-4 w-4" />
             <span>{operator.hq}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center mb-4">
          <RatingStars rating={avgRating} />
          <span className="ml-2 text-sm text-muted-foreground">
            ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
          </span>
        </div>
        <CardDescription className="line-clamp-3">
          {operator.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/operators/${operator.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
