"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "./rating-stars";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, ConciergeBell, Clock, CircleDollarSign, Star } from "lucide-react";

const reviewSchema = z.object({
  safety: z.number().min(1, "Rating is required"),
  service: z.number().min(1, "Rating is required"),
  punctuality: z.number().min(1, "Rating is required"),
  value: z.number().min(1, "Rating is required"),
  comment: z.string().min(10, "Comment must be at least 10 characters.").max(1000, "Comment is too long."),
});

const ratingCategories = [
    { name: "safety" as const, label: "Safety", icon: ShieldCheck },
    { name: "service" as const, label: "Service", icon: ConciergeBell },
    { name: "punctuality" as const, label: "Punctuality", icon: Clock },
    { name: "value" as const, label: "Value for Money", icon: CircleDollarSign },
];

export function ReviewForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      safety: 0,
      service: 0,
      punctuality: 0,
      value: 0,
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    console.log(values);
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. Your review is pending approval.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
            {ratingCategories.map((category) => (
                 <FormField
                    key={category.name}
                    control={form.control}
                    name={category.name}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                            <FormLabel className="flex items-center gap-2">
                                <category.icon className="w-5 h-5 text-muted-foreground"/>
                                {category.label}
                            </FormLabel>
                            <FormControl>
                                <RatingStars 
                                    rating={field.value} 
                                    onRatingChange={field.onChange}
                                    isEditable 
                                />
                            </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                 />
            ))}
        </div>
        
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Comment</FormLabel>              <FormControl>
                <Textarea placeholder="Share details of your own experience with this operator..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>      </form>
    </Form>
  );
}
