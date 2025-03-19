import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";
import Provider from "./Provider";
import Loader from "@/components/shared/Loader";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/shared/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JobEchoAI",
  description: "Mock. Improve. Succeed. Your Dream Job Starts Here!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >

          <ClerkLoading className="flex items-center justify-center">
            <div className="w-full h-screen flex items-center justify-center text-2xl">
              <Loader/>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <Provider>
              
              {children}
                <Toaster /> 
                <Footer/>
            </Provider>
          </ClerkLoaded>
          </ThemeProvider>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
      </body>
    </html>
    </ClerkProvider>
  );
}
