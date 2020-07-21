import React, { useState, useEffect } from 'react';

declare global {
 interface Window {
  adsbygoogle: Array<{}>;
 }
}

const Adsense = (props) => {
 const [slot, setSlot] = useState('');

 useEffect(() => {
  setSlot(props.data.slot);

  try {
   (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
   console.error(e);
  }
 }, []);

 return (
  <ins
   className="adsbygoogle"
   data-ad-client="ca-pub-6711167987812480"
   data-ad-slot={slot}
   data-full-width-responsive="false"
   style={{
    display: 'inline-block',
    width: '100%',
    maxWidth: '300px',
    height: '300px',
   }}
  />
 );
};

export default Adsense;
