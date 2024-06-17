'use client';

import { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

type Props = {
  maintenanceDate: Date | null;
  setMaintenanceDate: Dispatch<SetStateAction<Date | null>>;
  maintenanceReason: string;
  setMaintenanceReason: Dispatch<SetStateAction<string>>;
  submitHandler: (e: FormEvent) => Promise<void>;
};

const CreateMaintenanceRequest: FC<Props> = props => {
  const { maintenanceDate, setMaintenanceDate, maintenanceReason, setMaintenanceReason, submitHandler } = props;

  const disablePastDates = (date: Date): boolean => {
    return date.getTime() < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="space-y-6">
        <div className="pb-6">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                Pick a date and time
              </label>
              <DateTimePicker
                onChange={setMaintenanceDate}
                value={maintenanceDate}
                minDate={new Date()}
                disableCalendar={false}
                disableClock={false}
                format="dd-MM-y HH:mm"
                className="mt-4"
              />
              <label className="block text-sm font-medium leading-6 text-gray-900 mt-10">
                Reason for maintenance request
              </label>
              <div className="mt-2 sm:max-w-md">
                <textarea
                  id="reason"
                  name="reason"
                  rows={5}
                  value={maintenanceReason}
                  onChange={e => setMaintenanceReason(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary_dark sm:text-sm sm:leading-6"
                  defaultValue={''}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-start gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-primary_dark px-5 py-2.5 text-bg font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_dark"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateMaintenanceRequest;
