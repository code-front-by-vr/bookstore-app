// 'use client'

// import {getBook} from '@/config/api/book'
// import {BookType} from '@/types/book'
// import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from './ui/card'
// import Image from 'next/image'
// import {Check, Heart, ShoppingCart} from 'lucide-react'
// import {Button} from './ui/button'
// import {useState} from 'react'
// import BookRating from './book-rating'

// export default function CardBook({
//   title,
//   isbn13,
//   price,
//   image,
// }: BookType): React.ReactNode {
//   const [isInCart, setIsInCart] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)
//   const {data} = getBook(isbn13)
//   const rating = data?.rating || 0

//   return (
//     <Card key={isbn13} className="border-none shadow-none flex flex-col h-full p-0 gap-2">
//       <CardHeader className="relative aspect-[3/4] max-h-[200px] overflow-hidden rounded-md p-0">
//         <Image
//           src={image}
//           alt={title}
//           fill
//           priority
//           className="object-contain bg-gray-100 scale-110"
//           sizes="(max-width: 768px) 50vw, 220px"
//         />
//         <button
//           onClick={() => setIsFavorite(!isFavorite)}
//           className="absolute top-1.5 right-1.5 z-10 p-1 rounded-full bg-white/70 hover:bg-white transition"
//         >
//           <Heart
//             size={16}
//             className={`transition-colors duration-200 ${
//               isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-300'
//             }`}
//           />
//         </button>
//       </CardHeader>
//       <CardContent className="flex-grow">
//         <CardTitle className=" mb-2 line-clamp-1 sm:line-clamp-2 sm:h-[2rem] h-[1.6rem]">
//           {title}
//         </CardTitle>
//         <CardDescription className="text-xs text-gray-500 line-clamp-1 font-inter mb-2">
//           By {data?.authors}, {data?.year}
//         </CardDescription>
//         <BookRating rating={rating} />
//       </CardContent>
//       <CardFooter className="mt-auto flex flex-col items-stretch gap-1">
//         <p className="text-sm font-semibold text-primary">{price}</p>
//         <Button
//           variant="outline"
//           className={`group w-full h-10 px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200
//             ${
//               isInCart
//                 ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
//                 : 'border-gray-400 text-gray-700 hover:bg-gray-50 hover:border-gray-500'
//             }
//           `}
//           onClick={() => setIsInCart(!isInCart)}
//         >
//           {isInCart ? (
//             <>
//               <Check size={16} className="mr-2" />
//               In cart
//             </>
//           ) : (
//             <>
//               <ShoppingCart size={16} className="mr-2" />
//               Buy
//             </>
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }

'use client'

import {getBook} from '@/config/api/book'
import {BookType} from '@/types/book'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from './ui/card'
import {Check, ShoppingCart} from 'lucide-react'
import {Button} from './ui/button'
import {useState} from 'react'
import BookRating from './book-rating'
import BookImage from './book-image'
import Link from 'next/link'

export default function CardBook({title, isbn13, price, image}: BookType): React.ReactNode {
  const [isInCart, setIsInCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const {data} = getBook(isbn13)
  const rating = data?.rating || 0

  function handleClickAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    setIsInCart(!isInCart)
  }

  return (
    <Card key={isbn13} className="border-none shadow-none flex flex-col h-full p-0 gap-2 group">
      <Link href={`/books/all/${isbn13}`} className="flex flex-col h-full">
        <CardHeader className="relative aspect-[3/4] max-h-[200px] overflow-hidden rounded-md p-0 mb-4 ">
          <BookImage
            src={image}
            alt={title}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
            className="bg-gray-100 scale-110 group-hover:scale-115 transition-transform duration-200"
            heartSize={16}
          />
        </CardHeader>

        <CardContent className="flex-grow mb-2">
          <CardTitle className="mb-2 line-clamp-1 sm:line-clamp-2 sm:h-[2rem] h-[1.6rem]">
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 line-clamp-1 font-inter mb-2">
            By {data?.authors}, {data?.year}
          </CardDescription>
          <BookRating rating={rating} />
        </CardContent>

        <CardFooter className="mt-auto flex flex-col items-stretch gap-1">
          <p className="text-sm font-semibold text-primary">{price}</p>
        </CardFooter>
      </Link>

      <div className="px-6 pb-6">
        <Button
          variant="outline"
          className={`group w-full h-10 px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all duration-200
            ${
              isInCart
                ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
                : 'border-gray-400 text-gray-700 hover:bg-gray-50 hover:border-gray-500'
            }
          `}
          onClick={handleClickAddToCart}
        >
          {isInCart ? (
            <>
              <Check size={16} className="mr-2" />
              In cart
            </>
          ) : (
            <>
              <ShoppingCart size={16} className="mr-2" />
              Buy
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
