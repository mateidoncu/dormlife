
const HeroSection = () => {
    return (
        <div className="relative isolate px-6 pt-2 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Introducing New Features and Improvements.{' '}
                        <a href="/about" className="font-semibold text-primary_dark">
                            <span className="absolute inset-0" aria-hidden="true" />
                            Read more <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Simplifying Dorm Living, Enhancing Student Life
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Designed to make your student life more comfortable and efficient. From room allocations to maintenance requests, we&apos;ve got everything covered.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/login"
                            className="rounded-md bg-primary_dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary_dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary_dark"
                        >
                            Get started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
