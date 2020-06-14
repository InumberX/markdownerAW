import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Scroll from 'react-scroll';

let scroll = Scroll.animateScroll;

function scrollToTop(e) {
 e.preventDefault();
 scroll.scrollToTop({
  duration: 300,
 });
 return false;
}

const Header = () => {
 const router = useRouter();
 const pathName = router.pathname;

 return (
  <header className="hd-wrap">
   <div className="hd">
    <div className="hd_logo-box">
     <div className="inner">
      <div className="hd-logo">
       <Link href="/">
        <a className="hd-logo_link">
         <img
          src={`${process.env.siteRootDir}/img/img_logo.svg`}
          className="hd-logo_img"
          alt={`${process.env.siteRootDir}`}
          width="160px"
          height="40px"
         />
        </a>
       </Link>
      </div>
     </div>
    </div>
    <div className="hd_menu-box">
     <div className="hd-menu">
      <ul className="hd-menu_items">
       <li className="hd-menu_item">
        <Link href="/">
         <a
          className={
           pathName === '/' || pathName === `${process.env.siteRootDir}/`
            ? 'hd-menu_link is-current'
            : 'hd-menu_link'
          }
         >
          <i className="icon is-list hd-menu_icon"></i>
          <span className="hd-menu_tx">一覧</span>
         </a>
        </Link>
       </li>
       <li className="hd-menu_item">
        <Link href="/create/">
         <a
          className={
           pathName === '/create' ||
           pathName === `${process.env.siteRootDir}/create/`
            ? 'hd-menu_link is-current'
            : 'hd-menu_link'
          }
         >
          <i className="styl-icon is-plus hd-menu_icon"></i>
          <span className="hd-menu_tx">作成</span>
         </a>
        </Link>
       </li>
      </ul>
      <div className="hd_page-top-box">
       <a href="#" className="hd_page-top-link" onClick={scrollToTop}>
        <i className="styl-icon is-arrow is-up"></i>
       </a>
      </div>
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
