import { Inter, Outfit } from "next/font/google";

export const inter = Inter({
  weight: "400",
  variable: "--font-regular",
  subsets: ["latin"],
  display: "swap",
});

export const interBold = Inter({
  weight: "700",
  variable: "--font-bold",
  subsets: ["latin"],
  display: "swap",
});

export const interSemiBold = Inter({
  weight: "600",
  variable: "--font-semiBold",
  subsets: ["latin"],
  display: "swap",
});

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});
