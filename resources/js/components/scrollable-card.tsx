'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

export default function ScrollableCard() {
    const [awayCards, setAwayCards] = useState<number[]>([]);
    const stackAreaRef = useRef<HTMLDivElement>(null);

    const cards = [
        {
            id: 1,
            subtitle: 'Simplified',
            content: 'Complex tasks are now simple',
            color: 'bg-[#407AFF]',
        },
        {
            id: 2,
            subtitle: 'Boost Productivity',
            content: 'Perform Tasks in less time',
            color: 'bg-[#DD3E58]',
        },
        {
            id: 3,
            subtitle: 'Facilitated learning',
            content: 'train anyone from anywhere',
            color: 'bg-[#BA71F5]',
        },
        {
            id: 4,
            subtitle: 'Support',
            content: 'Now its 24/7 support',
            color: 'bg-[#F75CD0]',
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!stackAreaRef.current) return;

            const distance = window.innerHeight * 0.5;
            const topVal = stackAreaRef.current.getBoundingClientRect().top;
            const index = Math.floor(-1 * (topVal / distance + 1));

            const newAwayCards: number[] = [];
            for (let i = 0; i < cards.length; i++) {
                if (i <= index) {
                    newAwayCards.push(cards[i].id);
                }
            }

            setAwayCards(newAwayCards);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [cards.length]);

    return (
        <div ref={stackAreaRef} className="relative flex h-[300vh] w-full">
            <div className="sticky top-0 left-0 hidden h-screen basis-1/2 flex-col items-center justify-center md:flex">
                <h1 className="font-poppins w-[420px] text-[84px] leading-[88px] font-bold">Our Features</h1>
                <div className="font-poppins mt-8 w-[420px] text-sm">
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente qui quis, facere, cupiditate, doloremque natus ex
                        perspiciatis ratione hic corrupti adipisci ea doloribus!
                    </p>
                    <Button className="mt-5 h-auto rounded-full bg-black px-8 py-6 text-white hover:bg-black/90">See More Details</Button>
                </div>
            </div>

            <div className="sticky top-0 h-screen w-full items-center justify-center md:w-1/2">
                {cards.map((card, index) => {
                    const isAway = awayCards.includes(card.id);
                    const zIndex = cards.length - index;
                    const angle = -10 * index;

                    return (
                        <Card
                            key={card.id}
                            className={`absolute top-[calc(50%-175px)] left-[calc(50%-70px)] mb-2.5 flex h-[250px] w-[250px] flex-col justify-between rounded-3xl p-9 transition-transform duration-500 ease-in-out md:h-[350px] md:w-[350px] ${card.color} border-none text-white shadow-2xl`}
                            style={{
                                transform: isAway ? 'translateY(-120vh) rotate(-48deg)' : `rotate(${angle}deg)`,
                                zIndex,
                                transformOrigin: 'bottom left',
                            }}
                        >
                            <div className="font-poppins text-xl font-bold">{card.subtitle}</div>
                            <div className="font-poppins text-[24px] leading-[54px] font-bold md:text-[44px]">{card.content}</div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
