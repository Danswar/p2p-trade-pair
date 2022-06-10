import { Link } from "@mui/material";
import Slider from "react-slick";
import { Advertise } from "../../interfaces/Advertise";

interface AdsListProps {
  ads: Advertise[];
}

const AdsList = ({ ads }: AdsListProps) => {
  return (
    <Slider>
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
  );
};

export default AdsList;
