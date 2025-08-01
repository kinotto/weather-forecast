import React from 'react';
import '../../styles/datepicker.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './Header.scss';
import DatePicker from 'react-datepicker';
import Icon from '@/app/components/icon/Icon';

import InputReactDatePicker from '@/app/components/input-react-date-picker/InputReactDatePicker';
import { Filter } from '@/app/model/alert';

const sortOptions = [
  { value: Filter.event, label: 'Sort by Event' },
  { value: Filter.severity, label: 'Sort by Severity' },
  { value: Filter.area, label: 'Sort by Area' },
  { value: Filter.effectiveDate, label: 'Sort by Effective date' },
  { value: Filter.expiryDate, label: 'Sort by Expiry date' },
  { value: Filter.headline, label: 'Sort by Headline' },
];

interface IHeader {
  sortBy: Filter,
  onSortChange: (value: Filter) => void,
  searchQuery: string,
  onSearchChange: (value: string) => void,
  fromDate: Date | null,
  toDate: Date | null,
  onFromChange: (date: Date | null, event: React.SyntheticEvent | undefined) => void
  onToChange: (date: Date | null, event: React.SyntheticEvent | undefined) => void
}

const Header: React.FC<IHeader> = ({
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  fromDate,
  toDate,
  onFromChange,
  onToChange
}) => {


  return (
    <header className="header">
      <div className="header__container">
        <div className="header__icon" aria-label="Weather icon" role="img" title="Weather">
          <Icon />
        </div>
        <h1 className="header__title">Weather Forecast</h1>

        <div className="header__controls">
            {/* ...select and search */}
            <div className="header__date-picker__container">
              <DatePicker
                selected={fromDate}
                onChange={onFromChange}
                placeholderText="From"
                className="header__date-picker"
                customInput={<InputReactDatePicker value={fromDate?.toLocaleString() || ""} placeholder='From' />}
                maxDate={toDate || new Date()}
              />
              <DatePicker
                selected={toDate}
                onChange={onToChange}
                placeholderText="To"
                className="header__date-picker"
                customInput={<InputReactDatePicker value={toDate?.toDateString() || ""} placeholder="to" />}
                minDate={fromDate || undefined}
                maxDate={new Date()}
              />
            </div>
            <select
              className="header__select"
              value={sortBy}
              onChange={e => onSortChange(e.target.value as Filter)}
              aria-label="Sort alerts"
            >
              <option value="" >Select a filter</option>
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              type="search"
              className="header__search"
              placeholder="Search alert by event, area or headline..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              aria-label="Search alert by event, area or headline.."
            />
          </div>
        </div>
    </header>
  );
}

export default Header