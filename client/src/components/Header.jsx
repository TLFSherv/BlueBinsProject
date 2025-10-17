
import logoXSM from '../assets/images/logos/logo-xsm.png';
import logoSM from '../assets/images/logos/logo-sm.png';
import logoMD from '../assets/images/logos/logo-md.png';
// import logoLG from '../assets/images/logos/logo-lg.png'; // if needed

const Header = (props) => {
    const [page1, page2] = props.headerNav;
    return (
        <header>
            <div className="flex justify-between p-3">
                <a href="/">
                    <picture>
                        {/* <source media="(min-width:1180px)" srcSet={logoLG} /> */}
                        <source media="(min-width:1024px)" srcSet={logoMD} />
                        <source media="(min-width:556px)" srcSet={logoSM} />
                        <img src={logoXSM} alt="logo" />
                    </picture>
                </a>
                <div className="grid grid-rows-[24px_24px] sm:grid-cols-2">
                    <a className="font-[Lato] text-xs sm:text-sm md:text-base hover:underline decoration-sky-600" href={page1.link}>{page1.page}</a>
                    <a className="font-[Lato] text-xs sm:text-sm md:text-base hover:underline decoration-sky-600 " href={page2.link}>{page2.page}</a>
                </div>
            </div>
        </header>
    )
}

export default Header
