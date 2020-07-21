import Adsense from './adsense';

const AdsenseList = () => {
 const AdsenseListItem = () => {
  let result = null;
  let items = [];
  const adsInfo = [
   {
    slot: '7889882209',
   },
   {
    slot: '6465119893',
   },
   {
    slot: '4704589318',
   },
  ];

  for (let i = 0, iLength = adsInfo.length; i < iLength; i = (i + 1) | 0) {
   const thisData = adsInfo[i];
   items.push(
    <li className="ads-list_item" key={thisData.slot}>
     <Adsense data={thisData} />
    </li>
   );
  }

  result = <ul className="ads-list_items">{items}</ul>;

  return result;
 };

 return (
  <div className="ads-list-box">
   <AdsenseListItem />
  </div>
 );
};

export default AdsenseList;
