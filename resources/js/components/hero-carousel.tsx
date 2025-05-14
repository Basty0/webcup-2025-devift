import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CarouselItem = {
    id: number;
    image: string;
    author: string;
    title: string;
    topic: string;
    description: string;
};

const carouselData: CarouselItem[] = [
    {
        id: 1,
        image: '/images/4.jpeg',
        author: 'LUNDEV',
        title: 'DESIGN SLIDER',
        topic: 'ANIMAL',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
    },
    {
        id: 2,
        image: '/images/1.jpeg',
        author: 'LUNDEV',
        title: 'DESIGN SLIDER',
        topic: 'ANIMAL',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
    },
    {
        id: 3,
        image: '/images/2.jpeg',
        author: 'LUNDEV',
        title: 'DESIGN SLIDER',
        topic: 'ANIMAL',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
    },
    {
        id: 4,
        image: '/images/3.jpeg',
        author: 'LUNDEV',
        title: 'DESIGN SLIDER',
        topic: 'ANIMAL',
        description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum laudantium?',
    },
];

export default function HeroCarousel() {
    const [items, setItems] = useState<CarouselItem[]>(carouselData);
    const [animationClass, setAnimationClass] = useState<string>('');
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const autoNextRef = useRef<NodeJS.Timeout | null>(null);
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    const handleNext = () => {
        if (isAnimating) return;

        setAnimationClass('next');
        setIsAnimating(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (autoNextRef.current) clearTimeout(autoNextRef.current);

        timeoutRef.current = setTimeout(() => {
            setAnimationClass('');
            setIsAnimating(false);
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const firstItem = newItems.shift();
                if (firstItem) newItems.push(firstItem);
                return newItems;
            });
        }, timeRunning);

        autoNextRef.current = setTimeout(() => {
            handleNext();
        }, timeAutoNext);
    };

    const handlePrev = () => {
        if (isAnimating) return;

        setAnimationClass('prev');
        setIsAnimating(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (autoNextRef.current) clearTimeout(autoNextRef.current);

        timeoutRef.current = setTimeout(() => {
            setAnimationClass('');
            setIsAnimating(false);
            setItems((prevItems) => {
                const newItems = [...prevItems];
                const lastItem = newItems.pop();
                if (lastItem) newItems.unshift(lastItem);
                return newItems;
            });
        }, timeRunning);

        autoNextRef.current = setTimeout(() => {
            handleNext();
        }, timeAutoNext);
    };

    useEffect(() => {
        autoNextRef.current = setTimeout(() => {
            handleNext();
        }, timeAutoNext);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (autoNextRef.current) clearTimeout(autoNextRef.current);
        };
    }, []);

    return (
        <div className={cn('carousel relative h-screen w-full overflow-hidden', animationClass)}>
            {/* Time indicator */}
            <div className="time absolute top-0 left-0 z-[1000] h-[3px] bg-[#f1683a]"></div>

            {/* Main carousel */}
            <div className="list">
                {items.map((item, index) => (
                    <div key={item.id} className={cn('item absolute inset-0 h-full w-full', index === 0 ? 'z-1' : '')}>
                        <img src={item.image || '/placeholder.svg'} alt={item.title} className="h-full w-full object-cover" />
                        <div className="content absolute top-[20%] left-1/2 box-border w-[1140px] max-w-[80%] -translate-x-1/2 pr-[30%] text-white [text-shadow:0_5px_10px_rgba(0,0,0,0.27)]">
                            <div
                                className={cn(
                                    'author font-bold tracking-[10px]',
                                    index === 0 ? 'translate-y-[50px] animate-[showContent_0.5s_1s_linear_1_forwards] opacity-0 blur-[20px]' : '',
                                )}
                            >
                                {item.author}
                            </div>
                            <div
                                className={cn(
                                    'title text-5xl leading-[1.3em] font-bold',
                                    index === 0 ? 'translate-y-[50px] animate-[showContent_0.5s_1.2s_linear_1_forwards] opacity-0 blur-[20px]' : '',
                                )}
                            >
                                {item.title}
                            </div>
                            <div
                                className={cn(
                                    'topic text-5xl leading-[1.3em] font-bold text-[#f1683a]',
                                    index === 0 ? 'translate-y-[50px] animate-[showContent_0.5s_1.4s_linear_1_forwards] opacity-0 blur-[20px]' : '',
                                )}
                            >
                                {item.topic}
                            </div>
                            <div
                                className={cn(
                                    'des',
                                    index === 0 ? 'translate-y-[50px] animate-[showContent_0.5s_1.6s_linear_1_forwards] opacity-0 blur-[20px]' : '',
                                )}
                            >
                                {item.description}
                            </div>
                            <div
                                className={cn(
                                    'buttons mt-5 grid grid-cols-[repeat(2,130px)] grid-rows-[40px] gap-[5px]',
                                    index === 0 ? 'translate-y-[50px] animate-[showContent_0.5s_1.8s_linear_1_forwards] opacity-0 blur-[20px]' : '',
                                )}
                            >
                                <Button variant="default" className="border-none bg-white font-medium tracking-[3px] text-black">
                                    SEE MORE
                                </Button>
                                <Button variant="outline" className="border border-white bg-transparent font-medium tracking-[3px] text-white">
                                    SUBSCRIBE
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Thumbnails */}
            <div className="thumbnail absolute bottom-[50px] left-1/2 z-100 flex w-max gap-5">
                {items.map((item) => (
                    <div key={item.id} className="item relative h-[220px] w-[150px] flex-shrink-0">
                        <img src={item.image || '/placeholder.svg'} alt={item.title} className="h-full w-full rounded-[20px] object-cover" />
                        <div className="content absolute right-[10px] bottom-[10px] left-[10px] text-white">
                            <div className="title font-medium">Name Slider</div>
                            <div className="description font-light">Description</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <div className="arrows absolute top-[80%] right-[52%] z-100 flex w-[300px] max-w-[30%] items-center gap-[10px]">
                <Button
                    id="prev"
                    onClick={handlePrev}
                    variant="outline"
                    size="icon"
                    className="h-[40px] w-[40px] rounded-full border-none bg-white/30 font-bold text-white transition-all duration-500 hover:bg-white hover:text-black"
                >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Précédent</span>
                </Button>
                <Button
                    id="next"
                    onClick={handleNext}
                    variant="outline"
                    size="icon"
                    className="h-[40px] w-[40px] rounded-full border-none bg-white/30 font-bold text-white transition-all duration-500 hover:bg-white hover:text-black"
                >
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Suivant</span>
                </Button>
            </div>
        </div>
    );
}
