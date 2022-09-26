import { createPortal } from "react-dom";

type IProps = {
  onBGBlurClick: () => void;
};

function BgBlur({ onBGBlurClick }: IProps) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    boxShadow: "inset 0 0 10px rgba(255, 255, 255, .2)",
    backdropFilter: "blur(10px)",
    zIndex: "5",
  };

  const el = document.getElementById("bg-blur")!;
  return createPortal(<div onClick={onBGBlurClick} style={style}></div>, el);
}

export default BgBlur;
