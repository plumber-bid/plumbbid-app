import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Calculator, Book, Settings, Trash2, 
  Plus, Check, Wrench, AlertTriangle, FileText, 
  Upload, Copy, Box, Download, Building2, History, X
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    voiceTitle: 'Job Recorder', voiceDesc: "Speak or type your job details. We'll automatically extract hours and parts.", tapToSpeak: 'Tap to Speak', listening: 'Listening...', voicePlaceholder: 'E.g., Replaced a 200L water heater and two 22mm ball valves. Took about 3 hours.', buildQuote: 'Build Quote', parsingAi: 'Parsing AI...', clearText: 'Clear / Start Over',
    dontForget: "Don't Forget Check", labor: 'Labor', estHours: 'Estimated Hours', hrs: 'hrs', partsMat: 'Parts & Materials', addItem: 'Add Item', noParts: 'No parts added yet.', missingPrice: 'Missing Wholesale Price', qty: 'Qty', wholesale: 'Wholesale',
    summary: 'Quote Summary', laborFee: 'Labor', extraFees: 'Fees & Extras', matCost: 'Materials (Cost)', markup: 'Material Markup', subtotal: 'Subtotal', vat: 'VAT', total: 'Total', copyQuote: 'Copy Customer Quote', copyList: 'Copy Wholesaler Pick-List',
    profEst: 'Professional Estimate', laborServ: 'Labor & Services:', materialsParts: 'Materials & Parts:', grandTotal: 'Grand Total:', valid30: 'Valid for 30 days. Let me know if you would like to proceed!', supplyList: 'Supply House Pick-List', reqAsap: 'Required for job ASAP.',
    localPb: 'Local Price Book', addPart: 'Add Part', searchParts: 'Search parts by name or code...', noPartsFound: 'No parts found.',
    ratesFees: 'Rates & Fees', hourlyRate: 'Hourly Rate', serviceCar: 'Service Car Fee', tollParking: 'Tolls / Parking', matMarkup: 'Material Markup %', vatMva: 'VAT %', loc: 'Localization', currency: 'Currency', dictLang: 'Dictation & Output Language',
    tabVoice: 'Voice', tabQuote: 'Quote', tabParts: 'Parts', tabSettings: 'Settings',
    suggPtfe: 'PTFE Tape', suggSilicone: 'Silicone Sealant', suggOlives: 'Compression Olives', suggDisposal: 'Old Unit Disposal',
    termsLabel: 'Standard Terms / Disclaimers', termsDisclaimer: 'The quote assumes free access, tight and functioning stopcocks, and that existing pipework is in regulatory condition under 40 years old. Damage to old/adjacent equipment during dismantling, or to unknown hidden pipes/cables, is only covered in cases of gross negligence and will be repaired at cost. Additional work due to hidden defects, building work, electrician, and parking will be charged extra. We only install approved equipment; no equipment warranty is provided for customer-supplied equipment, and extra work is billed according to time and materials.',
    companyName: 'Company Name', orgNo: 'Org. No / Tax ID', contactInfo: 'Contact (Phone/Email)', customerDetails: 'Customer Name / Address', includeTerms: 'Include Terms & Disclaimers', downloadPdf: 'Download / Share PDF', desc: 'Description', price: 'Price',
    phCompany: 'e.g. Smith Plumbing Ltd', phOrg: 'Tax / Reg. No', phContact: 'Phone / Email', resetQuote: 'Reset Quote', history: 'History', historyEmpty: 'No recent quotes.',
    normal: 'Normal', evening: 'Evening (+50%)', weekend: 'Weekend (+100%)', multiplier: 'Rate Multiplier', loadQuote: 'Open'
  },
  no: {
    voiceTitle: 'Jobbregistrering', voiceDesc: "Snakk eller skriv inn jobbdetaljene. Vi trekker automatisk ut timer og deler.", tapToSpeak: 'Trykk for å snakke', listening: 'Lytter...', voicePlaceholder: 'F.eks., Byttet en 200L varmtvannsbereder og to 22mm kuleventiler. Brukte ca 3 timer.', buildQuote: 'Bygg tilbud', parsingAi: 'Tolker med AI...', clearText: 'Tøm / Start på nytt',
    dontForget: "Ikke glem", labor: 'Arbeid', estHours: 'Estimerte timer', hrs: 'timer', partsMat: 'Deler & Materiell', addItem: 'Legg til', noParts: 'Ingen deler lagt til ennå.', missingPrice: 'Mangler innkjøpspris', qty: 'Ant', wholesale: 'Innkjøp',
    summary: 'Sammendrag', laborFee: 'Arbeid', extraFees: 'Gebyrer & Tillegg', matCost: 'Materiell (Innkjøp)', markup: 'Påslag', subtotal: 'Subtotal', vat: 'MVA', total: 'Total', copyQuote: 'Kopier tilbud til kunde', copyList: 'Kopier plukkliste',
    profEst: 'Pristilbud', laborServ: 'Arbeid & Tjenester:', materialsParts: 'Deler & Materiell:', grandTotal: 'Totalsum:', valid30: 'Gyldig i 30 dager. Gi meg beskjed om du ønsker å gå videre!', supplyList: 'Plukkliste', reqAsap: 'Trengs til jobb ASAP.',
    localPb: 'Lokal Prisbok', addPart: 'Ny del', searchParts: 'Søk etter navn eller NRF/kode...', noPartsFound: 'Ingen deler funnet.',
    ratesFees: 'Priser & Avgifter', hourlyRate: 'Timepris', serviceCar: 'Servicebil', tollParking: 'Bomring & Parkering', matMarkup: 'Påslag Materiell %', vatMva: 'MVA %', loc: 'Lokalisering', currency: 'Valuta', dictLang: 'Diktering og utspråk',
    tabVoice: 'Stemme', tabQuote: 'Tilbud', tabParts: 'Prisbok', tabSettings: 'Innstill.',
    suggPtfe: 'Gjengeteip', suggSilicone: 'Silikon', suggOlives: 'Klemringer', suggDisposal: 'Kassering / Miljøgebyr',
    termsLabel: 'Standard Forbehold', termsDisclaimer: 'Tilbudet forutsetter fri tilgang, tette og fungerende stoppekraner, samt at eksisterende røranlegg er i forskriftsmessig stand under 40 år. Skader på gammelt/tilstøtende utstyr ved demontering, eller på ukjente skjulte rør/kabler, dekkes kun ved grov uaktsomhet og utbedres til kostpris. Tilleggsarbeid grunnet skjulte feil, bygningsmessig arbeid, elektriker og parkering kommer i tillegg. Vi monterer kun godkjent utstyr; på kundelevert utstyr gis ingen utstyrsgaranti, og merarbeid faktureres etter medgått tid og materiell.',
    companyName: 'Firmanavn', orgNo: 'Org.nr', contactInfo: 'Kontaktinfo (Tlf/E-post)', customerDetails: 'Kunde / Adresse', includeTerms: 'Inkluder Forbehold i tilbud', downloadPdf: 'Last ned som PDF', desc: 'Beskrivelse', price: 'Pris',
    phCompany: 'F.eks. Hansen Rør AS', phOrg: 'Org.nr (9 siffer)', phContact: 'Telefon / E-post', resetQuote: 'Nullstill tilbud', history: 'Historikk', historyEmpty: 'Ingen tidligere tilbud.',
    normal: 'Normal (1.0x)', evening: 'Kveld (+50%)', weekend: 'Helg (+100%)', multiplier: 'Overtid / Utrykning', loadQuote: 'Åpne'
  },
  sv: {
    voiceTitle: 'Jobbregistrering', voiceDesc: "Prata eller skriv in dina jobbdetaljer.", tapToSpeak: 'Tryck för att prata', listening: 'Lyssnar...', voicePlaceholder: 'T.ex., Bytte en 200L varmvattenberedare.', buildQuote: 'Skapa offert', parsingAi: 'Tolkar med AI...', clearText: 'Rensa / Börja om',
    dontForget: "Glöm inte", labor: 'Arbete', estHours: 'Timmar', hrs: 'tim', partsMat: 'Material', addItem: 'Lägg till', noParts: 'Inga delar.', missingPrice: 'Saknar pris', qty: 'Antal', wholesale: 'Inköp',
    summary: 'Sammanfattning', laborFee: 'Arbete', extraFees: 'Avgifter', matCost: 'Material', markup: 'Påslag', subtotal: 'Subtotal', vat: 'Moms', total: 'Total', copyQuote: 'Kopiera kundoffert', copyList: 'Kopiera plocklista',
    profEst: 'Offert', laborServ: 'Arbete & Tjänster:', materialsParts: 'Material:', grandTotal: 'Totalsumma:', valid30: 'Giltig i 30 dagar.', supplyList: 'Plocklista', reqAsap: 'Behövs ASAP.',
    localPb: 'Lokal Prisbok', addPart: 'Ny del', searchParts: 'Sök...', noPartsFound: 'Inga delar.',
    ratesFees: 'Priser & Avgifter', hourlyRate: 'Timpris', serviceCar: 'Servicebil', tollParking: 'Tull & Parkering', matMarkup: 'Påslag %', vatMva: 'Moms %', loc: 'Lokalisering', currency: 'Valuta', dictLang: 'Språk',
    tabVoice: 'Röst', tabQuote: 'Offert', tabParts: 'Prisbok', tabSettings: 'Inställ.',
    suggPtfe: 'Gängtejp', suggSilicone: 'Silikon', suggOlives: 'Klämringar', suggDisposal: 'Bortskaffande',
    termsLabel: 'Förbehåll', termsDisclaimer: '1. Arbetsområdet måste vara tillgängligt.\n2. Huvudkran måste fungera.',
    companyName: 'Företagsnamn', orgNo: 'Org.nr', contactInfo: 'Kontaktinfo', customerDetails: 'Kund / Adress', includeTerms: 'Inkludera Villkor', downloadPdf: 'Ladda ner PDF', desc: 'Beskrivning', price: 'Pris',
    phCompany: 'T.ex. Svensson Rör AB', phOrg: 'Org.nr', phContact: 'Telefon', resetQuote: 'Återställ', history: 'Historik', historyEmpty: 'Inga offerter.',
    normal: 'Normal', evening: 'Kväll (+50%)', weekend: 'Helg (+100%)', multiplier: 'Övertid', loadQuote: 'Öppna'
  },
  de: {
    voiceTitle: 'Auftragsaufnahme', voiceDesc: "Sprechen oder tippen Sie.", tapToSpeak: 'Sprechen', listening: 'Hört zu...', voicePlaceholder: 'Z.B. Einen Boiler ausgetauscht.', buildQuote: 'Angebot erstellen', parsingAi: 'KI verarbeitet...', clearText: 'Löschen',
    dontForget: "Nicht vergessen", labor: 'Arbeitszeit', estHours: 'Stunden', hrs: 'Std', partsMat: 'Material', addItem: 'Hinzufügen', noParts: 'Keine Teile.', missingPrice: 'Preis fehlt', qty: 'Menge', wholesale: 'Einkauf',
    summary: 'Zusammenfassung', laborFee: 'Arbeit', extraFees: 'Gebühren', matCost: 'Material', markup: 'Aufschlag', subtotal: 'Zwischensumme', vat: 'MwSt.', total: 'Gesamt', copyQuote: 'Angebot kopieren', copyList: 'Materialliste kopieren',
    profEst: 'Kostenvoranschlag', laborServ: 'Arbeit:', materialsParts: 'Material:', grandTotal: 'Gesamtsumme:', valid30: '30 Tage gültig.', supplyList: 'Material-Pickliste', reqAsap: 'Dringend.',
    localPb: 'Preisbuch', addPart: 'Teil hinzufügen', searchParts: 'Suchen...', noPartsFound: 'Keine Teile gefunden.',
    ratesFees: 'Preise & Gebühren', hourlyRate: 'Stundensatz', serviceCar: 'Servicefahrzeug', tollParking: 'Maut & Parken', matMarkup: 'Aufschlag %', vatMva: 'MwSt. %', loc: 'Lokalisierung', currency: 'Währung', dictLang: 'Sprache',
    tabVoice: 'Sprache', tabQuote: 'Angebot', tabParts: 'Preisbuch', tabSettings: 'Einstell.',
    suggPtfe: 'Teflonband', suggSilicone: 'Silikon', suggOlives: 'Klemmringe', suggDisposal: 'Entsorgung',
    termsLabel: 'Bedingungen', termsDisclaimer: '1. Arbeitsbereich muss frei zugänglich sein.',
    companyName: 'Firmenname', orgNo: 'Steuernummer', contactInfo: 'Kontaktinfo', customerDetails: 'Kunde / Adresse', includeTerms: 'Bedingungen', downloadPdf: 'PDF Herunterladen', desc: 'Beschreibung', price: 'Preis',
    phCompany: 'Z.B. Müller Sanitär', phOrg: 'Steuernummer', phContact: 'Telefon', resetQuote: 'Zurücksetzen', history: 'Verlauf', historyEmpty: 'Kein Verlauf.',
    normal: 'Normal', evening: 'Abend (+50%)', weekend: 'Wochenende (+100%)', multiplier: 'Überstunden', loadQuote: 'Öffnen'
  },
  es: {
    voiceTitle: 'Registro', voiceDesc: "Hable o escriba.", tapToSpeak: 'Tocar para hablar', listening: 'Escuchando...', voicePlaceholder: 'Ej: Reemplazado calentador.', buildQuote: 'Crear Presup.', parsingAi: 'Procesando...', clearText: 'Borrar',
    dontForget: "No Olvidar", labor: 'Mano de Obra', estHours: 'Horas', hrs: 'hrs', partsMat: 'Materiales', addItem: 'Añadir', noParts: 'No hay piezas.', missingPrice: 'Falta precio', qty: 'Cant', wholesale: 'Mayorista',
    summary: 'Resumen', laborFee: 'Trabajo', extraFees: 'Cargos Extra', matCost: 'Materiales', markup: 'Margen', subtotal: 'Subtotal', vat: 'IVA', total: 'Total', copyQuote: 'Copiar Presup.', copyList: 'Copiar Lista',
    profEst: 'Presupuesto', laborServ: 'Mano de Obra:', materialsParts: 'Materiales:', grandTotal: 'Total:', valid30: 'Válido por 30 días.', supplyList: 'Lista de Materiales', reqAsap: 'Urgente.',
    localPb: 'Catálogo', addPart: 'Añadir Pieza', searchParts: 'Buscar...', noPartsFound: 'No se encontraron.',
    ratesFees: 'Tarifas', hourlyRate: 'Tarifa Horaria', serviceCar: 'Vehículo Taller', tollParking: 'Peaje / Parking', matMarkup: 'Margen %', vatMva: 'IVA %', loc: 'Localización', currency: 'Moneda', dictLang: 'Idioma',
    tabVoice: 'Voz', tabQuote: 'Presup.', tabParts: 'Catálogo', tabSettings: 'Ajustes',
    suggPtfe: 'Cinta de teflón', suggSilicone: 'Silicona', suggOlives: 'Anillos de compresión', suggDisposal: 'Desecho viejo',
    termsLabel: 'Condiciones', termsDisclaimer: '1. El área debe estar accesible.',
    companyName: 'Empresa', orgNo: 'NIF', contactInfo: 'Contacto', customerDetails: 'Cliente', includeTerms: 'Incluir Condiciones', downloadPdf: 'Descargar PDF', desc: 'Descripción', price: 'Precio',
    phCompany: 'Ej. Fontanería López', phOrg: 'NIF', phContact: 'Teléfono', resetQuote: 'Restablecer', history: 'Historial', historyEmpty: 'No hay historial.',
    normal: 'Normal', evening: 'Tarde (+50%)', weekend: 'Finde (+100%)', multiplier: 'Multiplicador', loadQuote: 'Abrir'
  }
};

const DEFAULT_SETTINGS = {
  hourlyRate: 850,
  serviceCarFee: 550,
  tollParkingFee: 85,
  markupPercent: 20,
  vatPercent: 25,
  currency: 'NOK',
  language: 'no-NO',
  companyName: '',
  orgNo: '',
  contactInfo: '',
  termsText: ''
};

const DEFAULT_QUOTE_TEMPLATE = {
  id: 0,
  laborHours: 0,
  multiplier: 1,
  includeServiceCar: true,
  serviceCarFee: 550,
  includeTollParking: false,
  tollParkingFee: 85,
  parts: [], 
  notes: '', 
  customerDetails: '', 
  includeTerms: true 
};

const DEFAULT_PRICE_BOOK = [
  { id: '1', name: 'OSO Hotwater 200L', code: '8000123', cost: 8500, keywords: ['oso', 'hotwater', 'water heater', 'varmtvannsbereder', 'bereder'] },
  { id: '2', name: '22mm Ball Valve', code: '5601001', cost: 450, keywords: ['ball valve', 'kuleventil', '22mm valve', 'stoppekran'] },
  { id: '3', name: '15mm Copper Pipe 2.5m', code: '1234567', cost: 300, keywords: ['copper pipe', 'kobberrør', 'cu-rør', '15mm pipe'] },
  { id: '4', name: '110mm PVC Pipe 3m', code: '3456789', cost: 250, keywords: ['pvc pipe', 'avløpsrør', 'pvc-rør', '110mm rør'] },
  { id: '5', name: 'Sink Mixer Tap', code: '4567890', cost: 1500, keywords: ['mixer tap', 'blandebatteri', 'servantbatteri', 'faucet', 'kran'] },
  { id: '6', name: '32mm Waste Trap', code: '5678901', cost: 180, keywords: ['waste trap', 'vannlås', 'siphon', '32mm trap', 'p-trap', 'pea trap'] },
  { id: '7', name: 'Toilet Bowl', code: '6789012', cost: 3200, keywords: ['toilet bowl', 'toalettskål', 'wc', 'klosett'] },
  { id: '8', name: 'Flush Button', code: '7890123', cost: 500, keywords: ['flush button', 'spyleknapp', 'trykkplate'] },
  { id: '9', name: '15mm Compression Elbow', code: '8901234', cost: 85, keywords: ['compression elbow', 'klemringsvinkel', 'albue', '15mm albue'] },
  { id: '10', name: 'Wall Box 15mm', code: '9012345', cost: 350, keywords: ['wall box', 'veggboks', '15mm veggboks'] },
];

const DEFAULT_PARTS_T = {
  en: { '1': 'OSO Hotwater 200L', '2': '22mm Ball Valve', '3': '15mm Copper Pipe 2.5m', '4': '110mm PVC Pipe 3m', '5': 'Sink Mixer Tap', '6': '32mm Waste Trap', '7': 'Toilet Bowl', '8': 'Flush Button', '9': '15mm Compression Elbow', '10': 'Wall Box 15mm' },
  no: { '1': 'OSO Hotwater 200L Varmtvannsbereder', '2': 'Kuleventil 22mm', '3': 'Kobberrør 15mm (2.5m)', '4': 'Avlopsrør PVC 110mm (3m)', '5': 'Kjøkkenbatteri', '6': 'Vannlås 32mm', '7': 'Toalettskål', '8': 'Spyleknapp', '9': 'Klemringsvinkel 15mm', '10': 'Veggboks 15mm' },
  sv: { '1': 'OSO Varmvattenberedare 200L', '2': 'Kulventil 22mm', '3': 'Kopparrör 15mm 2.5m', '4': 'PVC-rör 110mm 3m', '5': 'Köksblandare', '6': 'Vattenlås 32mm', '7': 'Toalettstol', '8': 'Spolknapp', '9': 'Klämringsvinkel 15mm', '10': 'Väggbricka 15mm' },
  de: { '1': 'OSO Warmwasserspeicher 200L', '2': 'Kugelhahn 22mm', '3': 'Kupferrohr 15mm 2.5m', '4': 'PVC-Rohr 110mm 3m', '5': 'Spültischarmatur', '6': 'Siphon 32mm', '7': 'WC-Becken', '8': 'Spültaste', '9': 'Klemmringverschraubung 15mm', '10': 'Wandscheibe 15mm' },
  es: { '1': 'Calentador de agua OSO 200L', '2': 'Válvula de bola 22mm', '3': 'Tubo de cobre 15mm 2.5m', '4': 'Tubo de PVC 110mm 3m', '5': 'Grifo monomando', '6': 'Sifón 32mm', '7': 'Inodoro', '8': 'Pulsador', '9': 'Codo de compresión 15mm', '10': 'Caja de pared 15mm' }
};

const SUGGESTIONS = [
  { tKey: 'suggPtfe', code: 'CONS-01', cost: 25 },
  { tKey: 'suggSilicone', code: 'CONS-02', cost: 120 },
  { tKey: 'suggOlives', code: 'CONS-03', cost: 50 },
  { tKey: 'suggDisposal', code: 'SVC-01', cost: 400 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('input');
  const [toast, setToast] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('plumbbid_settings');
    const parsed = saved ? JSON.parse(saved) : {};
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      serviceCarFee: parsed.serviceCarFee ?? parsed.calloutFee ?? DEFAULT_SETTINGS.serviceCarFee,
      tollParkingFee: parsed.tollParkingFee ?? DEFAULT_SETTINGS.tollParkingFee
    };
  });

  const [priceBook, setPriceBook] = useState(() => {
    const saved = localStorage.getItem('plumbbid_pricebook');
    return saved ? JSON.parse(saved) : DEFAULT_PRICE_BOOK;
  });

  const [quoteHistory, setQuoteHistory] = useState(() => {
    const saved = localStorage.getItem('plumbbid_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [quote, setQuote] = useState(() => {
    const saved = localStorage.getItem('plumbbid_quote');
    return saved ? JSON.parse(saved) : { ...DEFAULT_QUOTE_TEMPLATE, id: Date.now() };
  });

  const langCode = settings.language.split('-')[0] || 'en';
  const t = (key) => TRANSLATIONS[langCode]?.[key] || TRANSLATIONS['en'][key] || key;

  // Persistence Effects
  useEffect(() => { localStorage.setItem('plumbbid_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('plumbbid_pricebook', JSON.stringify(priceBook)); }, [priceBook]);
  useEffect(() => { localStorage.setItem('plumbbid_history', JSON.stringify(quoteHistory)); }, [quoteHistory]);
  
  // Track Live Quote in History Automatically
  useEffect(() => {
    localStorage.setItem('plumbbid_quote', JSON.stringify(quote));
    if (quote.id) {
      setQuoteHistory(prev => {
        const exists = prev.find(q => q.id === quote.id);
        if (exists) {
          return prev.map(q => q.id === quote.id ? quote : q);
        } else {
           // Skip empty init quotes
           if (quote.parts.length === 0 && quote.laborHours === 0 && !quote.notes) return prev;
           return [quote, ...prev].slice(0, 10);
        }
      });
    }
  }, [quote]);

  useEffect(() => {
    setPriceBook(prev => prev.map(p => {
      if (['1','2','3','4','5','6','7','8','9','10'].includes(p.id)) {
         const localizedName = DEFAULT_PARTS_T[langCode]?.[p.id] || DEFAULT_PARTS_T['en'][p.id];
         return { ...p, name: localizedName };
      }
      return p;
    }));
  }, [langCode]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const formatMoney = (amount) => {
    try {
      return new Intl.NumberFormat(settings.language, { style: 'currency', currency: settings.currency }).format(amount);
    } catch (e) {
      return `${amount.toFixed(2)} ${settings.currency}`;
    }
  };

  const copyToClipboard = (text, successMsg) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(err => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast(successMsg);
    });
  };

  const handleGenerateQuote = async (text) => {
    if (!text.trim()) {
      showToast("Please enter job notes first.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/parse-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: text,
          priceBook: priceBook.map(p => ({ id: p.id, name: p.name, code: p.code, cost: p.cost })),
          language: settings.language,
          currency: settings.currency,
          systemInstruction: "Act as a plumbing speech-correction filter. Automatically fix common phonetic speech-to-text mishearings (e.g., 'kule ventil' -> 'kuleventil', 'varmt vanns bereder' -> 'varmtvannsbereder', 'blande batteri' -> 'blandebatteri', 'pea trap' -> 'P-trap', 'rør i rør' -> 'rør-i-rør', 'vann lås' -> 'vannlås', 'stoppe kran' -> 'stoppekran') before extracting hours and parts."
        })
      });

      if (!response.ok) throw new Error("API Error");
      const parsedData = await response.json();

      const partsWithIds = (parsedData.items || parsedData.parts || []).map(p => ({
        ...p,
        quoteItemId: Math.random().toString(36).substr(2, 9),
        id: p.id || Math.random().toString(36).substr(2, 9),
        code: p.code || '',
        cost: p.cost || 0
      }));

      const newQuote = {
        ...DEFAULT_QUOTE_TEMPLATE,
        id: Date.now(),
        laborHours: parsedData.hours || parsedData.laborHours || 1,
        parts: partsWithIds,
        notes: parsedData.customerSummary || parsedData.summaryNotes || text,
        serviceCarFee: settings.serviceCarFee,
        tollParkingFee: settings.tollParkingFee,
        includeTerms: quote.includeTerms // Keep their previous preference
      };

      setQuote(newQuote);
      setActiveTab('quote');
      showToast("Smart Quote generated successfully!");
    } catch (error) {
      console.error("API Error, falling back to local parser", error);
      showToast("Using advanced local fallback parser.");
      
      let extractedHours = 0;
      const hourRegex = /(\d+(?:\.\d+)?)\s*(?:hour|hours|hr|hrs|time|timer)/i;
      const hourMatch = text.match(hourRegex);
      if (hourMatch) extractedHours = parseFloat(hourMatch[1]);

      let remainingText = text.toLowerCase().replace(hourRegex, '').replace(/(took about|brukte ca|approximately|estimated|i spent|jeg brukte)/gi, '');
      const chunks = remainingText.split(/,|\.| and | & | \+ | og | plus | med | inkludert | including | byttet | replaced /i);
      let matchedParts = [];
      
      chunks.forEach(chunk => {
        let cleanChunk = chunk.trim();
        if (cleanChunk.length < 3) return;
        let foundMatch = false;

        for (const part of priceBook) {
          const keywords = part.keywords || [];
          const searchTerms = [part.name.toLowerCase(), ...keywords];
          if (part.name.includes('Hotwater') || part.name.includes('bereder')) searchTerms.push('varmtvannsbereder', 'bereder');
          if (part.name.includes('Valve') || part.name.includes('ventil')) searchTerms.push('kuleventil', 'stoppekran', 'valve');
          if (part.name.includes('Mixer') || part.name.includes('batteri')) searchTerms.push('blandebatteri', 'kran');
          if (part.name.includes('Trap') || part.name.includes('vannlås')) searchTerms.push('vannlås', 'trap');

          if (searchTerms.some(term => cleanChunk.includes(term.toLowerCase()))) {
            if (!matchedParts.find(p => p.id === part.id)) {
              matchedParts.push({ ...part, quantity: 1, quoteItemId: Math.random().toString(36).substr(2, 9) });
            }
            foundMatch = true;
            break;
          }
        }

        if (!foundMatch) {
           const noiseWords = ['a', 'the', 'an', 'en', 'et', 'to', 'jeg', 'i', 'was', 'var', 'det', 'it', 'some', 'noen', 'this', 'dette', 'til'];
           const words = cleanChunk.split(/\s+/);
           const isNoise = words.every(w => noiseWords.includes(w));
           
           if (!isNoise) {
             let qty = 1;
             const qtyMatch = cleanChunk.match(/^(one|two|three|four|five|six|1|2|3|4|5|6|en|to|tre|fire|fem|seks)\s+/i);
             if (qtyMatch) {
                 const qMap = {'one':1, 'two':2, 'three':3, 'four':4, 'five':5, 'six':6, 'en':1, 'to':2, 'tre':3, 'fire':4, 'fem':5, 'seks':6};
                 qty = parseInt(qtyMatch[1]) || qMap[qtyMatch[1].toLowerCase()] || 1;
                 cleanChunk = cleanChunk.replace(qtyMatch[0], '').trim();
             }
             const formattedName = cleanChunk.charAt(0).toUpperCase() + cleanChunk.slice(1);
             matchedParts.push({
                id: Math.random().toString(36).substr(2, 9), name: formattedName, code: '', cost: 0, quantity: qty, quoteItemId: Math.random().toString(36).substr(2, 9)
             });
           }
        }
      });

      const newQuote = {
        ...DEFAULT_QUOTE_TEMPLATE,
        id: Date.now(),
        laborHours: extractedHours || 1,
        parts: matchedParts,
        notes: text,
        serviceCarFee: settings.serviceCarFee,
        tollParkingFee: settings.tollParkingFee,
        includeTerms: quote.includeTerms
      };

      setQuote(newQuote);
      setActiveTab('quote');
    } finally {
      setIsGenerating(false);
    }
  };

  const InputView = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState(quote.notes || '');
    const recognitionRef = useRef(null);
    const textBeforeRecRef = useRef('');

    useEffect(() => {
      textBeforeRecRef.current = quote.notes || '';
      
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = settings.language;
        
        recognitionRef.current.onresult = (event) => {
          let finalSeg = '';
          let interimSeg = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalSeg += event.results[i][0].transcript;
            } else {
              interimSeg += event.results[i][0].transcript;
            }
          }
          
          if (finalSeg) {
             const spacer = textBeforeRecRef.current.trim() && finalSeg.trim() ? ' ' : '';
             textBeforeRecRef.current = textBeforeRecRef.current + spacer + finalSeg;
          }
          
          const displaySpacer = textBeforeRecRef.current.trim() && interimSeg.trim() ? ' ' : '';
          setTranscript(textBeforeRecRef.current + displaySpacer + interimSeg);
        };

        recognitionRef.current.onerror = (event) => setIsRecording(false);
        recognitionRef.current.onend = () => setIsRecording(false);
      }
    }, [settings.language]);

    const toggleRecording = () => {
      if (!recognitionRef.current) return showToast("Voice typing not supported on this browser.");
      
      if (isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
      } else {
        textBeforeRecRef.current = transcript; // Lock in manual edits before starting
        recognitionRef.current.start();
        setIsRecording(true);
      }
    };

    const handleClear = () => {
      if (isRecording) {
        recognitionRef.current?.stop();
        setIsRecording(false);
      }
      setTranscript('');
      setQuote({ ...DEFAULT_QUOTE_TEMPLATE, id: Date.now() });
      textBeforeRecRef.current = '';
    };

    return (
      <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto w-full px-4 gap-8 py-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">{t('voiceTitle')}</h2>
          <p className="text-slate-500 text-sm">{t('voiceDesc')}</p>
        </div>

        <button 
          onClick={toggleRecording}
          className={`w-56 h-56 rounded-full flex flex-col items-center justify-center gap-4 text-white shadow-2xl transition-all duration-300 ${isRecording ? 'bg-red-500 scale-105 shadow-red-500/50' : 'bg-orange-500 shadow-orange-500/40 hover:bg-orange-600 active:scale-95'}`}
        >
          {isRecording ? <MicOff size={72} className="animate-pulse" /> : <Mic size={72} />}
          <span className="text-2xl font-bold">{isRecording ? t('listening') : t('tapToSpeak')}</span>
        </button>

        <div className="w-full space-y-4">
          <div className="flex justify-end">
            <button onClick={handleClear} className="text-slate-500 hover:text-red-500 flex items-center gap-1 text-sm font-semibold transition-colors">
              <Trash2 size={16} /> {t('clearText')}
            </button>
          </div>
          <textarea 
            className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:ring-0 resize-none h-32 text-slate-800 placeholder-slate-400 transition-colors shadow-inner"
            placeholder={t('voicePlaceholder')}
            value={transcript}
            onFocus={() => { if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); } }}
            onChange={(e) => {
              setTranscript(e.target.value);
              textBeforeRecRef.current = e.target.value; // Sync manual typing to base
            }}
          />
          <button 
            onClick={() => handleGenerateQuote(transcript)}
            disabled={isGenerating}
            className={`w-full ${isGenerating ? 'bg-slate-600 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 active:scale-95'} text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2`}
          >
            {isGenerating ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {t('parsingAi')}</> : t('buildQuote')}
          </button>
        </div>
      </div>
    );
  };

  const QuoteView = () => {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    // Calculations
    const laborCost = quote.laborHours * settings.hourlyRate * quote.multiplier;
    const materialsWholesale = quote.parts.reduce((sum, p) => sum + (p.cost * p.quantity), 0);
    const materialsMarkupAmount = materialsWholesale * (settings.markupPercent / 100);
    const materialsTotal = materialsWholesale + materialsMarkupAmount;
    const extrasTotal = (quote.includeServiceCar ? quote.serviceCarFee : 0) + (quote.includeTollParking ? quote.tollParkingFee : 0);
    
    const subtotal = laborCost + extrasTotal + materialsTotal;
    const tax = subtotal * (settings.vatPercent / 100);
    const total = subtotal + tax;

    const includeTermsSafe = quote.includeTerms !== false;
    const currentTerms = settings.termsText || t('termsDisclaimer');

    const updatePart = (index, field, value) => {
      const newParts = [...quote.parts];
      newParts[index][field] = value;
      setQuote({ ...quote, parts: newParts });
    };

    const generateCustomerQuoteText = () => {
      let text = `${t('profEst')}\n\n`;
      if (quote.notes) text += `${quote.notes}\n\n`;
      text += `${t('laborServ')}\n`;
      
      const rateLabel = quote.multiplier > 1 ? `${t('labor')} (${quote.multiplier}x)` : t('labor');
      text += `- ${rateLabel} (${quote.laborHours} ${t('hrs')}): ${formatMoney(laborCost)}\n`;
      
      if (quote.includeServiceCar) text += `- ${t('serviceCar')}: ${formatMoney(quote.serviceCarFee)}\n`;
      if (quote.includeTollParking) text += `- ${t('tollParking')}: ${formatMoney(quote.tollParkingFee)}\n`;
      text += `\n`;
      
      if (quote.parts.length > 0) {
          text += `${t('materialsParts')}\n`;
          quote.parts.forEach(p => {
              const priceWithMarkup = p.cost * (1 + settings.markupPercent/100);
              text += `- ${p.quantity}x ${p.name} (${formatMoney(priceWithMarkup * p.quantity)})\n`;
          });
          text += `\n`;
      }
      text += `${t('subtotal')}: ${formatMoney(subtotal)}\n`;
      text += `${t('vat')} (${settings.vatPercent}%): ${formatMoney(tax)}\n`;
      text += `${t('grandTotal')} ${formatMoney(total)}\n\n`;
      text += t('valid30');

      if (includeTermsSafe) text += `\n\n${t('termsLabel')}:\n${currentTerms}`;
      return text;
    };

    const handlePrint = () => window.print();

    const handleResetQuote = () => {
      setQuote({ ...DEFAULT_QUOTE_TEMPLATE, id: Date.now(), serviceCarFee: settings.serviceCarFee, tollParkingFee: settings.tollParkingFee, includeTerms: quote.includeTerms });
      showToast(t('resetQuote') + "!");
    };

    return (
      <>
      <div className="max-w-2xl mx-auto w-full pb-6 space-y-6 animate-fade-in no-print-area">
        
        {/* Top Actions: History & Reset */}
        <div className="flex justify-between pt-2">
          <button onClick={() => setIsHistoryOpen(true)} className="flex items-center gap-1 text-sm font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 active:scale-95">
            <History size={16} className="text-orange-500" /> {t('history')}
          </button>
          <button onClick={handleResetQuote} className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-red-500 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 active:scale-95">
            <Trash2 size={16} /> {t('resetQuote')}
          </button>
        </div>

        {/* Customer Details Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Building2 size={20} className="text-orange-500" /> {t('customerDetails')}
          </h3>
          <textarea 
            className="w-full p-3 border rounded-xl bg-slate-50 focus:border-orange-500 focus:bg-white transition-colors resize-none h-24"
            placeholder={t('customerDetails') + " (Optional)"}
            value={quote.customerDetails || ''}
            onChange={(e) => setQuote({...quote, customerDetails: e.target.value})}
          />
        </div>

        {/* Quick Suggestions */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t('dontForget')}</h3>
          <div className="flex overflow-x-auto gap-2 pb-2" style={{ scrollbarWidth: 'none' }}>
            {SUGGESTIONS.map(s => (
              <button 
                key={s.code} onClick={() => setQuote({...quote, parts: [...quote.parts, { name: t(s.tKey), code: s.code, cost: s.cost, quantity: 1, quoteItemId: Math.random().toString(36).substr(2, 9) }]})}
                className="flex-shrink-0 flex items-center gap-1 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg text-sm font-semibold border border-orange-200 active:bg-orange-100 transition-colors"
              >
                <Plus size={16} /> {t(s.tKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Labor & Fees Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Wrench size={20} className="text-orange-500" /> {t('labor')} & {t('extraFees')}
           </h3>
           
           <div className="space-y-4">
             {/* Hours */}
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
               <span className="font-medium text-slate-700">{t('estHours')}</span>
               <div className="flex items-center gap-2">
                 <input type="number" min="0" step="0.5" className="w-20 p-2 border rounded-md text-right font-bold focus:border-orange-500 focus:ring-0" value={quote.laborHours} onChange={(e) => setQuote({...quote, laborHours: parseFloat(e.target.value) || 0})} />
                 <span className="text-slate-500 font-medium">{t('hrs')}</span>
               </div>
             </div>

             {/* Overtime Multiplier Pills */}
             <div>
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{t('multiplier')}</label>
               <div className="flex bg-slate-100 p-1 rounded-lg">
                 {[ { v: 1, l: t('normal') }, { v: 1.5, l: t('evening') }, { v: 2, l: t('weekend') } ].map(m => (
                   <button
                      key={m.v} onClick={() => setQuote({...quote, multiplier: m.v})}
                      className={`flex-1 text-xs sm:text-sm font-bold py-2 rounded-md transition-all ${quote.multiplier === m.v ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-700'}`}
                   >
                     {m.l}
                   </button>
                 ))}
               </div>
             </div>

             {/* Extra Fees Toggles */}
             <div className="pt-2 space-y-3">
               <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                     <input type="checkbox" checked={quote.includeServiceCar} onChange={e => setQuote({...quote, includeServiceCar: e.target.checked})} className="w-5 h-5 accent-orange-500 rounded cursor-pointer" />
                     <span className="font-medium text-slate-700">{t('serviceCar')}</span>
                  </label>
                  {quote.includeServiceCar && (
                     <input type="number" value={quote.serviceCarFee} onChange={e => setQuote({...quote, serviceCarFee: parseFloat(e.target.value)||0})} className="w-24 p-2 border rounded-lg text-right font-bold focus:border-orange-500 bg-slate-50" />
                  )}
               </div>
               <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                     <input type="checkbox" checked={quote.includeTollParking} onChange={e => setQuote({...quote, includeTollParking: e.target.checked})} className="w-5 h-5 accent-orange-500 rounded cursor-pointer" />
                     <span className="font-medium text-slate-700">{t('tollParking')}</span>
                  </label>
                  {quote.includeTollParking && (
                     <input type="number" value={quote.tollParkingFee} onChange={e => setQuote({...quote, tollParkingFee: parseFloat(e.target.value)||0})} className="w-24 p-2 border rounded-lg text-right font-bold focus:border-orange-500 bg-slate-50" />
                  )}
               </div>
             </div>
           </div>
        </div>

        {/* Parts Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <Box size={20} className="text-orange-500" /> {t('partsMat')}
             </h3>
             <button onClick={() => setQuote({...quote, parts: [...quote.parts, { name: '', code: '', cost: 0, quantity: 1, quoteItemId: Math.random().toString(36).substr(2, 9) }]})} className="text-orange-600 font-semibold flex items-center gap-1 text-sm bg-orange-50 px-3 py-1.5 rounded-lg">
                <Plus size={16} /> {t('addItem')}
             </button>
           </div>
           
           <datalist id="pricebook-parts">
             {priceBook.map(p => <option key={p.id} value={p.name} />)}
           </datalist>

           <div className="space-y-3">
             {quote.parts.length === 0 && <p className="text-slate-400 text-sm italic py-4 text-center">{t('noParts')}</p>}
             {quote.parts.map((part, index) => (
                <div key={part.quoteItemId} className={`p-4 rounded-xl border-2 flex flex-col gap-3 transition-colors ${(!part.cost || part.cost <= 0) ? 'bg-yellow-50/50 border-yellow-400' : 'bg-white border-slate-100 shadow-sm'}`}>
                  {(!part.cost || part.cost <= 0) && (
                    <div className="flex items-center gap-1 text-yellow-700 text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle size={14} /> {t('missingPrice')}
                    </div>
                  )}
                  <div className="flex justify-between items-start gap-2">
                    <input 
                        list="pricebook-parts"
                        className="font-bold text-slate-800 bg-transparent border-b-2 border-dashed border-slate-300 focus:border-orange-500 focus:outline-none flex-1 pb-1 w-full" 
                        value={part.name}
                        placeholder="Item name..."
                        onChange={(e) => {
                          const selected = priceBook.find(p => p.name === e.target.value);
                          if (selected) { updatePart(index, 'cost', selected.cost); updatePart(index, 'code', selected.code); }
                          updatePart(index, 'name', e.target.value);
                        }}
                    />
                    <button onClick={() => { const n = [...quote.parts]; n.splice(index, 1); setQuote({...quote, parts: n})}} className="text-red-400 hover:text-red-600 p-2 bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <span className="text-slate-500 text-sm font-medium">{t('qty')}:</span>
                        <input type="number" min="1" className="w-16 p-2 border rounded-lg bg-slate-50 font-bold focus:border-orange-500" value={part.quantity} onChange={(e) => updatePart(index, 'quantity', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                        <span className="text-slate-500 text-sm font-medium">{t('wholesale')}:</span>
                        <input type="number" min="0" className="w-24 p-2 border rounded-lg bg-slate-50 font-bold text-right focus:border-orange-500" value={part.cost || ''} placeholder="0.00" onChange={(e) => updatePart(index, 'cost', parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>
                </div>
             ))}
           </div>
        </div>

        {/* Grand Total Summary Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-3xl transform translate-x-10 -translate-y-10 pointer-events-none"></div>
          
          <h3 className="font-bold text-xl border-b border-slate-700 pb-3 mb-4 text-slate-100">{t('summary')}</h3>
          <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>{t('laborFee')} {quote.multiplier > 1 && `(${quote.multiplier}x)`}:</span>
                <span className="font-medium text-white">{formatMoney(laborCost)}</span>
              </div>
              {extrasTotal > 0 && (
                <div className="flex justify-between">
                  <span>{t('extraFees')}:</span>
                  <span className="font-medium text-white">{formatMoney(extrasTotal)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t('matCost')}:</span>
                <span className="font-medium text-white">{formatMoney(materialsWholesale)}</span>
              </div>
              <div className="flex justify-between text-orange-300 text-sm">
                <span>+ {settings.markupPercent}% {t('markup')}:</span>
                <span>{formatMoney(materialsMarkupAmount)}</span>
              </div>
              
              <div className="flex justify-between font-bold mt-4 pt-4 border-t border-slate-700 text-lg text-white">
                <span>{t('subtotal')}:</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>{t('vat')} ({settings.vatPercent}%):</span>
                <span>{formatMoney(tax)}</span>
              </div>
              <div className="flex justify-between font-black text-3xl text-orange-500 mt-4 pt-4 border-t border-slate-700">
                <span>{t('total')}:</span>
                <span>{formatMoney(total)}</span>
              </div>
          </div>
        </div>

        {/* Terms Toggle */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <span className="font-bold text-slate-700">{t('includeTerms')}</span>
          <button 
            onClick={() => setQuote({...quote, includeTerms: !includeTermsSafe})}
            className={`w-14 h-7 rounded-full transition-colors flex items-center px-1 shadow-inner ${includeTermsSafe ? 'bg-orange-500 justify-end' : 'bg-slate-300 justify-start'}`}
          >
            <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <button onClick={() => copyToClipboard(generateCustomerQuoteText(), t('quoteCopied'))} className="flex-1 bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2">
              <Copy size={20} /> <span className="hidden sm:inline">{t('copyQuote')}</span><span className="sm:hidden">Copy</span>
            </button>
            <button onClick={handlePrint} className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2">
              <Download size={20} /> <span className="hidden sm:inline">{t('downloadPdf')}</span><span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

      </div>

      {/* History Modal Overlay */}
      {isHistoryOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end sm:items-center justify-center animate-fade-in p-4 no-print-area">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><History size={20} className="text-orange-500"/> {t('history')}</h2>
               <button onClick={() => setIsHistoryOpen(false)} className="p-2 bg-white rounded-full text-slate-500 hover:text-slate-800 shadow-sm"><X size={20}/></button>
             </div>
             <div className="p-4 overflow-y-auto space-y-3 bg-slate-50 flex-1">
               {quoteHistory.length === 0 && <p className="text-center text-slate-400 py-8 font-medium">{t('historyEmpty')}</p>}
               {quoteHistory.map(historyItem => (
                 <div key={historyItem.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col gap-2">
                   <div className="flex justify-between items-start">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{new Date(historyItem.id).toLocaleString(settings.language, { dateStyle: 'short', timeStyle: 'short' })}</span>
                     <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded text-sm">{historyItem.laborHours} {t('hrs')} | {historyItem.parts.length} parts</span>
                   </div>
                   <p className="text-sm text-slate-600 line-clamp-2 italic">"{historyItem.notes || 'No description'}"</p>
                   <button 
                     onClick={() => { setQuote(historyItem); setIsHistoryOpen(false); showToast("Quote Loaded"); }}
                     className="mt-2 bg-orange-50 text-orange-600 font-bold py-2 rounded-lg text-sm hover:bg-orange-100 transition-colors w-full border border-orange-200"
                   >
                     {t('loadQuote')}
                   </button>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}

      {/* Print/PDF Section */}
      <div className="print-only-area hidden">
         <div className="flex justify-between border-b-2 border-slate-200 pb-6 mb-6">
           <div>
             <h1 className="text-3xl font-black text-slate-900">{settings.companyName || 'PlumbBid Estimate'}</h1>
             {settings.orgNo && <p className="text-slate-600 mt-1">{t('orgNo')}: {settings.orgNo}</p>}
             {settings.contactInfo && <p className="text-slate-600">{settings.contactInfo}</p>}
           </div>
           <div className="text-right">
             <h2 className="text-2xl font-bold text-orange-600 uppercase tracking-widest">{t('profEst')}</h2>
             <p className="text-slate-500 mt-1 font-medium">{new Date().toLocaleDateString(settings.language)}</p>
           </div>
         </div>
         
         {(quote.customerDetails) && (
           <div className="mb-8 p-4 bg-slate-50 rounded-lg">
             <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-2">{t('customerDetails')}:</h3>
             <p className="whitespace-pre-wrap font-medium">{quote.customerDetails}</p>
           </div>
         )}

         <table className="w-full mb-8 text-sm">
           <thead>
             <tr className="border-b-2 border-slate-800 text-left text-slate-700">
               <th className="pb-3 font-bold">{t('desc') || 'Description'}</th>
               <th className="pb-3 text-right font-bold">{t('qty')}</th>
               <th className="pb-3 text-right font-bold">{t('price') || 'Price'}</th>
               <th className="pb-3 text-right font-bold">{t('total')}</th>
             </tr>
           </thead>
           <tbody className="text-slate-800">
             <tr className="border-b border-slate-200">
               <td className="py-3 font-medium">{t('labor')} {quote.multiplier > 1 && `(${quote.multiplier}x)`}</td>
               <td className="py-3 text-right">{quote.laborHours}</td>
               <td className="py-3 text-right">{formatMoney(settings.hourlyRate * quote.multiplier)}</td>
               <td className="py-3 text-right font-semibold">{formatMoney(laborCost)}</td>
             </tr>
             {quote.includeServiceCar && (
               <tr className="border-b border-slate-200">
                 <td className="py-3 font-medium">{t('serviceCar')}</td>
                 <td className="py-3 text-right">1</td>
                 <td className="py-3 text-right">{formatMoney(quote.serviceCarFee)}</td>
                 <td className="py-3 text-right font-semibold">{formatMoney(quote.serviceCarFee)}</td>
               </tr>
             )}
             {quote.includeTollParking && (
               <tr className="border-b border-slate-200">
                 <td className="py-3 font-medium">{t('tollParking')}</td>
                 <td className="py-3 text-right">1</td>
                 <td className="py-3 text-right">{formatMoney(quote.tollParkingFee)}</td>
                 <td className="py-3 text-right font-semibold">{formatMoney(quote.tollParkingFee)}</td>
               </tr>
             )}
             {quote.parts.map((p, i) => {
               const priceWithMarkup = p.cost * (1 + settings.markupPercent/100);
               return (
                 <tr key={i} className="border-b border-slate-100">
                   <td className="py-3 font-medium">{p.name}</td>
                   <td className="py-3 text-right">{p.quantity}</td>
                   <td className="py-3 text-right">{formatMoney(priceWithMarkup)}</td>
                   <td className="py-3 text-right font-semibold">{formatMoney(priceWithMarkup * p.quantity)}</td>
                 </tr>
               )
             })}
           </tbody>
         </table>

         <div className="flex justify-end mb-12">
           <div className="w-full max-w-sm">
             <div className="flex justify-between py-2 text-slate-600">
               <span className="font-medium">{t('subtotal')}:</span>
               <span className="font-bold">{formatMoney(subtotal)}</span>
             </div>
             <div className="flex justify-between py-2 text-slate-600">
               <span className="font-medium">{t('vat')} ({settings.vatPercent}%):</span>
               <span className="font-bold">{formatMoney(tax)}</span>
             </div>
             <div className="flex justify-between py-4 text-xl border-t-2 border-slate-800 mt-2 text-slate-900">
               <span className="font-black">{t('grandTotal')}:</span>
               <span className="font-black">{formatMoney(total)}</span>
             </div>
           </div>
         </div>

         {includeTermsSafe && (
           <div className="text-xs text-slate-500 mt-8 pt-6 border-t-2 border-slate-100">
             <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-3">{t('termsLabel')}</h4>
             <p className="whitespace-pre-wrap leading-relaxed">{currentTerms}</p>
           </div>
         )}
      </div>
      </>
    );
  };

  const PriceBookView = () => { /* Logic Preserved From Previous Artifacts */
    const [search, setSearch] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', code: '', cost: 0 });

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const text = evt.target.result;
          const newParts = text.split('\n').map(line => {
            const parts = line.split(',');
            if (parts.length >= 3) {
               const name = parts[0].trim();
               const code = parts[1].trim();
               const cost = parseFloat(parts[2].trim()) || 0;
               if (name && code) return { id: Math.random().toString(36).substr(2, 9), name, code, cost };
            }
            return null;
          }).filter(Boolean);
          
          if (newParts.length > 0) { setPriceBook(prev => [...newParts, ...prev]); showToast(`Imported ${newParts.length} parts!`); }
          else { showToast("No valid parts found."); }
        } catch (err) { showToast("Error parsing CSV."); }
      };
      reader.readAsText(file);
      e.target.value = null;
    };

    const handleAddNew = () => {
      if(newItem.name && newItem.cost) {
        setPriceBook([{...newItem, id: Math.random().toString(36).substr(2,9)}, ...priceBook]);
        setIsAdding(false); setNewItem({ name: '', code: '', cost: 0 }); showToast("Part added");
      }
    };

    const deletePart = (id) => setPriceBook(priceBook.filter(p => p.id !== id));
    const filteredList = priceBook.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase())).slice(0, 100);

    return (
      <div className="max-w-2xl mx-auto w-full space-y-4 animate-fade-in pb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">{t('localPb')}</h2>
            <div className="flex gap-2">
              <label className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg font-medium cursor-pointer hover:bg-slate-200 transition-colors flex items-center gap-1 text-sm"><Upload size={16}/> CSV<input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} /></label>
              <button onClick={() => setIsAdding(!isAdding)} className="bg-orange-500 text-white px-3 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-1 text-sm shadow-sm"><Plus size={16}/> {t('addPart')}</button>
            </div>
          </div>
          {isAdding && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 animate-fade-in">
               <input placeholder="Part Name" className="w-full p-2 border rounded-lg" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
               <div className="flex gap-3">
                 <input placeholder="Code" className="w-1/2 p-2 border rounded-lg" value={newItem.code} onChange={e => setNewItem({...newItem, code: e.target.value})} />
                 <input type="number" placeholder="Cost" className="w-1/2 p-2 border rounded-lg" value={newItem.cost || ''} onChange={e => setNewItem({...newItem, cost: parseFloat(e.target.value) || 0})} />
               </div>
               <div className="flex justify-end gap-2 mt-2">
                 <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-500 font-medium">Cancel</button>
                 <button onClick={handleAddNew} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Save</button>
               </div>
            </div>
          )}
          <input type="text" placeholder={t('searchParts')} className="w-full p-3 border-2 border-slate-100 bg-slate-50 rounded-xl focus:border-orange-500 focus:bg-white transition-colors" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="space-y-2">
          {filteredList.map(part => (
             <div key={part.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div><h4 className="font-bold text-slate-800">{part.name}</h4><p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1">CODE: {part.code || 'N/A'}</p></div>
                <div className="flex items-center gap-4"><span className="font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded">{formatMoney(part.cost)}</span><button onClick={() => deletePart(part.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button></div>
             </div>
          ))}
          {filteredList.length === 0 && <p className="text-center text-slate-400 py-8 italic">{t('noPartsFound')}</p>}
        </div>
      </div>
    );
  };

  const SettingsView = () => {
    const updateSetting = (key, value) => setSettings(prev => ({...prev, [key]: value}));

    return (
      <div className="max-w-2xl mx-auto w-full space-y-6 animate-fade-in pb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3"><Building2 className="text-orange-500" size={20}/> {t('companyName') || 'Company Details'}</h3>
           <div className="space-y-4">
              <div className="flex flex-col gap-2"><label className="text-slate-600 font-medium">{t('companyName')}</label><input type="text" placeholder={t('phCompany')} className="border-2 border-slate-100 rounded-lg p-2 font-medium focus:border-orange-500 w-full" value={settings.companyName || ''} onChange={e => updateSetting('companyName', e.target.value)} /></div>
              <div className="flex flex-col gap-2"><label className="text-slate-600 font-medium">{t('orgNo')}</label><input type="text" placeholder={t('phOrg')} className="border-2 border-slate-100 rounded-lg p-2 font-medium focus:border-orange-500 w-full" value={settings.orgNo || ''} onChange={e => updateSetting('orgNo', e.target.value)} /></div>
              <div className="flex flex-col gap-2"><label className="text-slate-600 font-medium">{t('contactInfo')}</label><input type="text" placeholder={t('phContact')} className="border-2 border-slate-100 rounded-lg p-2 font-medium focus:border-orange-500 w-full" value={settings.contactInfo || ''} onChange={e => updateSetting('contactInfo', e.target.value)} /></div>
           </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3"><FileText className="text-orange-500" size={20}/> {t('termsLabel')}</h3>
           <div className="space-y-4">
              <div className="flex flex-col gap-2">
                  <p className="text-xs text-slate-500 mb-2">{t('termsLabel')} will be attached to PDF quotes and text copies if enabled.</p>
                  <textarea className="border-2 border-slate-100 rounded-lg p-3 font-medium focus:border-orange-500 w-full h-40 resize-none text-sm text-slate-700" value={settings.termsText !== undefined ? settings.termsText : t('termsDisclaimer')} onChange={e => updateSetting('termsText', e.target.value)} />
                  <button onClick={() => updateSetting('termsText', t('termsDisclaimer'))} className="text-xs text-orange-600 font-semibold self-end mt-1 hover:underline">Reset to Default</button>
              </div>
           </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3"><Settings className="text-orange-500" size={20}/> {t('ratesFees')}</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center"><label className="text-slate-600 font-medium">{t('hourlyRate')}</label><input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-24 text-right font-bold focus:border-orange-500" value={settings.hourlyRate} onChange={e => updateSetting('hourlyRate', parseFloat(e.target.value)||0)} /></div>
              <div className="flex justify-between items-center"><label className="text-slate-600 font-medium">{t('serviceCar')}</label><input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-24 text-right font-bold focus:border-orange-500" value={settings.serviceCarFee} onChange={e => updateSetting('serviceCarFee', parseFloat(e.target.value)||0)} /></div>
              <div className="flex justify-between items-center"><label className="text-slate-600 font-medium">{t('tollParking')}</label><input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-24 text-right font-bold focus:border-orange-500" value={settings.tollParkingFee} onChange={e => updateSetting('tollParkingFee', parseFloat(e.target.value)||0)} /></div>
              <div className="flex justify-between items-center"><label className="text-slate-600 font-medium">{t('matMarkup')}</label><div className="flex items-center gap-1"><input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-20 text-right font-bold focus:border-orange-500" value={settings.markupPercent} onChange={e => updateSetting('markupPercent', parseFloat(e.target.value)||0)} /><span className="text-slate-400 font-bold">%</span></div></div>
              <div className="flex justify-between items-center"><label className="text-slate-600 font-medium">{t('vatMva')}</label><div className="flex items-center gap-1"><input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-20 text-right font-bold focus:border-orange-500" value={settings.vatPercent} onChange={e => updateSetting('vatPercent', parseFloat(e.target.value)||0)} /><span className="text-slate-400 font-bold">%</span></div></div>
           </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3"><Settings className="text-orange-500" size={20}/> {t('loc')}</h3>
           <div className="space-y-4">
              <div className="flex flex-col gap-2">
                  <label className="text-slate-600 font-medium">{t('currency')}</label>
                  <select className="border-2 border-slate-100 rounded-lg p-2 bg-slate-50 font-bold focus:border-orange-500 w-full" value={settings.currency} onChange={e => updateSetting('currency', e.target.value)}>
                    <option value="NOK">NOK</option><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="SEK">SEK</option>
                  </select>
              </div>
              <div className="flex flex-col gap-2">
                  <label className="text-slate-600 font-medium">{t('dictLang')}</label>
                  <select className="border-2 border-slate-100 rounded-lg p-2 bg-slate-50 font-bold focus:border-orange-500 w-full" value={settings.language} onChange={e => updateSetting('language', e.target.value)}>
                    <option value="no-NO">Norwegian (NO)</option><option value="en-US">English (US)</option><option value="en-GB">English (UK)</option><option value="sv-SE">Swedish (SE)</option><option value="de-DE">German (DE)</option><option value="es-ES">Spanish (ES)</option>
                  </select>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-200 overflow-hidden">
      {toast && (<div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-[100] animate-fade-in text-sm font-semibold flex items-center gap-2"><Check size={16} className="text-green-400" /> {toast}</div>)}
      <header className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-2"><div className="bg-orange-500 p-1.5 rounded-lg shadow-inner"><Wrench size={22} className="text-white" /></div><h1 className="text-xl font-black tracking-wider text-slate-50">PlumbBid</h1></div>
        <div className="text-xs font-bold bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">PRO</div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-8" style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
        {activeTab === 'input' && <InputView />}
        {activeTab === 'quote' && <QuoteView />}
        {activeTab === 'book' && <PriceBookView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around items-center h-[4.5rem] pb-[env(safe-area-inset-bottom)] z-20 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {[{ id: 'input', icon: Mic, label: t('tabVoice') }, { id: 'quote', icon: Calculator, label: t('tabQuote') }, { id: 'book', icon: Book, label: t('tabParts') }, { id: 'settings', icon: Settings, label: t('tabSettings') }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === tab.id ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'}`}>
            <tab.icon size={24} className={activeTab === tab.id ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === tab.id ? 'text-orange-600' : ''}`}>{tab.label}</span>
          </button>
        ))}
      </nav>
      <style dangerouslySetInnerHTML={{__html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; } ::-webkit-scrollbar { width: 6px; height: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #94a3b8; } @media print { body, html { background-color: white !important; margin: 0; padding: 0; } header, nav, .no-print-area { display: none !important; } .print-only-area { display: block !important; width: 100%; color: black; } @page { margin: 1.5cm; } }`}} />
    </div>
  );
}
