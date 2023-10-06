import { useState, useRef, useEffect, useCallback } from 'react';
import { SliderOptions } from '../types/ImageSlider';

const defaultOptions: SliderOptions = {
	motion: 'alternate',
};
export default function useSlider<T>(
	slides: T[],
	options: SliderOptions = defaultOptions
) {
	const timerRef = useRef<ReturnType<typeof setTimeout>>();
	const [slideIndex, setSlideIndex] = useState(0);
	const [direction, setDirection] = useState(1);

	const isFirstSlide = slideIndex === 0;
	const isLastSlide = slideIndex === slides.length - 1;

	const nextSlide = useCallback(
		function () {
			setDirection(1);
			const newSlideIndex = isLastSlide ? 0 : slideIndex + 1;
			setSlideIndex(newSlideIndex);
		},
		[isLastSlide, slideIndex]
	);

	const previousSlide = useCallback(
		function () {
			setDirection(-1);
			const newSlideIndex = isFirstSlide ? slides.length - 1 : slideIndex - 1;
			setSlideIndex(newSlideIndex);
		},
		[isFirstSlide, slideIndex, slides.length]
	);

	function goToSlide(index: number) {
		setSlideIndex(index);
	}

	useEffect(() => {
		if (!options?.timer) return;

		if (isFirstSlide) setDirection(1);
		if (isLastSlide) setDirection(-1);

		clearTimeout(timerRef.current);

		timerRef.current = setTimeout(() => {
			direction > 0 || options.motion === 'linear'
				? nextSlide()
				: previousSlide();
		}, options.timer * 1000);

		return () => clearTimeout(timerRef.current);
	}, [
		direction,
		isFirstSlide,
		isLastSlide,
		nextSlide,
		options.motion,
		options.timer,
		previousSlide,
	]);

	return {
		slideIndex,
		isFirstSlide,
		isLastSlide,
		nextSlide,
		previousSlide,
		goToSlide,
	};
}
