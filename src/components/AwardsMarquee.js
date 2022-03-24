import React from "react"
import Marquee from "react-fast-marquee";

import awardMRS2017 from "../images/awards/mrs_finalist_2017.png"
import awardMRS2019 from "../images/awards/mrs_finalist_2019.png"
import awardMRS2021 from "../images/awards/mrs_winner_2021.png"
import awardQuirks2020 from "../images/awards/quirks_winner_2020.png"
import awardQuirks2021 from "../images/awards/quirks_winner_2021.png"
import awardAQR2021 from "../images/awards/aqr_shortlist_2021.png"
import awardAMap from "../images/awards/admap_2013.png"

const insertIntoArray = (arr, value) => {
  return arr.reduce((result, element, index, array) => {
    result.push(element);
    if (index < array.length - 1) {
      result.push(value);
    }
    return result;
  }, []);
};

function AwardsMarquee() {
  const awardSize = "h-24 max-w-20"
  let awardImgs = [
    <img src={awardQuirks2020} alt="Award finalist MRS 2017" className={awardSize} />,
    <img src={awardMRS2017} alt="Award finalist MRS 2017" className={awardSize} />,
    <img src={awardQuirks2021} alt="Award winning agency Q Awards 2020" className={awardSize} />,
    <img src={awardMRS2021} alt="Award finalist MRS 2017" className={awardSize} />,
    <img src={awardAQR2021} alt="Award winning agency Q Awards 2020" className={awardSize} />,
    <img src={awardMRS2021} alt="Award finalist MRS 2017" className={awardSize} />,
    <img src={awardAMap} alt="Award winning agency AMap 2013" className={awardSize} />,
    <img src={awardMRS2019} alt="Award finalist MRS 2019" className={awardSize} />];

  // Insert a filler dot between each image
  let spacerElement = <div className="rounded-full w-2 h-2 bg-white/50 mx-12" />;
  awardImgs = insertIntoArray(awardImgs, spacerElement);
  awardImgs.push(spacerElement);

  return (
    <>
      <div className="flex align-middle pb-2 items-center">
        {/*<div className="flex-1 h-[2px] bg-blue w-full" />*/}
        {/*<p className="flex-2 inline-block overflow-auto mx-4 text-white font-semibold">Award Winning Team</p>*/}
        {/*<div className="flex-1 h-[2px] bg-blue w-full" />*/}
      </div>
      <div className="h-20 bg-white flex space-x-12 items-center bg-transparent">
        <Marquee className="flex items-center" gradient={false} speed={20}>
          {awardImgs}
        </Marquee>
      </div>
    </>
  )

}

export default AwardsMarquee