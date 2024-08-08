"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div className="fixed inset-x-0 top-0 z-50">
				<div className="container flex justify-end items-center p-6 mx-auto">
					<Link
						href="/blog"
						className="duration-200 text-zinc-100 hover:text-pink-200 mr-4"
					>
						Blog
					</Link>
					<Link
						href="/contact"
						className="duration-200 text-zinc-100 hover:text-pink-200"
					>
						Contact
					</Link>
				</div>
			</div>
		</header>
	);
};