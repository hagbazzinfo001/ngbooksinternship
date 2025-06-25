"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown, Globe, Hotel } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Email Section */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <Hotel className="h-8 w-8 text-[#a50050]" />
              <span className="text-xl font-bold text-[#a50050]">
                NGBooks.<span className="h-8 w-8 text-amber-600 ">com</span>
              </span>
            </Link>
            <div className="hidden md:block text-gray-600 text-sm border-l border-gray-300 pl-6 hover:underline hover:text-[#a50050] underline-offset-4 decoration-2 decoration-[#a50050] transition-colors cursor-pointer">
              reservations@ngbookings.com
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 text-gray-700"
                >
                  <Globe className="h-4 w-4" />
                  <span>NGN</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>NGN - Nigerian Naira</DropdownMenuItem>
                <DropdownMenuItem>USD - US Dollar</DropdownMenuItem>
                <DropdownMenuItem>EUR - Euro</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <User className="h-4 w-4" />
                    <span>{user.firstName}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={signout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-black-700 hover:text-[#a50050] hover:underline underline-offset-4 decoration-2 decoration-[#a50050]"
                >
                  <Link href="/signin">Login</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-black-700 hover:text-[#a50050] hover:underline underline-offset-4 decoration-2 decoration-[#a50050]"
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )}

            {/* List Property Button */}
            <Button
              variant="outline"
              className="border-2 border-[#a50050] text-[#a50050] hover:bg-[#a5005010] font-medium hover:text-[#a50050] transition-colors"
            >
              List your property
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-b border-gray-200 shadow-lg"
        >
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Email */}
            <div className="text-gray-600 text-sm border-b border-gray-100 pb-3">
              reservations@ngbookings.com
            </div>

            {/* Mobile Language Selector */}
            <div className="border-b border-gray-100 pb-3">
              <button className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>NGN - Nigerian Naira</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Auth Section */}
            <div className="space-y-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-2 text-gray-700">
                    <User className="h-4 w-4" />
                    <span>Welcome, {user.firstName}</span>
                  </div>
                  <button
                    onClick={() => {
                      signout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile List Property Button */}
            <div className="pt-3 border-t border-gray-100">
              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                onClick={() => setIsOpen(false)}
              >
                List your property
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
