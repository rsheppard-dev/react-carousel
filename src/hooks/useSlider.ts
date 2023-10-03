import { useState, useEffect, useRef, useCallback } from 'react';

function useSlider<T>(slides: T[], timer?: number) {
	const timerRef = useRef<ReturnType<typeof setTimeout>>();
	const [slideIndex, setSlideIndex] = useState(0);
	const [direction, setDirection] = useState(1);

	const isFirstSlide = slideIndex === 0;
	const isLastSlide = slideIndex === slides.length - 1;

	const handlePreviousSlide = useCallback(
		function (): void {
			setDirection(-1);
			const newImageIndex = isFirstSlide ? slides.length - 1 : slideIndex - 1;
			setSlideIndex(newImageIndex);
		},
		[isFirstSlide, slideIndex, slides.length]
	);

	const handleNextSlide = useCallback(
		function (): void {
			setDirection(1);
			const newImageIndex = isLastSlide ? 0 : slideIndex + 1;
			setSlideIndex(newImageIndex);
		},
		[isLastSlide, slideIndex]
	);

	useEffect(() => {
		if (!timer) return;
		if (isFirstSlide) setDirection(1);
		if (isLastSlide) setDirection(-1);

		if (timerRef.current) clearTimeout(timerRef.current);

		timerRef.current = setTimeout(() => {
			if (direction > 0) handleNextSlide();
			else handlePreviousSlide();
		}, timer);

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [
		direction,
		handleNextSlide,
		handlePreviousSlide,
		isFirstSlide,
		isLastSlide,
		timer,
	]);

	return {
		slideIndex,
		direction,
		isFirstSlide,
		isLastSlide,
		handleNextSlide,
		handlePreviousSlide,
	};
}

export default useSlider;
