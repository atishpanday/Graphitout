import { Dispatch, SetStateAction } from "react"

interface PagianationProps {
    index: number,
    totalPages: number,
    setIndex: Dispatch<SetStateAction<number>>,
};

export default function Pagination({ index, totalPages, setIndex }: PagianationProps) {
    const arr = new Array(totalPages);
    console.log(arr);

    return (
        <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm">
            {
                arr.map((_, i) => (

                    <a
                        onClick={() => setIndex(i)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${i === index ? "bg-gray-300" : "bg-white"}`}
                    >
                        {i + 1}
                    </a>
                ))
            }
        </nav>
    )
}