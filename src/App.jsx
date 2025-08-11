import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// --- SCRIPTS (Recharts for charts & QR Scanner) ---
// This component ensures necessary libraries are loaded before rendering the components.
const ScriptsLoader = ({ onReady }) => {
    useEffect(() => {
        const scripts = [
            { id: 'recharts-script', src: "https://unpkg.com/recharts/umd/Recharts.min.js" },
            { id: 'html5-qrcode-script', src: "https://unpkg.com/html5-qrcode" }
        ];
        
        let scriptsLoaded = 0;
        
        const handleScriptLoad = () => {
            scriptsLoaded++;
            if (scriptsLoaded === scripts.length) {
                onReady();
            }
        };

        scripts.forEach(scriptInfo => {
            if (document.getElementById(scriptInfo.id)) {
                handleScriptLoad();
                return;
            }
            const script = document.createElement('script');
            script.id = scriptInfo.id;
            script.src = scriptInfo.src;
            script.async = true;
            script.onload = handleScriptLoad;
            document.body.appendChild(script);
        });

    }, [onReady]);

    return null;
};


// --- ICONS (Inline SVG Components for reliability) ---
const DashboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>);
const TicketIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1a3 3 0 0 1 0-6V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const ChartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>);
const SettingsIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>);
const BellIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>);
const CheckCircleIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>);
const OccupancyCheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21h10"/><path d="M12 15a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v4a4 4 0 0 0 4 4Z"/><path d="M12 3v1"/><circle cx="12" cy="18" r="3"/></svg>);
const QrCodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>);
const XCircleIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const CoffeeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V4h12v4Z"/><path d="M6 22h8a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4Z"/><path d="M18 14h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/></svg>);


// --- MOCK DATA ---
const chartData = [
  { name: 'Pzt', Rezervasyonlar: 110, İptaller: 12 },
  { name: 'Sal', Rezervasyonlar: 130, İptaller: 8 },
  { name: 'Çar', Rezervasyonlar: 155, İptaller: 15 },
  { name: 'Per', Rezervasyonlar: 140, İptaller: 10 },
  { name: 'Cum', Rezervasyonlar: 180, İptaller: 25 },
  { name: 'Cmt', Rezervasyonlar: 210, İptaller: 30 },
  { name: 'Paz', Rezervasyonlar: 95, İptaller: 5 },
];
const mockReservations = [
    { id: 'res-1', uye: 'A**** Y***** (111...111)', tip: 'Bireysel', detay: 'Sessiz Salon - A3', tarih: '04.08.2025 14:30', durum: 'Aktif' },
    { id: 'res-2', uye: 'B**** K***** (234...567)', tip: 'Grup', detay: 'Grup Odası 1', tarih: '04.08.2025 15:00', durum: 'Aktif' },
    { id: 'res-3', uye: 'C**** D***** (345...678)', tip: 'Etkinlik', detay: 'Yaratıcı Yazarlık Atölyesi', tarih: '15.08.2025 14:00', durum: 'Onaylandı' },
    { id: 'res-4', uye: 'E**** F***** (456...789)', tip: 'Bireysel', detay: 'Genel Salon - C2', tarih: '04.08.2025 16:00', durum: 'Aktif' },
];
const mockEvents = [
    { id: 'evt-1', ad: 'Yaratıcı Yazarlık Atölyesi', kategori: 'Atölye', tarih: '15.08.2025 14:00', kontenjan: '15/20', durum: 'Yayımlandı' },
    { id: 'evt-2', ad: 'Çocuklar için Kodlama Saati', kategori: 'Eğitim', tarih: '22.08.2025 11:00', kontenjan: '15/15', durum: 'Yayımlandı' },
    { id: 'evt-3', ad: 'Tarih Söyleşileri', kategori: 'Söyleşi', tarih: '05.09.2025 18:30', kontenjan: '48/50', durum: 'Yayımlandı' },
    { id: 'evt-4', ad: 'Yeni Başlayanlar için Satranç', kategori: 'Turnuva', tarih: '10.09.2025 13:00', kontenjan: '0/16', durum: 'Taslak' },
];
const mockParticipants = {
    'evt-1': [
        { name: 'A**** Y*****', tc: '111...111', status: 'Giriş Yaptı' },
        { name: 'B**** K*****', tc: '234...567', status: 'Giriş Yaptı' },
        { name: 'C**** D*****', tc: '345...678', status: 'Bekleniyor' },
    ],
    'evt-2': [
        { name: 'M***** L*****', tc: '555...555', status: 'Giriş Yaptı' },
        { name: 'N**** O*****', tc: '666...666', status: 'Giriş Yaptı' },
    ],
    'evt-3': [
        { name: 'P**** R*****', tc: '777...777', status: 'Bekleniyor' },
    ],
    'evt-4': [], // No participants yet
};
const mockUsers = [
    { id: 1, ad: 'A**** Y*****', tc: '111...111', rol: 'Üye', durum: 'Aktif', sonAktivite: '04.08.2025 14:30' },
    { id: 2, ad: 'B**** K*****', tc: '234...567', rol: 'Üye', durum: 'Aktif', sonAktivite: '04.08.2025 15:00' },
    { id: 3, ad: 'C**** D*****', tc: '345...678', rol: 'Üye', durum: 'Gri Liste', sonAktivite: '03.08.2025 11:20' },
    { id: 4, ad: 'E**** F*****', tc: '456...789', rol: 'Üye', durum: 'Engelli', sonAktivite: '01.08.2025 18:00' },
    { id: 5, ad: 'G**** H*****', tc: '567...890', rol: 'Personel', durum: 'Aktif', sonAktivite: '04.08.2025 09:05' },
];
const hourlyUsageData = [
  { hour: '09:00', users: 35 }, { hour: '10:00', users: 80 }, { hour: '11:00', users: 150 },
  { hour: '12:00', users: 120 }, { hour: '13:00', users: 180 }, { hour: '14:00', users: 250 },
  { hour: '15:00', users: 310 }, { hour: '16:00', users: 280 }, { hour: '17:00', users: 220 },
  { hour: '18:00', users: 180 }, { hour: '19:00', users: 150 }, { hour: '20:00', users: 100 },
];
const cancellationData = [
    { name: 'Kullanıcı İptal Etti', value: 55, fill: '#60A5FA' }, 
    { name: 'Kullanıcı Gelmedi', value: 30, fill: '#FBBF24' }, 
    { name: 'Mola Süresi Aşıldı', value: 15, fill: '#F87171' }
];
const topMolaUsers = [
    { rank: 1, name: 'S***** Ç*****', count: 28 },
    { rank: 2, name: 'M***** K*****', count: 25 },
    { rank: 3, name: 'Z***** S*****', count: 21 },
    { rank: 4, name: 'Y***** A*****', count: 19 },
    { rank: 5, name: 'F***** B*****', count: 15 },
];
const lastMinuteCancellations = [
    { rank: 1, name: 'H***** G*****', count: 12 },
    { rank: 2, name: 'İ***** D*****', count: 9 },
    { rank: 3, name: 'C**** D*****', count: 8 },
    { rank: 4, name: 'E**** F*****', count: 7 },
    { rank: 5, name: 'G**** H*****', count: 5 },
];
const eventReportData = [
    { id: 'evt-1', name: 'Yaratıcı Yazarlık Atölyesi', date: '15.08.2025', participants: 15, capacity: 20, rate: '75%' },
    { id: 'evt-2', name: 'Çocuklar için Kodlama Saati', date: '22.08.2025', participants: 15, capacity: 15, rate: '100%' },
    { id: 'evt-3', name: 'Tarih Söyleşileri', date: '05.09.2025', participants: 48, capacity: 50, rate: '96%' },
    { id: 'evt-4', name: 'Yeni Başlayanlar için Satranç', date: '10.09.2025', participants: 12, capacity: 16, rate: '75%' },
];
const initialSettings = {
    reservationRules: {
        checkInGracePeriod: 15,
        violationLimit: 3,
        suspensionDays: 30,
        lateEntryMinutes: 60,
        newReservationLockMinutes: 10,
    },
    occupancyCheck: {
        returnTimeMinutes: 10,
    },
    breakRules: {
        defaultRights: '3x15dk, 1x60dk',
        gracePeriod: 3,
        reminderTime: 5,
        roles: {
            'Üye': '3x15dk, 1x60dk',
            'Akademisyen': 'Sınırsız',
            'Personel': 'Sınırsız',
        },
        notificationMethods: ['SMS', 'Mobil Bildirim'],
    },
    eventRules: {
        cancellationHours: 2,
        weeklyWorkshopLimit: 1,
    },
    notificationTemplates: {
        cancellation: "Sayın [Ad Soyad], [Tarih] [Saat] tarihli rezervasyonunuz, belirtilen sürede giriş yapmamanız nedeniyle iptal edilmiştir.",
        breakTimeWarning: "Sayın [Ad Soyad], mola sürenizin dolmasına [Kalan Dakika] dakika kalmıştır. Lütfen zamanında kütüphaneye giriş yapınız.",
        breakTimeExceeded: "Sayın [Ad Soyad], mola süreniz dolmuştur. Esneklik süresi içinde yerinize dönmediğiniz takdirde rezervasyonunuz iptal edilecektir.",
        occupancyCheck: "Sayın [Ad Soyad], [Masa No] numaralı yerinizde olmadığınız tespit edilmiştir. Lütfen 10 dakika içinde yerinize dönerek masadaki QR kodu okutunuz. Aksi halde rezervasyonunuz iptal edilecektir."
    },
    roles: {
        'Personel': {
            'Rezervasyon Yönetimi': true, 'Etkinlik Yönetimi': true, 'Kullanıcı Yönetimi': false, 'Raporlama': true, 'Sistem Ayarları': false, 'Varlık Kontrolü': true, 'Kara/Gri Liste': true, 'Mola Yönetimi': true,
        },
        'Yönetici': {
            'Rezervasyon Yönetimi': true, 'Etkinlik Yönetimi': true, 'Kullanıcı Yönetimi': true, 'Raporlama': true, 'Sistem Ayarları': true, 'Varlık Kontrolü': true, 'Kara/Gri Liste': true, 'Mola Yönetimi': true,
        }
    },
    eventTypes: ["Söyleşi", "Atölye", "Eğitim", "Film Gösterimi", "Konser", "Sergi", "Tiyatro", "Çocuk Etkinliği"],
    targetAudiences: ["Genel İzleyici", "Çocuklar", "Yetişkinler", "Yaşlılar", "Öğrenciler", "Akademisyenler"],
    eventTopics: ["Edebiyat", "Tarih", "Bilim", "Teknoloji", "Sanat", "Müzik", "Felsefe"],
};
const initialDesksData = [
    { id: 'A-1', status: 'Dolu', user: 'A**** Y*****' }, { id: 'A-2', status: 'Boş', user: null },
    { id: 'A-3', status: 'Dolu', user: 'B**** K*****' }, { id: 'A-4', status: 'Boş', user: null },
    { id: 'A-5', status: 'Boş', user: null }, { id: 'A-6', status: 'Dolu', user: 'C**** D*****' },
    { id: 'B-1', status: 'Boş', user: null }, { id: 'B-2', status: 'Dolu', user: 'E**** F*****' },
    { id: 'B-3', status: 'Boş', user: null }, { id: 'B-4', status: 'Dolu', user: 'G**** H*****' },
    { id: 'B-5', status: 'Boş', user: null }, { id: 'B-6', status: 'Boş', user: null },
];
const mockQrData = {
    "VALID_RESERVATION": JSON.stringify({ type: 'reservation', id: 'res-1', user: 'A**** Y*****', details: 'Sessiz Salon - A3', time: '04.08.2025 14:30' }),
    "VALID_EVENT": JSON.stringify({ type: 'event', id: 'evt-1', user: 'C**** D*****', details: 'Yaratıcı Yazarlık Atölyesi', time: '15.08.2025 14:00' }),
    "VALID_BREAK_START": JSON.stringify({ type: 'break_start', user: 'A**** Y*****', desk: 'A-1' }),
    "INVALID_CODE": "INVALID_QR_CODE_STRING",
};
const mockActiveBreaks = [
    { id: 1, user: 'A**** Y*****', desk: 'A-1', startTime: '15:10:25', duration: 15, timeLeft: 855 },
    { id: 2, user: 'E**** F*****', desk: 'B-2', startTime: '15:25:10', duration: 60, timeLeft: 3550 },
    { id: 3, user: 'G**** H*****', desk: 'B-4', startTime: '15:33:45', duration: 15, timeLeft: 885 },
];
const mockBreakViolations = [
    { id: 1, user: 'S***** Ç*****', date: '10.08.2025', type: 'Geç Dönme', details: '5 dakika geç döndü' },
    { id: 2, user: 'M***** K*****', date: '10.08.2025', type: 'Geç Dönme', details: '8 dakika geç döndü' },
    { id: 3, user: 'Z***** S*****', date: '09.08.2025', type: 'Dönmedi', details: 'Rezervasyonu iptal edildi' },
];


// --- UI COMPONENTS ---

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4">
                {children}
            </div>
        </div>
    );
};

const VarlikKontroluModal = ({ onClose, kontrolDetayi, onSonlandir }) => {
    const [timeLeft, setTimeLeft] = useState(514); // 8:34 in seconds

    useEffect(() => {
        if (timeLeft === 0) return;
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    if (!kontrolDetayi) return null;

    return (
        <div>
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">Varlık Kontrolü Süreci: {kontrolDetayi.salon}</h2>
            </div>
            <div className="p-6 space-y-4">
                <p><span className="font-semibold text-gray-600">Üye:</span> {kontrolDetayi.uye}</p>
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
                    <p className="font-semibold">Bildirim Gönderildi - Kalan Süre:</p>
                    <p className="text-4xl font-bold tracking-wider">{formatTime(timeLeft)}</p>
                </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
                <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Süreci İptal Et</button>
                <button onClick={() => onSonlandir(kontrolDetayi.id)} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Rezervasyonu Sonlandır</button>
            </div>
        </div>
    );
};

const Toast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed top-6 right-6 bg-green-500 text-white py-3 px-5 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out">
            <CheckCircleIcon className="w-6 h-6"/>
            <p className="font-semibold">{message}</p>
        </div>
    );
}

const NewEventForm = ({ onBack, onSave, eventTypes, eventTopics, targetAudiences }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave("Etkinlik başarıyla oluşturuldu!");
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Etkinlik Adı</label>
                        <input type="text" id="eventName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
                    </div>
                    <div>
                         <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Etkinlik Açıklaması (HTML Destekli)</label>
                        <textarea id="eventDescription" rows="10" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"></textarea>
                    </div>
                </div>
                <div className="space-y-6">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Etkinlik Görseli</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"><span>Dosya yükle</span><input id="file-upload" name="file-upload" type="file" className="sr-only" /></label><p className="pl-1">veya sürükleyip bırakın</p></div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF max 10MB</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="eventStatus" className="block text-sm font-medium text-gray-700">Etkinlik Durumu</label>
                        <select id="eventStatus" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm">
                            <option>Taslak</option>
                            <option>Yayımlandı</option>
                            <option>İptal Edildi</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Etkinlik Türü</label>
                    <select id="eventType" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm">
                        {eventTypes.map(type => <option key={type}>{type}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="eventTopic" className="block text-sm font-medium text-gray-700">Etkinlik Konusu</label>
                    <select id="eventTopic" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm">
                        {eventTopics.map(topic => <option key={topic}>{topic}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">Hedef Kitle (Çoklu Seçim)</label>
                    <select id="targetAudience" multiple className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm">
                         {targetAudiences.map(audience => <option key={audience}>{audience}</option>)}
                    </select>
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Tarih</label>
                    <input type="date" id="eventDate" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
                </div>
                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Başlangıç Saati</label>
                    <input type="time" id="startTime" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
                </div>
                <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Katılımcı Kontenjanı</label>
                    <input type="number" id="capacity" min="1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Mekân/Salon</label>
                    <input type="text" id="location" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
                </div>
            </div>

            <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onBack} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Anasayfaya Dön</button>
                    <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Kaydet</button>
                </div>
            </div>
        </form>
    );
};

const ReservationManagementPage = ({ onBack, onAction }) => {
    const [reservations, setReservations] = useState(mockReservations);
    const [filter, setFilter] = useState('Tümü');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReservations = reservations.filter(res => {
        const typeMatch = filter === 'Tümü' || res.tip === filter;
        const searchMatch = res.uye.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            res.detay.toLowerCase().includes(searchTerm.toLowerCase());
        return typeMatch && searchMatch;
    });

    const handleCancel = (id) => {
        setReservations(prev => prev.filter(res => res.id !== id));
        onAction(`Rezervasyon #${id} başarıyla iptal edildi.`);
    };

    const getTypeClass = (type) => {
        switch (type) {
            case 'Bireysel': return 'bg-blue-100 text-blue-800';
            case 'Grup': return 'bg-purple-100 text-purple-800';
            case 'Etkinlik': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-gray-800">Rezervasyon Yönetimi</h3>
                <button onClick={onBack} className="text-sm font-semibold text-red-600 hover:underline">Anasayfaya Dön</button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input 
                    type="text" 
                    placeholder="Üye veya detay ara..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="block w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
                <div className="flex items-center space-x-2 rounded-lg bg-gray-100 p-1">
                    {['Tümü', 'Bireysel', 'Grup', 'Etkinlik'].map(tab => (
                        <button key={tab} onClick={() => setFilter(tab)} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${filter === tab ? 'bg-white text-gray-800 shadow' : 'text-gray-500 hover:bg-gray-200'}`}>{tab}</button>
                    ))}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Üye</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tip</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detay</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReservations.map(res => (
                            <tr key={res.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.uye}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeClass(res.tip)}`}>{res.tip}</span></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.detay}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{res.tarih}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{res.durum}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">Detay</button>
                                    <button onClick={() => handleCancel(res.id)} className="text-red-600 hover:text-red-900">İptal Et</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const EventManagementPage = ({ onBack, onAction, setCurrentView }) => {
    const [events, setEvents] = useState(mockEvents);
    const [filter, setFilter] = useState('Tümü');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEvents = events.filter(event => {
        const statusMatch = filter === 'Tümü' || event.durum === filter;
        const searchMatch = event.ad.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            event.kategori.toLowerCase().includes(searchTerm.toLowerCase());
        return statusMatch && searchMatch;
    });

    const handleCancel = (id) => {
        setEvents(prev => prev.filter(event => event.id !== id));
        onAction(`Etkinlik #${id} başarıyla iptal edildi.`);
    };
    
    const handleDownloadParticipants = (eventId) => {
        const event = events.find(e => e.id === eventId);
        const participants = mockParticipants[eventId] || [];

        if (participants.length === 0) {
            onAction(`${event.ad} etkinliği için kayıtlı katılımcı bulunmuyor.`);
            return;
        }

        const headers = "Ad Soyad,T.C. Kimlik No,Giris Durumu";
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers + "\n" 
            + participants.map(p => `${p.name},${p.tc},${p.status}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        const fileName = `${event.ad.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_katilimcilar.csv`;
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onAction(`Katılımcı listesi indirildi: ${fileName}`);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Yayımlandı': return 'bg-green-100 text-green-800';
            case 'Taslak': return 'bg-yellow-100 text-yellow-800';
            case 'İptal Edildi': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-gray-800">Etkinlik Yönetimi</h3>
                <div className="flex items-center gap-2">
                    <button onClick={() => setCurrentView('manualReservation')} className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Manuel Rezervasyon Ekle</button>
                    <button onClick={() => setCurrentView('newEventForm')} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">Yeni Etkinlik Oluştur</button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input 
                    type="text" 
                    placeholder="Etkinlik adı veya kategori ara..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="block w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
                <div className="flex items-center space-x-2 rounded-lg bg-gray-100 p-1">
                    {['Tümü', 'Yayımlandı', 'Taslak', 'İptal Edildi'].map(tab => (
                        <button key={tab} onClick={() => setFilter(tab)} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${filter === tab ? 'bg-white text-gray-800 shadow' : 'text-gray-500 hover:bg-gray-200'}`}>{tab}</button>
                    ))}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etkinlik Adı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontenjan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEvents.map(event => (
                            <tr key={event.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.ad}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.kategori}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.tarih}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.kontenjan}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(event.durum)}`}>{event.durum}</span></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3">
                                    <button className="text-blue-600 hover:text-blue-900">Düzenle</button>
                                    <button onClick={() => handleCancel(event.id)} className="text-red-600 hover:text-red-900">İptal Et</button>
                                    <button onClick={() => handleDownloadParticipants(event.id)} className="text-green-600 hover:text-green-900">Katılımcılar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const UserManagementPage = ({ onBack, onAction }) => {
    const [users, setUsers] = useState(mockUsers);
    const [filter, setFilter] = useState('Tümü');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user => {
        const roleMatch = filter === 'Tümü' || user.rol === filter;
        const statusMatch = filter === 'Tümü' || user.durum === filter;
        const searchMatch = user.ad.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.tc.toLowerCase().includes(searchTerm.toLowerCase());
        return (filter === 'Tümü' || roleMatch || statusMatch) && searchMatch;
    });

    const handleStatusChange = (id, newStatus) => {
        setUsers(prev => prev.map(user => user.id === id ? { ...user, durum: newStatus } : user));
        onAction(`Üye #${id} durumu "${newStatus}" olarak güncellendi.`);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Aktif': return 'bg-green-100 text-green-800';
            case 'Gri Liste': return 'bg-yellow-100 text-yellow-800';
            case 'Engelli': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-gray-800">Kullanıcı Yönetimi</h3>
                <button onClick={onBack} className="text-sm font-semibold text-red-600 hover:underline">Anasayfaya Dön</button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input 
                    type="text" 
                    placeholder="Üye adı veya T.C. ara..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="block w-full md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                />
                 <div className="flex items-center space-x-2 rounded-lg bg-gray-100 p-1">
                    {['Tümü', 'Aktif', 'Engelli', 'Gri Liste'].map(tab => (
                        <button key={tab} onClick={() => setFilter(tab)} className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${filter === tab ? 'bg-white text-gray-800 shadow' : 'text-gray-500 hover:bg-gray-200'}`}>{tab}</button>
                    ))}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">T.C. Kimlik No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Aktivite</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eylemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.ad}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.tc}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.rol}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.durum)}`}>{user.durum}</span></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.sonAktivite}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                    <button className="text-blue-600 hover:text-blue-900">Detay</button>
                                    <button onClick={() => handleStatusChange(user.id, 'Engelli')} className="text-red-600 hover:text-red-900">Engelle</button>
                                    <button onClick={() => handleStatusChange(user.id, 'Gri Liste')} className="text-yellow-600 hover:text-yellow-900">Gri Liste</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ReportCard = ({ title, children, actionButton }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">{title}</h3>
            {actionButton}
        </div>
        <div>{children}</div>
    </div>
);

const ReportingPage = ({ onBack, isChartReady }) => {
    const [activeTab, setActiveTab] = useState('genel');

    const downloadCSV = (data, filename, headers) => {
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + data.map(row => Object.values(row).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('genel')} className={`${activeTab === 'genel' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-base`}>Genel Bakış</button>
                        <button onClick={() => setActiveTab('davranis')} className={`${activeTab === 'davranis' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-base`}>Kullanıcı Davranışları</button>
                        <button onClick={() => setActiveTab('etkinlik')} className={`${activeTab === 'etkinlik' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-base`}>Etkinlik Raporları</button>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <input type="date" defaultValue="2025-08-01" className="block rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"/>
                    <span className="text-gray-500"> - </span>
                    <input type="date" defaultValue="2025-08-04" className="block rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"/>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Filtrele</button>
                </div>
            </div>

            {activeTab === 'genel' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ReportCard title="Saatlik Kullanım Yoğunluğu">
                            <div style={{ width: '100%', height: 300 }}>
                                {isChartReady && window.Recharts ? (
                                    <ResponsiveContainer>
                                        <LineChart data={hourlyUsageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="hour" tick={{ fill: '#6B7280', fontSize: 12 }} />
                                            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
                                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                                            <Line type="monotone" dataKey="users" name="Kullanıcı Sayısı" stroke="#D32F2F" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : <div className="flex items-center justify-center h-full text-gray-500">Grafik yükleniyor...</div>}
                            </div>
                        </ReportCard>
                    </div>
                    <div>
                        <ReportCard title="Rezervasyon İptal Nedenleri">
                             <div style={{ width: '100%', height: 300 }}>
                                {isChartReady && window.Recharts ? (
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie data={cancellationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                                {cancellationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
                                            <Legend wrapperStyle={{fontSize: "14px", bottom: -10}}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : <div className="flex items-center justify-center h-full text-gray-500">Grafik yükleniyor...</div>}
                            </div>
                        </ReportCard>
                    </div>
                </div>
            )}
            
            {activeTab === 'davranis' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ReportCard 
                        title="En Çok Mola Alan Kullanıcılar"
                        actionButton={<button onClick={() => downloadCSV(topMolaUsers, 'en_cok_mola_alanlar', ['Sıra', 'İsim', 'Mola Sayısı'])} className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"><DownloadIcon /> İndir</button>}
                    >
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kullanıcı</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mola Sayısı</th></tr></thead>
                            <tbody className="bg-white divide-y divide-gray-200">{topMolaUsers.map(u => <tr key={u.rank}><td className="px-4 py-2 text-sm">{u.rank}</td><td className="px-4 py-2 text-sm font-medium">{u.name}</td><td className="px-4 py-2 text-sm font-bold">{u.count}</td></tr>)}</tbody>
                        </table>
                    </ReportCard>
                     <ReportCard 
                        title="En Çok Son Dakika İptali Yapanlar"
                        actionButton={<button onClick={() => downloadCSV(lastMinuteCancellations, 'son_dakika_iptalleri', ['Sıra', 'İsim', 'İptal Sayısı'])} className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"><DownloadIcon /> İndir</button>}
                    >
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kullanıcı</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">İptal Sayısı</th></tr></thead>
                            <tbody className="bg-white divide-y divide-gray-200">{lastMinuteCancellations.map(u => <tr key={u.rank}><td className="px-4 py-2 text-sm">{u.rank}</td><td className="px-4 py-2 text-sm font-medium">{u.name}</td><td className="px-4 py-2 text-sm font-bold">{u.count}</td></tr>)}</tbody>
                        </table>
                    </ReportCard>
                </div>
            )}

            {activeTab === 'etkinlik' && (
                 <ReportCard 
                    title="Etkinlik Katılım Oranları"
                    actionButton={<button onClick={() => downloadCSV(eventReportData, 'etkinlik_katilim_oranlari', ['ID', 'Etkinlik Adı', 'Tarih', 'Katılımcı', 'Kapasite', 'Doluluk Oranı'])} className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"><DownloadIcon /> İndir</button>}
                >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Etkinlik Adı</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Katılımcı</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kapasite</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Doluluk Oranı</th>
                            </tr>
                        </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                            {eventReportData.map(e => (
                                <tr key={e.id}>
                                    <td className="px-4 py-2 text-sm font-medium">{e.name}</td>
                                    <td className="px-4 py-2 text-sm">{e.date}</td>
                                    <td className="px-4 py-2 text-sm">{e.participants}</td>
                                    <td className="px-4 py-2 text-sm">{e.capacity}</td>
                                    <td className="px-4 py-2 text-sm font-bold">{e.rate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ReportCard>
            )}

        </div>
    );
};

const SettingsCard = ({ title, children, onSave }) => (
    <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">{title}</h3>
            {onSave && <button onClick={onSave} className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Kaydet</button>}
        </div>
        <div className="p-6 space-y-6">
            {children}
        </div>
    </div>
);

const SettingsInput = ({ label, description, value, onChange, type = 'number', unit }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 flex rounded-md shadow-sm">
            <input 
                type={type} 
                value={value}
                onChange={onChange}
                className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
            {unit && <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">{unit}</span>}
        </div>
        {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>
);

const NotificationTemplateEditor = ({ title, template, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{title}</label>
        <textarea
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            value={template}
            onChange={onChange}
        />
         <p className="mt-2 text-xs text-gray-500">
            Kullanılabilir Değişkenler: <code className="text-red-500 font-mono text-xs">[Ad Soyad]</code>, <code className="text-red-500 font-mono text-xs">[Tarih]</code>, <code className="text-red-500 font-mono text-xs">[Saat]</code>, <code className="text-red-500 font-mono text-xs">[Masa No]</code>, <code className="text-red-500 font-mono text-xs">[Kalan Dakika]</code>
        </p>
    </div>
);

const SettingsPage = ({ onBack, onAction, settingsData, setSettingsData }) => {
    const [activeTab, setActiveTab] = useState('rezervasyon');

    const handleSave = (category, title) => {
        onAction(`${title} ayarları başarıyla kaydedildi.`);
    };

    const handleChange = (category, key, value) => {
        setSettingsData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const handleRoleChange = (role, permission) => {
        setSettingsData(prev => ({
            ...prev,
            roles: {
                ...prev.roles,
                [role]: {
                    ...prev.roles[role],
                    [permission]: !prev.roles[role][permission]
                }
            }
        }))
    };

    return (
        <div>
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('rezervasyon')} className={`${activeTab === 'rezervasyon' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}>Rezervasyon Kuralları</button>
                    <button onClick={() => setActiveTab('etkinlik')} className={`${activeTab === 'etkinlik' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}>Etkinlik Ayarları</button>
                    <button onClick={() => setActiveTab('bildirim')} className={`${activeTab === 'bildirim' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}>Bildirim Şablonları</button>
                    <button onClick={() => setActiveTab('roller')} className={`${activeTab === 'roller' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}>Rol Yönetimi</button>
                </nav>
            </div>
            
            {activeTab === 'rezervasyon' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SettingsCard title="Ceza ve Yaptırım Mekanizması" onSave={() => handleSave('reservationRules', 'Ceza ve Yaptırım')}>
                        <SettingsInput 
                            label="Giriş için tanınan süre"
                            description="Rezervasyon başlangıcından itibaren üyenin giriş yapması için beklenecek süre."
                            value={settingsData.reservationRules.checkInGracePeriod}
                            onChange={(e) => handleChange('reservationRules', 'checkInGracePeriod', e.target.value)}
                            unit="dakika"
                        />
                         <SettingsInput 
                            label="Kural ihlal limiti"
                            description="Üyeliğin askıya alınması için gereken ardışık kural ihlali sayısı."
                            value={settingsData.reservationRules.violationLimit}
                            onChange={(e) => handleChange('reservationRules', 'violationLimit', e.target.value)}
                            unit="ihlal"
                        />
                         <SettingsInput 
                            label="Askıya alma süresi"
                            description="Kural ihlal limitine ulaşan üyenin rezervasyon hakkının askıya alınacağı süre."
                             value={settingsData.reservationRules.suspensionDays}
                            onChange={(e) => handleChange('reservationRules', 'suspensionDays', e.target.value)}
                            unit="gün"
                        />
                    </SettingsCard>
                     <SettingsCard title="Varlık Kontrolü" onSave={() => handleSave('occupancyCheck', 'Varlık Kontrolü')}>
                         <SettingsInput 
                            label="Varlık kontrolü geri dönüş süresi"
                            description="Personel tarafından başlatılan varlık kontrolü sonrası üyenin yerine dönmesi için tanınan süre."
                            value={settingsData.occupancyCheck.returnTimeMinutes}
                            onChange={(e) => handleChange('occupancyCheck', 'returnTimeMinutes', e.target.value)}
                            unit="dakika"
                        />
                    </SettingsCard>
                     <SettingsCard title="Genel Rezervasyon Kuralları" onSave={() => handleSave('reservationRules', 'Genel Rezervasyon')}>
                        <SettingsInput 
                            label="Grup rezervasyonu geç katılım süresi"
                            description="Aktif bir grup rezervasyonuna sonradan dahil olmak için tanınan maksimum süre."
                            value={settingsData.reservationRules.lateEntryMinutes}
                            onChange={(e) => handleChange('reservationRules', 'lateEntryMinutes', e.target.value)}
                            unit="dakika"
                        />
                         <SettingsInput 
                            label="Yeni rezervasyon kilit süresi"
                            description="Aktif bir rezervasyon bitmeden ne kadar süre önce yeni rezervasyon yapılabileceğini engeller."
                            value={settingsData.reservationRules.newReservationLockMinutes}
                            onChange={(e) => handleChange('reservationRules', 'newReservationLockMinutes', e.target.value)}
                            unit="dakika"
                        />
                    </SettingsCard>
                </div>
            )}

            {activeTab === 'etkinlik' && (
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SettingsCard title="Genel Etkinlik Kuralları" onSave={() => handleSave('eventRules', 'Genel Etkinlik')}>
                         <SettingsInput 
                            label="Etkinlik iptali için son saat"
                            description="Bir üyenin etkinliğe katılımını iptal edebileceği son süre (etkinlik başlangıcından önce)."
                            value={settingsData.eventRules.cancellationHours}
                            onChange={(e) => handleChange('eventRules', 'cancellationHours', e.target.value)}
                            unit="saat"
                        />
                        <SettingsInput 
                            label="Haftalık atölye kayıt limiti"
                            description="Bir üyenin bir hafta içinde en fazla kaç atölyeye kayıt olabileceği."
                            value={settingsData.eventRules.weeklyWorkshopLimit}
                            onChange={(e) => handleChange('eventRules', 'weeklyWorkshopLimit', e.target.value)}
                            unit="adet"
                        />
                    </SettingsCard>
                    <SettingsCard title="Etkinlik Kategorileri Yönetimi" onSave={() => handleSave('categories', 'Etkinlik Kategorileri')}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Etkinlik Türleri</label>
                            <p className="text-xs text-gray-500 mb-2">Mevcut türleri yönetin veya yenisini ekleyin.</p>
                            <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-1">
                                {settingsData.eventTypes.map(item => <div key={item} className="text-sm p-1 bg-gray-100 rounded">{item}</div>)}
                            </div>
                            <button className="text-sm text-red-600 hover:underline mt-2">Yeni Tür Ekle</button>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Hedef Kitleler</label>
                             <div className="max-h-48 overflow-y-auto border rounded-md p-2 mt-2 space-y-1">
                                {settingsData.targetAudiences.map(item => <div key={item} className="text-sm p-1 bg-gray-100 rounded">{item}</div>)}
                            </div>
                            <button className="text-sm text-red-600 hover:underline mt-2">Yeni Kitle Ekle</button>
                        </div>
                    </SettingsCard>
                 </div>
            )}

            {activeTab === 'bildirim' && (
                <SettingsCard title="SMS ve E-posta Bildirim Şablonları" onSave={() => handleSave('notificationTemplates', 'Bildirim Şablonları')}>
                    <NotificationTemplateEditor 
                        title="Rezervasyon İptal Bildirimi (Giriş Yapılmadı)"
                        template={settingsData.notificationTemplates.cancellation}
                        onChange={(e) => handleChange('notificationTemplates', 'cancellation', e.target.value)}
                    />
                    <NotificationTemplateEditor 
                        title="Mola Süresi Bitiyor Uyarısı"
                        template={settingsData.notificationTemplates.breakTimeWarning}
                        onChange={(e) => handleChange('notificationTemplates', 'breakTimeWarning', e.target.value)}
                    />
                     <NotificationTemplateEditor 
                        title="Mola Süresi Doldu Bildirimi"
                        template={settingsData.notificationTemplates.breakTimeExceeded}
                        onChange={(e) => handleChange('notificationTemplates', 'breakTimeExceeded', e.target.value)}
                    />
                    <NotificationTemplateEditor 
                        title="Varlık Kontrolü Bildirimi"
                        template={settingsData.notificationTemplates.occupancyCheck}
                        onChange={(e) => handleChange('notificationTemplates', 'occupancyCheck', e.target.value)}
                    />
                </SettingsCard>
            )}

            {activeTab === 'roller' && (
                 <SettingsCard title="Rol ve Yetki Yönetimi" onSave={() => handleSave('roles', 'Rol ve Yetki')}>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yetki</th>
                                    {Object.keys(settingsData.roles).map(role => (
                                        <th key={role} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{role}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Object.keys(settingsData.roles['Yönetici']).map(permission => (
                                    <tr key={permission}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{permission.replace(/([A-Z])/g, ' $1').trim()}</td>
                                        {Object.keys(settingsData.roles).map(role => (
                                             <td key={`${role}-${permission}`} className="px-6 py-4 whitespace-nowrap text-center">
                                                 <input 
                                                    type="checkbox" 
                                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                    checked={settingsData.roles[role][permission]}
                                                    onChange={() => handleRoleChange(role, permission)}
                                                 />
                                             </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </SettingsCard>
            )}
            
        </div>
    );
};

const OccupancyCheckPage = ({ onBack, onAction, settingsData }) => {
    const [desks, setDesks] = useState(initialDesksData);
    const [selectedDesk, setSelectedDesk] = useState(null);
    const [timers, setTimers] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(prevTimers => {
                const newTimers = { ...prevTimers };
                let changed = false;
                Object.keys(newTimers).forEach(deskId => {
                    if (newTimers[deskId] > 0) {
                        newTimers[deskId] -= 1;
                        changed = true;
                    } else if (newTimers[deskId] === 0) {
                        resolveCheck(deskId, false); // Automatically fail when timer hits 0
                        delete newTimers[deskId];
                        changed = true;
                    }
                });
                return changed ? newTimers : prevTimers;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const startCheck = (desk) => {
        setDesks(desks.map(d => d.id === desk.id ? { ...d, status: 'Kontrol Ediliyor' } : d));
        setTimers(prev => ({ ...prev, [desk.id]: settingsData.occupancyCheck.returnTimeMinutes * 60 }));
        setSelectedDesk(desk);
        onAction(`Masa ${desk.id} için varlık kontrolü başlatıldı.`);
    };

    const resolveCheck = (deskId, success) => {
        const desk = desks.find(d => d.id === deskId);
        if (!desk) return;

        if (success) {
            setDesks(desks.map(d => d.id === deskId ? { ...d, status: 'Dolu' } : d));
            onAction(`Masa ${desk.id} için varlık onayı başarılı.`);
        } else {
            setDesks(desks.map(d => d.id === deskId ? { ...d, status: 'Boş', user: null } : d));
            onAction(`Masa ${desk.id} rezervasyonu süre aşımı nedeniyle iptal edildi.`);
        }
        
        setSelectedDesk(null);
        setTimers(prev => {
            const newTimers = { ...prev };
            delete newTimers[deskId];
            return newTimers;
        });
    };
    
    const cancelCheck = (deskId) => {
        const desk = desks.find(d => d.id === deskId);
        if (!desk) return;

        setDesks(desks.map(d => d.id === deskId ? { ...d, status: 'Dolu' } : d));
        onAction(`Masa ${deskId} için varlık kontrolü personel tarafından iptal edildi.`);
        
        setSelectedDesk(null);
        setTimers(prev => {
            const newTimers = { ...prev };
            delete newTimers[deskId];
            return newTimers;
        });
    };
    
    const getStatusClass = (status) => {
        switch(status) {
            case 'Dolu': return 'bg-red-200 border-red-400';
            case 'Boş': return 'bg-green-200 border-green-400';
            case 'Kontrol Ediliyor': return 'bg-yellow-200 border-yellow-400 animate-pulse';
            default: return 'bg-gray-200 border-gray-400';
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                 <h3 className="font-bold text-xl text-gray-800 mb-4">Sessiz Salon - Kat Planı</h3>
                 <div className="grid grid-cols-6 gap-4">
                    {desks.map(desk => (
                        <button 
                            key={desk.id} 
                            onClick={() => desk.status === 'Dolu' && startCheck(desk)}
                            disabled={desk.status !== 'Dolu'}
                            className={`p-4 rounded-lg border-2 text-center transition-all ${getStatusClass(desk.status)} ${desk.status !== 'Dolu' ? 'cursor-not-allowed opacity-60' : 'hover:shadow-lg hover:scale-105'}`}
                        >
                            <div className="font-bold text-lg">{desk.id}</div>
                            <div className="text-sm">{desk.status}</div>
                             {timers[desk.id] > 0 && <div className="font-mono text-lg mt-1">{formatTime(timers[desk.id])}</div>}
                        </button>
                    ))}
                 </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-xl text-gray-800 mb-4">Simülasyon Kontrol Paneli</h3>
                {selectedDesk ? (
                    <div className="space-y-4">
                        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg">
                            <p className="font-bold">Üyeye Giden Bildirim:</p>
                            <p className="text-sm mt-1">"Sayın {selectedDesk.user}, {selectedDesk.id} numaralı yerinizde olmadığınız tespit edilmiştir. Lütfen {settingsData.occupancyCheck.returnTimeMinutes} dakika içinde yerinize dönerek masadaki QR kodu okutunuz. Aksi halde rezervasyonunuz iptal edilecektir."</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-gray-700">Kalan Süre:</p>
                            <p className="text-5xl font-bold font-mono text-gray-800 tracking-wider">{formatTime(timers[selectedDesk.id] || 0)}</p>
                        </div>
                        <div className="flex flex-col gap-3 pt-4">
                             <button onClick={() => resolveCheck(selectedDesk.id, true)} className="w-full text-center py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">Kullanıcı QR Okuttu (Başarılı)</button>
                             <button onClick={() => resolveCheck(selectedDesk.id, false)} className="w-full text-center py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Süre Doldu (Başarısız)</button>
                             <button onClick={() => cancelCheck(selectedDesk.id)} className="w-full text-center py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Kontrolü İptal Et</button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        <p>Simülasyonu başlatmak için kat planından 'Dolu' bir masaya tıklayın.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const VerificationPage = ({ onBack, onAction, isReady }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = () => {
        setScanResult(null);
        setIsScanning(true);
        setIsLoading(true);

        // --- SIMULATION ---
        // In a real app, you would use the html5-qrcode library here.
        // We simulate a scan after 2 seconds.
        setTimeout(() => {
            const results = [mockQrData.VALID_RESERVATION, mockQrData.VALID_EVENT, mockQrData.INVALID_CODE, mockQrData.VALID_BREAK_START];
            const randomResult = results[Math.floor(Math.random() * results.length)];
            onScanSuccess(randomResult);
        }, 2000);
    };

    const onScanSuccess = (decodedText) => {
        setIsLoading(false);
        try {
            const data = JSON.parse(decodedText);
            setScanResult({ success: true, data });
            onAction("QR Kod başarıyla doğrulandı.");
        } catch (error) {
            setScanResult({ success: false, message: "Geçersiz veya süresi dolmuş QR Kod." });
            onAction("Geçersiz QR Kod okutuldu.");
        }
        setIsScanning(false);
    };

    const resetScanner = () => {
        setIsScanning(false);
        setScanResult(null);
    };

    const getResultDetails = (data) => {
        switch (data.type) {
            case 'reservation':
                return { title: 'Salon Rezervasyonu', details: data.details, time: data.time };
            case 'event':
                return { title: 'Etkinlik Kaydı', details: data.details, time: data.time };
            case 'break_start':
                return { title: 'Mola Başlatma', details: `Masa: ${data.desk}`, time: new Date().toLocaleTimeString() };
            default:
                return { title: 'Bilinmeyen Tür', details: '', time: '' };
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
            <h3 className="font-bold text-xl text-gray-800 mb-2">QR Kod ile İşlem Yap</h3>
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-700">Bu ekrandan aşağıdaki işlemleri gerçekleştirebilirsiniz:</h4>
                <ul className="list-disc list-inside text-gray-600 mt-2 text-sm space-y-1">
                    <li><b>Rezervasyon Girişi (Check-in):</b> Kullanıcının rezervasyonlu masasına girişini onaylayın.</li>
                    <li><b>Etkinlik Girişi:</b> Kullanıcının kayıtlı olduğu etkinliğe girişini yapın.</li>
                    <li><b>Mola Başlatma:</b> Kullanıcının mola alanındaki QR kodu okutarak mola sürecini başlatın.</li>
                    <li><b>Moladan Dönüş:</b> Kullanıcının masasındaki QR kodu okutarak mola sürecini sonlandırın.</li>
                </ul>
            </div>
            
            {!isScanning && !scanResult && (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-6">Kullanıcının QR kodunu okutarak işlemi başlatın.</p>
                    <button 
                        onClick={handleScan}
                        disabled={!isReady}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-300"
                    >
                        <QrCodeIcon />
                        {isReady ? 'QR Kodu Tara' : 'Tarayıcı Yükleniyor...'}
                    </button>
                </div>
            )}

            {isScanning && (
                 <div className="text-center py-12">
                     <div id="qr-reader" className="w-full max-w-sm mx-auto bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                        {isLoading ? (
                             <p className="text-gray-600">Simülasyon: QR kod okunuyor...</p>
                        ) : (
                             <p className="text-gray-600">Kamera başlatılıyor...</p>
                        )}
                     </div>
                     <button onClick={() => setIsScanning(false)} className="mt-6 text-sm font-semibold text-gray-600 hover:underline">İptal</button>
                 </div>
            )}

            {scanResult && (
                <div className="py-8">
                    {scanResult.success ? (
                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                            <div className="flex items-center gap-4">
                                <CheckCircleIcon className="w-12 h-12 text-green-500" />
                                <div>
                                    <h4 className="text-lg font-bold text-green-800">Doğrulama Başarılı</h4>
                                    <p className="text-green-700">Kullanıcı işlemi onaylandı.</p>
                                </div>
                            </div>
                            <div className="mt-4 pl-16 space-y-2 text-sm text-gray-700">
                                <p><span className="font-semibold">Üye:</span> {scanResult.data.user}</p>
                                <p><span className="font-semibold">Tür:</span> {getResultDetails(scanResult.data).title}</p>
                                <p><span className="font-semibold">Detay:</span> {getResultDetails(scanResult.data).details}</p>
                                <p><span className="font-semibold">İşlem Saati:</span> {getResultDetails(scanResult.data).time}</p>
                            </div>
                        </div>
                    ) : (
                         <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                            <div className="flex items-center gap-4">
                                <XCircleIcon className="w-12 h-12 text-red-500" />
                                <div>
                                    <h4 className="text-lg font-bold text-red-800">Doğrulama Başarısız</h4>
                                    <p className="text-red-700">{scanResult.message}</p>
                                </div>
                            </div>
                        </div>
                    )}
                     <div className="text-center mt-8">
                         <button onClick={resetScanner} className="px-6 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Yeni Tarama Yap</button>
                     </div>
                </div>
            )}
        </div>
    );
};

const ManualReservationPage = ({ onBack, onAction, users, events, desks }) => {
    const [step, setStep] = useState(1); // 1: Search User, 2: Create Reservation
    const [searchTerm, setSearchTerm] = useState('');
    const [foundUser, setFoundUser] = useState(null);
    const [reservationType, setReservationType] = useState('Bireysel');
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedDesk, setSelectedDesk] = useState('');

    const handleUserSearch = (e) => {
        e.preventDefault();
        const user = users.find(u => u.tc.startsWith(searchTerm));
        if (user) {
            setFoundUser(user);
            setStep(2);
            onAction(`Üye bulundu: ${user.ad}`);
        } else {
            setFoundUser(null);
            onAction("Bu T.C. Kimlik Numarası ile üye bulunamadı.");
        }
    };

    const handleCreateReservation = (e) => {
        e.preventDefault();
        onAction(`${foundUser.ad} için manuel rezervasyon başarıyla oluşturuldu.`);
        onBack();
    };
    
    const resetSearch = () => {
        setStep(1);
        setFoundUser(null);
        setSearchTerm('');
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-gray-800">Manuel Rezervasyon Oluştur</h3>
                <button onClick={onBack} className="text-sm font-semibold text-red-600 hover:underline">Anasayfaya Dön</button>
            </div>

            {step === 1 && (
                 <form onSubmit={handleUserSearch} className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-700">Adım 1: Üye Bul</h4>
                    <div>
                        <label htmlFor="tcSearch" className="block text-sm font-medium text-gray-700">Üyenin T.C. Kimlik Numarası</label>
                        <input 
                            type="text" 
                            id="tcSearch"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" 
                            placeholder="T.C. Kimlik No giriniz..."
                            required 
                        />
                    </div>
                    <div className="pt-2 text-right">
                         <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Üyeyi Bul</button>
                    </div>
                </form>
            )}

            {step === 2 && foundUser && (
                <form onSubmit={handleCreateReservation} className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700">Adım 2: Rezervasyon Detayları</h4>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                            <p><span className="font-semibold">Üye Adı:</span> {foundUser.ad}</p>
                            <p><span className="font-semibold">T.C. Kimlik No:</span> {foundUser.tc}</p>
                            <p><span className="font-semibold">Mevcut Durum:</span> {foundUser.durum}</p>
                             <button type="button" onClick={resetSearch} className="text-sm text-blue-600 hover:underline mt-2">Farklı bir üye ara</button>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rezervasyon Türü</label>
                        <select value={reservationType} onChange={(e) => setReservationType(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm">
                            <option value="Bireysel">Bireysel Çalışma Alanı</option>
                            <option value="Grup">Grup Çalışma Odası</option>
                            <option value="Etkinlik">Etkinlik Kaydı</option>
                        </select>
                    </div>

                    {reservationType === 'Bireysel' && (
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Masa Seçimi</label>
                            <select value={selectedDesk} onChange={(e) => setSelectedDesk(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm">
                                <option value="">Boş bir masa seçin...</option>
                                {desks.filter(d => d.status === 'Boş').map(desk => (
                                    <option key={desk.id} value={desk.id}>{desk.id}</option>
                                ))}
                            </select>
                        </div>
                    )}

                     {reservationType === 'Etkinlik' && (
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Etkinlik Seçimi</label>
                            <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm">
                                <option value="">Bir etkinlik seçin...</option>
                                {events.filter(e => e.durum === 'Yayımlandı').map(event => (
                                    <option key={event.id} value={event.id}>{event.ad} ({event.tarih})</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="pt-5 border-t border-gray-200">
                        <div className="flex justify-end gap-3">
                             <button type="button" onClick={onBack} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">İptal</button>
                             <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700">Rezervasyonu Oluştur</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

const BreakManagementPage = ({ onBack, onAction, settingsData, setSettingsData, isChartReady }) => {
    const [activeTab, setActiveTab] = useState('aktif');
    const [activeBreaks, setActiveBreaks] = useState(mockActiveBreaks);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveBreaks(prevBreaks => 
                prevBreaks.map(b => 
                    b.timeLeft > 0 ? { ...b, timeLeft: b.timeLeft - 1 } : b
                ).filter(b => b.timeLeft > 0 || b.duration * 60 - b.timeLeft < b.duration * 60 + settingsData.breakRules.gracePeriod * 60) // Keep for grace period
            );
        }, 1000);
        return () => clearInterval(timer);
    }, [settingsData.breakRules.gracePeriod]);

    const formatTime = (seconds) => {
        if (seconds < 0) return "Süre Doldu";
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndBreak = (id) => {
        const breakToEnd = activeBreaks.find(b => b.id === id);
        setActiveBreaks(prev => prev.filter(b => b.id !== id));
        onAction(`${breakToEnd.user} kullanıcısının molası manuel olarak sonlandırıldı.`);
    };

    const handleChange = (category, key, value) => {
        setSettingsData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const handleRoleBreakChange = (role, value) => {
        setSettingsData(prev => ({
            ...prev,
            breakRules: {
                ...prev.breakRules,
                roles: {
                    ...prev.breakRules.roles,
                    [role]: value
                }
            }
        }));
    };

    const handleNotificationMethodChange = (method) => {
        const currentMethods = settingsData.breakRules.notificationMethods;
        const newMethods = currentMethods.includes(method)
            ? currentMethods.filter(m => m !== method) // Remove if exists
            : [...currentMethods, method]; // Add if not exists

        setSettingsData(prev => ({
            ...prev,
            breakRules: {
                ...prev.breakRules,
                notificationMethods: newMethods
            }
        }));
    };

    return (
        <div>
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('aktif')} className={`${activeTab === 'aktif' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}>Aktif Molalar ({activeBreaks.length})</button>
                    <button onClick={() => setActiveTab('ayarlar')} className={`${activeTab === 'ayarlar' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}>Mola Kuralları ve Ayarlar</button>
                    <button onClick={() => setActiveTab('raporlar')} className={`${activeTab === 'raporlar' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}>Raporlama ve İstatistikler</button>
                </nav>
            </div>

            {activeTab === 'aktif' && (
                <ReportCard title="Şu An Molada Olan Kullanıcılar">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kullanıcı</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Masa No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlangıç</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kalan Süre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Eylemler</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {activeBreaks.map(b => (
                                    <tr key={b.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.user}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.desk}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.startTime}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono font-bold ${b.timeLeft < 300 ? 'text-red-600' : 'text-gray-800'}`}>{formatTime(b.timeLeft)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onClick={() => handleEndBreak(b.id)} className="text-red-600 hover:text-red-900">Molayı Sonlandır</button>
                                        </td>
                                    </tr>
                                ))}
                                {activeBreaks.length === 0 && (
                                    <tr><td colSpan="5" className="text-center py-8 text-gray-500">Şu an molada olan kullanıcı bulunmuyor.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </ReportCard>
            )}

            {activeTab === 'ayarlar' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SettingsCard title="Genel Mola Kuralları" onSave={() => onAction('Genel Mola Kuralları kaydedildi.')}>
                        <SettingsInput 
                            label="Varsayılan Mola Hakları"
                            description="Yeni üyelere atanacak standart mola hakları. Örn: 3x15dk, 1x60dk"
                            value={settingsData.breakRules.defaultRights}
                            onChange={(e) => handleChange('breakRules', 'defaultRights', e.target.value)}
                            type="text"
                        />
                        <SettingsInput 
                            label="Mola Sonrası Esneklik Süresi"
                            description="Mola bittikten sonra rezervasyon iptal edilmeden önce tanınacak ek süre."
                            value={settingsData.breakRules.gracePeriod}
                            onChange={(e) => handleChange('breakRules', 'gracePeriod', e.target.value)}
                            unit="dakika"
                        />
                    </SettingsCard>
                    <SettingsCard title="Rol Bazlı Mola Hakları" onSave={() => onAction('Rol Bazlı Mola Hakları kaydedildi.')}>
                        {Object.keys(settingsData.breakRules.roles).map(role => (
                             <div key={role}>
                                <label className="block text-sm font-medium text-gray-700">{role}</label>
                                <input 
                                    type="text" 
                                    value={settingsData.breakRules.roles[role]}
                                    onChange={(e) => handleRoleBreakChange(role, e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                />
                            </div>
                        ))}
                    </SettingsCard>
                    <SettingsCard title="Hatırlatma ve Bildirim Yönetimi" onSave={() => onAction('Bildirim Ayarları kaydedildi.')}>
                        <SettingsInput 
                            label="Mola Bitimine Yakın Hatırlatma"
                            description="Mola bitiminden kaç dakika önce bildirim gönderileceği."
                            value={settingsData.breakRules.reminderTime}
                            onChange={(e) => handleChange('breakRules', 'reminderTime', e.target.value)}
                            unit="dakika"
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bildirim Yöntemleri</label>
                            <div className="mt-2 space-y-2">
                                {['SMS', 'Mobil Bildirim', 'E-posta'].map(method => (
                                    <div key={method} className="flex items-center">
                                        <input 
                                            id={`method-${method}`} 
                                            type="checkbox" 
                                            checked={settingsData.breakRules.notificationMethods.includes(method)} 
                                            onChange={() => handleNotificationMethodChange(method)}
                                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" 
                                        />
                                        <label htmlFor={`method-${method}`} className="ml-3 block text-sm text-gray-700">{method}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SettingsCard>
                </div>
            )}

            {activeTab === 'raporlar' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ReportCard title="En Çok Mola Alan Kullanıcılar" actionButton={<button className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"><DownloadIcon /> İndir</button>}>
                         <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sıra</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kullanıcı</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Toplam Mola (dk)</th></tr></thead>
                            <tbody className="bg-white divide-y divide-gray-200">{topMolaUsers.map(u => <tr key={u.rank}><td className="px-4 py-2 text-sm">{u.rank}</td><td className="px-4 py-2 text-sm font-medium">{u.name}</td><td className="px-4 py-2 text-sm font-bold">{u.count * 15}</td></tr>)}</tbody>
                        </table>
                    </ReportCard>
                    <ReportCard title="Mola İhlalleri" actionButton={<button className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"><DownloadIcon /> İndir</button>}>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Kullanıcı</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">İhlal Türü</th><th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Detay</th></tr></thead>
                            <tbody className="bg-white divide-y divide-gray-200">{mockBreakViolations.map(v => <tr key={v.id}><td className="px-4 py-2 text-sm font-medium">{v.user}</td><td className="px-4 py-2 text-sm text-red-600">{v.type}</td><td className="px-4 py-2 text-sm">{v.details}</td></tr>)}</tbody>
                        </table>
                    </ReportCard>
                </div>
            )}
        </div>
    );
};


const AdminDashboardApp = () => {
    const [isEmergencyMode, setEmergencyMode] = useState(false);
    const [activeTab, setActiveTab] = useState('gri-liste');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'newEventForm', 'reservationManagement', 'eventManagement', 'userManagement', 'reporting', 'settings', 'occupancyCheck', 'verification', 'manualReservation', 'breakManagement'
    const [settingsData, setSettingsData] = useState(initialSettings);

    const [varlikKontrolleri, setVarlikKontrolleri] = useState([
        { id: 1, salon: 'Salon A - Masa 17', talepEden: 'Mehmet V.', uye: 'A**** Y****' }
    ]);
    const [seciliKontrol, setSeciliKontrol] = useState(null);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 4000);
    };

    const handleSaveEvent = (message) => {
        showToast(message);
        setCurrentView('dashboard');
    };

    const handleSonlandir = (kontrolId) => {
        setVarlikKontrolleri(prev => prev.filter(k => k.id !== kontrolId));
        setModalOpen(false);
        showToast(`'${seciliKontrol.salon}' için rezervasyon başarıyla sonlandırıldı.`);
    };
    
    const handleDownloadReport = () => {
        const headers = "Gün,Rezervasyonlar,İptaller";
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers + "\n" 
            + chartData.map(e => `${e.name},${e.Rezervasyonlar},${e.İptaller}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "haftalik_rapor.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const occupancy = 78;
    const occupancyColor = occupancy > 85 ? 'bg-red-500' : occupancy > 60 ? 'bg-yellow-500' : 'bg-green-500';

    const renderContent = () => {
        switch(currentView) {
            case 'newEventForm':
                return (
                     <div className="bg-white p-6 rounded-2xl shadow-sm">
                         <h3 className="font-bold text-xl text-gray-800 mb-6">Yeni Etkinlik Oluştur</h3>
                         <NewEventForm 
                            onBack={() => setCurrentView('dashboard')} 
                            onSave={handleSaveEvent} 
                            eventTypes={settingsData.eventTypes}
                            eventTopics={settingsData.eventTopics}
                            targetAudiences={settingsData.targetAudiences}
                         />
                     </div>
                );
            case 'reservationManagement':
                return <ReservationManagementPage onBack={() => setCurrentView('dashboard')} onAction={showToast} />;
            case 'eventManagement':
                return <EventManagementPage onBack={() => setCurrentView('dashboard')} onAction={showToast} setCurrentView={setCurrentView} />;
            case 'userManagement':
                return <UserManagementPage onBack={() => setCurrentView('dashboard')} onAction={showToast} />;
            case 'reporting':
                return <ReportingPage onBack={() => setCurrentView('dashboard')} isChartReady={isReady} />;
            case 'settings':
                return <SettingsPage onBack={() => setCurrentView('dashboard')} onAction={showToast} settingsData={settingsData} setSettingsData={setSettingsData} />;
            case 'occupancyCheck':
                return <OccupancyCheckPage onBack={() => setCurrentView('dashboard')} onAction={showToast} settingsData={settingsData} />;
            case 'verification':
                return <VerificationPage onBack={() => setCurrentView('dashboard')} onAction={showToast} isReady={isReady} />;
            case 'manualReservation':
                 return <ManualReservationPage 
                            onBack={() => setCurrentView('dashboard')} 
                            onAction={showToast}
                            users={mockUsers}
                            events={mockEvents}
                            desks={initialDesksData}
                        />;
            case 'breakManagement':
                return <BreakManagementPage 
                           onBack={() => setCurrentView('dashboard')} 
                           onAction={showToast}
                           settingsData={settingsData}
                           setSettingsData={setSettingsData}
                           isChartReady={isReady}
                       />;
            case 'dashboard':
            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Anlık Doluluk */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-gray-800">Anlık Kütüphane Doluluğu: {occupancy}%</h3>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 my-3">
                                <div className={`${occupancyColor} h-2.5 rounded-full`} style={{ width: `${occupancy}%` }}></div>
                            </div>
                            <p className="text-sm text-gray-600">Aktif Ziyaretçi: <span className="font-bold">352 / 450</span></p>
                        </div>

                        {/* Bugünkü İşlemler */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-gray-800">Bugünkü İşlemler</h3>
                            <div className="flex justify-between items-baseline mt-2">
                                <p className="text-sm text-gray-600">Rezervasyonlar: <span className="font-bold text-2xl text-gray-800">124</span></p>
                                <p className="text-sm text-gray-600">İptaller: <span className="font-bold text-gray-800">12</span></p>
                                <p className="text-sm text-gray-600">Yeni Üye: <span className="font-bold text-gray-800">8</span></p>
                            </div>
                        </div>

                        {/* Hızlı Eylemler */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-2">
                             <button onClick={() => setCurrentView('newEventForm')} className="w-full text-center py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Yeni Etkinlik Oluştur</button>
                             <button onClick={() => setCurrentView('manualReservation')} className="w-full text-center py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Manuel Rezervasyon Ekle</button>
                        </div>

                        {/* Onay Bekleyen Talepler */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4">İşlem Bekleyenler</h3>
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                                    <button onClick={() => setActiveTab('gri-liste')} className={`${activeTab === 'gri-liste' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm`}>Gri Liste (2)</button>
                                    <button onClick={() => setActiveTab('varlik-kontrolu')} className={`${activeTab === 'varlik-kontrolu' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'} whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm`}>Varlık Kontrolü ({varlikKontrolleri.length})</button>
                                </nav>
                            </div>
                            <div className="pt-4">
                                {activeTab === 'gri-liste' && (
                                    <ul className="space-y-2">
                                        <li className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
                                            <div><p className="font-medium text-sm">M***** K*****</p><p className="text-xs text-gray-500">14:30 - 16:30</p></div>
                                            <div className="flex gap-2"><button className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200">Onayla</button><button className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200">Reddet</button></div>
                                        </li>
                                        <li className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
                                            <div><p className="font-medium text-sm">S***** Ç*****</p><p className="text-xs text-gray-500">15:00 - 17:00</p></div>
                                            <div className="flex gap-2"><button className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200">Onayla</button><button className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200">Reddet</button></div>
                                        </li>
                                    </ul>
                                )}
                                {activeTab === 'varlik-kontrolu' && (
                                     <ul className="space-y-2">
                                        {varlikKontrolleri.length > 0 ? varlikKontrolleri.map(kontrol => (
                                            <li key={kontrol.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
                                                <div><p className="font-medium text-sm">{kontrol.salon}</p><p className="text-xs text-gray-500">Talep Eden: {kontrol.talepEden}</p></div>
                                                <button onClick={() => { setSeciliKontrol(kontrol); setModalOpen(true); }} className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200">Detay Gör</button>
                                            </li>
                                        )) : <p className="text-sm text-gray-500 text-center py-4">Aktif varlık kontrolü talebi bulunmuyor.</p>}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Yaklaşan Etkinlikler */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4">Yaklaşan Etkinlikler</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                                    <div className="bg-red-100 text-red-700 font-bold p-3 rounded-lg text-center">
                                        <p className="text-xl">14:00</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">'Yapay Zeka ve Edebiyat' Söyleşisi</p>
                                        <p className="text-sm text-gray-500">Konferans Salonu - Kontenjan: 45/50</p>
                                    </div>
                                </li>
                                 <li className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                                    <div className="bg-gray-100 text-gray-700 font-bold p-3 rounded-lg text-center">
                                        <p className="text-xl">18:00</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Yaratıcı Yazarlık Atölyesi</p>
                                        <p className="text-sm text-gray-500">Grup Odası 1 - Kontenjan: 12/15</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Haftalık Kullanım Raporu */}
                        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-800">Haftalık Rezervasyon Yoğunluğu</h3>
                                <button onClick={handleDownloadReport} className="text-sm font-semibold text-red-600 hover:underline">Raporu İndir (Excel/CSV)</button>
                            </div>
                            <div style={{ width: '100%', height: 300 }}>
                                {isReady ? (
                                    <ResponsiveContainer>
                                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                                            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                                            <Tooltip cursor={{fill: 'rgba(239, 68, 68, 0.1)'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
                                            <Legend wrapperStyle={{fontSize: "14px"}} />
                                            <Bar dataKey="Rezervasyonlar" fill="#D32F2F" barSize={20} radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="İptaller" fill="#F9A825" barSize={20} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : <div className="flex items-center justify-center h-full text-gray-500">Grafik kütüphanesi yükleniyor...</div>}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <ScriptsLoader onReady={() => setIsReady(true)} />
            <Toast message={toastMessage} show={!!toastMessage} />
            <Modal isOpen={isModalOpen}>
                 <VarlikKontroluModal 
                    onClose={() => setModalOpen(false)} 
                    kontrolDetayi={seciliKontrol}
                    onSonlandir={handleSonlandir}
                 />
            </Modal>

            {/* Sol Navigasyon Menüsü */}
            <aside className="w-64 bg-white flex-shrink-0 flex flex-col border-r">
                <div className="h-16 flex items-center justify-center border-b">
                    <h1 className="text-xl font-bold text-gray-800">Yönetim Paneli</h1>
                </div>
                <nav className="flex-grow p-4">
                    <ul className="space-y-2">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('dashboard'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'dashboard' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><DashboardIcon /> Anasayfa</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('verification'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'verification' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><QrCodeIcon /> QR İşlemleri</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('occupancyCheck'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'occupancyCheck' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><OccupancyCheckIcon /> Varlık Kontrolü</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('breakManagement'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'breakManagement' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><CoffeeIcon /> Mola Yönetimi</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('reservationManagement'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'reservationManagement' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><CalendarIcon /> Rezervasyon Yönetimi</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('eventManagement'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'eventManagement' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><TicketIcon /> Etkinlik Yönetimi</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('userManagement'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'userManagement' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><UsersIcon /> Kullanıcı Yönetimi</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('reporting'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'reporting' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><ChartIcon /> Raporlama</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('settings'); }} className={`flex items-center gap-3 p-3 rounded-lg ${currentView === 'settings' ? 'bg-red-50 text-red-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}><SettingsIcon /> Sistem Ayarları</a></li>
                    </ul>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Üst Başlık */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">{
                            {
                                'dashboard': 'Anasayfa',
                                'newEventForm': 'Yeni Etkinlik',
                                'reservationManagement': 'Rezervasyon Yönetimi',
                                'eventManagement': 'Etkinlik Yönetimi',
                                'userManagement': 'Kullanıcı Yönetimi',
                                'reporting': 'Raporlama',
                                'settings': 'Sistem Ayarları',
                                'occupancyCheck': 'Varlık Kontrolü Simülasyonu',
                                'verification': 'QR İşlemleri',
                                'manualReservation': 'Manuel Rezervasyon',
                                'breakManagement': 'Mola Yönetimi'
                            }[currentView] || 'Yönetim Paneli'
                        }</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <label htmlFor="emergency-toggle" className="text-sm font-medium text-gray-600">Acil Durum (Çevrimdışı) Modu</label>
                            <button onClick={() => setEmergencyMode(!isEmergencyMode)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isEmergencyMode ? 'bg-red-600' : 'bg-gray-200'}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEmergencyMode ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700"><BellIcon /></button>
                        <div className="flex items-center gap-3">
                            <img className="h-9 w-9 rounded-full object-cover" src="https://placehold.co/40x40/d32f2f/ffffff?text=A" alt="Profil Resmi" />
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Ayşe Yılmaz</p>
                                <p className="text-xs text-gray-500">Yönetici</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Ana İçerik Alanı */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardApp;
