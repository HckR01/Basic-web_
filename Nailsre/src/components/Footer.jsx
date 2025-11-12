import React from "react";

function Footer() {
  const informationLinks = [
    { name: "Faqs", href: "#" },
    { name: "Shipping Policy", href: "#" },
    { name: "Returns, Exchange and Refund Policy", href: "#" },
    { name: "Terms and Conditions", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Blogs", href: "#" },
  ];

  const menuLinks = [
    { name: "Shop", href: "#" },
    { name: "New In", href: "#" },
    { name: "Soft Gel", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Reviews", href: "#" },
  ];

  return (
    <footer className="bg-pink-50 text-gray-800 pt-16 pb-8 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand Name */}
          <div className="md:col-span-2 lg:col-span-1">
            {/* This is where you would put your logo component or image.
              For now, we'll use text styled to be similar.
            */}
            <h2
              className="text-4xl font-bold font-serif mb-2 dark:text-pink-400"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nailsre
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              KITS THAT CARE
            </p>
          </div>

          {/* Column 2: Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">
              Menu
            </h3>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">
              Information
            </h3>
            <ul className="space-y-3">
              {informationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">
              Our Newsletter
            </h3>
            <p className="text-gray-600 mb-4 dark:text-gray-400">
              Subscribe with us to receive all the good stuff.
            </p>
            <form>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-3 mb-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-pink-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <p className="mb-4 md:mb-0">© 2025 Nailsree. Powered by Shopify</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {/* The image shows a subset of links here, so we'll match that */}
            {[
              "Faqs",
              "Shipping Policy",
              "Returns, Exchange and Refund Policy",
              "Terms and Conditions",
              "Contact Us",
              "About Us",
              "Blogs",
            ].map((name) => {
              const link = informationLinks.find((l) => l.name === name);
              return link ? (
                <a
                  key={name}
                  href={link.href}
                  className="hover:text-gray-800 dark:hover:text-gray-100"
                >
                  {link.name}
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
