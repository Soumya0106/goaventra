import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23014D4E"/><stop offset="100%" stop-color="%230F766E"/></linearGradient><linearGradient id="glow" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="%23FF6B35" stop-opacity="0.25"/><stop offset="100%" stop-color="%23FF6B35" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23bg)"/><rect width="1200" height="800" fill="url(%23glow)"/><circle cx="980" cy="120" r="180" fill="%23ffffff" fill-opacity="0.08"/><circle cx="1020" cy="680" r="260" fill="%23ffffff" fill-opacity="0.06"/><path d="M0 560 C180 500 280 620 460 560 C650 490 780 610 980 560 C1060 540 1130 560 1200 580 L1200 800 L0 800 Z" fill="%23ffffff" fill-opacity="0.12"/><text x="72" y="640" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="%23ffffff">GoAventra</text><text x="72" y="700" font-family="Arial, sans-serif" font-size="34" fill="%23E6F4F1">Package image temporarily unavailable</text></svg>'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const {
    src,
    alt,
    style,
    className,
    loading,
    decoding,
    fetchPriority,
    ...rest
  } = props
  const loadingStrategy = loading ?? "lazy"
  const decodingStrategy = decoding ?? "async"

  return didError ? (
    <img
      src={ERROR_IMG_SRC}
      alt={alt || 'Package image unavailable'}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      fetchPriority={fetchPriority}
      data-original-url={src}
      {...rest}
    />
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loadingStrategy}
      decoding={decodingStrategy}
      fetchPriority={fetchPriority}
      {...rest}
      onError={handleError}
    />
  )
}
