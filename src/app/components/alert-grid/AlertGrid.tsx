import React from 'react'
import './AlertGrid.scss'
import { AlertFeature } from '@/app/model/alert'
import { formatDateLocal } from '@/app/utils/utility'

interface IAlertGrid {
  alerts: Array<AlertFeature>,
  onSelectAlert: (el: AlertFeature) => void
}

const AlertGrid: React.FC<IAlertGrid> = ({ alerts, onSelectAlert }) => {
  return (
    <div className="alert-grid">
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
          {alerts.map((el: AlertFeature) => (
            <tr
              key={el.id}
              onClick={() => onSelectAlert(el)}
              style={{ cursor: 'pointer' }}
              aria-label={`View details for ${el.properties.event}`}
              tabIndex={0}  // for keyboard accessibility
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectAlert(el)
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
    </div>
  )
}

export default AlertGrid