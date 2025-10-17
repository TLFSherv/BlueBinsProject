
const DateWheel = ({ inputHandler }) => {
    const date = new Date();
    const dateOptions = Array(6);
    // Options for formatting
    const dispOpts = { weekday: 'short', month: 'short', day: 'numeric' };
    const storeOpts = { month: 'numeric', day: 'numeric', year: 'numeric' };
    // fill array with day options starting from tomorrow
    for (let i = 0; i < dateOptions.length; i++) {
        date.setDate((date.getDate() + 1));
        dateOptions[i] = {
            displayDate: date.toLocaleDateString('en-US', dispOpts),
            storeDate: date.toLocaleDateString('en-US', storeOpts)
        };
    }

    return (
        <div className="grid place-content-center my-2">
            <div className="grid place-content-center bg-linear-[#69B9FF,#A83CFA,#4554FD] rounded-full size-52">
                <div className="donut size-50">
                    {dateOptions.map((date, index) => {
                        return <DateItem key={index} props={{ classValue: `date${index + 1}`, date, inputHandler }} />
                    })}
                    <div className="donut-hole row-start-2 col-start-2 row-span-2 col-span-2 size-20">
                        <div className="grid place-self-center bg-[#F3F6FB] rounded-full size-18" />
                    </div>
                </div>
            </div>
        </div>
    )
}

const DateItem = ({ props }) => {
    const { classValue, date, inputHandler } = props
    const displayDate = date.displayDate.split(",");
    const clickHandler = () => {
        inputHandler('date', date.storeDate)
        inputHandler('displayDate', date.displayDate)
    }
    return (
        <div data-name="date"
            className={`${classValue} cursor-pointer hover:font-bold`}
            onClick={clickHandler}>
            <p className="text-sm">{displayDate[0]}</p>
            <p className="text-xs">{displayDate[1]}</p>
        </div>
    )
}
export default DateWheel