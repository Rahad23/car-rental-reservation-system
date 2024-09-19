import React from "react";
import "./AboutUsStyle/AboutUsStyle.css";
interface GoogleMapEmbedProps {
  src: string;
  width?: string;
  height?: string;
}

const GoogleMapEmbaded: React.FC<GoogleMapEmbedProps> = ({
  src,
  width = "600",
  height = "450",
}) => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
      }}
      className="google-map"
    >
      <iframe
        src={src}
        width={width} // Set width to 100% to make it responsive
        height={height} // Height is controlled by aspect ratio
        // style={{ position: "absolute", top: 0, left: 0 }}
        className="border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
    </div>
  );
};

export default GoogleMapEmbaded;
