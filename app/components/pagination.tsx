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

    const handleIndexChange = (ind: number) => {
        if (ind >= 0 && ind < totalPages) {
            handlePageChange(ind);
            setIndex(ind);
        }
    };

    return (
        <nav aria-label="Pagination" className="flex rounded-md shadow-sm">
            <div
                onClick={() => handleIndexChange(index - 1)}
                className={`px-4 py-2 border-2 border-r-0 border-gray-200 rounded-l-md cursor-pointer hover:bg-gray-200`}
            >
                Prev
            </div>
            {
                arr.map((num, i) => (

                    <div
                        key={i}
                        onClick={() => handleIndexChange(num)}
                        className={`px-4 py-2 border-2 border-r-0 border-gray-200 ${num === index && "bg-gray-200"} cursor-pointer hover:bg-gray-200`}
                    >
                        {num + 1}
                    </div>
                ))
            }
            <div
                onClick={() => handleIndexChange(index + 1)}
                className={`px-4 py-2 border-2 border-gray-200 rounded-r-md cursor-pointer hover:bg-gray-200`}
            >
                Next
            </div>
        </nav>
    );
};