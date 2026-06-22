import React, { useEffect } from "react";

const quoteCalculatorMarkup = `<div class="lowki-wrapper">
  <div class="lowki-card">
    <h2>Instant Freight Quote</h2>
    <p class="subtext">Premium Australian freight estimates for local, regional and interstate transport.</p>

    <div class="section">
      <h3>Freight Details</h3>
      <div class="grid">
        <label>
          Freight type
          <select id="freightType">
            <option value="weight">Weight-based freight</option>
            <option value="pallet">Pallet freight</option>
          </select>
        </label>

        <label>
          Weight (kg)
          <input type="number" id="weightKg" min="0" step="0.1" value="100">
        </label>

        <label>
          Length (cm)
          <input type="number" id="lengthCm" min="0" step="1" value="120">
        </label>

        <label>
          Width (cm)
          <input type="number" id="widthCm" min="0" step="1" value="120">
        </label>

        <label>
          Height (cm)
          <input type="number" id="heightCm" min="0" step="1" value="100">
        </label>

        <label>
          Pickup address
          <input type="text" id="pickupAddressInput" placeholder="Enter pickup address">
          <small>Distance auto-calculated from pickup → delivery</small>
        </label>

        <label>
          Drop off address
          <input type="text" id="dropoffAddressInput" placeholder="Enter drop off address">
          
        </label>
      </div>
    </div>

    <div class="section">
<h3>Vehicle Options</h3>
<div class="grid">
<label>
Vehicle Category
<select id="vehicleType">
<optgroup label="General Freight">
<option value="2.2">Van</option>
<option value="3.0">Rigid Truck</option>
<option value="3.4">Curtain-Sider</option>
<option value="3.6">Pantech</option>
<option value="3.8">Tray Truck</option>
</optgroup>
<optgroup label="Heavy Haulage">
<option value="4.5">Flatbed</option>
<option value="5.0">Drop Deck</option>
<option value="6.5">B Double</option>
</optgroup>
<optgroup label="Specialised">
<option value="4.8">Tilt Tray</option>
<option value="6.0">Low Loader</option>
<option value="5.5">Boat Trailer</option>
</optgroup>
</select>
</label>
</div>
</div>

    <div class="section">
      <h3>Pallet Pricing</h3>
      <p class="subtext">Add one or more pallet types with separate quantities.</p>

      <div id="palletRows">
        <div class="grid pallet-row">
          <label>
            Pallet type
            <select class="palletType">
              <option value="0">No pallet</option>
              <option value="90">Standard Pallet (117x117) - $90</option>
              <option value="130">Heavy Pallet (500–1000kg) - $130</option>
              <option value="150">Rack Pallet - $150</option>
              <option value="180">Oversized Pallet - $180</option>
            </select>
          </label>

          <label>
            Pallet quantity
            <input type="number" class="palletQty" min="0" step="1" value="1">
          </label>
        </div>
      </div>

      <button type="button" class="secondary-button" onclick="addPalletRow()">+ Add Another Pallet Type</button>
    </div>

    <div class="section">
      <h3>Extras</h3>
      <div class="grid">



        <label><span>Urgent same-day (+$100)</span><input type="checkbox" id="urgent"></label>
        
        

        

        
      </div>
    </div>

    <button type="button" onclick="calculateLowkiBooking()">Get Instant Quote</button>

    <div id="lowkiResult" class="result-box"></div>
    <div id="lowkiBreakdown" class="breakdown-box"></div>
    <div class="quote-note">Prices shown are estimates only and may vary based on dimensions, weight, access requirements, dangerous goods and delivery conditions.</div>

    <div class="section">
      <h3>Booking Form</h3>
      <div class="grid">
        <label>
          Full name
          <input type="text" id="customerName" placeholder="Your name">
        </label>

        <label>
          Email
          <input type="email" id="customerEmail" placeholder="you@example.com">
        </label>

        <label>
          Phone
          <input type="text" id="customerPhone" placeholder="04xx xxx xxx">
        </label>

        

        <label>
          Delivery address
          <input type="text" id="deliveryAddress" placeholder="Delivery address">
        </label>

        
<label>
<span>Customer Pickup</span>
<div style="display:flex;align-items:center;gap:10px;margin-top:10px;">
<input type="checkbox" id="customerPickup" style="width:18px;height:18px;">
<span style="font-weight:400;">Customer will collect freight</span>
</div>
</label>

<label>
          Notes
          <textarea id="jobNotes" rows="4" placeholder="Special instructions, access details, delivery window, etc."></textarea>
        </label>
      </div>

      <button type="button" onclick="generateBookingSummary()">Create Booking Request</button>
      <div id="bookingSummary" class="summary-box"></div>
    </div>
  </div>
</div>`;

const quoteCalculatorStyles = `
  .lowki-wrapper {
    padding: 48px 20px;
    background:
      radial-gradient(circle at top right, rgba(196, 0, 26, 0.18), transparent 34%),
      linear-gradient(180deg, #050505 0%, #0d0d0d 100%);
    color: #f5f5f5;
  }

  .lowki-card {
    max-width: 1100px;
    margin: 0 auto;
    padding: 34px;
    border-radius: 22px;
    background: rgba(17, 17, 17, 0.96);
    color: #fff;
    border: 1px solid #2a2a2a;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.55);
    font-family: Arial, sans-serif;
  }

  .lowki-card h2 {
    margin: 0;
    font-size: clamp(32px, 5vw, 54px);
    line-height: 1;
    letter-spacing: -1.5px;
    color: #fff;
    font-family: Georgia, 'Times New Roman', serif;
  }

  .lowki-card h2::after {
    content: " — LOWKI TRANSPORT";
    color: #c4001a;
  }

  .lowki-card h3 {
    margin: 0;
    font-size: 22px;
    color: #fff;
    font-family: Georgia, 'Times New Roman', serif;
  }

  .subtext {
    color: #b8b8b8;
    margin: 12px 0 0;
    font-size: 16px;
    max-width: 720px;
  }

  .section {
    margin-top: 28px;
    padding: 24px;
    border: 1px solid #262626;
    border-radius: 18px;
    background: #0d0d0d;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 16px;
    margin-top: 16px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 7px;
    font-size: 13px;
    color: #d8d8d8;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  input, select, textarea {
    width: 100%;
    padding: 13px 12px;
    border-radius: 10px;
    border: 1px solid #3a3a3a;
    background: #161616;
    color: #fff;
    box-sizing: border-box;
    outline: none;
    font-size: 14px;
  }

  input::placeholder, textarea::placeholder {
    color: #777;
  }

  input:focus, select:focus, textarea:focus {
    border-color: #c4001a;
    box-shadow: 0 0 0 3px rgba(196, 0, 26, 0.18);
  }

  small {
    color: #8f8f8f;
    font-weight: 400;
    line-height: 1.4;
  }

  button {
    margin-top: 20px;
    padding: 14px 20px;
    border: 0;
    border-radius: 10px;
    background: #c4001a;
    color: #fff;
    font-weight: 800;
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  }

  button:hover {
    background: #e00022;
    transform: translateY(-1px);
  }

  .secondary-button {
    background: transparent;
    border: 1px solid #444;
    color: #fff;
  }

  .secondary-button:hover {
    border-color: #c4001a;
    background: rgba(196, 0, 26, 0.12);
  }

  .pallet-row {
    margin-bottom: 12px;
  }

  .result-box {
    margin-top: 26px;
    padding: 22px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(196, 0, 26, 0.18), #101010);
    border: 1px solid rgba(196, 0, 26, 0.45);
    font-size: 26px;
    font-weight: 900;
    color: #fff;
  }

  .breakdown-box, .summary-box {
    margin-top: 14px;
    padding: 18px;
    border-radius: 14px;
    background: #080808;
    border: 1px solid #242424;
    line-height: 1.75;
    color: #d6d6d6;
    white-space: pre-line;
    font-size: 14px;
  }

  @media (max-width: 640px) {
    .lowki-wrapper {
      padding: 28px 12px;
    }

    .lowki-card {
      padding: 22px;
      border-radius: 18px;
    }

    .section {
      padding: 18px;
    }

    button {
      width: 100%;
    }
  }
`;

const quoteCalculatorScript = `
  function money(value) {
    return '$' + Number(value).toFixed(2);
  }

  let lastQuote = 0;

  function calculateLowkiBooking() {
    const weightKg = parseFloat(document.getElementById('weightKg')?.value) || 0;
    const lengthCm = parseFloat(document.getElementById('lengthCm')?.value) || 0;
    const widthCm = parseFloat(document.getElementById('widthCm')?.value) || 0;
    const heightCm = parseFloat(document.getElementById('heightCm')?.value) || 0;

    const vehicleEl = document.getElementById('vehicleType');
    const vehicleRate = vehicleEl ? (parseFloat(vehicleEl.value) || 0) : 0;

    const pickupFee = 40;
    const deliveryFee = 40;
    const minimumCharge = 90;

    // Placeholder until real routing is connected
    const pickupAddress = document.getElementById('pickupAddressInput')?.value || '';
    const dropoffAddress = document.getElementById('dropoffAddressInput')?.value || '';
    const distanceKm = (pickupAddress && dropoffAddress) ? 1 : 0;
    const distanceRate = 10;
    const distanceCost = distanceKm * distanceRate;
    const cubicMetres = (lengthCm * widthCm * heightCm) / 1000000;

    let extras = 0;
    const urgentEl = document.getElementById('urgent');
    if (urgentEl && urgentEl.checked) extras += 100;

    let palletCost = 0;
    let palletDetails = [];

    document.querySelectorAll('.pallet-row').forEach((row) => {
      const palletSelect = row.querySelector('.palletType');
      const palletQtyInput = row.querySelector('.palletQty');

      if (!palletSelect || !palletQtyInput) return;

      const palletRate = parseFloat(palletSelect.value) || 0;
      const palletQty = parseInt(palletQtyInput.value, 10) || 0;
      const palletName = palletSelect.options[palletSelect.selectedIndex].text;
      const rowTotal = palletRate * palletQty;

      if (palletRate > 0 && palletQty > 0) {
        palletCost += rowTotal;
        palletDetails.push(\`\${palletQty} × \${palletName} = \${money(rowTotal)}\`);
      }
    });

    const customerPickup = document.getElementById('customerPickup')?.checked || false;

    let baseTotal = customerPickup
      ? palletCost
      : pickupFee + deliveryFee + distanceCost + palletCost + extras;

    if (!customerPickup && baseTotal < minimumCharge) baseTotal = minimumCharge;

    const total = baseTotal;
    lastQuote = total;

    document.getElementById('lowkiResult').innerHTML = \`Estimated Total: \${money(total)}\`;
    document.getElementById('lowkiBreakdown').innerHTML =
      \`\${customerPickup ? 'Customer Pickup: Yes — pallet charge only' : \`Pickup fee: \${money(pickupFee)}\\nDrop off fee: \${money(deliveryFee)}\`}
Weight: \${weightKg}kg
Dimensions: \${lengthCm}cm L × \${widthCm}cm W × \${heightCm}cm H (\${cubicMetres.toFixed(2)} m³)
Pallet charge: \${money(palletCost)}\${palletDetails.length ? \`\\nPallet details: \${palletDetails.join('; ')}\` : ''}
\${customerPickup ? '' : \`Extras: \${money(extras)}\\n\`}
Prices shown are estimates only and may vary based on dimensions, weight, access requirements, dangerous goods and delivery conditions.\`;
  }


  function addPalletRow() {
    const palletRows = document.getElementById('palletRows');
    const row = document.createElement('div');
    row.className = 'grid pallet-row';
    row.innerHTML = \`
      <label>
        Pallet type
        <select class="palletType">
          <option value="0">No pallet</option>
          <option value="90">Standard Pallet (117x117) - $90</option>
          <option value="130">Heavy Pallet (500–1000kg) - $130</option>
          <option value="150">Rack Pallet - $150</option>
          <option value="180">Oversized Pallet - $180</option>
        </select>
      </label>

      <label>
        Pallet quantity
        <input type="number" class="palletQty" min="0" step="1" value="1">
      </label>
    \`;
    palletRows.appendChild(row);
  }

  function generateBookingSummary() {
    const name = document.getElementById('customerName').value || 'Not provided';
    const email = document.getElementById('customerEmail').value || 'Not provided';
    const phone = document.getElementById('customerPhone').value || 'Not provided';
    const deliveryEl = document.getElementById('deliveryAddress');
    const delivery = deliveryEl ? (deliveryEl.value || 'Not provided') : 'Not provided';
    const notes = document.getElementById('jobNotes').value || 'None';
    const customerPickup = document.getElementById('customerPickup')?.checked ? 'Yes' : 'No';
    const lengthCm = document.getElementById('lengthCm').value || '0';
    const widthCm = document.getElementById('widthCm').value || '0';
    const heightCm = document.getElementById('heightCm').value || '0';

    document.getElementById('bookingSummary').innerHTML =
      \`Customer: \${name}
Email: \${email}
Phone: \${phone}
Delivery: \${delivery}
Dimensions: \${lengthCm}cm L × \${widthCm}cm W × \${heightCm}cm H
Customer Pickup: \${customerPickup}
Notes: \${notes}
Estimated Quote: \${money(lastQuote)}

Use this summary to send the job through your booking process.\`;
  }

  `;


// Single-file React component for a sleek, black + red luxury website for "Lowki Transport".
// Built with Tailwind CSS utility classes (assumes Tailwind is available in the project).

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 antialiased">
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo (inline SVG) */}
          <a href="#" className="flex items-center gap-4">
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
              <rect width="64" height="64" rx="10" fill="#0b0b0b" />
              <g transform="translate(6,8)" fill="#d21b1b">
                <path d="M6 34 L44 34 L44 28 L34 28 L30 24 L6 24 z" />
                <path d="M4 14 L36 14 L44 6 L4 6 z" opacity="0.95" />
              </g>
            </svg>
            <div>
              <div className="text-2xl font-serif tracking-tight text-red-600">LOWKI</div>
              <div className="text-xs text-gray-400">TRANSPORT</div>
            </div>
          </a>

          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#services" className="hover:text-red-500">Services</a>
            <a href="#fleet" className="hover:text-red-500">Fleet</a>
            <a href="#contact" className="hover:text-red-500">Contact</a>
            <a href="#" className="ml-4 inline-block bg-red-600 text-black px-4 py-2 rounded-md font-semibold">Book Now</a>
          </nav>

          <div className="md:hidden">
            <button aria-label="menu" className="p-2 bg-gray-900 rounded-md border border-gray-800">☰</button>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-12 pb-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-10 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif leading-tight text-white">LOWKI <span className="text-red-600">TRANSPORT</span></h1>
              <p className="mt-6 text-lg text-gray-300 max-w-xl">Lowki Transport is a Melbourne-based premium transport and logistics provider delivering reliable, secure, and efficient freight solutions across Victoria and interstate. Built on precision, professionalism, and performance, we handle everything from general freight to specialised and time-critical consignments.</p>

              <div className="mt-8 flex gap-4">
                <a href="#services" className="border border-gray-700 px-6 py-3 rounded-md text-gray-200 hover:text-red-500">Our Services</a>
                <a href="/quote" className="border border-red-600 px-6 py-3 rounded-md text-red-500 hover:bg-red-600 hover:text-black font-semibold">Get Quote</a>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                <div>Operating nationwide • Insured freight • 24/7 scheduling</div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-serif text-white">Our Services</h2>
            <p className="mt-2 text-gray-400 max-w-2xl">Comprehensive transport solutions tailored to your needs — local and interstate, fragile goods, heavy haulage and express courier.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {title: 'General Freight', desc: ''},
                {title: 'Vehicle & Boat Transport', desc: ''},
                {title: 'Heavy Haulage', desc: ''},
              ].map((s)=> (
                <div key={s.title} className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                  <div className="text-lg font-semibold text-white">{s.title}</div>
                  {s.desc && <div className="mt-2 text-sm text-gray-400">{s.desc}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="fleet" className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-serif text-white">Fleet & Capability</h2>
            <p className="mt-2 text-gray-400 max-w-2xl">A structured and scalable fleet supporting general freight, heavy haulage, interstate logistics, and specialised transport operations.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                <div className="text-xl font-semibold text-white">General Freight</div>
                <div className="mt-3 text-sm text-gray-400 leading-relaxed">
                  Vans<br />
                  Rigid Trucks<br />
                  Curtain-Siders<br />
                  Pantechs<br />
                  Tray Trucks
                </div>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                <div className="text-xl font-semibold text-white">Heavy Haulage</div>
                <div className="mt-3 text-sm text-gray-400 leading-relaxed">
                  Flatbeds<br />
                  Drop Decks<br />
                  B-Doubles
                </div>
              </div>

              <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                <div className="text-xl font-semibold text-white">Specialised</div>
                <div className="mt-3 text-sm text-gray-400 leading-relaxed">
                  Tilt Trays<br />
                  Low Loaders<br />
                  Boat Trailers
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-2xl font-serif text-white">Get Moving With Lowki</h3>
              <p className="mt-2 text-gray-400">Quick responses. Reliable service. Trusted delivery.</p>

              <div className="mt-6 space-y-3">
                <div className="text-sm text-gray-400">Phone</div>
                <div className="font-medium text-white">+61 4XX XXX XXX</div>

                <div className="text-sm text-gray-400 mt-4">Email</div>
                <div className="font-medium text-white">info@lowkitransport.com</div>

                <div className="text-sm text-gray-400 mt-4">Address</div>
                <div className="font-medium text-white">Melbourne based</div>
              </div>
            </div>
</div>
        </section>
      </main>

      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} Lowki Transport — All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500">Privacy</a>
            <a href="#" className="hover:text-red-500">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function QuotePage() {
  useEffect(() => {
    const styleId = "lowki-quote-calculator-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = quoteCalculatorStyles;
      document.head.appendChild(style);
    }

    const scriptId = "lowki-quote-calculator-script";
    const oldScript = document.getElementById(scriptId);
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.innerHTML = quoteCalculatorScript;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 antialiased">
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-4">
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
              <rect width="64" height="64" rx="10" fill="#0b0b0b" />
              <g transform="translate(6,8)" fill="#d21b1b">
                <path d="M6 34 L44 34 L44 28 L34 28 L30 24 L6 24 z" />
                <path d="M4 14 L36 14 L44 6 L4 6 z" opacity="0.95" />
              </g>
            </svg>
            <div>
              <div className="text-2xl font-serif tracking-tight text-red-600">LOWKI</div>
              <div className="text-xs text-gray-400">TRANSPORT</div>
            </div>
          </a>

          <a href="/" className="border border-gray-700 px-4 py-2 rounded-md text-gray-200 hover:text-red-500">Back Home</a>
        </div>
      </header>

      <main>
        <div dangerouslySetInnerHTML={{ __html: quoteCalculatorMarkup }} />
      </main>
    </div>
  );
}

export default function LowkiSite() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  if (path === "/quote") return <QuotePage />;
  return <HomePage />;
}
