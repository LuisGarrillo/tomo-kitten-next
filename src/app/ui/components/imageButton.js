import Image from "next/image";

export default function ImageButton({source, width, height, listener, data}) {
    function execute() {
        listener(data);
    }

    return (
         <Image
            className="image-button"
            src={source}
            width={width}
            height={height}
            onClick={execute}
            alt="image button"
         />
    );
}