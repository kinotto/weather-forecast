import React from 'react'
import './AlertGrid.scss'
import { useQuery } from '@tanstack/react-query'
import { getForecastApi } from '@/app/api/api'
import { AlertFeature, AlertResponse } from '@/app/model/alert'
import Loader from '../loader/Loader'
import AlertDetailsModal from '../alert-details-modal/AlertDetailsModal'
import Header from '../header/Header'
import { formatDateLocal } from '@/app/utils/utility'


const AlertGrid: React.FC = () => {


  const { data, isLoading, isError} = useQuery<AlertResponse>({
    queryKey: [],
    queryFn: getForecastApi,
    refetchInterval: 20000 // simulate a websocket type of app with real time updates
  })
  const [selectedAlert, setSelectedAlert] = React.useState<AlertFeature | null>(null);



  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="alert-grid">
      <Header
        sortBy="severity"
        onSortChange={() => {}}
        searchQuery={"whatever"}
        onSearchChange={() => {}}
        onFromChange={() => {}}
        onToChange={() => {}}
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
          {data?.features.map((el: AlertFeature) => (
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
              <td>{el.properties.areaDesc}</td>
              <td>{formatDateLocal(el.properties.effective)}</td>
              <td>{formatDateLocal(el.properties.expires)}</td>
              <td>{el.properties.headline}</td>
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