import { useEffect, useState, useRef } from "react";

import { Link } from "@mui/material";
import Slider from "react-slick";
import { Advertise } from "../../interfaces/Advertise";

interface AdsListProps {
  ads: Advertise[];
  onChange: (current: number) => void;
}

const AdsList = ({ ads, onChange }: AdsListProps) => {
  const [current, setCurrent] = useState(0);
  const slider: { current: any } = useRef(null);

  // eslint-disable-next-line
  const handleChange = (index: number) => {
    onChange(index);
    setCurrent(index);
  };

  useEffect(() => {
    onChange(current);
  }, [current, onChange]);

  useEffect(() => {
    const { slickGoTo = () => {} } = slider?.current;
    slickGoTo(0);
    handleChange(0);
  }, [ads, handleChange]);

  return (
    <>
      <Slider
        ref={slider}
        infinite={false}
        initialSlide={0}
        afterChange={handleChange}
      >
        {ads.map(
          ({
            id,
            advertiser: { name, tradeCount, score },
            pair: { symbol },
            price,
            typeOperation,
            publicView
          }) => (
            <div key={id}>
              <div style={{ margin: "5px", border: "solid black 1px" }}>
                <p>
                  {name} (<span>{tradeCount}</span> <span>{score}%</span>)
                </p>
                <p>
                  {price} {symbol}
                </p>
                <p>{typeOperation}</p>
                <p>
                  <Link href={publicView} target="blank">
                    Go to this ad
                  </Link>
                  <span>
                    {current}/{ads.length}
                  </span>
                </p>
              </div>
            </div>
          )
        )}
      </Slider>
    </>
  );
};

export default AdsList;
