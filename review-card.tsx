import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import type { Review } from '@/lib/types';
import { RatingStars } from './rating-stars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const avatar = placeholderImages.find(p => p.id === review.avatarId);

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            {avatar && <AvatarImage src={avatar.imageUrl} alt={review.author} data-ai-hint={avatar.imageHint} />}
            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-card-foreground">{review.author}</p>
            <p className="text-sm text-muted-foreground">{format(new Date(review.date), "MMMM d, yyyy")}</p>
          </div>
          <div className="hidden sm:block">
            <RatingStars rating={review.ratings.overall} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="sm:hidden mb-4">
            <RatingStars rating={review.ratings.overall} />
        </div>
        <p className="text-card-foreground/90 whitespace-pre-wrap">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
