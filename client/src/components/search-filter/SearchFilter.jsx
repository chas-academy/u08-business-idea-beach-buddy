import React from 'react'
import './search-filter.scss';

const SearchFilter = () => {
  return (
    <section className="filter">
      <div className="arrow">
      <i class="fa-solid fa-chevron-up fa-xl"></i>
      </div>

        <div className="filter--margin w-full md:w-2/3 shadow p-5 rounded-lg">
            <div className="relative">
              <div className="absolute flex items-center ml-2 h-full">
              </div>
            </div>
          
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Havsbad</option>
                    <option value="for-rent">For Rent</option>
                    <option value="for-sale">For Sale</option>
                  </select>
          
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Strand</option>
                    <option value="fully-furnished">Fully Furnished</option>
                    <option value="partially-furnished">Partially Furnished</option>
                    <option value="not-furnished">Not Furnished</option>
                  </select>
          
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Klippor</option>
                    <option value="1000">RM 1000</option>
                    <option value="2000">RM 2000</option>
                    <option value="3000">RM 3000</option>
                    <option value="4000">RM 4000</option>
                  </select>
          
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Parkering</option>
                    <option value="200">200 sq.ft</option>
                    <option value="400">400 sq.ft</option>
                    <option value="600">600 sq.ft</option>
                    <option value="800 sq.ft">800</option>
                    <option value="1000 sq.ft">1000</option>
                    <option value="1200 sq.ft">1200</option>
                  </select>

                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Kiosk</option>
                    <option value="200">200 sq.ft</option>
                    <option value="400">400 sq.ft</option>
                    <option value="600">600 sq.ft</option>
                    <option value="800 sq.ft">800</option>
                    <option value="1000 sq.ft">1000</option>
                    <option value="1200 sq.ft">1200</option>
                  </select>
          
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Toalett</option>
                    <option value="1">1 bedroom</option>
                    <option value="2">2 bedrooms</option>
                    <option value="3">3 bedrooms</option>
                    <option value="4">4 bedrooms</option>
                    <option value="5">5 bedrooms</option>
                  </select>
          
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Ombytesrum</option>
                    <option value="1">1 bathroom</option>
                    <option value="2">2 bathrooms</option>
                    <option value="3">3 bathrooms</option>
                    <option value="4">4 bathrooms</option>
                    <option value="5">5 bathrooms</option>
                  </select>
          
                  <select className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                    <option value="">Grillplats</option>
                    <option value="1">1 space</option>
                    <option value="2">2 space</option>
                    <option value="3">3 space</option>
                  </select>
                </div>
              </div>
            </div>
    </section>
  )
}

export default SearchFilter