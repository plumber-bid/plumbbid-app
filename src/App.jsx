import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Calculator, Book, Settings, Trash2, 
  Plus, Check, Wrench, AlertTriangle, FileText, 
  Upload, Copy, Box
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    voiceTitle: 'Job Recorder', voiceDesc: "Speak or type your job details. We'll automatically extract hours and parts.", tapToSpeak: 'Tap to Speak', listening: 'Listening...', voicePlaceholder: 'E.g., Replaced a 200L water heater and two 22mm ball valves. Took about 3 hours.', buildQuote: 'Build Quote', parsingAi: 'Parsing AI...',
    dontForget: "Don't Forget Check", labor: 'Labor', estHours: 'Estimated Hours', hrs: 'hrs', partsMat: 'Parts & Materials', addItem: 'Add Item', noParts: 'No parts added yet.', missingPrice: 'Missing Wholesale Price', qty: 'Qty', wholesale: 'Wholesale',
    summary: 'Quote Summary', laborFee: 'Labor & Service Fee', matCost: 'Materials (Cost)', markup: 'Material Markup', subtotal: 'Subtotal', vat: 'VAT', total: 'Total', copyQuote: 'Copy Customer Quote', copyList: 'Copy Wholesaler Pick-List',
    profEst: 'Professional Estimate', laborServ: 'Labor & Services:', calloutFeeQuote: 'Callout/Service Fee:', materialsParts: 'Materials & Parts:', grandTotal: 'Grand Total:', valid30: 'Valid for 30 days. Let me know if you would like to proceed!', supplyList: 'Supply House Pick-List', reqAsap: 'Required for job ASAP.',
    localPb: 'Local Price Book', addPart: 'Add Part', searchParts: 'Search parts by name or code...', noPartsFound: 'No parts found.',
    ratesFees: 'Rates & Fees', hourlyRate: 'Hourly Rate', calloutService: 'Callout / Service Fee', matMarkup: 'Material Markup %', vatMva: 'VAT / MVA %', aiInt: 'AI Integration', loc: 'Localization', currency: 'Currency', dictLang: 'Dictation & Output Language',
    tabVoice: 'Voice', tabQuote: 'Quote', tabParts: 'Parts', tabSettings: 'Settings',
    suggPtfe: 'PTFE Tape', suggSilicone: 'Silicone Sealant', suggOlives: 'Compression Olives', suggDisposal: 'Old Unit Disposal'
  },
  no: {
    voiceTitle: 'Jobbregistrering', voiceDesc: "Snakk eller skriv inn jobbdetaljene. Vi trekker automatisk ut timer og deler.", tapToSpeak: 'Trykk for å snakke', listening: 'Lytter...', voicePlaceholder: 'F.eks., Byttet en 200L varmtvannsbereder og to 22mm kuleventiler. Brukte ca 3 timer.', buildQuote: 'Bygg tilbud', parsingAi: 'Tolker med AI...',
    dontForget: "Ikke glem", labor: 'Arbeid', estHours: 'Estimerte timer', hrs: 'timer', partsMat: 'Deler & Materiell', addItem: 'Legg til', noParts: 'Ingen deler lagt til ennå.', missingPrice: 'Mangler innkjøpspris', qty: 'Ant', wholesale: 'Innkjøp',
    summary: 'Sammendrag', laborFee: 'Arbeid & Oppmøte', matCost: 'Materiell (Innkjøp)', markup: 'Påslag', subtotal: 'Subtotal', vat: 'MVA', total: 'Total', copyQuote: 'Kopier tilbud til kunde', copyList: 'Kopier plukkliste',
    profEst: 'Pristilbud', laborServ: 'Arbeid & Tjenester:', calloutFeeQuote: 'Oppmøte/Servicebil:', materialsParts: 'Deler & Materiell:', grandTotal: 'Totalsum:', valid30: 'Gyldig i 30 dager. Gi meg beskjed om du ønsker å gå videre!', supplyList: 'Plukkliste', reqAsap: 'Trengs til jobb ASAP.',
    localPb: 'Lokal Prisbok', addPart: 'Ny del', searchParts: 'Søk etter navn eller NRF/kode...', noPartsFound: 'Ingen deler funnet.',
    ratesFees: 'Priser & Avgifter', hourlyRate: 'Timepris', calloutService: 'Oppmøte / Servicebil', matMarkup: 'Påslag Materiell %', vatMva: 'MVA %', aiInt: 'AI Integrasjon', loc: 'Lokalisering', currency: 'Valuta', dictLang: 'Diktering og utspråk',
    tabVoice: 'Stemme', tabQuote: 'Tilbud', tabParts: 'Prisbok', tabSettings: 'Innstill.',
    suggPtfe: 'Gjengeteip', suggSilicone: 'Silikon', suggOlives: 'Klemringer', suggDisposal: 'Kassering / Miljøgebyr'
  },
  sv: {
    voiceTitle: 'Jobbregistrering', voiceDesc: "Prata eller skriv in dina jobbdetaljer. Vi extraherar automatiskt timmar och delar.", tapToSpeak: 'Tryck för att prata', listening: 'Lyssnar...', voicePlaceholder: 'T.ex., Bytte en 200L varmvattenberedare och två 22mm kulventiler. Tog ca 3 timmar.', buildQuote: 'Skapa offert', parsingAi: 'Tolkar med AI...',
    dontForget: "Glöm inte", labor: 'Arbete', estHours: 'Uppskattade timmar', hrs: 'tim', partsMat: 'Delar & Material', addItem: 'Lägg till', noParts: 'Inga delar tillagda ännu.', missingPrice: 'Saknar inköpspris', qty: 'Antal', wholesale: 'Inköp',
    summary: 'Sammanfattning', laborFee: 'Arbete & Inställelse', matCost: 'Material (Inköp)', markup: 'Påslag', subtotal: 'Subtotal', vat: 'Moms', total: 'Total', copyQuote: 'Kopiera kundoffert', copyList: 'Kopiera plocklista',
    profEst: 'Professionell Offert', laborServ: 'Arbete & Tjänster:', calloutFeeQuote: 'Inställelseavgift:', materialsParts: 'Delar & Material:', grandTotal: 'Totalsumma:', valid30: 'Giltig i 30 dagar. Meddela mig om du vill gå vidare!', supplyList: 'Plocklista', reqAsap: 'Behövs till jobb ASAP.',
    localPb: 'Lokal Prisbok', addPart: 'Ny del', searchParts: 'Sök på namn eller RSK/kod...', noPartsFound: 'Inga delar hittades.',
    ratesFees: 'Priser & Avgifter', hourlyRate: 'Timpris', calloutService: 'Inställelseavgift', matMarkup: 'Påslag Material %', vatMva: 'Moms %', aiInt: 'AI Integration', loc: 'Lokalisering', currency: 'Valuta', dictLang: 'Språk',
    tabVoice: 'Röst', tabQuote: 'Offert', tabParts: 'Prisbok', tabSettings: 'Inställ.',
    suggPtfe: 'Gängtejp', suggSilicone: 'Silikon', suggOlives: 'Klämringar', suggDisposal: 'Bortskaffande avgift'
  },
  de: {
    voiceTitle: 'Auftragsaufnahme', voiceDesc: "Sprechen oder tippen Sie. Wir extrahieren Stunden und Teile.", tapToSpeak: 'Sprechen', listening: 'Hört zu...', voicePlaceholder: 'Z.B. Einen 200L Boiler und zwei 22mm Kugelventile ausgetauscht.', buildQuote: 'Angebot erstellen', parsingAi: 'KI verarbeitet...',
    dontForget: "Nicht vergessen", labor: 'Arbeitszeit', estHours: 'Geschätzte Stunden', hrs: 'Std', partsMat: 'Teile & Material', addItem: 'Hinzufügen', noParts: 'Noch keine Teile hinzugefügt.', missingPrice: 'Preis fehlt', qty: 'Menge', wholesale: 'Einkauf',
    summary: 'Zusammenfassung', laborFee: 'Arbeit & Anfahrt', matCost: 'Material (Einkauf)', markup: 'Materialaufschlag', subtotal: 'Zwischensumme', vat: 'MwSt.', total: 'Gesamt', copyQuote: 'Kundenangebot kopieren', copyList: 'Materialliste kopieren',
    profEst: 'Kostenvoranschlag', laborServ: 'Arbeit & Dienstleistungen:', calloutFeeQuote: 'Anfahrt/Servicepauschale:', materialsParts: 'Teile & Material:', grandTotal: 'Gesamtsumme:', valid30: '30 Tage gültig. Geben Sie Bescheid, ob wir fortfahren sollen!', supplyList: 'Material-Pickliste', reqAsap: 'Dringend für Auftrag benötigt.',
    localPb: 'Lokales Preisbuch', addPart: 'Teil hinzufügen', searchParts: 'Suchen...', noPartsFound: 'Keine Teile gefunden.',
    ratesFees: 'Preise & Gebühren', hourlyRate: 'Stundensatz', calloutService: 'Anfahrt / Service', matMarkup: 'Materialaufschlag %', vatMva: 'MwSt. %', aiInt: 'KI-Integration', loc: 'Lokalisierung', currency: 'Währung', dictLang: 'Sprache',
    tabVoice: 'Sprache', tabQuote: 'Angebot', tabParts: 'Preisbuch', tabSettings: 'Einstell.',
    suggPtfe: 'Teflonband', suggSilicone: 'Silikon', suggOlives: 'Klemmringe', suggDisposal: 'Entsorgung'
  },
  es: {
    voiceTitle: 'Registro de Trabajo', voiceDesc: "Hable o escriba. Extraemos horas y piezas.", tapToSpeak: 'Tocar para hablar', listening: 'Escuchando...', voicePlaceholder: 'Ej: Reemplazado calentador 200L y dos válvulas de 22mm.', buildQuote: 'Crear Presup.', parsingAi: 'Procesando IA...',
    dontForget: "No Olvidar", labor: 'Mano de Obra', estHours: 'Horas Estimadas', hrs: 'hrs', partsMat: 'Piezas y Materiales', addItem: 'Añadir', noParts: 'No hay piezas añadidas.', missingPrice: 'Falta precio', qty: 'Cant', wholesale: 'Mayorista',
    summary: 'Resumen', laborFee: 'Trabajo y Desplazamiento', matCost: 'Materiales (Costo)', markup: 'Margen', subtotal: 'Subtotal', vat: 'IVA', total: 'Total', copyQuote: 'Copiar Presupuesto', copyList: 'Copiar Lista',
    profEst: 'Presupuesto Profesional', laborServ: 'Mano de Obra y Servicios:', calloutFeeQuote: 'Desplazamiento/Servicio:', materialsParts: 'Materiales y Piezas:', grandTotal: 'Total:', valid30: 'Válido por 30 días. ¡Avíseme si desea continuar!', supplyList: 'Lista de Materiales', reqAsap: 'Requerido para trabajo urgente.',
    localPb: 'Catálogo de Precios', addPart: 'Añadir Pieza', searchParts: 'Buscar piezas...', noPartsFound: 'No se encontraron piezas.',
    ratesFees: 'Tarifas y Precios', hourlyRate: 'Tarifa Horaria', calloutService: 'Desplazamiento / Servicio', matMarkup: 'Margen Material %', vatMva: 'IVA %', aiInt: 'Integración IA', loc: 'Localización', currency: 'Moneda', dictLang: 'Idioma',
    tabVoice: 'Voz', tabQuote: 'Presup.', tabParts: 'Catálogo', tabSettings: 'Ajustes',
    suggPtfe: 'Cinta de teflón', suggSilicone: 'Silicona', suggOlives: 'Anillos de compresión', suggDisposal: 'Desecho viejo'
  }
};

// --- DEFAULT DATA & CONSTANTS ---
const DEFAULT_SETTINGS = {
  hourlyRate: 850,
  calloutFee: 500,
  markupPercent: 20,
  vatPercent: 25,
  currency: 'NOK',
  language: 'no-NO',
  geminiApiKey: ''
};

const DEFAULT_PRICE_BOOK = [
  { id: '1', name: 'OSO Hotwater 200L', code: '8000123', cost: 8500, keywords: ['oso', 'hotwater', 'water heater', 'varmtvannsbereder', 'bereder'] },
  { id: '2', name: '22mm Ball Valve', code: '5601001', cost: 450, keywords: ['ball valve', 'kuleventil', '22mm valve', 'stoppekran'] },
  { id: '3', name: '15mm Copper Pipe 2.5m', code: '1234567', cost: 300, keywords: ['copper pipe', 'kobberrør', 'cu-rør', '15mm pipe'] },
  { id: '4', name: '110mm PVC Pipe 3m', code: '3456789', cost: 250, keywords: ['pvc pipe', 'avløpsrør', 'pvc-rør', '110mm rør'] },
  { id: '5', name: 'Sink Mixer Tap', code: '4567890', cost: 1500, keywords: ['mixer tap', 'blandebatteri', 'servantbatteri', 'faucet', 'kran'] },
  { id: '6', name: '32mm Waste Trap', code: '5678901', cost: 180, keywords: ['waste trap', 'vannlås', 'siphon', '32mm trap'] },
  { id: '7', name: 'Toilet Bowl', code: '6789012', cost: 3200, keywords: ['toilet bowl', 'toalettskål', 'wc', 'klosett'] },
  { id: '8', name: 'Flush Button', code: '7890123', cost: 500, keywords: ['flush button', 'spyleknapp', 'trykkplate'] },
  { id: '9', name: '15mm Compression Elbow', code: '8901234', cost: 85, keywords: ['compression elbow', 'klemringsvinkel', 'albue', '15mm albue'] },
  { id: '10', name: 'Wall Box 15mm', code: '9012345', cost: 350, keywords: ['wall box', 'veggboks', '15mm veggboks'] },
];

const SUGGESTIONS = [
  { tKey: 'suggPtfe', code: 'CONS-01', cost: 25 },
  { tKey: 'suggSilicone', code: 'CONS-02', cost: 120 },
  { tKey: 'suggOlives', code: 'CONS-03', cost: 50 },
  { tKey: 'suggDisposal', code: 'SVC-01', cost: 400 },
];

export default function App() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('input');
  const [toast, setToast] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('plumbbid_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [priceBook, setPriceBook] = useState(() => {
    const saved = localStorage.getItem('plumbbid_pricebook');
    return saved ? JSON.parse(saved) : DEFAULT_PRICE_BOOK;
  });

  const [quote, setQuote] = useState(() => {
    const saved = localStorage.getItem('plumbbid_quote');
    return saved ? JSON.parse(saved) : { laborHours: 0, parts: [], notes: '' };
  });

  const langCode = settings.language.split('-')[0] || 'en';
  const t = (key) => TRANSLATIONS[langCode]?.[key] || TRANSLATIONS['en'][key] || key;

  // --- PERSISTENCE ---
  useEffect(() => { localStorage.setItem('plumbbid_settings', JSON.stringify(settings)); }, [settings]);
  useEffect(() => { localStorage.setItem('plumbbid_pricebook', JSON.stringify(priceBook)); }, [priceBook]);
  useEffect(() => { localStorage.setItem('plumbbid_quote', JSON.stringify(quote)); }, [quote]);

  // Inject PWA meta tags
  useEffect(() => {
    const metas = [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { name: 'theme-color', content: '#0f172a' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ];
    metas.forEach(({name, content}) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  }, []);

  // --- HELPERS ---
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

  // --- NLP & PARSING LOGIC ---
  const handleGenerateQuote = async (text) => {
    if (!text.trim()) {
      showToast("Please enter job notes first.");
      return;
    }

    if (!settings.geminiApiKey) {
      showToast("No API Key. Using advanced local fallback parser.");
      let extractedHours = 0;
      const hourRegex = /(\d+(?:\.\d+)?)\s*(?:hour|hours|hr|hrs|time|timer)/i;
      const hourMatch = text.match(hourRegex);
      if (hourMatch) extractedHours = parseFloat(hourMatch[1]);

      const normalizedText = text.toLowerCase();
      let matchedParts = [];

      // Remove the matched hour part and common filler phrases to isolate materials
      let remainingText = normalizedText.replace(hourRegex, '');
      remainingText = remainingText.replace(/(took about|brukte ca|approximately|estimated|i spent|jeg brukte)/gi, '');

      // Split by common English and Norwegian delimiters
      const chunks = remainingText.split(/,|\.| and | & | \+ | og | plus | med | inkludert | including | byttet | replaced /i);
      
      chunks.forEach(chunk => {
        let cleanChunk = chunk.trim();
        if (cleanChunk.length < 3) return; // Skip tiny text fragments

        let foundMatch = false;

        // 1. Check against Price Book with bilingual keyword support
        for (const part of priceBook) {
          const keywords = part.keywords || [];
          const searchTerms = [part.name.toLowerCase(), ...keywords];
          
          // Ensure base bilingual coverage even if user added custom parts without keywords
          if (part.name.includes('Hotwater') || part.name.includes('bereder')) searchTerms.push('varmtvannsbereder', 'bereder', 'water heater');
          if (part.name.includes('Valve') || part.name.includes('ventil')) searchTerms.push('kuleventil', 'stoppekran', 'valve');
          if (part.name.includes('Mixer') || part.name.includes('batteri')) searchTerms.push('blandebatteri', 'servantbatteri', 'faucet', 'kran');
          if (part.name.includes('Trap') || part.name.includes('vannlås')) searchTerms.push('vannlås', 'siphon', 'trap');

          if (searchTerms.some(term => cleanChunk.includes(term.toLowerCase()))) {
            if (!matchedParts.find(p => p.id === part.id)) {
              matchedParts.push({ 
                ...part, 
                quantity: 1, 
                quoteItemId: Math.random().toString(36).substr(2, 9) 
              });
            }
            foundMatch = true;
            break;
          }
        }

        // 2. If NO MATCH, intelligently add it as an unknown part (Needs Price)
        if (!foundMatch) {
           const noiseWords = ['a', 'the', 'an', 'en', 'et', 'to', 'jeg', 'i', 'was', 'var', 'det', 'it', 'some', 'noen', 'this', 'dette', 'til'];
           const words = cleanChunk.split(/\s+/);
           const isNoise = words.every(w => noiseWords.includes(w));
           
           if (!isNoise) {
             // Try to extract quantity (e.g., "two 22mm valves" or "to kuleventiler")
             let qty = 1;
             const qtyMatch = cleanChunk.match(/^(one|two|three|four|five|six|1|2|3|4|5|6|en|to|tre|fire|fem|seks)\s+/i);
             if (qtyMatch) {
                 const qMap = {'one':1, 'two':2, 'three':3, 'four':4, 'five':5, 'six':6, 'en':1, 'to':2, 'tre':3, 'fire':4, 'fem':5, 'seks':6};
                 qty = parseInt(qtyMatch[1]) || qMap[qtyMatch[1].toLowerCase()] || 1;
                 cleanChunk = cleanChunk.replace(qtyMatch[0], '').trim();
             }

             // Capitalize and push as an unpriced item to trigger the yellow warning UI
             const formattedName = cleanChunk.charAt(0).toUpperCase() + cleanChunk.slice(1);
             matchedParts.push({
                id: Math.random().toString(36).substr(2, 9),
                name: formattedName,
                code: '',
                cost: 0,
                quantity: qty,
                quoteItemId: Math.random().toString(36).substr(2, 9)
             });
           }
        }
      });

      setQuote({
        laborHours: extractedHours || 1, // default 1 hr if no hours detected
        parts: matchedParts,
        notes: text,
      });
      setActiveTab('quote');
      return;
    }

    setIsGenerating(true);
    try {
      const systemPrompt = `You are a plumbing estimator AI. Parse the plumber's raw voice notes into structured data.
      Requested Output Language: ${settings.language}.
      Task:
      1. Extract labor hours (number). Default to 1 if not specified.
      2. Match parts mentioned to the provided Price Book exactly.
      3. If a part is mentioned that is NOT in the Price Book, include it anyway with cost 0 and empty code so the plumber can price it later.
      4. Write a brief, professional customer-facing summary of the work in the requested output language.
      
      Price Book:
      ${JSON.stringify(priceBook.map(p => ({id: p.id, name: p.name, code: p.code, cost: p.cost})))}`;

      const payload = {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: `Job Notes: ${text}` }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              laborHours: { type: "NUMBER" },
              summaryNotes: { type: "STRING" },
              parts: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    id: { type: "STRING" },
                    name: { type: "STRING" },
                    code: { type: "STRING" },
                    cost: { type: "NUMBER" },
                    quantity: { type: "NUMBER" }
                  },
                  required: ["name", "cost", "quantity"]
                }
              }
            },
            required: ["laborHours", "summaryNotes", "parts"]
          }
        }
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${settings.geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("API Error");
      
      const result = await response.json();
      const jsonText = result.candidates[0].content.parts[0].text;
      const parsedData = JSON.parse(jsonText);

      const partsWithIds = parsedData.parts.map(p => ({
        ...p,
        quoteItemId: Math.random().toString(36).substr(2, 9),
        id: p.id || Math.random().toString(36).substr(2, 9),
        code: p.code || '',
        cost: p.cost || 0
      }));

      setQuote({
        laborHours: parsedData.laborHours || 1,
        parts: partsWithIds,
        notes: parsedData.summaryNotes || text,
      });
      
      setActiveTab('quote');
      showToast("Smart Quote generated with Gemini!");
    } catch (error) {
      console.error(error);
      showToast("AI Parsing failed. Check API key or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- SUB-COMPONENTS ---
  
  const InputView = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState(quote.notes || '');
    const recognitionRef = useRef(null);

    useEffect(() => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = settings.language;
        
        recognitionRef.current.onresult = (event) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
        };
        
        recognitionRef.current.onend = () => {
           setIsRecording(false);
        };
      }
    }, [settings.language]);

    const toggleRecording = () => {
      if (!recognitionRef.current) {
        showToast("Voice typing not supported on this browser.");
        return;
      }
      if (isRecording) {
        recognitionRef.current.stop();
        setIsRecording(false);
      } else {
        recognitionRef.current.start();
        setIsRecording(true);
      }
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
          <textarea 
            className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:ring-0 resize-none h-32 text-slate-800 placeholder-slate-400 transition-colors shadow-inner"
            placeholder={t('voicePlaceholder')}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          <button 
            onClick={() => handleGenerateQuote(transcript)}
            disabled={isGenerating}
            className={`w-full ${isGenerating ? 'bg-slate-600 cursor-not-allowed' : 'bg-slate-900 hover:bg-slate-800 active:scale-95'} text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2`}
          >
            {isGenerating ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {t('parsingAi')}</>
            ) : t('buildQuote')}
          </button>
        </div>
      </div>
    );
  };

  const QuoteView = () => {
    // Calculations
    const laborCost = (quote.laborHours * settings.hourlyRate) + settings.calloutFee;
    const materialsWholesale = quote.parts.reduce((sum, p) => sum + (p.cost * p.quantity), 0);
    const materialsMarkupAmount = materialsWholesale * (settings.markupPercent / 100);
    const materialsTotal = materialsWholesale + materialsMarkupAmount;
    
    const subtotal = laborCost + materialsTotal;
    const tax = subtotal * (settings.vatPercent / 100);
    const total = subtotal + tax;

    const updatePart = (index, field, value) => {
      const newParts = [...quote.parts];
      newParts[index][field] = value;
      setQuote({ ...quote, parts: newParts });
    };

    const removePart = (index) => {
      const newParts = [...quote.parts];
      newParts.splice(index, 1);
      setQuote({ ...quote, parts: newParts });
    };

    const addManualPart = (partObj) => {
      setQuote({
        ...quote,
        parts: [...quote.parts, { ...partObj, quantity: 1, quoteItemId: Math.random().toString(36).substr(2, 9) }]
      });
      showToast(`Added ${partObj.name}`);
    };

    const generateCustomerQuoteText = () => {
      let text = `${t('profEst')}\n\n`;
      
      if (quote.notes) {
        text += `${quote.notes}\n\n`;
      }

      text += `${t('laborServ')}\n`;
      text += `- ${t('calloutFeeQuote')} ${formatMoney(settings.calloutFee)}\n`;
      text += `- ${t('labor')} (${quote.laborHours} ${t('hrs')}): ${formatMoney(quote.laborHours * settings.hourlyRate)}\n\n`;
      
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
      return text;
    };

    const generatePickListText = () => {
      if (quote.parts.length === 0) return "No parts to order.";
      let text = `${t('supplyList')}\n\n`;
      quote.parts.forEach(p => {
          text += `[ ] ${p.quantity}x ${p.name} (Code: ${p.code || 'N/A'})\n`;
      });
      text += `\n${t('reqAsap')}`;
      return text;
    };

    return (
      <div className="max-w-2xl mx-auto w-full pb-6 space-y-6 animate-fade-in">
        
        {/* Quick Suggestions */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t('dontForget')}</h3>
          <div className="flex overflow-x-auto gap-2 pb-2" style={{ scrollbarWidth: 'none' }}>
            {SUGGESTIONS.map(s => (
              <button 
                key={s.code} onClick={() => addManualPart({ name: t(s.tKey), code: s.code, cost: s.cost })}
                className="flex-shrink-0 flex items-center gap-1 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg text-sm font-semibold border border-orange-200 active:bg-orange-100 transition-colors"
              >
                <Plus size={16} /> {t(s.tKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Labor Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Wrench size={20} className="text-orange-500" /> {t('labor')}
           </h3>
           <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
             <span className="font-medium text-slate-700">{t('estHours')}</span>
             <div className="flex items-center gap-2">
               <input 
                 type="number" min="0" step="0.5"
                 className="w-20 p-2 border rounded-md text-right font-bold focus:border-orange-500 focus:ring-0"
                 value={quote.laborHours}
                 onChange={(e) => setQuote({...quote, laborHours: parseFloat(e.target.value) || 0})}
               />
               <span className="text-slate-500 font-medium">{t('hrs')}</span>
             </div>
           </div>
        </div>

        {/* Parts Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
               <Box size={20} className="text-orange-500" /> {t('partsMat')}
             </h3>
             <button onClick={() => addManualPart({ name: '', code: '', cost: 0 })} className="text-orange-600 font-semibold flex items-center gap-1 text-sm bg-orange-50 px-3 py-1.5 rounded-lg">
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
                          if (selected) {
                              updatePart(index, 'cost', selected.cost);
                              updatePart(index, 'code', selected.code);
                          }
                          updatePart(index, 'name', e.target.value);
                        }}
                    />
                    <button onClick={() => removePart(index)} className="text-red-400 hover:text-red-600 p-2 bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <span className="text-slate-500 text-sm font-medium">{t('qty')}:</span>
                        <input 
                          type="number" min="1"
                          className="w-16 p-2 border rounded-lg bg-slate-50 font-bold focus:border-orange-500"
                          value={part.quantity}
                          onChange={(e) => updatePart(index, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                        <span className="text-slate-500 text-sm font-medium">{t('wholesale')}:</span>
                        <input 
                          type="number" min="0"
                          className="w-24 p-2 border rounded-lg bg-slate-50 font-bold text-right focus:border-orange-500"
                          value={part.cost || ''}
                          placeholder="0.00"
                          onChange={(e) => updatePart(index, 'cost', parseFloat(e.target.value) || 0)}
                        />
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
                <span>{t('laborFee')}:</span>
                <span className="font-medium text-white">{formatMoney(laborCost)}</span>
              </div>
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

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => copyToClipboard(generateCustomerQuoteText(), t('quoteCopied'))}
            className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Copy size={20} /> {t('copyQuote')}
          </button>
          <button 
            onClick={() => copyToClipboard(generatePickListText(), t('listCopied'))}
            className="w-full bg-white text-slate-800 border-2 border-slate-200 font-bold text-lg py-4 rounded-xl shadow-sm hover:border-slate-300 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <FileText size={20} /> {t('copyList')}
          </button>
        </div>

      </div>
    );
  };

  const PriceBookView = () => {
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
          const lines = text.split('\n');
          const newParts = lines.map(line => {
            const parts = line.split(',');
            if (parts.length >= 3) {
               const name = parts[0].trim();
               const code = parts[1].trim();
               const cost = parseFloat(parts[2].trim()) || 0;
               if (name && code) return { id: Math.random().toString(36).substr(2, 9), name, code, cost };
            }
            return null;
          }).filter(Boolean);
          
          if (newParts.length > 0) {
              setPriceBook(prev => [...newParts, ...prev]);
              showToast(`Imported ${newParts.length} parts!`);
          } else {
              showToast("No valid parts found. Format: Name, Code, Price");
          }
        } catch (err) {
          showToast("Error parsing CSV.");
        }
      };
      reader.readAsText(file);
      e.target.value = null;
    };

    const handleAddNew = () => {
      if(newItem.name && newItem.cost) {
        setPriceBook([{...newItem, id: Math.random().toString(36).substr(2,9)}, ...priceBook]);
        setIsAdding(false);
        setNewItem({ name: '', code: '', cost: 0 });
        showToast("Part added successfully");
      } else {
        showToast("Please enter a name and cost");
      }
    };

    const deletePart = (id) => {
      setPriceBook(priceBook.filter(p => p.id !== id));
    };

    const filteredList = priceBook.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.code.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 100);

    return (
      <div className="max-w-2xl mx-auto w-full space-y-4 animate-fade-in pb-6">
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">{t('localPb')}</h2>
            <div className="flex gap-2">
              <label className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg font-medium cursor-pointer hover:bg-slate-200 transition-colors flex items-center gap-1 text-sm">
                <Upload size={16}/> CSV
                <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
              </label>
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="bg-orange-500 text-white px-3 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-1 text-sm shadow-sm"
              >
                <Plus size={16}/> {t('addPart')}
              </button>
            </div>
          </div>
          
          {isAdding && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 animate-fade-in">
               <input placeholder="Part Name (e.g. 15mm Elbow)" className="w-full p-2 border rounded-lg" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
               <div className="flex gap-3">
                 <input placeholder="Code (e.g. NRF 12345)" className="w-1/2 p-2 border rounded-lg" value={newItem.code} onChange={e => setNewItem({...newItem, code: e.target.value})} />
                 <input type="number" placeholder="Cost" className="w-1/2 p-2 border rounded-lg" value={newItem.cost || ''} onChange={e => setNewItem({...newItem, cost: parseFloat(e.target.value) || 0})} />
               </div>
               <div className="flex justify-end gap-2 mt-2">
                 <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-500 font-medium">Cancel</button>
                 <button onClick={handleAddNew} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold">Save</button>
               </div>
            </div>
          )}

          <input 
            type="text" placeholder={t('searchParts')}
            className="w-full p-3 border-2 border-slate-100 bg-slate-50 rounded-xl focus:border-orange-500 focus:bg-white transition-colors"
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {filteredList.map(part => (
             <div key={part.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800">{part.name}</h4>
                  <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-1">CODE: {part.code || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded">{formatMoney(part.cost)}</span>
                  <button onClick={() => deletePart(part.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
             </div>
          ))}
          {filteredList.length === 0 && <p className="text-center text-slate-400 py-8 italic">{t('noPartsFound')}</p>}
        </div>
      </div>
    );
  };

  const SettingsView = () => {
    const updateSetting = (key, value) => {
      setSettings(prev => ({...prev, [key]: value}));
    };

    return (
      <div className="max-w-2xl mx-auto w-full space-y-6 animate-fade-in pb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
             <Settings className="text-orange-500" size={20}/> {t('ratesFees')}
           </h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                  <label className="text-slate-600 font-medium">{t('hourlyRate')}</label>
                  <div className="flex items-center gap-2">
                    <input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-24 text-right font-bold focus:border-orange-500" value={settings.hourlyRate} onChange={e => updateSetting('hourlyRate', parseFloat(e.target.value)||0)} />
                  </div>
              </div>
              <div className="flex justify-between items-center">
                  <label className="text-slate-600 font-medium">{t('calloutService')}</label>
                  <input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-24 text-right font-bold focus:border-orange-500" value={settings.calloutFee} onChange={e => updateSetting('calloutFee', parseFloat(e.target.value)||0)} />
              </div>
              <div className="flex justify-between items-center">
                  <label className="text-slate-600 font-medium">{t('matMarkup')}</label>
                  <div className="flex items-center gap-1">
                    <input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-20 text-right font-bold focus:border-orange-500" value={settings.markupPercent} onChange={e => updateSetting('markupPercent', parseFloat(e.target.value)||0)} />
                    <span className="text-slate-400 font-bold">%</span>
                  </div>
              </div>
              <div className="flex justify-between items-center">
                  <label className="text-slate-600 font-medium">{t('vatMva')}</label>
                  <div className="flex items-center gap-1">
                    <input type="number" className="border-2 border-slate-100 rounded-lg p-2 w-20 text-right font-bold focus:border-orange-500" value={settings.vatPercent} onChange={e => updateSetting('vatPercent', parseFloat(e.target.value)||0)} />
                    <span className="text-slate-400 font-bold">%</span>
                  </div>
              </div>
           </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
             <Settings className="text-orange-500" size={20}/> {t('aiInt')}
           </h3>
           <div className="space-y-4">
              <div className="flex flex-col gap-2">
                  <label className="text-slate-600 font-medium">Gemini API Key (gemini-2.5-flash)</label>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    className="border-2 border-slate-100 rounded-lg p-2 bg-slate-50 font-bold focus:border-orange-500 w-full text-sm"
                    value={settings.geminiApiKey}
                    onChange={e => updateSetting('geminiApiKey', e.target.value)}
                  />
                  <p className="text-xs text-slate-400">Securely stored locally. Enables smart multi-lingual voice parsing and auto-translation.</p>
              </div>
           </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-lg text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
             <Settings className="text-orange-500" size={20}/> {t('loc')}
           </h3>
           <div className="space-y-4">
              <div className="flex flex-col gap-2">
                  <label className="text-slate-600 font-medium">{t('currency')}</label>
                  <select 
                    className="border-2 border-slate-100 rounded-lg p-2 bg-slate-50 font-bold focus:border-orange-500 w-full"
                    value={settings.currency} onChange={e => updateSetting('currency', e.target.value)}
                  >
                    <option value="NOK">NOK</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="SEK">SEK</option>
                  </select>
              </div>
              <div className="flex flex-col gap-2">
                  <label className="text-slate-600 font-medium">{t('dictLang')}</label>
                  <select 
                    className="border-2 border-slate-100 rounded-lg p-2 bg-slate-50 font-bold focus:border-orange-500 w-full"
                    value={settings.language} onChange={e => updateSetting('language', e.target.value)}
                  >
                    <option value="no-NO">Norwegian (NO)</option>
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="sv-SE">Swedish (SE)</option>
                    <option value="de-DE">German (DE)</option>
                    <option value="es-ES">Spanish (ES)</option>
                  </select>
              </div>
           </div>
        </div>
      </div>
    );
  };

  // --- RENDER ---
  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-200 overflow-hidden">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-fade-in text-sm font-semibold flex items-center gap-2">
           <Check size={16} className="text-green-400" /> {toast}
        </div>
      )}

      {/* App Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg shadow-inner">
            <Wrench size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-black tracking-wider text-slate-50">PlumbBid</h1>
        </div>
        <div className="text-xs font-bold bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">
          PRO
        </div>
      </header>

      {/* Main Scrollable Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8" style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
        {activeTab === 'input' && <InputView />}
        {activeTab === 'quote' && <QuoteView />}
        {activeTab === 'book' && <PriceBookView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Mobile-First Bottom Tab Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around items-center h-[4.5rem] pb-[env(safe-area-inset-bottom)] z-20 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {[
          { id: 'input', icon: Mic, label: t('tabVoice') },
          { id: 'quote', icon: Calculator, label: t('tabQuote') },
          { id: 'book', icon: Book, label: t('tabParts') },
          { id: 'settings', icon: Settings, label: t('tabSettings') }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === tab.id ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <tab.icon size={24} className={activeTab === tab.id ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === tab.id ? 'text-orange-600' : ''}`}>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Utility Styles injected for animations and custom scrolling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        
        /* Hide scrollbar for horizontal suggestion row but keep functionality */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}