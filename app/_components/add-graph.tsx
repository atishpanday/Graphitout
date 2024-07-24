import Viewer from "./viewer";
import { BiPlusCircle } from "react-icons/bi";

interface AddGraphProps {
    handleAddGraph: () => void,
};

export default function AddGraph({ handleAddGraph }: AddGraphProps) {
    return (
        <Viewer>
            <div className=" h-full flex justify-center items-center cursor-pointer" onClick={handleAddGraph}>
                <BiPlusCircle size={150} fill="lightgray" />
            </div>
        </Viewer>
    );
};