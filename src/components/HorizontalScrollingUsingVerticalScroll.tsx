import { useEffect, useRef, useState } from "react";

interface HorizontalScrollingUsingVerticalScrollProps {
	topics: {
        title: string;
		desc: string;
        url: string;
		alt: string;
    }[];
};

export default function HorizontalScrollingUsingVerticalScroll ({ topics } : HorizontalScrollingUsingVerticalScrollProps) {

	const verticalSectionRef = useRef<HTMLDivElement>(null);
	const horizontalSectionRef = useRef<HTMLDivElement>(null);
	const [verticalScrollHeight, setVerticalScrollHeight] = useState<number | undefined>(undefined);
	const [cardWidth, setCardWidth] = useState<number>(0);


	useEffect(() => {
		setVerticalScrollHeight(horizontalSectionRef.current?.scrollWidth);
	}, [horizontalSectionRef, cardWidth]);

	useEffect(() => {
		const handleScroll = () => {
			const verticalTop = verticalSectionRef?.current?.offsetTop ?? 0;
			const verticalScrollHeight = verticalTop + (verticalSectionRef?.current?.clientHeight ?? 0);

			if (window.scrollY >= verticalTop && window.scrollY <= verticalScrollHeight) {
				horizontalSectionRef.current!.scrollLeft = window.scrollY - verticalTop;
			}
		};

		const handleResize = () => {
			setCardWidth(window.innerWidth >= 1280 ? 1280 : window.innerWidth);
		};

		handleResize();

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<section
			ref={verticalSectionRef} 
			className="bg-accent5 relative"
			style={{
				height: verticalScrollHeight,
				minHeight: verticalScrollHeight
			}}
		>
			<div className="content p-0! sticky top-0 left-0">
				<div 
					ref={horizontalSectionRef} 
					className="flex flex-row overflow-hidden"
				>
					{topics.map((topic, key) => (
						<div 
							key={key}
							className="max-w-screen h-screen flex justify-center items-center flex-col p-10 gap-10 lg:flex-row lg:p-20 lg:gap-20"
							style={{
								width: cardWidth,
								minWidth: cardWidth,
								borderLeft: (key > 0 ? '1px solid var(--color-accent3)' : 'none'),
							}}
						>
							<div className="text-center col-span-4 order-2 lg:order-1 lg:text-left lg:grow">
								<h2 className="text-2xl font-bold">
									{topic.title}
								</h2>

								<p className="text-lg mt-4">
									{topic.desc}
								</p>
							</div>

							<img 
								src={topic.url} 
								alt={topic.alt} 
								width={250}
								height={350}
								className="w-[21.875rem] max-w-full h-[25rem] max-h-full object-cover object-center order-1 lg:w-[15.625rem] lg:h-[21.875rem] lg:order-2 bg-white"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};