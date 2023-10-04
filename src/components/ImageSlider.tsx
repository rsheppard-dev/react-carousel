import {
	BsFillArrowLeftSquareFill,
	BsFillArrowRightSquareFill,
} from 'react-icons/bs';
import images from '../data/images';
import useSlider from '../hooks/useSlider';

export default function ImageSlider() {
	const {
		slideIndex,
		isFirstSlide,
		isLastSlide,
		nextSlide,
		previousSlide,
		goToSlide,
	} = useSlider(images, 5);
	return (
		<section className='relative max-w-4xl h-[500px] mx-auto mt-10 overflow-hidden'>
			<div
				style={{
					width: `${images.length * 100}%`,
					transform: `translateX(-${slideIndex * (100 / images.length)}%)`,
				}}
				className='absolute flex inset-0 transition-transform duration-300'
			>
				{images.map(image => (
					<img
						key={image.url}
						src={image.url}
						alt={image.title}
						className='w-full object-cover'
					/>
				))}
			</div>

			<div className='absolute inset-0 flex justify-between'>
				<span className='flex items-center bg-black/20 px-4'>
					<button
						title='Previous'
						disabled={isFirstSlide}
						className='disabled:opacity-20 enabled:hover:scale-110 transition-transform'
					>
						<BsFillArrowLeftSquareFill
							title='Previous'
							onClick={previousSlide}
							className='fill-white h-8 w-8'
						/>
					</button>
				</span>

				<div className='flex gap-4 items-end pb-4'>
					{images.map((_, i) => (
						<button
							key={i}
							title={`Slide #${i}`}
							disabled={i === slideIndex}
							onClick={() => goToSlide(i)}
							className='rounded-full w-4 h-4 bg-white/60 disabled:bg-white shadow-md enabled:hover:scale-110 enabled:hover:border-2 border-white transition-all'
						></button>
					))}
				</div>

				<span className='flex items-center bg-black/20 px-4'>
					<button
						title='Next'
						disabled={isLastSlide}
						className='disabled:opacity-20 enabled:hover:scale-110 transition-transform'
					>
						<BsFillArrowRightSquareFill
							title='Next'
							onClick={nextSlide}
							className='fill-white h-8 w-8'
						/>
					</button>
				</span>
			</div>
		</section>
	);
}
