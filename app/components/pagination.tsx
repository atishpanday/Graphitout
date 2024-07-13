import { Dispatch, SetStateAction } from "react";

interface PagianationProps {
    index: number,
    totalPages: number,
    setIndex: Dispatch<SetStateAction<number>>,
    handlePageChange: (ind: number) => void,
};

export default function Pagination({ index, totalPages, setIndex, handlePageChange }: PagianationProps) {
    const arr: number[] = [];
    const maxPageNumDisplay = Math.min(5, totalPages);
    for (let i = 0; i < maxPageNumDisplay; i++) {
        arr.push(i);
    }

    return (
        <nav aria-label="Pagination" className="flex rounded-md shadow-sm">
            <div
                onClick={() => setIndex(prev => prev === 0 ? 0 : prev - 1)}
                className={`px-4 py-2 border-2 border-r-0 border-gray-200 rounded-l-md cursor-pointer`}
            >
                Prev
            </div>
            {
                arr.map((num, i) => (

                    <div
                        key={i}
                        onClick={() => setIndex(num)}
                        className={`px-4 py-2 border-2 border-r-0 border-gray-200 ${num === index && "bg-gray-200"} cursor-pointer`}
                    >
                        {num + 1}
                    </div>
                ))
            }
            <div
                onClick={() => setIndex(prev => prev === totalPages - 1 ? totalPages - 1 : prev + 1)}
                className={`px-4 py-2 border-2 border-gray-200 rounded-r-md cursor-pointer`}
            >
                Next
            </div>
        </nav>
    );
};