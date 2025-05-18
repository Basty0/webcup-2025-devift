'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useEffect, useRef, useState } from 'react';

export default function ScrollableCard() {
    const [awayCards, setAwayCards] = useState<number[]>([]);
    const stackAreaRef = useRef<HTMLDivElement>(null);

    const tones = [
        {
          id: 1,
          title: 'Dramatique',
          description: 'Pour un départ théâtral, chargé d\'émotion.',
          image: 'https://i.pinimg.com/1200x/7b/35/d7/7b35d705acbf5f92cb94a20b2ce91f41.jpg',
        },
        {
          id: 2,
          title: 'Ironique',
          description: 'Quitter avec une touche d\'humour ou un brin de sarcasme.',
          image: 'https://i.pinimg.com/1200x/c4/a7/87/c4a787b6635f5d9391407568e640202e.jpg',
        },
        {
          id: 3,
          title: 'Poétique',
          description: 'Un ton doux, métaphorique, presque littéraire.',
          image: 'https://i.pinimg.com/1200x/4b/7a/07/4b7a071faddb6db3b46466a72fec81be.jpg',
        },
        {
          id: 4,
          title: 'Classe',
          description: 'Stylé, sobre, élégant. Le départ avec dignité.',
          image: 'https://i.pinimg.com/1200x/91/c8/39/91c839667e4b9a1ca571e49c63f0dfc1.jpg',
        },
      ];

    useEffect(() => {
        const handleScroll = () => {
            if (!stackAreaRef.current) return;

            const distance = window.innerHeight * 0.5;
            const topVal = stackAreaRef.current.getBoundingClientRect().top;
            const index = Math.floor(-1 * (topVal / distance + 1));

            const newAwayCards: number[] = [];
            for (let i = 0; i < tones.length; i++) {
                if (i <= index) {
                    newAwayCards.push(tones[i].id);
                }
            }

            setAwayCards(newAwayCards);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tones.length]);

    return (
        <div ref={stackAreaRef} className="relative flex h-[300vh] w-full">
            <div className="sticky top-0 left-0 hidden h-screen basis-1/2 flex-col items-center justify-center md:flex">
                <h1 className="font-poppins w-[420px] text-[84px] leading-[88px] font-bold">Votre Ton, C'est quoi ?</h1>
                <div className="font-poppins mt-8 w-[420px] text-sm">
                    <p>
                    Choisissez l'ambiance qui correspond à votre départ : dramatique, ironique, classe… Il y en a pour tous les styles !
                    </p>
                    <Button className="mt-5 h-auto rounded-full bg-black px-8 py-6 text-white hover:bg-black/90">See More Details</Button>
                </div>
            </div>

            <div className="sticky top-0 h-screen w-full items-center justify-center md:w-1/2">
                {tones.map((card, index) => {
                    const isAway = awayCards.includes(card.id);
                    const zIndex = tones.length - index;
                    const angle = -10 * index;

                    return (
                        <Card
                            key={card.id}
                            className={"absolute top-[calc(50%-175px)] left-[calc(50%-70px)] mb-2.5 flex h-[250px] w-[250px] flex-col justify-between rounded-3xl p-9 transition-transform duration-500 ease-in-out md:h-[350px] md:w-[350px] border-none text-white shadow-2xl"}
                            style={{
                                transform: isAway ? 'translateY(-120vh) rotate(-48deg)' : `rotate(${angle}deg)`,
                                zIndex,
                                transformOrigin: 'bottom left',
                            }}
                        >
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="rounded-3xl object-cover object-center z-0"
                            />
                            <div className="relative z-10 font-poppins text-lg font-bold text-black">{card.title}</div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
