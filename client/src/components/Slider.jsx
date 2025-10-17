import React, { useState, useRef, useEffect } from "react";

const Slider = ({ inputHandler, quantity }) => {
    const sliderLabels = [
        { value: 1, position: 0 },
        { value: 2, position: 32 },
        { value: 3, position: 55 },
        { value: 4, position: 75 },
        { value: 5, position: 100 },
    ];
    const [isDragging, setIsDragging] = useState(false);
    const wrapperRef = useRef(null);
    const barRef = useRef(null);
    const knobRef = useRef(null);
    let cursorPosition;

    // set init slider width
    useEffect(() => {
        const sliderBar = barRef.current;
        const initLabel = sliderLabels.find((label) => label.value === quantity)
        if (sliderBar)
            sliderBar.style.width = (initLabel.position || 0) + "%";
    }, [])

    useEffect(() => {
        const sliderBar = barRef.current;
        const dragElem = (e) => {
            // make knob follow cursor
            sliderBar.style.width = sliderBar.offsetWidth + (e.clientX - cursorPosition) + "px";
            cursorPosition = e.clientX
        }

        const stopDrag = () => {
            if (!isDragging) return
            let prevDist = 100,
                presDist = 0,
                closestLbl;
            const wrapperWidth = wrapperRef.current.offsetWidth;
            const sliderPos = (sliderBar.offsetWidth / wrapperWidth) * 100;
            // find the closest label
            for (let i = 0; i < sliderLabels.length; ++i) {
                presDist = Math.abs(sliderPos - sliderLabels[i].position);
                if (presDist > prevDist) {
                    closestLbl = i - 1;
                    break
                }
                prevDist = presDist;
                closestLbl = i;
            }
            sliderBar.style.width = sliderLabels[closestLbl].position + "%";

            inputHandler('quantity', sliderLabels[closestLbl].value);
            inputHandler('sliderPosition', sliderLabels[closestLbl].position);
            setIsDragging(false);
        }

        if (isDragging) {
            // move element when mouse moves
            document.addEventListener("mousemove", dragElem);
            // stop dragging when mouse is up
            document.addEventListener("mouseup", stopDrag);
        }

        // stop moving knob
        return () => {
            document.removeEventListener("mousemove", dragElem)
            document.removeEventListener("mouseup", stopDrag)
        }
    }, [isDragging]);

    return (
        <div className="mb-12">
            <div className="flex flex-row justify-around pt-4 font-[Lato] text-lg">
                {sliderLabels.map((label, index) => {
                    return <div key={index} className="slider-scale">{label.value}</div>
                })}
            </div>
            <div ref={wrapperRef} className="flex items-center px-1 border-3 border-[#468CF7] h-12 my-1 rounded-full shadow-xl">
                <div ref={barRef} className="h-[80%] min-w-[40px] w-[15%] p-1 bg-linear-[#4AA5F6,#3511FB] rounded-full">
                    <div
                        ref={knobRef}
                        onMouseDown={(e) => {
                            // get cursor position at the start
                            cursorPosition = e.clientX;
                            setIsDragging(true);
                        }}
                        className="h-full w-7 border-1 border-white bg-[#F3F6FB] rounded-full ml-auto cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Slider