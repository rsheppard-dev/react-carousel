import {
	BsFillArrowLeftSquareFill,
	BsFillArrowRightSquareFill,
} from 'react-icons/bs';

import images from '../assets/images';
import useSlider from '../hooks/useSlider';

export default function Slider() {
	const {
		slideIndex,
		isFirstSlide,
		isLastSlide,
		handleNextSlide,
		handlePreviousSlide,
	} = useSlider(images, 3 * 1000);

	return (
		<section className='relative mt-10 max-w-4xl mx-auto h-[500px] overflow-hidden'>
			<div
				style={{
					width: `${100 * images.length}%`,
					transform: `translateX(-${slideIndex * (100 / images.length)}%)`,
				}}
				className='absolute inset-0 flex transition-transform duration-300'
			>
				{images.map(image => (
					<img
						src={image.url}
						alt={image.title}
						className='object-cover w-full object-center'
					/>
				))}
			</div>

			<div className='absolute inset-0 flex justify-between'>
				<div className='px-4 bg-black/20 flex items-center'>
					<button
						title='Previous'
						disabled={isFirstSlide}
						onClick={handlePreviousSlide}
						className='enabled:hover:scale-110 transition-transform disabled:opacity-30'
					>
						<BsFillArrowLeftSquareFill
							title='Previous'
							className='w-8 h-8 fill-white'
						/>
					</button>
				</div>

				<div className='px-4 bg-black/20 flex items-center'>
					<button
						title='Next'
						disabled={isLastSlide}
						onClick={handleNextSlide}
						className='enabled:hover:scale-110 transition-transform disabled:opacity-30'
					>
						<BsFillArrowRightSquareFill
							title='Next'
							className='w-8 h-8 fill-white enabled:hover:scale-110 transition-transform'
						/>
					</button>
				</div>
			</div>
		</section>
	);
}
