import { Star } from 'lucide-react'
interface Props { value: number; max?: number; size?: number; interactive?: boolean; onChange?: (v: number) => void }
export function StarRating({ value, max = 5, size = 16, interactive, onChange }: Props) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={size}
          className={`transition-transform ${i < Math.round(value) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
            ${interactive ? 'cursor-pointer hover:scale-125' : ''}`}
          onClick={() => interactive && onChange?.(i + 1)} />
      ))}
    </div>
  )
}
