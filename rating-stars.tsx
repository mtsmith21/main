"use client";

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  isEditable?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function RatingStars({ rating, maxRating = 5, size = 20, className, isEditable = false, onRatingChange }: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating > 0 ? hoverRating : rating;

  const handleMouseEnter = (index: number) => {
    if (!isEditable) return;
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (!isEditable) return;
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (!isEditable || !onRatingChange) return;
    onRatingChange(index);
  };

  return (
    <div className={cn("flex items-center gap-1", className, isEditable && "cursor-pointer")}>
      {[...Array(maxRating)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              'transition-colors',
              starValue <= displayRating ? 'text-accent fill-accent' : 'text-muted-foreground/50'
            )}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
}
