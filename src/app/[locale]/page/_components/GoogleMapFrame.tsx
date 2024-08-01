import classNames from "classnames";
export interface GoogleMapFrameProps {
  lat?: number;
  lang?: number;
  className?: string;
}
const GoogleMapFrame: React.FC<GoogleMapFrameProps> = ({ className = "", lat, lang }) => {
  return (
    <div
      className={classNames("google-map-container relative w-full pt-[55%] lg:pt-[35%]", {
        [className]: className,
      })}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d774.8203356930776!2d106.68208638775423!3d10.791111408639747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529c90ca930c5%3A0x78e7a2d3d9c929db!2zQ8O0bmcgVHkgRHUgTOG7i2NoIEFuIFRow6Fp!5e0!3m2!1svi!2s!4v1722498477527!5m2!1svi!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute left-0 right-0 top-0 bottom-0"
      ></iframe>
    </div>
  );
};
export default GoogleMapFrame;
