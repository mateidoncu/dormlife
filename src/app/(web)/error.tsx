'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Something went wrong</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Data couldn&apos;t be fetched.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button 
                        onClick={() => reset()}
                        className="rounded-md bg-primary_dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary_dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_dark"
                    >
                        Try again
                    </button>
                </div>
            </div>
        </main>
    );
}
