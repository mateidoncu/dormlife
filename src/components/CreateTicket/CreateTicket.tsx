'use client';

import { Dispatch, FC, SetStateAction, useState } from 'react';

type Props = {
    ticketTitle: string;
    setTicketTitle: Dispatch<SetStateAction<string>>;
    ticketText: string;
    setTicketText: Dispatch<SetStateAction<string>>;
    submitHandler: () => Promise<string | undefined>;
};  

const CreateTicket: FC<Props> = props => {

    const {
        ticketTitle,
        setTicketTitle,
        ticketText,
        setTicketText,
        submitHandler,
    } = props;

    return (
        <form onSubmit={submitHandler}>
            <div className="space-y-6">
                <div className="pb-6">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary_dark sm:max-w-md">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        value={ticketTitle}
                                        onChange={e => setTicketTitle(e.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                                Message
                            </label>
                            <div className="mt-2 sm:max-w-md">
                                <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={ticketText}
                                onChange={e => setTicketText(e.target.value)}
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

export default CreateTicket;
