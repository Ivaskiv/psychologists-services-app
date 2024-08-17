import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPsychologists } from '../../redux/psychologitsts/psychologistsOperation.js';
import PsychologistCard from '../../components/PsychologistsCard/PsychologistsCard.jsx';
import SortFilter from '../../components/SortFilter/SortFilter.jsx';
import css from './style.module.css';
import {
  selectSortedPsychologists,
  selectPsychologistsStatus,
  selectSortType,
  selectFilter,
  selectItemsPerPage,
} from '../../redux/psychologitsts/psychologistsSelector.js';
import {
  setItemsPerPage,
  setSortType,
  setFilter,
} from '../../redux/psychologitsts/psychologistsSlice.js';

const Psychologists = () => {
  const dispatch = useDispatch();
  const allPsychologists = useSelector(selectSortedPsychologists);
  const status = useSelector(selectPsychologistsStatus);
  const sortType = useSelector(selectSortType);
  const filter = useSelector(selectFilter);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const [visible, setVisible] = useState(itemsPerPage);
  const [filteredPsychologists, setFilteredPsychologists] = useState(allPsychologists);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllPsychologists());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setFilteredPsychologists(
      allPsychologists.filter(psychologist =>
        psychologist.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [allPsychologists, filter]);

  useEffect(() => {
    if (sortType === 'Show all') {
      setVisible(filteredPsychologists.length);
    }
  }, [filteredPsychologists, sortType, itemsPerPage]);

  const loadMore = () => {
    setVisible(prevVisible => Math.min(prevVisible + itemsPerPage, filteredPsychologists.length));
  };

  const handleSortChange = e => {
    dispatch(setSortType(e.target.value));
  };

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  const handleItemsPerPageChange = e => {
    dispatch(setItemsPerPage(Number(e.target.value)));
  };

  return (
    <>
      <div className={css.psychologists_list_page}>
        <SortFilter
          sortType={sortType}
          filter={filter}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <div className={css.psychologists_list}>
          {filteredPsychologists.slice(0, visible).map(psychologist => (
            <PsychologistCard key={psychologist.id} psychologist={psychologist} />
          ))}
        </div>
      </div>
      {visible < filteredPsychologists.length && (
        <div className={css.pagination}>
          <button type="button" onClick={loadMore} className={css.load_more_button}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default Psychologists;
