import React, { useEffect, useState } from 'react'
import './AlertGrid.scss'
import { useQuery } from '@tanstack/react-query'
import { getForecastApi } from '@/app/api/api'
import { AlertFeature, AlertResponse, Filter } from '@/app/model/alert'
import Loader from '../loader/Loader'
import AlertDetailsModal from '../alert-details-modal/AlertDetailsModal'
import Header from '../header/Header'
import { applyAllFilters, formatDateLocal } from '@/app/utils/utility'


const AlertGrid: React.FC = () => {


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
    <div className="alert-grid">
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
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Severity</th>
            <th>Area</th>
            <th>Effective</th>
            <th>Expires</th>
            <th>Headline</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlertFeatures.map((el: AlertFeature) => (
            <tr
              key={el.id}
              onClick={() => setSelectedAlert(el)}
              style={{ cursor: 'pointer' }}
              aria-label={`View details for ${el.properties.event}`}
              tabIndex={0}  // for keyboard accessibility
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedAlert(el)
                }
              }}
            >
              <td>{el.properties.event}</td>
              <td>
                <div className={`alert-grid-severity alert-grid-severity-${el.properties.severity.toLocaleLowerCase()}`}>
                  {el.properties.severity}
                </div>
              </td>
              <td>{el.properties.areaDesc.length > 100
                ? el.properties.areaDesc.slice(0, 100) + '...'
                : el.properties.areaDesc}
              </td>
              <td>{formatDateLocal(el.properties.effective)}</td>
              <td>{formatDateLocal(el.properties.expires)}</td>
              <td>{(el.properties?.headline?.length || 0) > 100
                ? (el.properties?.headline || "").slice(0, 100) + '...'
                : el.properties?.headline}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default AlertGrid