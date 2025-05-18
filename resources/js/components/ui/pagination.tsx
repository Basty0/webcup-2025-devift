import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { ReactNode } from 'react';

interface PaginationProps {
    children: ReactNode;
    className?: string;
}

interface PaginationItemProps {
    children: ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

interface PaginationPrevProps {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

interface PaginationNextProps {
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const Pagination = ({ children, className = '' }: PaginationProps) => {
    return (
        <div className={`flex items-center justify-center space-x-2 ${className}`}>
            {children}
        </div>
    );
};

const PaginationItem = ({ children, isActive = false, onClick, className = '' }: PaginationItemProps) => {
    return (
        <Button
            variant={isActive ? "default" : "outline"}
            size="icon"
            className={`h-9 w-9 rounded-md ${className}`}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

const PaginationPrevious = ({ onClick, disabled = false, className = '' }: PaginationPrevProps) => {
    return (
        <Button
            variant="outline"
            size="icon"
            className={`h-9 w-9 rounded-md ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Page précédente</span>
        </Button>
    );
};

const PaginationNext = ({ onClick, disabled = false, className = '' }: PaginationNextProps) => {
    return (
        <Button
            variant="outline"
            size="icon"
            className={`h-9 w-9 rounded-md ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Page suivante</span>
        </Button>
    );
};

Pagination.Item = PaginationItem;
Pagination.Previous = PaginationPrevious;
Pagination.Next = PaginationNext;

export { Pagination };
