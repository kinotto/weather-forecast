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



const Home: React.FC = () => {

  const { data, isLoading, isError } = useQuery<AlertResponse>({
    queryKey: [],
    queryFn: getForecastApi,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false
  })
  const [filteredAlertFeatures, setFilteredAlertFeatures] = useState<Array<AlertFeature>>([]);
  const [selectedAlert, setSelectedAlert] = React.useState<AlertFeature | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.default);

  useEffect(() => setFilteredAlertFeatures(data?.features || []), [data])

  if (isError) {
    // show error
  }

  if (isLoading) {
    return <Loader />
  }


  return (

    <div>
      <Header
        sortBy={selectedFilter}
        onSortChange={newFilter => {
          setSelectedFilter(newFilter);
          setFilteredAlertFeatures(applyAllFilters(data?.features || [], fromDate, toDate, newFilter, searchQuery));
        }}
        searchQuery={searchQuery}
        onSearchChange={query => {
          setSearchQuery(query);
          setFilteredAlertFeatures(applyAllFilters(data?.features || [], fromDate, toDate, selectedFilter, query));
        }}
        fromDate={fromDate}
        toDate={toDate}
        onFromChange={(_fromDate) => {
          setFromDate(_fromDate);
          setFilteredAlertFeatures(applyAllFilters(data?.features || [], _fromDate, toDate, selectedFilter, searchQuery));
        }}
        onToChange={(_toDate) => {
          setToDate(_toDate);
          setFilteredAlertFeatures(applyAllFilters(data?.features || [], fromDate, _toDate, selectedFilter, searchQuery));
        }}
      />

      <AlertGrid
        alerts={filteredAlertFeatures}
        onSelectAlert={alert => setSelectedAlert(alert)}
      />

      {
        selectedAlert && (
          <AlertDetailsModal
            alert={selectedAlert}
            onClose={() => setSelectedAlert(null)}
          />
        )
      }
    </div>
  )

}

export default Home