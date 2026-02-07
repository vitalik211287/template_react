import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import CamperDetails from "../../components/CamperDetails/CamperDetails";

import { fetchCamperById } from "../../redux/campers/campersOps";
import { clearDetails } from "../../redux/campers/campersSlice";
import {
  selectDetails,
  selectDetailsLoading,
  selectDetailsError,
} from "../../redux/campers/campersSelectors";

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const camper = useSelector(selectDetails);
  const loading = useSelector(selectDetailsLoading);
  const error = useSelector(selectDetailsError);

  useEffect(() => {
    dispatch(fetchCamperById(id));
    return () => dispatch(clearDetails());
  }, [dispatch, id]);

  return (
    <div className={"container"}>
      {/* <Link to="/catalog">← Back to catalog</Link> */}

      {loading && <Loader />}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {camper && <CamperDetails camper={camper} />}
    </div>
  );
}
