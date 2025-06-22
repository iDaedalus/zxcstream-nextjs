"use client";

import {
  Github,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  Heart,
  Film,
  Tv,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const movieGenres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Romance",
    "Thriller",
    "Animation",
  ];

  const tvGenres = [
    "Crime",
    "Documentary",
    "Fantasy",
    "Mystery",
    "Adventure",
    "Family",
    "War",
    "Western",
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Film className="h-8 w-8 text-blue-500" />
              <h3 className="text-2xl font-bold text-white tracking-tight">
                ZXCSTREAM
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate destination for streaming the latest movies and TV
              shows. Discover, watch, and enjoy unlimited entertainment.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Movie Genres */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Film className="h-5 w-5 text-blue-500" />
              <h4 className="text-lg font-semibold text-white">Movie Genres</h4>
            </div>
            <ul className="space-y-2">
              {movieGenres.map((genre) => (
                <li key={genre}>
                  <Link
                    href={`/movies/genre/${genre.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {genre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TV Show Genres */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Tv className="h-5 w-5 text-blue-500" />
              <h4 className="text-lg font-semibold text-white">TV Genres</h4>
            </div>
            <ul className="space-y-2">
              {tvGenres.map((genre) => (
                <li key={genre}>
                  <Link
                    href={`/tv/genre/${genre.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {genre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/trending"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Star className="h-4 w-4" />
                  Trending Now
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  href="/top-rated"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  href="/new-releases"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link
                  href="/watchlist"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  My Watchlist
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-500">50K+</div>
              <div className="text-sm text-gray-400">Movies</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-500">25K+</div>
              <div className="text-sm text-gray-400">TV Shows</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-500">1M+</div>
              <div className="text-sm text-gray-400">Users</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-500">24/7</div>
              <div className="text-sm text-gray-400">Streaming</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link href="/dmca" className="hover:text-white transition-colors">
                DMCA
              </Link>
              <Link
                href="/disclaimer"
                className="hover:text-white transition-colors"
              >
                Disclaimer
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {currentYear} ZXCSTREAM. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for movie lovers</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <strong className="text-gray-400">Disclaimer:</strong> This website
            does not store any files on our server. All content is provided by
            third-party services. We are not responsible for the accuracy,
            compliance, copyright, legality, decency, or any other aspect of the
            content.
          </p>
        </div>
      </div>
    </footer>
  );
}
