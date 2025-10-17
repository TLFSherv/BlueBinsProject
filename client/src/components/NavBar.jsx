const bookingSteps = ['Collection Address', 'Collection Quantity'
    , 'Collection Date', 'Review'];
const NavBar = ({ activeIndex }) => {
    return (
        <ul className="flex justify-center gap-[32px] mx-[32px] md:justify-start md:flex-col">
            {bookingSteps.map((bookingStep, index) =>
                index === activeIndex ?
                    <li key={index}
                        className='flex gap-[16px] items-center place-self-center md:place-self-auto text-2xl font-[Lato]'>
                        <img className="h-[24px]" alt="bullet point" src="/src/assets/images/bullet-points/bullet-point.png" />
                        <p>{bookingStep}</p>
                    </li> :
                    <li key={index}
                        className='hidden md:flex gap-[16px] items-center text-base font-[Lato] text-[rgba(15,43,87,0.2)]'>
                        <img className="h-[16px]" alt="bullet point" src="/src/assets/images/bullet-points/bullet-point-inactive.png" />
                        <p>{bookingStep}</p>
                    </li>
            )}
        </ul>
    )
}


export default NavBar