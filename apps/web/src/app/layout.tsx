import type { Metadata } from "next";

import "../index.css";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/header";
import Providers from "@/components/providers";
import { getInitialAuthToken } from "@/lib/auth-server";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fylo",
	description: "Fylo",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialToken = await getInitialAuthToken();

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers initialToken={initialToken}>
					<div className="grid grid-rows-[auto_1fr] h-svh">
						<Header />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
}
