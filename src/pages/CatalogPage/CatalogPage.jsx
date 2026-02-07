import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../components/Filters/Filters";
import CamperList from "../../components/CamperList/CamperList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import Loader from "../../components/Loader/Loader";
import css from "./CatalogPage.module.css";


import { fetchCampers } from "../../redux/campers/campersOps";
import { loadMore } from "../../redux/campers/campersSlice";
import {
  selectCampersLoading,
  selectCampersError,
  selectVisibleCampers,
  selectHasMore,

} from "../../redux/campers/campersSelectors";

export default function CatalogPage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectCampersLoading);
  const error = useSelector(selectCampersError);
  const campers = useSelector(selectVisibleCampers);
  const hasMore = useSelector(selectHasMore);


  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);


  return (
    <div className={css.grid}>
      <Filters />

      <div className={css.content}>
        {loading && <Loader overlay />}
        {error && <p className={css.error}>Error: {error}</p>}

        <CamperList campers={campers} />

        {hasMore && (
          <LoadMoreButton
            onClick={() => dispatch(loadMore())}
            disabled={loading}
          />
        )}
      </div>
    </div>
  );
}
