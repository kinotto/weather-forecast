import React, { useCallback } from 'react'
import './AlertGrid.scss'
import { AlertFeature } from '@/app/model/alert'
import { formatDateLocal } from '@/app/utils/utility'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'
import { isMobile } from 'react-device-detect';

interface IAlertGrid {
  alerts: Array<AlertFeature>,
  onSelectAlert: (el: AlertFeature) => void
}

const ROW_HEIGHT = 100 // fixed row height in px (adjust if needed)
const MAX_LENGTH_TEXT_AREA = isMobile ? 10 : 100;

const AlertGrid: React.FC<IAlertGrid> = ({ alerts, onSelectAlert }) => {

  // Row renderer for react-window, memoized for perf
  const Row = useCallback(({ index, style }: ListChildComponentProps) => {
    const el = alerts[index]

    return (
      <div
        key={el.id}
        className="alert-grid__row"
        style={style} // IMPORTANT for react-window positioning
        onClick={() => onSelectAlert(el)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onSelectAlert(el)
          }
        }}
        role="row"
        aria-label={`View details for ${el.properties.event}`}
      >
        <div role="gridcell">{el.properties.event}</div>
        <div role="gridcell">
          <div
            className={`alert-grid-severity alert-grid-severity-${el.properties.severity.toLowerCase()}`}
          >
            {el.properties.severity}
          </div>
        </div>
        <div role="gridcell">
          {el.properties.areaDesc.length > MAX_LENGTH_TEXT_AREA
            ? el.properties.areaDesc.slice(0, MAX_LENGTH_TEXT_AREA) + '...'
            : el.properties.areaDesc}
        </div>
        <div role="gridcell">{formatDateLocal(el.properties.effective)}</div>
        <div role="gridcell">{formatDateLocal(el.properties.expires)}</div>
        <div role="gridcell">
          {(el.properties?.headline?.length || 0) > MAX_LENGTH_TEXT_AREA
            ? (el.properties?.headline || '').slice(0, MAX_LENGTH_TEXT_AREA) + '...'
            : el.properties?.headline}
        </div>
      </div>
    )
  }, [alerts, onSelectAlert])

  return (
    <div className="alert-grid" role="grid" aria-rowcount={alerts.length + 1}>
      <div className="alert-grid__table">
        <div className="alert-grid__header" role="row">
          <div role="columnheader">Event</div>
          <div role="columnheader">Severity</div>
          <div role="columnheader">Area</div>
          <div role="columnheader">Effective</div>
          <div role="columnheader">Expires</div>
          <div role="columnheader">Headline</div>
        </div>
        <div className="alert-grid__body">
          <List
            height={Math.min(window.innerHeight, ROW_HEIGHT * alerts.length)} // max height or smaller if few items
            itemCount={alerts.length}
            itemSize={ROW_HEIGHT}
            width="100%"
            overscanCount={5} // render some extra rows for smooth scrolling
          >
            {Row}
          </List>
        </div>
      </div>
    </div>
  )
}

export default AlertGrid
