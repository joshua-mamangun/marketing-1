import { useEffect, useRef, useState } from "react";
import breakpoints from "../styles/breakpoints";

interface GalleryScrollSectionProps {
	title: string;
    images: {
        label: string;
        url: string;
		alt: string;
    }[];
};

type ImageAttrs = {
	width: number;
	focusedWidth: number;
	height: number;
	focusedHeight: number;
	additionalSpacingToCenterImage: number;
};

const scrollPerImage: number = 100;

export default function GalleryScrollSection ({ title, images } : GalleryScrollSectionProps) {

	const verticalRef = useRef<HTMLDivElement | null>(null);
	const horizontalRef = useRef<HTMLDivElement | null>(null);
	const [focusedIndex, setFocusedIndex] = useState<number>(0);
	const [prevIndex, setPrevIndex] = useState<number>(-1);
	const [halfContentWidth, setHalfContentWidth] = useState<number>(0);
	const [imageAttrs, setImageAttrs] = useState<ImageAttrs>({
		width: 250,
		focusedWidth: 400,
		height: 350,
		focusedHeight: 650,
		additionalSpacingToCenterImage: 50,
	});

	useEffect(() => {
		const handleScroll = () => {
			const verticalTop = verticalRef?.current?.offsetTop ?? 0;
			const verticalScrollHeight = verticalTop + (verticalRef?.current?.clientHeight ?? 0);

			if (window.scrollY >= verticalTop && window.scrollY <= verticalScrollHeight) {
				const newFocusedIndex: number = Math.floor((window.scrollY - verticalTop) / scrollPerImage);

				if (newFocusedIndex !== focusedIndex && newFocusedIndex < images.length) {
					setPrevIndex(focusedIndex);
					setFocusedIndex(newFocusedIndex);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [focusedIndex, images.length]);

	// On change focused index
	useEffect(() => {
		if (horizontalRef && focusedIndex !== prevIndex) {
			const horizonalElem = horizontalRef.current;

			if (horizonalElem) {
				const additional: number = focusedIndex > prevIndex ? imageAttrs.additionalSpacingToCenterImage : imageAttrs.focusedWidth / 2;
				horizontalRef.current!.scrollLeft = (horizontalRef.current!.children[focusedIndex] as HTMLElement)?.offsetLeft - halfContentWidth + additional;
			}
		}
	}, [focusedIndex, horizontalRef, prevIndex, halfContentWidth, imageAttrs.focusedWidth, imageAttrs.additionalSpacingToCenterImage]);

	// Reassigning scroll values based on breakpoint
	useEffect(() => {
		const reassignScrollValues = () => {
			setHalfContentWidth((window.innerWidth >= breakpoints.xl ? breakpoints.xl : window.innerWidth) / 2);
			setImageAttrs(window.innerWidth >= breakpoints.sm ? {
				width: 250,
				focusedWidth: 400,
				height: 350,
				focusedHeight: 650,
				additionalSpacingToCenterImage: 50,
			} : {
				width: 200,
				focusedWidth: 250,
				height: 300,
				focusedHeight: 450,
				additionalSpacingToCenterImage: 75,
			});
		}

		reassignScrollValues();
		window.addEventListener('resize', reassignScrollValues);

		return () => window.removeEventListener('resize', reassignScrollValues);
	}, []);

	return (
		<section
			ref={verticalRef} 
			className="bg-primary relative min-h-screen h-[150vh]" 
		>
			<div className="content p-0! h-screen flex justify-center align-middle sticky top-0 left-0">
				<div 
					ref={horizontalRef}
					className="flex flex-row gap-10 align-middle items-center overflow-hidden scroll-smooth"
					style={{
						paddingLeft: halfContentWidth - (imageAttrs.focusedWidth / 2),
						paddingRight: halfContentWidth - (imageAttrs.focusedWidth / 2),
					}}
				>
					{images.map((image, key) => (
						<div
							key={key}
							className="relative transition-all duration-200 ease-in-out bg-cover max-h-screen"
							style={focusedIndex === key ? {
								width: imageAttrs.focusedWidth + 'px',
								minWidth: imageAttrs.focusedWidth + 'px',
								height: imageAttrs.focusedHeight + 'px',
								minHeight: imageAttrs.focusedHeight + 'px',
							} : {
								width: imageAttrs.width + 'px',
								minWidth: imageAttrs.width + 'px',
								height: imageAttrs.height + 'px',
								minHeight: imageAttrs.height + 'px',
							}}
						>
							<img 
								src={image.url} 
								alt={image.alt} 
								width={imageAttrs.width}
								height={imageAttrs.height}
								className="object-cover object-center transition-all duration-200 ease-in-out bg-white w-full h-full"
							/>
							<div className="absolute inset-0 bg-white/40 w-full h-full"></div>
						</div>
					))}
				</div>

				<h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-center">
					{title}
				</h1>
			</div>
		</section>
	);
};