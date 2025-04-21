import { useEffect, useRef, useState } from "react";

interface HighlightOnScrollProps {
	text: string;
};

const highlightSpeed: number = 1.5;

export default function HighlightOnScroll ({ text } : HighlightOnScrollProps) {
	
	const sectionRef = useRef<HTMLDivElement>(null);
	const [highlightedCount, setHighlightedCount] = useState<number>(1);
	const [scrollPerChar, setScrollPerChar] = useState<number | undefined>(undefined);

	useEffect(() => {
		setScrollPerChar((sectionRef?.current?.clientHeight ?? 0) / text.length);
	}, [sectionRef, text]);

	useEffect(() => {
		const handleScroll = () => {

			if (scrollPerChar === undefined || scrollPerChar === 0) {
				return;
			}

			const sectionTop = sectionRef?.current?.offsetTop ?? 0;
			const sectionHeight = sectionTop + (sectionRef?.current?.clientHeight ?? 0);

			if (window.scrollY >= sectionTop && window.scrollY <= sectionHeight) {
				setHighlightedCount(Math.floor((window.scrollY - sectionTop) / scrollPerChar) * highlightSpeed);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [scrollPerChar]);

	return (
		<section
			ref={sectionRef} 
			className="bg-white text-black min-h-[150vh] relative"
		>
			<div className="content h-screen flex-col/center sticky top-0 left-0">
				<div className="w-[37.5rem] max-w-full text-2xl/12 sm:leading-18">
					{Array.from(text).map((char, key) => (
						<span 
							key={key}
							className={key < highlightedCount ? 'bg-secondary' : ''}
						>
							{char}
						</span>
					))}
				</div>
			</div>
		</section>
	);
};