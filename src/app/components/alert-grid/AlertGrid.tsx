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
      <div className="alert-grid__table">
        <div className="alert-grid__header">
          <div>Event</div>
          <div>Severity</div>
          <div>Area</div>
          <div>Effective</div>
          <div>Expires</div>
          <div>Headline</div>
        </div>
        <div className="alert-grid__body">
          {alerts.map((el: AlertFeature) => (
            <div
              key={el.id}
              className="alert-grid__row"
              onClick={() => onSelectAlert(el)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectAlert(el);
                }
              }}
            >
              <div>{el.properties.event}</div>
              <div>
                <div
                  className={`alert-grid-severity alert-grid-severity-${el.properties.severity.toLowerCase()}`}
                >
                  {el.properties.severity}
                </div>
              </div>
              <div>
                {el.properties.areaDesc.length > 100
                  ? el.properties.areaDesc.slice(0, 100) + '...'
                  : el.properties.areaDesc}
              </div>
              <div>{formatDateLocal(el.properties.effective)}</div>
              <div>{formatDateLocal(el.properties.expires)}</div>
              <div>
                {(el.properties?.headline?.length || 0) > 100
                  ? (el.properties?.headline || '').slice(0, 100) + '...'
                  : el.properties?.headline}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default AlertGrid