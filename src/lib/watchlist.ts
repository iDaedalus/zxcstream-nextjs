"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

export interface WatchlistItem {
  id: string
  media_type: string
  poster_path: string | null
  backdrop_path: string | null
  title?: string
  name?: string
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load watchlist from localStorage on hook initialization
  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist")
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist))
      } catch (error) {
        console.error("Error parsing watchlist from localStorage:", error)
        setWatchlist([])
      }
    }
    setIsLoading(false)
  }, [])

  // Check if an item is in the watchlist
  const isInWatchlist = useCallback(
    (itemId: string, mediaType = "movie") => {
      return watchlist.some((item) => item.id === itemId && item.media_type === mediaType)
    },
    [watchlist],
  )

  // Add item to watchlist
  const addToWatchlist = useCallback((item: WatchlistItem) => {
    setWatchlist((prev) => {
      // Check if item already exists
      if (prev.some((existing) => existing.id === item.id && existing.media_type === item.media_type)) {
        toast.info("Already in watchlist", {
          description: "This item is already in your watchlist",
        })
        return prev
      }

      // Add to top of the list
      const updatedWatchlist = [item, ...prev]
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))

      // Show success toast
      const itemName = item.title || item.name || "Item"
      toast.success("Added to watchlist", {
        description: `${itemName} has been added to your watchlist`,
      })

      return updatedWatchlist
    })
  }, [])

  // Remove item from watchlist
  const removeFromWatchlist = useCallback((itemId: string, mediaType = "movie") => {
    setWatchlist((prev) => {
      const itemToRemove = prev.find((item) => item.id === itemId && item.media_type === mediaType)
      const updatedWatchlist = prev.filter((item) => !(item.id === itemId && item.media_type === mediaType))

      if (itemToRemove) {
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))

        // Show success toast
        const itemName = itemToRemove.title || itemToRemove.name || "Item"
        toast.success("Removed from watchlist", {
          description: `${itemName} has been removed from your watchlist`,
        })
      }

      return updatedWatchlist
    })
  }, [])

  // Toggle item in watchlist
  const toggleWatchlist = useCallback(
    (item: WatchlistItem) => {
      if (isInWatchlist(item.id, item.media_type)) {
        removeFromWatchlist(item.id, item.media_type)
      } else {
        addToWatchlist(item)
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist],
  )

  // Clear entire watchlist
  const clearWatchlist = useCallback(() => {
    const itemCount = watchlist.length
    setWatchlist([])
    localStorage.removeItem("watchlist")

    if (itemCount > 0) {
      toast.success("Watchlist cleared", {
        description: `All ${itemCount} items have been removed from your watchlist`,
      })
    }
  }, [watchlist.length])

  // Get watchlist count
  const watchlistCount = watchlist.length

  return {
    watchlist,
    isLoading,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    clearWatchlist,
    watchlistCount,
  }
}
