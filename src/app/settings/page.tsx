"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Facebook, Linkedin, Rocket } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-background"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
              <Rocket className="w-10 h-10 text-foreground" />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                zxcstream
              </h2>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Coming Soon
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're working hard to bring you something amazing. Get ready for
              the next big thing in digital innovation.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-white/10"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-white/10"
            >
              <Instagram className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-white/10"
            >
              <Facebook className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-white/10"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <p className="text-muted-foreground text-sm">
            © 2024 zxcstream. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
