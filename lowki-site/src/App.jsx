import React from "react";

export default function LowkiSite() {
  return (
    <div className="min-h-screen bg-black text-gray-100 antialiased">
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-4">
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="10" fill="#0b0b0b" />
              <g transform="translate(6,8)" fill="#d21b1b">
                <path d="M6 34 L44 34 L44 28 L34 28 L30 24 L6 24 z" />
                <path d="M4 14 L36 14 L44 6 L4 6 z" opacity="0.95" />
              </g>
            </svg>
            <div>
              <div className="text-2xl font-serif text-red-600">LOWKI</div>
              <div className="text-xs text-gray-400">TRANSPORT</div>
            </div>
          </a>
        </div>
      </header>

      <main>
        <section className="pt-12 pb-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl font-serif text-white">
                LOWKI <span className="text-red-600">TRANSPORT</span>
              </h1>
              <p className="mt-6 text-lg text-gray-300">
                Lowki Transport is a Melbourne-based premium transport and logistics provider delivering reliable, secure, and efficient freight solutions across Victoria and interstate. Built on precision, professionalism, and performance, we handle everything from general freight to specialised and time-critical consignments.
              </p>

              <div className="mt-8 flex gap-4">
                <a href="#contact" className="border border-red-600 text-red-600 px-6 py-3 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-black">
                  Get a Quote
                </a>
                <a href="#services" className="border border-gray-700 px-6 py-3 rounded-md transition-all duration-300 hover:border-red-600 hover:text-red-500">
                  Our Services
                </a>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                Victoria & Interstate Coverage | Fully Insured | 24/7 Scheduling
              </div>
            </div>

            <div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-white mb-4">Quick Quote</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400">Pickup</label>
                    <input className="w-full mt-1 bg-gray-800 border border-gray-700 px-3 py-2 rounded" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400">Delivery</label>
                    <input className="w-full mt-1 bg-gray-800 border border-gray-700 px-3 py-2 rounded" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400">Type</label>
                    <select className="w-full mt-1 bg-gray-800 border border-gray-700 px-3 py-2 rounded">
                      <option>General Freight</option>
                      <option>Vehicles</option>
                      <option>Machinery</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-red-600 text-black py-2 rounded">Submit</button>
                    <a href="tel:0481967216" className="flex-1 border border-gray-700 py-2 text-center rounded">Call Us</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl text-white">Services</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-900 rounded transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-red-600">
                General Freight
              </div>
              <div className="p-6 bg-gray-900 rounded transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-red-600">
                Vehicle & Boat Transport
              </div>
              <div className="p-6 bg-gray-900 rounded transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-red-600">
                Heavy Haulage
              </div>
            </div>
          </div>
        </section>

        <section id="fleet" className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl text-white">Fleet & Capability</h2>
            <p className="mt-2 text-gray-400 max-w-2xl">
              A structured and scalable fleet supporting general freight, heavy haulage, interstate logistics, and specialised transport operations.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-red-600">
                <div className="text-xl font-semibold text-red-600 mb-4">General Freight</div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>Vans</li>
                  <li>Rigid Trucks</li>
                  <li>Curtain-Siders</li>
                  <li>Pantechs</li>
                  <li>Tray Trucks</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-red-600">
                <div className="text-xl font-semibold text-red-600 mb-4">Heavy Haulage</div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>Flatbeds</li>
                  <li>Drop Decks</li>
                  <li>B-Doubles</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-red-600">
                <div className="text-xl font-semibold text-red-600 mb-4">Specialised</div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>Tilt Trays</li>
                  <li>Low Loaders</li>
                  <li>Boat Trailers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white">Contact</h3>
              <p className="text-gray-400">Call or email us</p>

              
              <div className="mt-4">
                <div className="text-gray-400">Phone</div>
                <div className="text-white">0481967216</div>

                <div className="text-gray-400 mt-4">Email</div>
                <a href="mailto:chrismanth3y@gmail.com?subject=Quote%20Request" className="text-white">
                  chrismanth3y@gmail.com
                </a>
              </div>
            </div>

            <div>
              <form className="bg-gray-900 p-6 rounded space-y-4">
                <div>
                  <label className="text-xs text-gray-400">Name</label>
                  <input className="w-full mt-1 bg-gray-800 px-3 py-2 rounded" />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Email</label>
                  <input type="email" className="w-full mt-1 bg-gray-800 px-3 py-2 rounded" />
                </div>

                <div>
                  <label className="text-xs text-gray-400">Message</label>
                  <textarea className="w-full mt-1 bg-gray-800 px-3 py-2 rounded" rows={4}></textarea>
                </div>

                <button className="w-full bg-red-600 text-black py-2 rounded">
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
