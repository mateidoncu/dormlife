const Footer = () => {
    return (
      <footer>
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:text-center justify-center sm:justify-between">
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 w-full justify-center">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="w-full border-gray-200 dark:border-gray-700" />
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex justify-center">
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">©2024 Matei Doncu. All Rights Reserved.</span>
        </div>
      </footer>
    )
  }
  
  export default Footer;
  