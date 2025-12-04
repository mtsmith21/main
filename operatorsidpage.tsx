import { getOperatorById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RatingStars } from '@/components/operators/rating-stars';
import { Separator } from '@/components/ui/separator';
import { ReviewCard } from '@/components/operators/review-card';
import { ReviewForm } from '@/components/operators/review-form';
import { Globe, Users, Plane, MapPin, ShieldCheck, ConciergeBell, Clock, CircleDollarSign } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const operator = getOperatorById(params.id);
  if (!operator) {
    return { title: 'Operator Not Found' };
  }
  return {
    title: `${operator.name} - Reviews & Ratings`,
    description: `See reviews and ratings for ${operator.name}.`,
  };
}

const ratingCategories = [
    { id: 'safety', label: 'Safety', icon: ShieldCheck },
    { id: 'service', label: 'Service', icon: ConciergeBell },
    { id: 'punctuality', label: 'Punctuality', icon: Clock },
    { id: 'value', label: 'Value for Money', icon: CircleDollarSign },
];

export default function OperatorDetailPage({ params }: { params: { id: string } }) {
  const operator = getOperatorById(params.id);

  if (!operator) {
    notFound();
  }

  const logo = placeholderImages.find(p => p.id === operator.logoId);
  const totalReviews = operator.reviews.length;
  const avgRatings = {
      overall: totalReviews > 0 ? operator.reviews.reduce((acc, r) => acc + r.ratings.overall, 0) / totalReviews : 0,
      safety: totalReviews > 0 ? operator.reviews.reduce((acc, r) => acc + r.ratings.safety, 0) / totalReviews : 0,
      service: totalReviews > 0 ? operator.reviews.reduce((acc, r) => acc + r.ratings.service, 0) / totalReviews : 0,
      punctuality: totalReviews > 0 ? operator.reviews.reduce((acc, r) => acc + r.ratings.punctuality, 0) / totalReviews : 0,
      value: totalReviews > 0 ? operator.reviews.reduce((acc, r) => acc + r.ratings.value, 0) / totalReviews : 0,
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {logo && (
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={logo.imageUrl}
                      alt={`${operator.name} logo`}
                      data-ai-hint={logo.imageHint}
                      fill
                      className="rounded-lg object-contain border p-2 bg-card"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="font-headline text-4xl font-bold">{operator.name}</h1>
                  <div className="flex items-center mt-2">
                    <RatingStars rating={avgRatings.overall} size={24} />
                    <span className="ml-3 text-lg text-muted-foreground">
                      {avgRatings.overall.toFixed(1)} out of 5
                    </span>
                  </div>
                   <p className="mt-1 text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/80">{operator.description}</p>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Detailed Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {ratingCategories.map(cat => {
                    const ratingValue = avgRatings[cat.id as keyof typeof avgRatings];
                    return (
                        <div key={cat.id}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <cat.icon className="w-5 h-5 text-primary" />
                                    <span className="font-medium">{cat.label}</span>
                                </div>
                                <span className="font-semibold text-foreground">{ratingValue.toFixed(1)}/5</span>
                            </div>
                            <Progress value={ratingValue * 20} className="h-2" />
                        </div>
                    )
                })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Operator Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                            <span className="font-semibold">Headquarters: </span>
                            <span>{operator.hq}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Plane className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                            <span className="font-semibold">Fleet Size: </span>
                            <span>~{operator.fleetSize} aircraft</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div>
                            <span className="font-semibold">Website: </span>
                            <a href={operator.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {operator.website.replace(/^(https?:\/\/)?(www\.)?/, '')}
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Leave a Review</CardTitle>
                    <CardDescription>Share your experience with this operator.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ReviewForm />
                </CardContent>
            </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-headline text-3xl font-bold mb-6">User Reviews</h2>
        <Separator className="mb-8" />
        {operator.reviews.length > 0 ? (
          <div className="space-y-8">
            {operator.reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-card">
            <h3 className="text-xl font-semibold">No Reviews Yet</h3>
            <p className="text-muted-foreground mt-2">Be the first to share your experience with {operator.name}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
