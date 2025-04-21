import { useEffect, useState } from "react";
import useIsLargeScreen from "../hooks/useIsLargeScreen";

interface ShowOneByOneOnScrollSectionProps {
	messages: {
        text: string;
		author: string;
    }[];
};

const lgSpacings: string[] = [
	'mt-[0.3125rem] ml-[-5rem] translate-x-[-6.25rem]',
	'mt-[1.25rem] ml-[5rem] translate-x-[6.25rem]',
	'mt-[3.125rem] translate-x-[-6.25rem]',
	'mt-[1.5625rem] ml-[-2.5rem] translate-x-[6.25rem]',
	'mt-[0.3125rem] ml-[7.5rem] translate-x-[-6.25rem]'
];

const smSpacings: string[] = [
	'mt-[0.3125rem] ml-[-2.5rem] translate-x-[-2.5rem]',
	'mt-[1.25rem] ml-[2.5rem] translate-x-[2.5rem]',
	'mt-[3.125rem] translate-x-[-2.5rem]',
	'mt-[1.5625rem] ml-[-1.25rem] translate-x-[2.5rem]',
	'mt-[0.3125rem] ml-[2.5rem] translate-x-[-2.5rem]'
];

export default function ShowOneByOneOnScrollScrollSection ({ messages} : ShowOneByOneOnScrollSectionProps) {

	const [visibleItems, setVisibleItems] = useState<string[]>([]);
	const isLargeScreen: boolean = useIsLargeScreen();
	const [spacings, setSpacings] = useState<string[]>(smSpacings);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setVisibleItems((prev) => visibleItems.includes(entry.target.id) ? prev : [...prev, entry.target.id]);
				} 
				// else {
				// 	setVisibleItems((prev) => !visibleItems.includes(entry.target.id) ? prev : prev.filter(item => item !== entry.target.id));
				// }
			})
		}, {
			root: null,
			rootMargin: '0px',
			threshold: 1.0
		});

		const targets = document.querySelectorAll('.observe');
		targets.forEach((target) => observer.observe(target));

		return () => observer.disconnect();
	}, [visibleItems]);

	useEffect(() => {
		setSpacings(isLargeScreen ? lgSpacings : smSpacings);
	}, [isLargeScreen]);

	return (
		<section className="bg-white relative overflow-hidden">
			<div className="content min-h-screen flex flex-col justify-center align-middle items-center">

				{messages.map((message, key) => (
					<div
						id={`title-${key + 1}`}
						key={key}
						className={`observe w-[37.5rem] bg-primary p-4 rounded-2xl text-lg text-center transition-all duration-500 delay-200 ease-in-out 
							${spacings[(key) % 5]} 
							${isLargeScreen ? 'max-w-[calc(100%-1.25rem)]' : 'max-w-[calc(100%-2.5rem)]'} 
							${visibleItems.includes(`title-${key + 1}`) ? 'opacity-100 translate-none' : 'opacity-0'}
						`}
					>
						"{message.text}" - 
						<span className="italic">
							{" " + message.author}
						</span>
					</div>
				))}
			</div>
		</section>
	);
};