"use client";
import { Github, Mail, Instagram } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Particles from "../components/particles";

const socials = [
	{
		icon: <Instagram size={20} />,
		href: "https://instagram.com/ho.en.y",
		label: "Instagram",
		handle: "@ho.en.y",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:lhe339@gmail.com",
		label: "Email",
		handle: "lhe339@gmail.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/sparkerhoney",
		label: "Github",
		handle: "sparkerhoney",
	},
];

export default function Contact() {
	return (
		<div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-purple-900 via-pink-500 to-orange-500">
			<Particles
				className="absolute inset-0 z-0 animate-fade-in"
				quantity={5000}
				staticity={5} 
			/>
			<div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
			<div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500 rounded-full filter blur-xl opacity-50 animate-pulse"></div>
			<div className="container relative z-10 flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{socials.map((s, index) => (
						<motion.div
							key={s.label}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16"
							>
								<div className="absolute inset-0 rounded-lg bg-transparent border-2 border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:border-white/50 group-hover:backdrop-blur-md"></div>
								<div className="relative z-10 flex flex-col items-center p-6">
									<span className="flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-white group-hover:text-purple-200 group-hover:bg-purple-900 border-white group-hover:border-purple-200 drop-shadow-orange">
										{s.icon}
									</span>
									<span className="mt-4 text-xl font-medium duration-150 text-white group-hover:text-purple-200 font-display">
										{s.handle}
									</span>
									<span className="mt-2 text-sm text-center duration-1000 text-white group-hover:text-purple-200">
										{s.label}
									</span>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
			
			{/* 홈페이지로 돌아가는 버튼 추가 */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<Link href="/">
					<span className="text-4xl hover:text-5xl transition-all duration-300">🏠</span>
				</Link>
			</div>
		</div>
	);
}