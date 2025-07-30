import React, { useEffect } from 'react';
import { AlertFeature } from '@/app/model/alert';
import "./AlertDetailsModal.scss";
import { formatDateLocal } from '@/app/utils/utility';

interface IAlertDetailsModal {
  alert: AlertFeature
  onClose: () => void
}

const AlertDetailsModal: React.FC<IAlertDetailsModal> = ({ alert, onClose }) => {

  useEffect(() => {

    // close modal on Esc
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="modal__overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal__content"
        onClick={e => e.stopPropagation()} // prevent close on clicking inside modal
        tabIndex={-1}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close modal">&times;</button>
        <h2>{alert.properties.event}</h2>
        <p><strong>Severity:</strong> {alert.properties.severity}</p>
        <p><strong>Effective:</strong> {formatDateLocal(alert.properties.effective)}</p>
        <p><strong>Expires:</strong> {formatDateLocal(alert.properties.expires)}</p>
        <p><strong>Area:</strong> {alert.properties.areaDesc}</p>
        <p><strong>Headline:</strong> {alert.properties.headline}</p>
        <p><strong>Description:</strong> {alert.properties.description}</p>
        <p><strong>Instruction:</strong> {alert.properties.instruction || 'None'}</p>
      </div>
    </div>
  );
}

export default AlertDetailsModal