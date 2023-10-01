import React from 'react';
import {
    PageItem,
    PageLink,
    PaginationContainer,
    PaginationList
} from './index.style';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    const pageRange = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <PaginationContainer>
            <PaginationList>
                {pageRange.map((page) => (
                    <PageItem key={page}>
                        <PageLink
                            active={currentPage === page}
                            onClick={() => onPageChange(page)}>
                            {page}
                        </PageLink>
                    </PageItem>
                ))}
            </PaginationList>
        </PaginationContainer>
    );
};

export default Pagination;
