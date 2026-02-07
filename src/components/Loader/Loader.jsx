import { Oval } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader({ overlay = false }) {
  const Wrap = overlay ? "div" : "div";

  return (
    <Wrap className={overlay ? css.overlay : css.inline}>
      <Oval
        height={48}
        width={48}
        color="var(--color-primary)"
        secondaryColor="rgba(228, 72, 72, 0.35)"
        strokeWidth={4}
        visible
        ariaLabel="loading"
      />
    </Wrap>
  );
}
