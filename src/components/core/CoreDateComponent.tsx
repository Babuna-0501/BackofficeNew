'use client';

import moment from 'moment';
import { FunctionComponent, useEffect, useState } from 'react';

interface CoreDateComponentProps {
  serverDate: Date | string;
  format?: string;
  className?: string;
}

const CoreDateComponent: FunctionComponent<CoreDateComponentProps> = ({ serverDate, format, className }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(moment(serverDate).format(format || 'HH:MM:ss, YYYY-MM-DD'));
  }, [serverDate, format]);

  return <div className={className}>{formattedDate || '--'}</div>;
};

export default CoreDateComponent;
