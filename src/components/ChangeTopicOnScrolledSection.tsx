import { useEffect, useRef, useState } from "react";
import useIsLargeScreen from "../hooks/useIsLargeScreen";

interface ChangeTopicOnScrolledSectionProps {
	topics: {
        title: string;
		desc: string;
        bgColor: string;
        url: string;
		alt: string;
    }[];
};

export default function ChangeTopicOnScrolledSection ({ topics } : ChangeTopicOnScrolledSectionProps) {

	const [scrollPerTopic, setScrollPerTopic] = useState<number | undefined>(undefined);
	const [topicsIndex, setTopicsIndex] = useState<number>(0);
	const topicsSectionRef = useRef<HTMLDivElement>(null);
	const titleDescRef = useRef<HTMLDivElement>(null);
	const firstTopicRef = useRef<HTMLDivElement>(null);
	const isLargeScreen = useIsLargeScreen();

	useEffect(() => {
		const handleScroll = () => {
			if (scrollPerTopic === undefined) {
				return;
			}

			const sectionTop = topicsSectionRef?.current?.offsetTop ?? 0;
			const sectionHeight = sectionTop + (topicsSectionRef?.current?.clientHeight ?? 0);

			if (window.scrollY >= sectionTop && window.scrollY <= sectionHeight) {
				setTopicsIndex(Math.floor((window.scrollY - sectionTop) / scrollPerTopic));
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [scrollPerTopic, topics, topicsSectionRef]);

	useEffect(() => {
		const assignScrollPerTopic = () => {
			setScrollPerTopic(window.innerHeight);
		};

		assignScrollPerTopic();
		window.addEventListener('resize', assignScrollPerTopic);

		return () => window.removeEventListener('resize', assignScrollPerTopic);
	}, []);

	// Adjust first topic height on smaller devices because the title and desc becomes sticky and shares 100vh on first topic
	useEffect(() => {
		const adjustFirstTopicHeight = () => {
			const titleDesc = titleDescRef.current;
			const firstTopic = firstTopicRef.current;
			
			if (!isLargeScreen && titleDesc && firstTopic) {
				firstTopic.style.height = `calc(100vh - ${titleDescRef.current?.clientHeight}px)`;
			}
		};

		adjustFirstTopicHeight();
		window.addEventListener('resize', adjustFirstTopicHeight);

		return () => window.removeEventListener('resize', adjustFirstTopicHeight);
	}, [titleDescRef, firstTopicRef, isLargeScreen]);

	return (
		<section
			ref={topicsSectionRef}
			className={topics[topicsIndex]?.bgColor ?? topics[0]?.bgColor ?? 'bg-accent3'}
		>
			<div className="content relative transition-all">
				<div 
					ref={titleDescRef}
					className="h-auto w-full items-center text-center lg:w-[calc(100%-21.875rem)] lg:h-screen bg-transparent lg:text-left sticky lg:sticky top-0 left-0 flex flex-col justify-center lg:items-start gap-4 py-20 lg:pr-20 z-10"
				>
					<h2 className="text-2xl font-bold">
						{topics[topicsIndex]?.title ?? topics[0]?.title ?? ''}
					</h2>
					<p className="text-lg">
						{topics[topicsIndex]?.desc ?? topics[0]?.desc ?? ''}
					</p>
				</div>

				<div 
					ref={firstTopicRef}
					className="w-full lg:w-[21.875rem] h-screen relative lg:absolute top-0 right-0 lg:top-20 lg:right-20 ml-auto bg-transparent flex justify-center align-center items-center"
				>
					<img 
						src={topics[0]?.url} 
						alt={topics[0]?.alt} 
						width={350}
						height={450}
						className="w-[21.875rem] h-[28.125rem] object-cover object-center bg-white"
					/>
				</div>

				<div className="relative">
					
					{topics.slice(1).map((topic, key) => (
						<div 
							key={key}
							className="w-full lg:w-[21.875rem] h-screen ml-auto bg-transparent flex justify-center align-center items-center"
						>
							<img 
								src={topic.url} 
								alt={topic.alt} 
								width={350}
								height={450}
								className="w-[21.875rem] h-[28.125rem] object-cover object-center bg-white"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};