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
	} = useSlider(images, { timer: 2, motion: 'linear' });

	return (
		<section
			title='Image Slider'
			className='relative w-full h-full aspect-w-9 aspect-h-6 overflow-hidden'
		>
			<div className='w-full h-full flex'>
				{images.map((image, index) => (
					<img
						key={image.url}
						aria-hidden={slideIndex !== index}
						src={image.url}
						alt={image.title}
						style={{
							transform: `translateX(-${slideIndex * 100}%)`,
						}}
						className='object-cover w-full h-full transition-transform ease-in-out duration-300 grow-0 shrink-0'
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
							aria-hidden
							onClick={previousSlide}
							className='fill-white h-8 w-8'
						/>
					</button>
				</span>

				<div className='flex gap-4 items-end pb-4'>
					{images.map((_, i) => (
						<button
							key={i}
							title={`Slide #${i + 1}`}
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
							aria-hidden
							onClick={nextSlide}
							className='fill-white h-8 w-8'
						/>
					</button>
				</span>
			</div>
		</section>
	);
}
