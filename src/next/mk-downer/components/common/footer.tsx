const Footer = () => {
 return (
  <footer className="ft-wrap">
   <div className="ft_copy-wrap">
    <div className="inner">
     <div className="ft_copy-box">
      <p className="ft-copy">
       <small className="ft-copy_tx" lang="en">
        &copy;{' '}
        <i className="ft-copy_year" id="ft-copy-year">
         {new Date().getFullYear()}
        </i>{' '}
        N/NE, All rights reserved.
       </small>
      </p>
     </div>
    </div>
   </div>
  </footer>
 );
};

export default Footer;
