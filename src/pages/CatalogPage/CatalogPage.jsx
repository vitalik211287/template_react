import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../components/Filters/Filters";
import CamperList from "../../components/CamperList/CamperList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import Loader from "../../components/Loader/Loader";
import css from "./CatalogPage.module.css";

import { fetchCampers } from "../../redux/campers/campersOps";
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

  const filters = useSelector((s) => s.filters);
  const page = useSelector((s) => s.campers.page);

  useEffect(() => {
    dispatch(fetchCampers({ filters, page: 1, limit: 4 }));
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
            onClick={() =>
              dispatch(fetchCampers({ filters, page: page + 1, limit: 4 }))
            }
            disabled={loading}
          />
        )}
      </div>
    </div>
  );
}
