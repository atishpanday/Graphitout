import { Dispatch, SetStateAction } from "react";

interface PagianationProps {
    index: number,
    totalPages: number,
    setIndex: Dispatch<SetStateAction<number>>,
    handlePageChange: (ind: number) => void,
};

export default function Pagination({ index, totalPages, setIndex, handlePageChange }: PagianationProps) {
    const handleIndexChange = (ind: number) => {
        if (ind >= 0 && ind < totalPages) {
            handlePageChange(ind);
            setIndex(ind);
        }
    };

    return (
        <nav aria-label="Pagination" className="flex shadow-md">
            <div
                onClick={() => handleIndexChange(index - 1)}
                className={`px-4 py-2 bg-white cursor-pointer hover:bg-gray-200`}
            >
                Prev
            </div>

            <div
                className={`px-4 py-2 bg-white border-x border-gray-200`}
            >
                {index + 1} / {totalPages}
            </div>
            <div
                onClick={() => handleIndexChange(index + 1)}
                className={`px-4 py-2 bg-white cursor-pointer hover:bg-gray-200`}
            >
                Next
            </div>
        </nav>
    );
};