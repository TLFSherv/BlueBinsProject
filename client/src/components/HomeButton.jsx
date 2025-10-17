import { Link } from 'react-router-dom';

const HomeButton = () => {
    return (
        <div className='w-full px-[32px] tracking-wider'>
            <div className='flex justify-center items-center rounded-2xl bg-linear-[#3511FB,#4AA5F6] w-full h-[56px] shadow-xl'>
                <div className='flex items-center w-full m-[4px] bg-white rounded-xl font-[Lato] text-lg'>
                    <div className='w-[40%] text-[#3C4CFA]'>
                        Manage
                    </div>
                    <div className='w-[60%] py-[10px] rounded-l-xl bg-linear-[#3511FB,#4AA5F6] text-[white]'>
                        <Link to='/booking'>
                            Start
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeButton