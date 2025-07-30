import React, { useState } from 'react';
import './Header.scss';
import DatePicker from 'react-datepicker';
import Icon from '@/app/utils/Icon';

const sortOptions = [
  { value: 'severity', label: 'Sort by Severity' },
  { value: 'date', label: 'Sort by Date' },
  { value: 'location', label: 'Sort by Location' },
];

interface IHeader {
  sortBy: string,
  onSortChange: (value: string) => void,
  searchQuery: string,
  onSearchChange: (value: string) => void,
  fromDate?: Date,
  toDate?: Date,
  onFromChange: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void
  onToChange: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void
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
                dateFormat="yyyy-MM-dd"
                maxDate={toDate || new Date()}
              />
              <DatePicker
                selected={toDate}
                onChange={onToChange}
                placeholderText="To"
                className="header__date-picker"
                dateFormat="yyyy-MM-dd"
                minDate={fromDate}
                maxDate={new Date()}
              />
            </div>
            <select
              className="header__select"
              value={sortBy}
              onChange={e => onSortChange(e.target.value)}
              aria-label="Sort alerts"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <input
              type="search"
              className="header__search"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              aria-label="Search alerts"
            />
          </div>
        </div>
    </header>
  );
}

export default Header