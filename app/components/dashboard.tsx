import React, { useEffect, useState } from "react"
import Data from "./data"
import Graph from "./graph"
import Banner from "./banner"
import AddGraph from "./add-graph";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Dashboard() {

    const csvData = useSelector((state: RootState) => state.csv.data);

    const [graphArr, setGraphArr] = useState<number[]>([0]);

    const handleAddGraph = () => {
        setGraphArr(prev => [...prev, prev[prev.length - 1] + 1])
    };

    useEffect(() => {
        setGraphArr([0]);
    }, [csvData]);

    return (
        <div className="p-4">
            <Banner />
            <div className="w-full grid grid-cols-2 gap-x-2 gap-y-2 my-4">
                <Data />
                {graphArr.map((num, i) => (
                    <Graph key={i} />
                ))}
                <AddGraph handleAddGraph={handleAddGraph} />
            </div>
        </div>
    );
};
