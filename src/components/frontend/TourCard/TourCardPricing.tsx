interface TourCardPricingProps {
  price?: string;
  defaultText?: string;
}
const TourCardPricing: React.FC<TourCardPricingProps> = ({ price, defaultText }) => {
  return (
    <div className="price lg:flex lg:items-center">
      {price ? <p className="text-red-600 text-md font-semibold">{price}</p> : <p className="text-xs">{defaultText}</p>}
    </div>
  );
};
export default TourCardPricing;
