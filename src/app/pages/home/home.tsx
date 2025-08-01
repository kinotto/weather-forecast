'use client'
import React, { useEffect, useState } from 'react'
import './home.scss';
import { useQuery } from '@tanstack/react-query'
import { getForecastApi } from '@/app/api/api'
import { AlertFeature, AlertResponse, Filter } from '@/app/model/alert'
import { applyAllFilters } from '@/app/utils/utility'
import Loader from '@/app/components/loader/Loader'
import Header from '@/app/components/header/Header'
import AlertDetailsModal from '@/app/components/alert-details-modal/AlertDetailsModal'
import AlertGrid from '@/app/components/alert-grid/AlertGrid'
import { useRouter } from 'next/navigation';


const Home: React.FC = () => {
  const router = useRouter();

  // Initialize state with safe defaults (empty or null)
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.default);

  // Sync initial state with router query params using window.location.search
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search') || "";
    const fromParam = params.get('from');
    const toParam = params.get('to');
    const filterParam = params.get('filter') || Filter.default;

    setSearchQuery(searchParam);
    setFromDate(fromParam ? new Date(fromParam) : null);
    setToDate(toParam ? new Date(toParam) : null);
    setSelectedFilter(filterParam as Filter);
  }, []);

  // Rest of your code unchanged
  const { data, isLoading } = useQuery<AlertResponse>({
    queryKey: [],
    queryFn: getForecastApi,
    refetchInterval: 35000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const [filteredAlertFeatures, setFilteredAlertFeatures] = useState<Array<AlertFeature>>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertFeature | null>(null);

  useEffect(() => {
    const filtered = applyAllFilters(data?.features || [], fromDate, toDate, selectedFilter, searchQuery);
    setFilteredAlertFeatures(filtered);
  }, [data, fromDate, toDate, selectedFilter, searchQuery]);

  // Update URL query params when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set('search', searchQuery);
    if (fromDate) params.set('from', fromDate.toISOString());
    if (toDate) params.set('to', toDate.toISOString());
    if (selectedFilter !== Filter.default) {
      params.set('filter', selectedFilter);
    }

    const queryString = params.toString();
    const pathname = window.location.pathname;

    router.replace(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false }
    );
  }, [searchQuery, fromDate, toDate, selectedFilter, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Header
        sortBy={selectedFilter}
        onSortChange={newFilter => setSelectedFilter(newFilter)}
        searchQuery={searchQuery}
        onSearchChange={query => setSearchQuery(query)}
        fromDate={fromDate}
        toDate={toDate}
        onFromChange={_fromDate => setFromDate(_fromDate)}
        onToChange={_toDate => setToDate(_toDate)}
      />

      <AlertGrid alerts={filteredAlertFeatures} onSelectAlert={alert => setSelectedAlert(alert)} />

      {selectedAlert && <AlertDetailsModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}
    </div>
  );
};




export default Home