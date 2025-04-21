import GalleryScrollSection from './components/GalleryScrollSection';
import HighlightOnScroll from './components/HighlightOnScroll';
import ChangeTopicOnScrolledSection from './components/ChangeTopicOnScrolledSection';
import HorizontalScrollingUsingVerticalScroll from './components/HorizontalScrollingUsingVerticalScroll';
import ShowOneByOneOnScrollScrollSection from './components/ShowOneByOneOnScrollSection';

const data = {
	section1: {
		title: 'Marketing #1',
		images: [
			{ label: 'image 1', url: './image.jpg', alt: 'Sample Image' },
			{ label: 'image 2', url: './image.jpg', alt: 'Sample Image' },
			{ label: 'image 3', url: './image.jpg', alt: 'Sample Image' },
			{ label: 'image 4', url: './image.jpg', alt: 'Sample Image' },
			{ label: 'image 5', url: './image.jpg', alt: 'Sample Image' },
		],
	},
	section2: {
		text: 'Highlight Text on Scroll. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Vivamus lacinia odio vitae vestibulum.',
	},
	section3: {
		topics: [
			{ 
				title: 'Change the BG when scrolled every Image', 
				desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
				bgColor: 'bg-accent4',
				url: './image.jpg',
				alt: 'Sample Image'
			},
			{ 
				title: 'Sed do eiusmod tempor', 
				desc: 'Nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea.',
				bgColor: 'bg-accent5',
				url: './image.jpg',
				alt: 'Sample Image'
			},
			{ 
				title: 'Nostrud exercitation ullamco', 
				desc: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.',
				bgColor: 'bg-white', 
				url: './image.jpg',
				alt: 'Sample Image' 
			},
			{ 
				title: 'Consectetur adipiscing elit', 
				desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
				bgColor: 'bg-primary', 
				url: './image.jpg',
				alt: 'Sample Image' 
			},
		],
	},
	section4: {
		topics: [
			{ 
				title: 'Horizontal Scrolling Using Vertical Scroll', 
				desc: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', 
				url: './image.jpg',
				alt: 'Sample Image' 
			},
			{ 
				title: 'Sed Ut Perspiciatis', 
				desc: 'Natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.', 
				url: './image.jpg',
				alt: 'Sample Image' 
			},
			{ 
				title: 'Quis Autem Vel Eum Iure',
				desc: 'Reprehenderit qui in ea voluptate velit esse quam nihil molestiae.',
				url: './image.jpg',
				alt: 'Sample Image' 
			},
		],
	},
	section5: {
		messages: [
			{ 
				text: 'Show one by one when scrolled',
				author: 'Exercitation',
			},
			{ 
				text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
				author: 'Occaecat' 
			},
			{ 
				text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa',
				author: 'Dolore' 
			},
			{ 
				text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
				author: 'Culpa Esse' 
			},
			{ 
				text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna.',
				author: 'Labore Et' 
			},
		],
	}
};

export default function App () {
	return (
		<main className="relative w-full">
			<GalleryScrollSection title={data.section1.title} images={data.section1.images} />

			<HighlightOnScroll text={data.section2.text} />

			<ChangeTopicOnScrolledSection topics={data.section3.topics} />
			
			<HorizontalScrollingUsingVerticalScroll topics={data.section4.topics} />

			<ShowOneByOneOnScrollScrollSection messages={data.section5.messages} />
		</main>
	)
};
