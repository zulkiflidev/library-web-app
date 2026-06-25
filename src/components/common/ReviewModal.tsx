//import React from 'react'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button';
import { Textarea  } from '@/components/ui/textarea';

import useReviewBook from '@/hooks/useReviewBook';


interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
    bookId: number;
}

function ReviewModal({open, onClose, bookId}: ReviewModalProps) {
  
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState('');
  
  const { addReviewMutation  } = useReviewBook(bookId);

  const handleSubmit = () => {
    addReviewMutation.mutate(
        {
            bookId,
            star,
            comment
        },
        {
            onSuccess: () => {
                onClose();
                setComment('');
                setStar(5);
            }
        }
    )
  }
  
  return (
    <div>
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Review Book</DialogTitle>

                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex gap-1">

                        {
                            [1,2,3,4,5].map( (s) => (

                                <button key={s}  onClick={ () => setStar(s)} 
                                        className={`text-2xl ${s <= star ? 'text-yellow-500' : 'text-gray-300' }`}>

                                        ★

                                </button>
                            )  )
                        
                        }

                    </div>
                    <Textarea placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} />

                    <div className="flex justify-end gap-2">

                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button disabled={addReviewMutation.isPending} onClick={handleSubmit}>

                            {addReviewMutation.isPending ? 'Sending...' : 'Send Review '}

                        </Button>



                    </div>


                </div>


            </DialogContent>




        </Dialog>
    </div>
  )
}

export default ReviewModal