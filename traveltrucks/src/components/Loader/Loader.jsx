import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <Oval
      height={40}
      width={40}
      color="#111827"
      secondaryColor="#e5e7eb"
      strokeWidth={4}
      strokeWidthSecondary={4}
      ariaLabel="loading"
    />
  );
}
