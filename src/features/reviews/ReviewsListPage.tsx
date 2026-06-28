//import React from 'react'

import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

import Breadcrumb from '@/components/common/Breadcrumb';
import useMyReviews from '@/hooks/useMyReviews';

import ProfileTabs from '@/components/common/ProfileTabs';


function ReviewsListPage() {

  const navigate = useNavigate()
  const { data, isLoading, isError } = useMyReviews()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Failed to load reviews.</div>

  return (
     <div className="space-y-6 px-4 md:px-20">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'My Reviews' },
      ]} />


     <ProfileTabs />

      <h1 className="text-2xl font-bold">My Reviews</h1>

      {
        data?.reviews.length === 0 && (
            <p className="text-muted-foreground text-sm">No reviews yet.</p>
        )
      }


    <div className="space-y-4">
        {
            data?.reviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4 space-y-3">
                
                    <p className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString('id-ID', 
                        {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        }).replace(/\s*pukul\s*/i, ', ')}
                    </p>

                    <hr className="border-t border-gray-200" />

                
                    <div className="flex flex-row gap-4">
                        
                        <img
                        src={review.book.coverImage}
                        alt={review.book.title}
                        className="w-16 h-24 object-cover rounded cursor-pointer"
                        
                        onClick=
                        {
                            () => navigate(`/books/${review.book.id}`)
                        }

                        />

                        <div className="space-y-1">

                            <Badge variant="outline">
                                {
                                    review.book.category?.name
                                }
                            </Badge>

                            <h3 className="font-bold cursor-pointer hover:underline"
                                onClick={() => navigate(`/books/${review.book.id}`)}
                            >
                                {
                                    review.book.title
                                }
                            </h3>

                            <p className="text-xs text-muted-foreground">
                                {review.book.author.name}
                            </p>                

                        </div>

                    </div>

                    <hr className="border-t border-gray-200" />

                    
                    <div className="space-y-1">
                        <div className="flex items-center gap-1">
                        {
                            Array.from({ length: review.star }).map( (_, i) => 
                            (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))
                        }
                        </div>
                        <p className="text-sm">{review.comment}</p>

                    </div>

                </div>
            ))
        }

        </div>

      
    </div>
  )
}

export default ReviewsListPage