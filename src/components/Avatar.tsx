interface Props { initial: string; color: string; size?: 'sm' | 'md' | 'lg' }
export function Avatar({ initial, color, size = 'md' }: Props) {
  const s = size === 'sm' ? 'w-7 h-7 text-xs' : size === 'lg' ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm'
  return (
    <div className={`${s} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
         style={{ backgroundColor: color + '33', color }}>
      {initial}
    </div>
  )
}
