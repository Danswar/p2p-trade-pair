import { useEffect, useState } from "react";

import { Link } from "@mui/material";
import Slider from "react-slick";
import { Advertise } from "../../interfaces/Advertise";

interface AdsListProps {
  ads: Advertise[];
  onChange: (current: number) => void;
}

const AdsList = ({ ads, onChange }: AdsListProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    onChange(current);
  }, [current]);

  return (
    <>
      <Slider initialSlide={0} infinite={false} afterChange={setCurrent}>
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
                <Link href={publicView} target="blank">
                  Go to this ad
                </Link>
              </div>
            </div>
          )
        )}
      </Slider>
      <p>
        {current}/{ads.length}
      </p>
    </>
  );
};

export default AdsList;
