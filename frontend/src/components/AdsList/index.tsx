import { useEffect, useState, useRef, Fragment } from "react";
import Slider from "react-slick";
import { Advertise } from "../../interfaces/Advertise";
import AdDetails from "./AdDetails";

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
    // eslint-disable-next-line
  }, [current]);

  useEffect(() => {
    const { slickGoTo = () => {} } = slider?.current;
    slickGoTo(0);
    handleChange(0);
    // eslint-disable-next-line
  }, [ads]);

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
            minAmount,
            maxAmount,
            typeOperation,
            paymentChannels,
            publicView
          }) => (
            <Fragment key={id}>
              <AdDetails
                id={id}
                name={name}
                tradeCount={tradeCount}
                score={score}
                price={price}
                symbol={symbol}
                minAmount={minAmount}
                maxAmount={maxAmount}
                typeOperation={typeOperation}
                publicView={publicView}
                paymentChannels={paymentChannels}
              />
            </Fragment>
          )
        )}
      </Slider>
    </>
  );
};

export default AdsList;
