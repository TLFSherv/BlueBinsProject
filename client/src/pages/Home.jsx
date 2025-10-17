import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
    localStorage.removeItem('bookingId');
    const headerNav = [{ link: "/contact", page: "Contact us" },
    { link: "/booking/access", page: "Manage booking" }]
    return (
        <>
            <Header headerNav={headerNav} />
            <main className='flex-1 flex flex-col justify-evenly'>
                <div>
                    <h1 className="font-[Cal_Sans] text-[#3C4CFA] text-center sm:tracking-wider text-[56px] mx-auto md:text-[68px] lg:text-[78px]">
                        Home Recycling Collection
                    </h1>
                </div>
                <h2 className="text-[#468CF7] text-center tracking-wide font-[Lato] font-light mx-[24px] text-2xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Supporting Bermuda’s environment by collecting your household recycling.
                </h2>
                <ButtonAndImages />
            </main>
        </>
    )
}

const ButtonAndImages = () => {
    return (
        <div className='md:flex'>
            <picture className='hidden md:block flex-1'>
                <source media="(min-width:1120px)" srcSet='/src/assets/images/bags/bag-lg-1.png' />
                <img className='mx-auto' src='/src/assets/images/bags/bag-md-1.png' alt='bag' />
            </picture>
            <div className='px-2 mx-auto max-w-lg sm:max-w-xl md:max-w-2xl mb-16 sm:mb-24 md:flex-2'>
                <Link to='/booking'>
                    <button type="button" className='w-full bg-linear-[88deg,#3511FB,#4AA5F6] text-2xl font-light h-[60px] sm:text-3xl md:h-[68px]'>Get Started</button>
                </Link>
            </div>
            <picture className='md:flex-1'>
                <source media="(min-width:1120px)" srcSet='/src/assets/images/bags/bag-lg-2.png' />
                <source media="(min-width:768px)" srcSet='/src/assets/images/bags/bag-md-2.png' />
                <source media="(min-width:576px)" srcSet='/src/assets/images/bags/bags-sm.png' />
                <img className='mx-auto' src='/src/assets/images/bags/bags-xsm.png' alt='bag' />
            </picture>
        </div>
    )
}


export default Home;