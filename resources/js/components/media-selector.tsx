import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useState } from 'react';

type Media = {
    id: string;
    url: string;
    name: string;
    tone?: string;
};

interface MediaSelectorProps {
    items: Media[];
    selectedValue: string;
    onSelect: (value: string) => void;
    type: 'image' | 'audio';
}

export function MediaSelector({ items, selectedValue, onSelect, type }: MediaSelectorProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // TODO: Implement file upload logic
            console.log('Uploading file:', file);
            // Simulate upload delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                />
                <div className="relative">
                    <Input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept={type === 'image' ? 'image/*' : 'audio/*'}
                        onChange={handleFileUpload}
                    />
                    <Label htmlFor="file-upload">
                        <Button type="button" variant="outline" className="cursor-pointer" disabled={isUploading}>
                            {isUploading ? 'Upload en cours...' : 'Upload'}
                        </Button>
                    </Label>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredItems.map((item) => (
                    <div
                        key={item.id}
                        className={`relative aspect-video cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                            selectedValue === item.url ? 'border-primary' : 'hover:border-primary/50 border-transparent'
                        }`}
                        onClick={() => onSelect(item.url)}
                    >
                        {type === 'image' ? (
                            <Image src={item.url} alt={item.name} fill className="object-cover" />
                        ) : (
                            <div className="bg-muted absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl">🔊</span>
                            </div>
                        )}
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2">
                            <span className="truncate text-sm text-white">{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
