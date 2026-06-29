//import React from 'react'
import { useCart } from '@/hooks/useCart'
import type { CartItem } from '@/types/index'
import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
import { Checkbox  } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';

function CartPage() {

  const { 
        data: cartData, 
        // isLoading, 
        // isError 
    } = useCart()

  return (
    <div className="max-w-4xl mx-auto p-6">

        <h1 className="text-2xl font-bold text-gray-800">
            My Cart
        </h1>
        
        <div className="flex flex-row justify-between gap-10 mt-5">
            
            <div className="">                                        
                <div className="py-5 flex gap-2 items-center justify-start">
                    <Checkbox className="items-center justify-center"
                        // checked={ selectedIds.includes(category.id) }
                        // onChange={(checked) => handleCheck(category.id, checked)}
                        // onCheckedChange={  (checked) => handleCheck(category.id, !!checked) }
                    />
                    <p>Select All</p>
                </div>

                <div className="flex flex-col gap-4 pt-5">
                    {
                        cartData?.items.map(

                            (item: CartItem) => (
                                <div key={item.id} className="flex gap-4">

                                    <div className="flex flex-row gap-1">
                                        
                                        <Checkbox 
                                            className="items-center justify-center"
                                            // checked={ selectedIds.includes(category.id) }
                                            // onChange={(checked) => handleCheck(category.id, checked)}
                                            // onCheckedChange={  (checked) => handleCheck(category.id, !!checked) }
                                        />

                                        <img
                                            src={item.book.coverImage}
                                            alt={item.book.title}
                                            className="w-24 h-36 object-cover rounded-md border mr-4"                                    
                                        />

                                        <div className="flex flex-col gap-2">
                                            <Badge variant="outline">
                                                { item.book.category?.name }
                                            </Badge>

                                            <h2>{item.book.title}</h2>

                                            <p className="text-xs">{item.book.author.name}</p>

                                        </div>    
                                    </div>

                                </div>   
                            )
                        )
                    }

                </div>
            </div>
            <div className="">
                <div className="hidden md:flex flex-col gap-4 shadow-md p-5 rounded-xl">

                    <h2 className="text-xl font-bold">Loan Summary</h2>
                    <p>Total Book : </p>
                    <Button variant="default" className="bg-[#1C65DA]">
                        Borrow Book
                    </Button>

                </div>
            </div>
        </div>

    </div>
  )
}

export default CartPage