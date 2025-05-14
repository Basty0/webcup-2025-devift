import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const toggleAppearance = () => {
        if (appearance === 'light') {
            updateAppearance('dark');
        } else {
            updateAppearance('light');
        }
    };

    const getCurrentIcon = () => {
        return appearance === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />;
    };

    return (
        <div className={className} {...props}>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md" onClick={toggleAppearance}>
                {getCurrentIcon()}
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    );
}
