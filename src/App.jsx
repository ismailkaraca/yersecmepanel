import React, { useState, useEffect, useContext, createContext, useRef } from 'react';

// --- ICONS (Using SVG for simplicity) ---
const SeatIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18v3h3v-3h10v3h3v-6H4v3zm15-8h3v3h-3v-3zM2 10h3v3H2v-3zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z" /></svg>);
const StarIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" /></svg>);
const QrCodeIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V7.5a3 3 0 00-3-3H3.75zM9 13.5h6m-3-3v6" /></svg>);
const CalendarIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" /></svg>);
const ClockIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const LocationMarkerIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>);
const InformationCircleIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>);
const UsersIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.67c.12-.24.232-.49.336-.738m-3.04 6.498l.003-.003m0 0l.004-.003m-3.045 6.498v.004c0 1.114.286 2.16.787 3.07M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const TrashIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 00-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>);
const ChevronLeftIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>);
const ChevronRightIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>);
const XMarkIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const MenuIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>);
const BellIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>);
const PauseIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>);
const PlayIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>);
const ExternalLinkIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v2.25m-7.5 0h7.5" /></svg>);

// --- STYLES (TAILWIND & PRINT) ---
const GlobalStyles = () => (
    <style>{`
        body { background-color: #f5f5f5; font-family: 'Inter', sans-serif; }
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #3b82f6; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @media print {
          body * { visibility: hidden; }
          .printable-area, .printable-area * { visibility: visible; }
          .printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
          .no-print { display: none !important; }
        }
        .main-red { color: #D32F2F; }
        .bg-main-red { background-color: #D32F2F; }
        .border-main-red { border-color: #D32F2F; }
    `}</style>
);

// --- MOCK API & DATA ---
const MOCK_USERS = [
  { id: '11111111111', password: '123456', name: 'Ayşe Yılmaz', role: 'Üye', email: 'ayse.yilmaz@example.com' },
];
const MOCK_HALLS_DATA = [
    { id: 'hall-1', name: 'Genel Çalışma Salonu', capacity: 8, rating: 4.8, avgStay: '2s 15dk', features: ['Priz Mevcut', 'Wi-Fi', 'Grup Çalışması'] },
    { id: 'hall-2', name: 'Sessiz Salon', capacity: 4, rating: 4.9, avgStay: '3s 30dk', features: ['Sessiz Alan', 'Priz Mevcut', 'Wi-Fi'] },
    { id: 'hall-3', name: 'Süreli Yayınlar Salonu', capacity: 4, rating: 4.5, avgStay: '1s 45dk', features: ['Gazete/Dergi', 'Wi-Fi'] },
    { id: 'hall-4', name: 'Tam Dolu Demo Salonu', capacity: 6, rating: 4.2, avgStay: '2s 0dk', features: ['Priz Mevcut', 'Wi-Fi'] },
];
let MOCK_SEATS_DATA = [
    { id: 'C1', status: 'occupied', hallId: 'hall-1' }, { id: 'C2', status: 'available', hallId: 'hall-1' }, { id: 'C3', status: 'available', hallId: 'hall-1' }, { id: 'C4', status: 'occupied', hallId: 'hall-1' }, { id: 'D1', status: 'available', hallId: 'hall-1' }, { id: 'D2', status: 'unavailable', hallId: 'hall-1' }, { id: 'D3', status: 'available', hallId: 'hall-1' }, { id: 'D4', status: 'available', hallId: 'hall-1' },
    { id: 'A1', status: 'available', hallId: 'hall-2' }, { id: 'A2', status: 'occupied', hallId: 'hall-2' }, { id: 'A3', status: 'available', hallId: 'hall-2' }, { id: 'A4', status: 'available', hallId: 'hall-2' },
    { id: 'E1', status: 'available', hallId: 'hall-3' }, { id: 'E2', status: 'available', hallId: 'hall-3' }, { id: 'E3', status: 'occupied', hallId: 'hall-3' }, { id: 'E4', status: 'unavailable', hallId: 'hall-3' },
    { id: 'F1', status: 'occupied', hallId: 'hall-4' }, { id: 'F2', status: 'occupied', hallId: 'hall-4' }, { id: 'F3', status: 'occupied', hallId: 'hall-4' }, { id: 'F4', status: 'occupied', hallId: 'hall-4' }, { id: 'F5', status: 'occupied', hallId: 'hall-4' }, { id: 'F6', status: 'unavailable', hallId: 'hall-4' },
];
let MOCK_RESERVATIONS = [];
let MOCK_EVENT_RESERVATIONS = [];
let MOCK_GROUP_RESERVATIONS = [];
let MOCK_NOTIFICATION_REQUESTS = [];
const MOCK_EVENTS_DATA = [
    { id: 'evt-1', name: 'Yaratıcı Yazarlık Atölyesi', category: 'Atölye', date: '2025-08-15T14:00:00', location: 'Konferans Salonu', capacity: 20, registered: 15, imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Yazarlık+Atölyesi', description: 'Hikaye anlatma tekniklerini ve karakter yaratmanın inceliklerini öğrenin.', targetAudience: 'Yetişkinler', tags: ['Edebiyat', 'Sanat'] },
    { id: 'evt-2', name: 'Çocuklar için Kodlama Saati', category: 'Eğitim', date: '2025-08-22T11:00:00', location: 'Bilgisayar Laboratuvarı', capacity: 15, registered: 15, imageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=Kodlama+Saati', description: 'Çocuklar için temel kodlama ve problem çözme becerileri.', targetAudience: 'Çocuklar', tags: ['Teknoloji', 'Robotik'] },
    { id: 'evt-3', name: 'Tarih Söyleşileri: Osmanlıda Gündelik Yaşam', category: 'Söyleşi', date: '2025-09-05T18:30:00', location: 'Genel Çalışma Salonu', capacity: 50, registered: 48, imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=Tarih+Söyleşisi', description: 'Prof. Dr. İlber Ortaylı ile Osmanlı İmparatorluğu\'nda sosyal yaşam üzerine bir söyleşi.', targetAudience: 'Genel İzleyici', tags: ['Tarih', 'Osmanlı'] },
    { id: 'evt-4', name: 'Masal Okuma Saati', category: 'Çocuk Etkinliği', date: '2025-08-16T10:00:00', location: 'Çocuk Bölümü', capacity: 25, registered: 10, imageUrl: 'https://placehold.co/600x400/9b59b6/ffffff?text=Masal+Saati', description: 'En sevilen masalları birlikte okuyoruz.', targetAudience: 'Çocuklar', tags: ['Edebiyat', 'Masal'] },
];
const MOCK_GROUP_ROOMS_DATA = [
    { id: 'g-room-1', name: 'Grup Odası 1', capacity: 6, available: true, features: ['Beyaz Tahta', 'Projeksiyon'] },
    { id: 'g-room-2', name: 'Grup Odası 2', capacity: 8, available: false, features: ['Beyaz Tahta'] },
    { id: 'g-room-3', name: 'Grup Odası 3', capacity: 4, available: true, features: ['Akıllı Ekran'] },
];
const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'Rezervasyon Başlıyor', message: 'Genel Çalışma Salonu C1 masası rezervasyonunuz 15 dakika içinde başlayacak.', time: '5 dakika önce', read: false },
    { id: 2, title: 'Yer Boşaldı!', message: 'Sessiz Salon için bekleme listesindeydiniz. Salonda bir yer boşaldı!', time: '1 saat önce', read: false },
    { id: 3, title: 'Etkinlik Hatırlatması', message: 'Yaratıcı Yazarlık Atölyesi etkinliği yarın saat 14:00\'da başlayacak.', time: 'dün', read: true },
];

const kohaService = {
  verifyUser: (tc) => new Promise((resolve, reject) => {
      setTimeout(() => {
          const userRecord = MOCK_USERS.find(u => u.id === tc);
          if (userRecord) {
              resolve({ success: true, userExists: true });
          } else {
              resolve({ success: true, userExists: false });
          }
      }, 500);
  }),
  loginWithPassword: (tc, password) => new Promise((resolve, reject) => {
      setTimeout(() => {
          const userRecord = MOCK_USERS.find(u => u.id === tc);
          if (!userRecord) {
              reject({ success: false, code: 'USER_NOT_FOUND', message: 'Kullanıcı bulunamadı.' });
              return;
          }
          if (userRecord.password === password) {
              const { password, ...userData } = userRecord;
              resolve({ success: true, user: userData });
          } else {
              reject({ success: false, code: 'INVALID_CREDENTIALS', message: 'Şifre hatalı.' });
          }
      }, 1000);
  }),
  loginWithOtp: (tc, otp) => new Promise((resolve, reject) => { // OTP simulation
      setTimeout(() => {
          const userRecord = MOCK_USERS.find(u => u.id === tc);
          if (otp === '123456') { // Dummy OTP
              const { password, ...userData } = userRecord;
              resolve({ success: true, user: userData });
          } else {
              reject({ success: false, message: 'Tek kullanımlık şifre hatalı.' });
          }
      }, 1000);
  }),
  getHalls: () => new Promise(resolve => { setTimeout(() => { const hallsWithOccupancy = MOCK_HALLS_DATA.map(hall => { const seatsInHall = MOCK_SEATS_DATA.filter(s => s.hallId === hall.id && s.status !== 'unavailable'); const occupiedSeats = seatsInHall.filter(s => s.status === 'occupied').length; const totalSeats = seatsInHall.length; const occupancy = totalSeats > 0 ? Math.round((occupiedSeats / totalSeats) * 100) : 0; return { ...hall, occupancy, occupiedCount: occupiedSeats, totalCount: totalSeats }; }); resolve(hallsWithOccupancy); }, 500); }),
  getSeatsForHall: (hallId) => new Promise(resolve => { setTimeout(() => resolve(MOCK_SEATS_DATA.filter(s => s.hallId === hallId)), 300); }),
  reserveSeat: (reservationDetails) => new Promise(resolve => {
      setTimeout(() => {
          const { seatId, hallId, userId } = reservationDetails;
          MOCK_SEATS_DATA = MOCK_SEATS_DATA.map(seat => seat.id === seatId ? { ...seat, status: 'occupied' } : seat);
          const newReservation = { type: 'seat', id: `res-${Date.now()}`, ...reservationDetails, hallName: MOCK_HALLS_DATA.find(h => h.id === hallId)?.name, reservationTime: new Date().toISOString() };
          MOCK_RESERVATIONS = MOCK_RESERVATIONS.filter(r => r.userId !== userId);
          MOCK_RESERVATIONS.push(newReservation);
          MOCK_NOTIFICATION_REQUESTS = MOCK_NOTIFICATION_REQUESTS.filter(req => req.userId !== userId);
          resolve({ success: true, reservation: newReservation });
      }, 1000);
  }),
  cancelSeatReservation: (userId, reason = 'user') => new Promise(resolve => {
      setTimeout(() => {
          const reservation = MOCK_RESERVATIONS.find(r => r.userId === userId);
          if (reservation) {
              console.log(`Reservation for ${userId} cancelled. Reason: ${reason}`);
              MOCK_SEATS_DATA = MOCK_SEATS_DATA.map(seat => seat.id === reservation.seatId ? { ...seat, status: 'available' } : seat);
              MOCK_RESERVATIONS = MOCK_RESERVATIONS.filter(r => r.userId !== userId);
              const notificationSent = MOCK_NOTIFICATION_REQUESTS.length > 0;
              if(notificationSent) { MOCK_NOTIFICATION_REQUESTS = []; }
              resolve({ success: true, notificationSent });
          } else {
              resolve({ success: false });
          }
      }, 1000);
  }),
  getMySeatReservation: (userId) => new Promise(resolve => { setTimeout(() => { const reservation = MOCK_RESERVATIONS.find(r => r.userId === userId); resolve(reservation || null); }, 200); }),
  getEvents: () => new Promise(resolve => { setTimeout(() => resolve(MOCK_EVENTS_DATA), 500); }),
  getEventById: (eventId) => new Promise(resolve => { setTimeout(() => resolve(MOCK_EVENTS_DATA.find(e => e.id === eventId)), 300); }),
  registerForEvent: (eventId, userId, participants) => new Promise(resolve => {
      setTimeout(() => {
          const event = MOCK_EVENTS_DATA.find(e => e.id === eventId);
          if (event.registered + participants.length > event.capacity) { resolve({ success: false, message: 'Yeterli kontenjan bulunmamaktadır.' }); return; }
          event.registered += participants.length;
          const newEventReservation = { type: 'event', id: `evt-res-${Date.now()}`, eventId, userId, eventName: event.name, eventDate: event.date, eventLocation: event.location, reservationTime: new Date().toISOString(), participants };
          MOCK_EVENT_RESERVATIONS.push(newEventReservation);
          resolve({ success: true, reservation: newEventReservation });
      }, 1000);
  }),
  getMyEventReservations: (userId) => new Promise(resolve => { setTimeout(() => resolve(MOCK_EVENT_RESERVATIONS.filter(r => r.userId === userId)), 200); }),
  getGroupRooms: () => new Promise(resolve => { setTimeout(() => resolve(MOCK_GROUP_ROOMS_DATA), 500); }),
  reserveGroupRoom: (roomId, userId, participants, date, timeSlot) => new Promise(resolve => {
      setTimeout(() => {
          const room = MOCK_GROUP_ROOMS_DATA.find(r => r.id === roomId);
          if (!room.available) { resolve({ success: false, message: 'Bu oda şu an dolu.' }); return; }
          room.available = false;
          const newReservation = { type: 'group', id: `g-res-${Date.now()}`, roomId, userId, roomName: room.name, reservationTime: new Date().toISOString(), participants, date, timeSlot };
          MOCK_GROUP_RESERVATIONS = MOCK_GROUP_RESERVATIONS.filter(r => r.userId !== userId); 
          MOCK_GROUP_RESERVATIONS.push(newReservation);
          resolve({ success: true, reservation: newReservation });
      }, 1000);
  }),
  getMyGroupReservation: (userId) => new Promise(resolve => { setTimeout(() => { const reservation = MOCK_GROUP_RESERVATIONS.find(r => r.userId === userId); resolve(reservation || null); }, 200); }),
  getSeatNotificationRequest: (userId) => new Promise(resolve => { 
      setTimeout(() => { 
          const request = MOCK_NOTIFICATION_REQUESTS.find(r => r.userId === userId); 
          resolve(request || null); 
      }, 200); 
  }),
  requestSeatNotification: (userId, hallId, hallName) => new Promise(resolve => {
      setTimeout(() => {
          if (!MOCK_NOTIFICATION_REQUESTS.some(r => r.userId === userId)) {
              MOCK_NOTIFICATION_REQUESTS.push({ userId, requestTime: new Date(), hallId, hallName });
          }
          resolve({ success: true });
      }, 500);
  }),
  cancelSeatNotificationRequest: (userId) => new Promise(resolve => {
      setTimeout(() => {
          MOCK_NOTIFICATION_REQUESTS = MOCK_NOTIFICATION_REQUESTS.filter(r => r.userId !== userId);
          resolve({ success: true });
      }, 500);
  }),
};

// --- SECURITY UTILITIES (JWT Simulation for QR Codes) ---
const JWT_SECRET = 'kygm-koha-cok-gizli-anahtar-12345!';
const base64url = (source) => { let encodedSource = btoa(JSON.stringify(source)); encodedSource = encodedSource.replace(/=+$/, ''); encodedSource = encodedSource.replace(/\+/g, '-'); encodedSource = encodedSource.replace(/\//g, '_'); return encodedSource; };
const createSignature = (data) => { let hash = 0; const combined = data + JWT_SECRET; for (let i = 0; i < combined.length; i++) { const char = combined.charCodeAt(i); hash = ((hash << 5) - hash) + char; hash |= 0; } return btoa(hash.toString()).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'); };
const createSecureQrToken = (payload) => { const header = { alg: 'HS256-SIMULATED', typ: 'JWT' }; const encodedHeader = base64url(header); const encodedPayload = base64url(payload); const unsignedToken = `${encodedHeader}.${encodedPayload}`; const signature = createSignature(unsignedToken); return `${unsignedToken}.${signature}`; };

// --- CONTEXTS ---
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const login = async (loginFunction, ...args) => { const response = await loginFunction(...args); setUser(response.user); setIsAuthenticated(true); return response; }; 
  const logout = () => { setUser(null); setIsAuthenticated(false); }; 
  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);

const AuthModalContext = createContext(null);
export const AuthModalProvider = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authAction, setAuthAction] = useState(null);
    const openAuthModal = (nextAction = null) => { if (nextAction) { setAuthAction(() => nextAction); } setIsAuthModalOpen(true); };
    const closeAuthModal = () => { setIsAuthModalOpen(false); setAuthAction(null); };
    const runAuthAction = () => { if (authAction && typeof authAction === 'function') { authAction(); } closeAuthModal(); };
    return (<AuthModalContext.Provider value={{ isAuthModalOpen, openAuthModal, closeAuthModal, runAuthAction }}>{children}</AuthModalContext.Provider>);
};
export const useAuthModal = () => useContext(AuthModalContext);

const ReservationContext = createContext(null);
export const ReservationProvider = ({ children }) => {
    const [seatReservation, setSeatReservation] = useState(null);
    const [eventReservations, setEventReservations] = useState([]);
    const [groupReservation, setGroupReservation] = useState(null);
    const [notificationRequest, setNotificationRequest] = useState(null);
    const [appNotification, setAppNotification] = useState(null);
    const [breakInfo, setBreakInfo] = useState({ isOnBreak: false, startTime: null, endTime: null, availableBreaks: { short: 3, long: 1 } });
    const breakTimers = useRef({ reminder: null, cancellation: null });
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            kohaService.getMySeatReservation(user.id).then(setSeatReservation);
            kohaService.getMyEventReservations(user.id).then(setEventReservations);
            kohaService.getMyGroupReservation(user.id).then(setGroupReservation);
            kohaService.getSeatNotificationRequest(user.id).then(setNotificationRequest);
        } else {
            setSeatReservation(null); setEventReservations([]); setGroupReservation(null); setNotificationRequest(null);
        }
    }, [user, isAuthenticated]);

    const clearBreakTimers = () => {
        if (breakTimers.current.reminder) clearTimeout(breakTimers.current.reminder);
        if (breakTimers.current.cancellation) clearTimeout(breakTimers.current.cancellation);
        breakTimers.current = { reminder: null, cancellation: null };
    };

    const cancelMySeatReservation = async (reason = 'user') => {
        const result = await kohaService.cancelSeatReservation(user.id, reason);
        if (result.success) {
            setSeatReservation(null);
            clearBreakTimers();
            setBreakInfo(prev => ({ ...prev, isOnBreak: false, startTime: null, endTime: null }));
            if (reason === 'break_exceeded') {
                 setAppNotification({ type: 'error', message: 'Mola süresi aşıldığı için rezervasyonunuz iptal edildi.' });
            } else if (result.notificationSent) {
                setAppNotification({ type: 'info', message: 'Bir yer boşaldı! Bekleme listesindeki kullanıcılara bildirim gönderildi.' });
            }
        }
    };

    const startBreak = (duration, type) => {
        if (breakInfo.availableBreaks[type] <= 0) return;
        const gracePeriod = 3 * 60 * 1000;
        const reminderTime = 3 * 60 * 1000;
        const durationMs = duration * 60 * 1000;
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + durationMs);
        setBreakInfo(prev => ({ 
            isOnBreak: true, 
            startTime: startTime.toISOString(), 
            endTime, 
            availableBreaks: { ...prev.availableBreaks, [type]: prev.availableBreaks[type] - 1 } 
        }));
        breakTimers.current.reminder = setTimeout(() => { setAppNotification({ type: 'info', message: 'Mola sürenizin dolmasına 3 dakika kaldı!' }); }, durationMs - reminderTime);
        breakTimers.current.cancellation = setTimeout(() => { cancelMySeatReservation('break_exceeded'); }, durationMs + gracePeriod);
        setAppNotification({ type: 'success', message: `${duration} dakikalık molanız başladı.` });
    };

    const endBreak = () => {
        clearBreakTimers();
        setBreakInfo(prev => ({ ...prev, isOnBreak: false, startTime: null, endTime: null }));
        setAppNotification({ type: 'success', message: 'Tekrar hoş geldiniz! Oturumunuz aktif hale getirildi.' });
    };

    const addSeatReservation = (reservation) => { setSeatReservation(reservation); kohaService.cancelSeatNotificationRequest(user.id); setNotificationRequest(null); };
    const addEventReservation = (reservation) => { setEventReservations(prev => [...prev, reservation]); };
    const addGroupReservation = (reservation) => { setGroupReservation(reservation); };
    const addNotificationRequest = async (hallId, hallName) => { await kohaService.requestSeatNotification(user.id, hallId, hallName); setNotificationRequest({ userId: user.id, requestTime: new Date(), hallId, hallName }); };
    const removeNotificationRequest = async () => { await kohaService.cancelSeatNotificationRequest(user.id); setNotificationRequest(null); };

    return (<ReservationContext.Provider value={{ seatReservation, eventReservations, groupReservation, notificationRequest, appNotification, setAppNotification, addSeatReservation, addEventReservation, addGroupReservation, addNotificationRequest, removeNotificationRequest, cancelMySeatReservation, breakInfo, startBreak, endBreak }}>{children}</ReservationContext.Provider>);
};
export const useReservation = () => useContext(ReservationContext);

const BreakModalContext = createContext(null);
export const BreakModalProvider = ({ children }) => {
    const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
    const openBreakModal = () => setIsBreakModalOpen(true);
    const closeBreakModal = () => setIsBreakModalOpen(false);
    return (<BreakModalContext.Provider value={{ isBreakModalOpen, openBreakModal, closeBreakModal }}>{children}</BreakModalContext.Provider>);
};
export const useBreakModal = () => useContext(BreakModalContext);

// --- ROUTING ---
const RouterContext = createContext({});
const Route = ({ path, component, exact = false }) => { const { currentPath } = useContext(RouterContext); const match = exact ? currentPath === path : currentPath.startsWith(path); return match ? component : null; };
const useHistory = () => { const { setCurrentPath } = useContext(RouterContext); return { push: (path) => setCurrentPath(path) }; };
const useParams = () => {
    const { currentPath } = useContext(RouterContext);
    const parts = currentPath.split('/');
    if (parts[1] === 'rezervasyon' && parts[2] === 'salonlar' && parts.length > 3) { return { hallId: parts[3] }; }
    if (parts[1] === 'etkinlikler' && parts.length > 2) { return { eventId: parts[2] }; }
    return {};
};

// --- UTILITIES ---
const takeScreenshot = (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (element && window.html2canvas) {
        window.html2canvas(element, { useCORS: true }).then(canvas => { const link = document.createElement('a'); link.download = filename; link.href = canvas.toDataURL('image/png'); link.click(); });
    } else { console.error("html2canvas library not found or element not found"); }
};


// --- UI COMPONENTS ---
const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', isLoading = false, disabled = false }) => { const baseClasses = 'w-full flex justify-center items-center rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'; const variantClasses = { primary: 'bg-main-red text-white hover:bg-red-700 focus-visible:outline-red-600', secondary: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50', danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-800' }; return <button type={type} onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`} disabled={isLoading || disabled}>{isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : children}</button>;};
const NotificationPanel = ({ isOpen, onClose }) => {
    const panelRef = useRef(null);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!isOpen) return null;

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div ref={panelRef} className="absolute right-0 top-full mt-2 w-80 max-w-sm bg-white rounded-lg shadow-lg border z-50">
            <div className="p-3 border-b">
                <h3 className="font-semibold text-gray-800">Bildirimler</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.map(notif => (
                    <div key={notif.id} className={`p-3 border-b hover:bg-gray-50 ${!notif.read ? 'bg-red-50' : ''}`}>
                        <p className="font-semibold text-gray-800 text-sm">{notif.title}</p>
                        <p className="text-gray-600 text-sm">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                ))}
            </div>
            {unreadCount > 0 && 
                <div className="p-2 text-center">
                    <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} className="text-sm text-red-600 hover:underline">Tümünü okundu olarak işaretle</button>
                </div>
            }
        </div>
    );
};
const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { openAuthModal } = useAuthModal();
    const { seatReservation, breakInfo } = useReservation();
    const { openBreakModal } = useBreakModal();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
    const history = useHistory();
    const navigateTo = (path) => { history.push(path); setMobileMenuOpen(false); };
    const handleLogout = () => { logout(); navigateTo('/rezervasyon/salonlar'); };
    const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
    const showBreakButton = isAuthenticated && (seatReservation || breakInfo.isOnBreak);

    const handleOpenBreakModal = () => {
        openBreakModal();
        setMobileMenuOpen(false);
    };

    const AppTitle = () => (
        <span className="font-bold text-gray-800 text-xs sm:text-sm lg:text-base">
            Koha Kütüphane Otomasyon Sistemi Entegrasyonlu Yer Seçme, Rezervasyon ve Etkinlik Yönetimi Sistemi
        </span>
    );

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 no-print">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1"><a onClick={() => navigateTo('/rezervasyon/salonlar')} className="-m-1.5 p-1.5 cursor-pointer flex items-center"><AppTitle /></a></div>
                <div className="flex lg:hidden"><button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}><span className="sr-only">Menüyü aç</span><MenuIcon className="h-6 w-6" aria-hidden="true" /></button></div>
                <div className="hidden lg:flex lg:items-center lg:gap-x-6">
                    <a onClick={() => navigateTo('/rezervasyon/salonlar')} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-red-600">Yer Seçme</a>
                    <a onClick={() => navigateTo('/grup-rezervasyon')} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-red-600">Grup Odası Rezervasyonu</a>
                    <a onClick={() => navigateTo('/etkinlikler')} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-red-600">Etkinlik Rezervasyonu</a>
                    {isAuthenticated && <a onClick={() => navigateTo('/rezervasyonlarim')} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:text-red-600">Rezervasyonlarım/Taleplerim</a>}
                    {showBreakButton && <a onClick={openBreakModal} className="text-sm font-semibold leading-6 text-blue-600 cursor-pointer hover:text-blue-800 flex items-center gap-1"><PauseIcon className="w-4 h-4" /> Mola Yönetimi</a>}
                    
                    <a href="https://kutuphaneveteknoloji.com/yersecmepanel.html" target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        Yönetim Paneli <ExternalLinkIcon className="w-4 h-4" />
                    </a>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-x-4">
                             <div className="relative">
                                <button onClick={() => setNotificationPanelOpen(prev => !prev)} className="relative p-1.5 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none">
                                    <BellIcon className="h-6 w-6"/>
                                    {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />}
                                </button>
                                <NotificationPanel isOpen={notificationPanelOpen} onClose={() => setNotificationPanelOpen(false)} />
                            </div>
                            <div className="h-6 w-px bg-gray-200" />
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-semibold text-gray-800">{user?.name}</span>
                                <a onClick={handleLogout} className="text-xs text-red-600 hover:underline cursor-pointer">Çıkış Yap</a>
                            </div>
                        </div>
                    ) : (
                        <Button onClick={openAuthModal} variant="primary" className="w-auto py-1.5 px-4">Giriş Yap</Button>
                    )}
                </div>
            </nav>
            {/* Mobile Menu */}
            <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
                <div className="fixed inset-0 z-50" />
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between"><a onClick={() => navigateTo('/rezervasyon/salonlar')} className="-m-1.5 p-1.5 cursor-pointer flex items-center"><AppTitle /></a><button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}><span className="sr-only">Menüyü kapat</span><XMarkIcon className="h-6 w-6" aria-hidden="true" /></button></div>
                    <div className="mt-6 flow-root"><div className="-my-6 divide-y divide-gray-500/10"><div className="space-y-2 py-6">
                        <a onClick={() => navigateTo('/rezervasyon/salonlar')} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer">Yer Seçme</a>
                        <a onClick={() => navigateTo('/grup-rezervasyon')} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer">Grup Odası Rezervasyonu</a>
                        <a onClick={() => navigateTo('/etkinlikler')} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer">Etkinlik Rezervasyonu</a>
                        {isAuthenticated && <a onClick={() => navigateTo('/rezervasyonlarim')} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer">Rezervasyonlarım/Taleplerim</a>}
                        {showBreakButton && <a onClick={handleOpenBreakModal} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-blue-600 hover:bg-blue-50 cursor-pointer">Mola Yönetimi</a>}
                        <a href="https://kutuphaneveteknoloji.com/yersecmepanel.html" target="_blank" rel="noopener noreferrer" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer">Yönetim Paneli</a>
                    </div><div className="py-6">
                        {isAuthenticated ? (
                             <div className="mb-4">
                                <p className="text-sm text-gray-600">Giriş Yapan Kullanıcı:</p>
                                <p className="font-bold text-gray-800">{user?.name}</p>
                                <a onClick={handleLogout} className="mt-2 inline-block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50 cursor-pointer w-full text-center ring-1 ring-inset ring-red-200">Çıkış Yap</a>
                             </div>
                        ) : (
                            <a onClick={() => { closeAuthModal(); openAuthModal(); }} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer">Giriş Yap</a>
                        )}
                    </div></div></div>
                </div>
            </div>
        </header>
    );
};
const AppNotification = () => {
    const { appNotification, setAppNotification } = useReservation();
    if (!appNotification) return null;
    const baseClasses = "fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-md p-4 rounded-lg shadow-lg z-50 flex items-center justify-between";
    const typeClasses = { info: "bg-blue-100 text-blue-800", success: "bg-green-100 text-green-800", error: "bg-red-100 text-red-800" };
    return (<div className={`${baseClasses} ${typeClasses[appNotification.type]}`}><p>{appNotification.message}</p><button onClick={() => setAppNotification(null)} className="p-1 rounded-full hover:bg-black/10"><XMarkIcon className="w-5 h-5" /></button></div>);
};
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => { 
    if (!isOpen) return null; 
    const sizeClasses = { md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl', '2xl': 'max-w-2xl' };
    return (<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center no-print p-4" aria-modal="true" role="dialog"><div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} m-4`}><div className="p-4 border-b flex justify-between items-center"><h3 className="text-lg font-semibold">{title}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button></div><div className="p-6">{children}</div></div></div>);
};
const SeatReservationTicketView = ({ reservation, user, onSendSms, onPrint, onScreenshot, onCancel, smsSent, showButtons = true }) => {
    if (!reservation || !user) return null;
    const ticketId = `seat-ticket-${reservation.id}`;
    const now = Math.floor(Date.now() / 1000);
    const payload = { jti: `jwt-${reservation.id}-${now}`, iat: now, exp: now + 3600, sub: user.id, typ: 'seat', resId: reservation.id, hId: reservation.hallId, sId: reservation.seatId, };
    const token = createSecureQrToken(payload);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(token)}`;
    return (
        <div>
            <div id={ticketId} className="printable-area bg-white p-4 rounded-lg">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-green-600">Rezervasyon Başarılı!</h3>
                    <p className="text-gray-600 mt-2">Tebrikler, aşağıdaki yer sizin için rezerve edildi.</p>
                    <div className="text-center my-4"><img src={qrUrl} crossOrigin="anonymous" alt="Güvenli Rezervasyon QR Kodu" className="mx-auto rounded-lg shadow-md" /></div>
                    <div className="text-left bg-gray-50 p-4 rounded-lg">
                        <div className="border-b pb-3 mb-3"><p className="text-sm text-gray-500">Üye Adı Soyadı</p><p className="text-lg font-bold text-gray-800">{user.name}</p><p className="text-sm text-gray-500 mt-2">Üye ID</p><p className="font-mono text-gray-700">{user.id}</p></div>
                        <div className="flex justify-between items-center mb-3"><div><p className="text-sm text-gray-500">Salon</p><p className="text-lg font-bold text-gray-800">{reservation.hallName}</p></div><div><p className="text-sm text-gray-500 text-right">Masa No</p><p className="text-lg font-bold text-blue-600">{reservation.seatId}</p></div></div>
                        <div className="border-t pt-3"><p className="text-sm text-gray-500">İşlem Zamanı</p><p className="font-semibold text-gray-700">{new Date(reservation.reservationTime).toLocaleString('tr-TR')}</p></div>
                    </div>
                </div>
            </div>
            {showButtons && (<div className="mt-4 grid grid-cols-1 gap-2 no-print"><div className="grid grid-cols-3 gap-2"><Button onClick={onSendSms} disabled={smsSent} className="text-xs">SMS</Button><Button onClick={onPrint} variant="secondary" className="text-xs">Yazdır</Button><Button onClick={() => onScreenshot(ticketId, 'rezervasyon.png')} variant="secondary" className="text-xs">İndir</Button></div>{onCancel && <Button onClick={onCancel} variant="danger" className="text-xs mt-2">Rezervasyonu İptal Et</Button>}</div>)}
        </div>
    );
};
const EventTicketView = ({ reservation, user, onSendSms, onPrint, onScreenshot, smsSent, showButtons = true }) => {
    if (!reservation || !user) return null;
    const ticketId = `event-ticket-${reservation.id}`;
    const now = Math.floor(Date.now() / 1000);
    const payload = { jti: `jwt-${reservation.id}-${now}`, iat: now, exp: now + 3600, sub: user.id, typ: 'event', resId: reservation.id, eId: reservation.eventId, pax: reservation.participants.length, };
    const token = createSecureQrToken(payload);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(token)}`;
    return (
        <div>
             <div id={ticketId} className="printable-area bg-white p-4 rounded-lg">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-green-600">Etkinlik Kaydı Başarılı!</h3>
                    <div className="text-center my-4"><img src={qrUrl} crossOrigin="anonymous" alt="Güvenli Etkinlik QR Kodu" className="mx-auto rounded-lg shadow-md" /></div>
                    <div className="text-left bg-gray-50 p-4 rounded-lg">
                        <div className="border-b pb-3 mb-3"><p className="text-sm text-gray-500">Üye Adı Soyadı</p><p className="text-lg font-bold text-gray-800">{user.name}</p><p className="text-sm text-gray-500 mt-2">Üye ID</p><p className="font-mono text-gray-700">{user.id}</p></div>
                        <div className="mb-3"><p className="text-sm text-gray-500">Etkinlik</p><p className="text-lg font-bold text-gray-800">{reservation.eventName}</p></div>
                        <div className="flex justify-between items-center mb-3"><div><p className="text-sm text-gray-500">Tarih</p><p className="font-semibold text-gray-700">{new Date(reservation.eventDate).toLocaleDateString('tr-TR')}</p></div><div><p className="text-sm text-gray-500 text-right">Konum</p><p className="font-semibold text-gray-700">{reservation.eventLocation}</p></div></div>
                        <div className="border-t pt-3"><p className="text-sm text-gray-500">Kayıt Zamanı</p><p className="font-semibold text-gray-700">{new Date(reservation.reservationTime).toLocaleString('tr-TR')}</p></div>
                    </div>
                </div>
            </div>
            {showButtons && (<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 no-print"><Button onClick={onSendSms} disabled={smsSent} className="text-xs">SMS Gönder</Button><Button onClick={onPrint} variant="secondary" className="text-xs">Yazdır</Button><Button onClick={() => onScreenshot(ticketId, 'etkinlik-bileti.png')} variant="secondary" className="text-xs">Ekran Görüntüsü Al / İndir</Button></div>)}
        </div>
    );
};
const GroupReservationTicketView = ({ reservation, user, onSendSms, onPrint, onScreenshot, smsSent, showButtons = true }) => {
    if (!reservation || !user) return null;
    const ticketId = `group-ticket-${reservation.id}`;
    const now = Math.floor(Date.now() / 1000);
    const payload = { jti: `jwt-${reservation.id}-${now}`, iat: now, exp: now + 3600, sub: user.id, typ: 'group', resId: reservation.id, rId: reservation.roomId, pax: reservation.participants.length, };
    const token = createSecureQrToken(payload);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(token)}`;
    return (
        <div>
            <div id={ticketId} className="printable-area bg-white p-4 rounded-lg">
                <div className="text-center">
                    <h3 className="text-xl font-bold text-green-600">Grup Odası Rezervasyonu Başarılı!</h3>
                    <div className="text-center my-4"><img src={qrUrl} crossOrigin="anonymous" alt="Güvenli Grup Rezervasyon QR Kodu" className="mx-auto rounded-lg shadow-md" /></div>
                    <div className="text-left bg-gray-50 p-4 rounded-lg">
                        <div className="border-b pb-3 mb-3"><p className="text-sm text-gray-500">Rezervasyonu Yapan</p><p className="text-lg font-bold text-gray-800">{user.name}</p><p className="text-sm text-gray-500 mt-2">Üye ID</p><p className="font-mono text-gray-700">{user.id}</p></div>
                        <div className="mb-3"><p className="text-sm text-gray-500">Oda Adı</p><p className="text-lg font-bold text-gray-800">{reservation.roomName}</p></div>
                        <div className="flex justify-between items-center mb-3"><div><p className="text-sm text-gray-500">Tarih</p><p className="font-semibold text-gray-700">{new Date(reservation.date).toLocaleDateString('tr-TR')}</p></div><div><p className="text-sm text-gray-500 text-right">Saat</p><p className="font-semibold text-gray-700">{reservation.timeSlot}</p></div></div>
                        <div className="border-t pt-3"><p className="text-sm text-gray-500">Rezervasyon Zamanı</p><p className="font-semibold text-gray-700">{new Date(reservation.reservationTime).toLocaleString('tr-TR')}</p></div>
                    </div>
                </div>
            </div>
            {showButtons && (<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 no-print"><Button onClick={onSendSms} disabled={smsSent} className="text-xs">SMS Gönder</Button><Button onClick={onPrint} variant="secondary" className="text-xs">Yazdır</Button><Button onClick={() => onScreenshot(ticketId, 'grup-rezervasyon.png')} variant="secondary" className="text-xs">Ekran Görüntüsü Al / İndir</Button></div>)}
        </div>
    );
};
const HallCard = ({ hall }) => {
    const history = useHistory();
    const { isAuthenticated } = useAuth();
    const { openAuthModal } = useAuthModal();
    const handleSelectSeat = () => {
        const action = () => history.push(`/rezervasyon/salonlar/${hall.id}`);
        if (isAuthenticated) { action(); } else { openAuthModal(action); }
    };
    const occupancyColor = hall.occupancy < 60 ? 'bg-green-500' : hall.occupancy < 85 ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
            <div className="p-5 flex-grow"><div className="flex justify-between items-start"><h3 className="text-xl font-bold text-gray-800">{hall.name}</h3><div className="flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full"><StarIcon className="w-4 h-4 mr-1 text-yellow-500"/>{hall.rating.toFixed(1)}</div></div><p className="text-sm text-gray-500 mt-1">Kapasite: {hall.capacity} Kişi</p><div className="my-4"><div className="flex justify-between mb-1"><span className="text-sm font-medium text-gray-700">Doluluk: {hall.occupiedCount}/{hall.totalCount}</span><span className="text-sm font-medium text-gray-700">{hall.occupancy}%</span></div><div className="w-full bg-gray-200 rounded-full h-2.5"><div className={`h-2.5 rounded-full ${occupancyColor}`} style={{ width: `${hall.occupancy}%` }}></div></div></div><div className="flex flex-wrap gap-2 mt-4">{hall.features.map(feature => <span key={feature} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">{feature}</span>)}</div></div>
            <div className="p-4 bg-gray-50"><Button onClick={handleSelectSeat} variant="primary">Yer Seç</Button></div>
        </div>
    );
};
const Seat = ({ seat, isSelected }) => {
    const statusClasses = { available: 'text-green-500 bg-green-100', occupied: 'text-red-500 bg-red-100 cursor-not-allowed', unavailable: 'text-gray-400 bg-gray-200 cursor-not-allowed', selected: 'text-white bg-blue-600 ring-2 ring-offset-2 ring-blue-600' };
    const currentStatus = isSelected ? 'selected' : seat.status;
    return (<div className={`rounded-lg p-2 flex flex-col items-center justify-center transition-all duration-300 w-24 h-24 text-center ${statusClasses[currentStatus]}`}><SeatIcon className="w-8 h-8 mb-1" /><span className="font-bold text-sm">{seat.id}</span><span className="text-xs capitalize">{currentStatus === 'available' ? 'Boş' : (currentStatus === 'occupied' ? 'Dolu' : (currentStatus === 'selected' ? 'Seçildi' : 'Servis Dışı'))}</span></div>);
};
const BreakManagementModal = ({ isOpen, onClose }) => {
    const { breakInfo, startBreak, endBreak, seatReservation } = useReservation();
    const { user } = useAuth();
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!breakInfo.isOnBreak || !breakInfo.endTime) {
            return;
        }
        const calculateTimeLeft = () => {
            const difference = +new Date(breakInfo.endTime) - +new Date();
            return difference > 0 ? difference : 0;
        };
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [breakInfo.isOnBreak, breakInfo.endTime]);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    
    const handleStartBreak = (duration, type) => {
        startBreak(duration, type);
    };

    let breakQrUrl = null;
    if (breakInfo.isOnBreak && user && seatReservation && breakInfo.endTime) {
        const now = Math.floor(Date.now() / 1000);
        const payload = {
            jti: `jwt-break-${seatReservation.id}-${now}`,
            iat: now,
            exp: Math.floor(new Date(breakInfo.endTime).getTime() / 1000) + 180, // end time + 3 min grace
            sub: user.id,
            typ: 'break_session',
            resId: seatReservation.id,
            sId: seatReservation.seatId,
            hId: seatReservation.hallId,
            breakStart: breakInfo.startTime,
            breakEnd: breakInfo.endTime.toISOString(),
        };
        const token = createSecureQrToken(payload);
        breakQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(token)}`;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Mola Yönetimi">
            {breakInfo.isOnBreak ? (
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Şu Anda Moladasınız</h3>
                    <div className="my-4 text-6xl font-bold text-red-600 font-mono">
                        {formatTime(timeLeft)}
                    </div>

                    {breakQrUrl && (
                        <div className="my-6 p-4 bg-gray-50 rounded-lg border">
                            <h4 className="font-semibold text-gray-700 mb-2">Mola Geçiş Kodu</h4>
                            <p className="text-xs text-gray-500 mb-3">Çıkış ve girişlerde turnikelerde veya personele okutmak için bu QR kodu kullanın.</p>
                            <img src={breakQrUrl} crossOrigin="anonymous" alt="Mola QR Kodu" className="mx-auto rounded-lg shadow-md" />
                        </div>
                    )}

                    <p className="text-sm text-gray-500 mb-6">Mola süreniz bittiğinde yerinizi kaybetmemek için 3 dakikalık ek süreniz bulunmaktadır.</p>
                    <Button onClick={() => { endBreak(); onClose(); }} variant="secondary">
                        <PlayIcon className="w-5 h-5 mr-2" /> Giriş Yaptım / Molayı Bitir
                    </Button>
                </div>
            ) : (
                <div>
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700">Kalan Mola Haklarınız</h4>
                        <div className="mt-2 text-center flex justify-around bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{breakInfo.availableBreaks.short}</p>
                                <p className="text-sm text-gray-600">x 15 Dakika</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-800">{breakInfo.availableBreaks.long}</p>
                                <p className="text-sm text-gray-600">x 1 Saat</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                         <Button 
                            onClick={() => handleStartBreak(15, 'short')} 
                            disabled={breakInfo.availableBreaks.short <= 0}
                            variant="primary"
                        >
                            <PauseIcon className="w-5 h-5 mr-2" /> 15 Dakika Mola Başlat
                        </Button>
                        <Button 
                            onClick={() => handleStartBreak(60, 'long')} 
                            disabled={breakInfo.availableBreaks.long <= 0}
                            variant="secondary"
                        >
                            <PauseIcon className="w-5 h-5 mr-2" /> 1 Saat Mola Başlat
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

// --- PAGES ---
const HallSelectionPage = () => { const [halls, setHalls] = useState([]); const [loading, setLoading] = useState(true); useEffect(() => { kohaService.getHalls().then(data => { setHalls(data); setLoading(false); }); }, []); if (loading) return <div className="flex justify-center items-center h-96"><div className="loader"></div></div>; return (<div className="py-10"><main className="mx-auto max-w-7xl sm:px-6 lg:px-8"><div className="bg-white shadow-lg rounded-lg p-6 sm:p-8"><h1 className="text-3xl font-bold text-gray-900 mb-2">Salon Seçimi</h1><p className="text-gray-600 mb-8">Lütfen anlık rezervasyon yapmak istediğiniz salonu seçiniz.</p><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{halls.map(hall => <HallCard key={hall.id} hall={hall} />)}</div></div></main></div>);};
const SeatSelectionPage = () => { 
    const { hallId } = useParams(); 
    const hallDetails = MOCK_HALLS_DATA.find(h => h.id === hallId); 
    const { user } = useAuth(); 
    const { addSeatReservation, notificationRequest, addNotificationRequest, removeNotificationRequest } = useReservation(); 
    const [seats, setSeats] = useState([]); 
    const [selectedSeatId, setSelectedSeatId] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [isReserving, setIsReserving] = useState(false); 
    const [reservationDone, setReservationDone] = useState(false); 
    const [finalReservation, setFinalReservation] = useState(null); 
    const [showQrModal, setShowQrModal] = useState(false); 
    const [smsSent, setSmsSent] = useState(false); 
    const [smsMessage, setSmsMessage] = useState(''); 
    const [attemptsLeft, setAttemptsLeft] = useState(3); 
    const history = useHistory(); 
    
    useEffect(() => { setLoading(true); kohaService.getSeatsForHall(hallId).then(data => { setSeats(data); setLoading(false); }); }, [hallId]); 
    
    const handleConfirmReservation = (seatToReserve) => { 
        if (!seatToReserve) return; 
        setIsReserving(true); 
        const fullDetails = { seatId: seatToReserve, hallId, userId: user.id }; 
        kohaService.reserveSeat(fullDetails).then((response) => { addSeatReservation(response.reservation); setFinalReservation(response.reservation); const newSeats = seats.map(seat => seat.id === seatToReserve ? {...seat, status: 'occupied'} : seat); setSeats(newSeats); setSelectedSeatId(null); setIsReserving(false); setAttemptsLeft(0); setReservationDone(true); setShowQrModal(true); }); 
    }; 
    
    const findQuickSeat = () => { 
        if (attemptsLeft <= 0) return; 
        const availableSeats = seats.filter(s => s.status === 'available' && s.id !== selectedSeatId); 
        if (availableSeats.length > 0) { const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)]; setSelectedSeatId(randomSeat.id); const newAttempts = attemptsLeft - 1; setAttemptsLeft(newAttempts); if (newAttempts === 0) { handleConfirmReservation(randomSeat.id); } } else { setReservationDone(true); setAttemptsLeft(0); } 
    }; 
    
    const handleSendSms = () => { setSmsMessage('SMS başarıyla gönderildi.'); setSmsSent(true); setTimeout(() => setSmsMessage(''), 5000); }; 
    const handlePrint = () => { window.print(); }; 
    
    if (loading || !hallDetails) return <div className="flex justify-center items-center h-96"><div className="loader"></div></div>; 
    
    const isHallFull = seats.every(s => s.status === 'occupied' || s.status === 'unavailable');

    return (
        <>
            <Modal isOpen={showQrModal} onClose={() => setShowQrModal(false)} title="Rezervasyon Onaylandı"><SeatReservationTicketView reservation={finalReservation} user={user} onSendSms={handleSendSms} onPrint={handlePrint} onScreenshot={takeScreenshot} smsSent={smsSent} /></Modal>
            <div className="py-10"><main className="mx-auto max-w-7xl sm:px-6 lg:px-8"><div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
                <div className="mb-6"><a onClick={() => history.push('/rezervasyon/salonlar')} className="text-red-600 hover:text-red-800 cursor-pointer no-print">&larr; Geri Dön (Salon Seçimi)</a><h1 className="text-3xl font-bold text-gray-900 mt-2">Yer Seçimi: <span className="text-red-700">{hallDetails?.name}</span></h1></div>
                {smsMessage && <div className="mb-4 p-3 text-sm text-green-800 rounded-lg bg-green-100 text-center no-print">{smsMessage}</div>}
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-grow bg-gray-50 p-6 rounded-lg border"><h2 className="text-xl font-semibold mb-6 text-center text-gray-700">{hallDetails?.name} Kat Planı</h2><div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">{seats.map(seat => <Seat key={seat.id} seat={seat} isSelected={seat.id === selectedSeatId || seat.id === finalReservation?.seatId} />)}</div></div>
                    <div className="lg:w-1/3 xl:w-1/4"><div className="bg-white p-6 rounded-lg border sticky top-24">
                        {reservationDone ? (<SeatReservationTicketView reservation={finalReservation} user={user} onSendSms={handleSendSms} onPrint={handlePrint} onScreenshot={takeScreenshot} smsSent={smsSent} />) : 
                        isHallFull ? (
                            <><h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Yer Bulunamadı</h2><div className="text-center py-4"><p className="text-gray-600 mb-4">Şu anda bu salonda boş yer bulunmamaktadır.</p>
                                {notificationRequest ? (
                                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert"><p className="font-bold">Aktif Bir Talebiniz Var!</p><p className="text-sm">Boş bir yer açıldığında size bildirim gönderilecektir. Talebinizi "Rezervasyonlarım/Taleplerim" sayfasından yönetebilirsiniz.</p><button onClick={removeNotificationRequest} className="text-sm text-red-600 hover:underline mt-2">Talebi İptal Et</button></div>
                                ) : (
                                    <Button onClick={() => addNotificationRequest(hallId, hallDetails.name)}>Yer Açılınca Bildir</Button>
                                )}
                            </div></>
                        ) : (
                            <><h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Otomatik Yer Bulma</h2><div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p className="text-sm">"Bana Hızlı Yer Bul" ile sistemin sizin için rastgele boş bir yer bulmasını sağlayabilirsiniz. Son denemede atanan yer otomatik rezerve edilir.</p></div><div className="space-y-4"><Button onClick={findQuickSeat} isLoading={isReserving} disabled={attemptsLeft === 0 || isReserving}>Bana Hızlı Yer Bul</Button><p className="text-center text-sm text-gray-600">Kalan hak: <span className="font-bold text-red-600 text-base">{attemptsLeft}</span></p><hr/>
                                {selectedSeatId && (<><div><p className="text-sm text-gray-500">Önerilen Masa</p><p className="text-2xl font-bold text-red-600">{selectedSeatId}</p></div><Button onClick={() => handleConfirmReservation(selectedSeatId)} isLoading={isReserving} disabled={isReserving || attemptsLeft === 0} variant="secondary">Bu Yeri Onayla</Button></>)}
                            </div></>
                        )}
                    </div></div>
                </div>
            </div></main></div>
        </>
    );
};
const EventCard = ({ event }) => { 
    const history = useHistory(); 
    const { isAuthenticated } = useAuth();
    const { openAuthModal } = useAuthModal();
    const handleSelectEvent = () => {
        const action = () => history.push(`/etkinlikler/${event.id}`);
        if (isAuthenticated) { action(); } else { openAuthModal(action); }
    };
    const capacityLeft = event.capacity - event.registered; 
    const capacityColor = capacityLeft <= 5 ? 'text-red-600' : 'text-green-600'; 
    return (<div onClick={handleSelectEvent} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer"><img className="h-48 w-full object-cover" src={event.imageUrl} alt={`${event.name} afişi`} /><div className="p-4 flex flex-col flex-grow"><p className="text-sm text-red-600 font-semibold">{event.category}</p><h3 className="text-lg font-bold text-gray-800 mt-1 flex-grow">{event.name}</h3><div className="mt-4 text-sm text-gray-600 space-y-2"><div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2" /><span>{new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div><div className="flex items-center"><LocationMarkerIcon className="w-4 h-4 mr-2" /><span>{event.location}</span></div></div><div className="mt-4 pt-4 border-t text-sm font-semibold flex justify-between items-center"><span>Kontenjan:</span><span className={capacityColor}>{capacityLeft} / {event.capacity}</span></div></div></div>);
};
const EventsListPage = () => { const [events, setEvents] = useState([]); const [filteredEvents, setFilteredEvents] = useState([]); const [loading, setLoading] = useState(true); const [searchTerm, setSearchTerm] = useState(''); const [selectedCategory, setSelectedCategory] = useState('Tümü'); useEffect(() => { kohaService.getEvents().then(data => { setEvents(data); setFilteredEvents(data); setLoading(false); }); }, []); useEffect(() => { let result = events; if (selectedCategory !== 'Tümü') { result = result.filter(event => event.category === selectedCategory); } if (searchTerm) { result = result.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase())); } setFilteredEvents(result); }, [searchTerm, selectedCategory, events]); const categories = ['Tümü', ...new Set(events.map(e => e.category))]; if (loading) return <div className="flex justify-center items-center h-96"><div className="loader"></div></div>; return (<div className="py-10"><main className="mx-auto max-w-7xl sm:px-6 lg:px-8"><div className="bg-white shadow-lg rounded-lg p-6 sm:p-8"><h1 className="text-3xl font-bold text-gray-900 mb-2">Etkinlikler</h1><p className="text-gray-600 mb-8">Kütüphanemizde düzenlenecek olan etkinlikleri keşfedin ve kaydolun.</p><div className="flex flex-col md:flex-row gap-4 mb-8"><input type="text" placeholder="Etkinlik ara..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full md:w-1/3 rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm" /><select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="block w-full md:w-1/4 rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm">{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredEvents.length > 0 ? filteredEvents.map(event => <EventCard key={event.id} event={event} />) : <p className="col-span-full text-center text-gray-500">Arama kriterlerine uygun etkinlik bulunamadı.</p>}</div></div></main></div>);};
const EventDetailPage = () => { const { eventId } = useParams(); const [event, setEvent] = useState(null); const [loading, setLoading] = useState(true); const [isRegistering, setIsRegistering] = useState(false); const [finalReservation, setFinalReservation] = useState(null); const [showSuccessModal, setShowSuccessModal] = useState(false); const [smsSent, setSmsSent] = useState(false); const [smsMessage, setSmsMessage] = useState(''); const { user, isAuthenticated } = useAuth(); const { addEventReservation, eventReservations } = useReservation(); const { openAuthModal } = useAuthModal(); const history = useHistory(); useEffect(() => { kohaService.getEventById(eventId).then(data => { setEvent(data); setLoading(false); }); }, [eventId]); const handleRegister = () => { const action = () => { setIsRegistering(true); kohaService.registerForEvent(eventId, user.id, [{tc: user.id, name: user.name}]).then(response => { if (response.success) { addEventReservation(response.reservation); setFinalReservation(response.reservation); setShowSuccessModal(true); } setIsRegistering(false); }); }; if (isAuthenticated) { action(); } else { openAuthModal(action); } }; const handleSendSms = () => { setSmsMessage('SMS başarıyla gönderildi.'); setSmsSent(true); setTimeout(() => setSmsMessage(''), 5000); }; const handlePrint = () => { window.print(); }; const isAlreadyRegistered = isAuthenticated && eventReservations.some(r => r.eventId === eventId); const isFull = event ? event.registered >= event.capacity : false; if (loading) return <div className="flex justify-center items-center h-96"><div className="loader"></div></div>; if (!event) return <p className="text-center py-10">Etkinlik bulunamadı.</p>; return (<><Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Kayıt Onaylandı"><EventTicketView reservation={finalReservation} user={user} onSendSms={handleSendSms} onPrint={handlePrint} onScreenshot={takeScreenshot} smsSent={smsSent} /></Modal><div className="py-10"><main className="mx-auto max-w-4xl sm:px-6 lg:px-8"><div className="bg-white shadow-lg rounded-lg overflow-hidden"><img className="h-80 w-full object-cover" src={event.imageUrl} alt={`${event.name} afişi`} /><div className="p-8"><p className="text-sm text-red-600 font-semibold">{event.category}</p><h1 className="text-4xl font-bold text-gray-900 mt-2">{event.name}</h1><div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mt-4"><div className="flex items-center"><CalendarIcon className="w-5 h-5 mr-2" /><span>{new Date(event.date).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></div><div className="flex items-center"><ClockIcon className="w-5 h-5 mr-2" /><span>{new Date(event.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span></div><div className="flex items-center"><LocationMarkerIcon className="w-5 h-5 mr-2" /><span>{event.location}</span></div></div><p className="text-gray-700 mt-6">{event.description}</p><div className="mt-8 pt-6 border-t">{isAlreadyRegistered ? (<div className="text-center p-4 bg-green-100 text-green-800 rounded-lg"><p className="font-semibold">Bu etkinliğe zaten kayıtlısınız.</p><a onClick={() => history.push('/rezervasyonlarim')} className="text-red-600 hover:underline cursor-pointer mt-2 inline-block">Biletinizi Görüntüleyin</a></div>) : (<Button onClick={handleRegister} isLoading={isRegistering} disabled={isFull}>{isFull ? 'Kontenjan Dolu' : 'Kayıt Ol'}</Button>)}</div></div></div></main></div></>);};
const MyReservationsPage = () => {
    const { seatReservation, eventReservations, groupReservation, cancelMySeatReservation, notificationRequest, removeNotificationRequest, breakInfo } = useReservation();
    const { user } = useAuth();
    const { openBreakModal } = useBreakModal();
    const [activeTab, setActiveTab] = useState('yer');
    const [smsStates, setSmsStates] = useState({});
    
    const handleSendSms = (reservationId) => { setSmsStates(prev => ({ ...prev, [reservationId]: { sent: true, message: 'SMS başarıyla gönderildi.' } })); setTimeout(() => setSmsStates(prev => ({ ...prev, [reservationId]: { sent: true, message: '' } })), 5000); };
    const handlePrint = () => { window.print(); };
    
    return (
        <div className="py-10">
            <main className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Rezervasyonlarım / Taleplerim</h1>
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button onClick={() => setActiveTab('yer')} className={`${activeTab === 'yer' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Yer Rezervasyonum</button>
                            <button onClick={() => setActiveTab('grup')} className={`${activeTab === 'grup' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Grup Rezervasyonum</button>
                            <button onClick={() => setActiveTab('etkinlik')} className={`${activeTab === 'etkinlik' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Etkinlik Biletlerim</button>
                            <button onClick={() => setActiveTab('talep')} className={`${activeTab === 'talep' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Taleplerim</button>
                        </nav>
                    </div>
                    <div className="pt-8">
                        {activeTab === 'yer' && (!seatReservation ? (<div className="text-center text-gray-500 py-8"><p>Aktif bir yer rezervasyonunuz bulunmamaktadır.</p></div>) : (<div className="max-w-md mx-auto">{smsStates[seatReservation.id]?.message && <div className="mb-4 p-3 text-sm text-green-800 rounded-lg bg-green-100 text-center no-print">{smsStates[seatReservation.id].message}</div>} <div className="mb-4 no-print"><Button onClick={openBreakModal} variant={breakInfo.isOnBreak ? 'secondary' : 'primary'}>{breakInfo.isOnBreak ? 'Mola Durumunu Görüntüle' : 'Mola Yönetimi'}</Button></div> <SeatReservationTicketView reservation={seatReservation} user={user} onSendSms={() => handleSendSms(seatReservation.id)} onPrint={handlePrint} onScreenshot={takeScreenshot} onCancel={() => cancelMySeatReservation('user')} smsSent={smsStates[seatReservation.id]?.sent} /></div>))}
                        {activeTab === 'grup' && (!groupReservation ? (<div className="text-center text-gray-500 py-8"><p>Aktif bir grup odası rezervasyonunuz bulunmamaktadır.</p></div>) : (<div className="max-w-md mx-auto">{smsStates[groupReservation.id]?.message && <div className="mb-4 p-3 text-sm text-green-800 rounded-lg bg-green-100 text-center no-print">{smsStates[groupReservation.id].message}</div>}<GroupReservationTicketView reservation={groupReservation} user={user} onSendSms={() => handleSendSms(groupReservation.id)} onPrint={handlePrint} onScreenshot={takeScreenshot} smsSent={smsStates[groupReservation.id]?.sent} /></div>))}
                        {activeTab === 'etkinlik' && (eventReservations.length === 0 ? (<div className="text-center text-gray-500 py-8"><p>Kayıtlı olduğunuz bir etkinlik bulunmamaktadır.</p></div>) : (<div className="space-y-6">{eventReservations.map(res => (<div key={res.id} className="max-w-md mx-auto">{smsStates[res.id]?.message && <div className="mb-4 p-3 text-sm text-green-800 rounded-lg bg-green-100 text-center no-print">{smsStates[res.id].message}</div>}<EventTicketView reservation={res} user={user} onSendSms={() => handleSendSms(res.id)} onPrint={handlePrint} onScreenshot={takeScreenshot} smsSent={smsStates[res.id]?.sent} /></div>))}</div>))}
                        {activeTab === 'talep' && (!notificationRequest ? (<div className="text-center text-gray-500 py-8"><p>Aktif bir bildirim talebiniz bulunmamaktadır.</p></div>) : (<div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg border"><h3 className="text-lg font-semibold text-gray-800">Aktif Bildirim Talebi</h3><p className="text-gray-600 mt-2">Boş bir yer açıldığında size bildirim gönderilmesi için talebiniz alınmıştır.</p><div className="mt-4 pt-4 border-t"><p className="text-sm text-gray-500">Talep Edilen Salon</p><p className="font-semibold text-gray-700">{notificationRequest.hallName || 'Herhangi bir salon'}</p><p className="text-sm text-gray-500 mt-3">Talep Zamanı</p><p className="font-semibold text-gray-700">{new Date(notificationRequest.requestTime).toLocaleString('tr-TR')}</p></div><div className="mt-6"><Button onClick={removeNotificationRequest} variant="danger">Talebi İptal Et</Button></div></div>))}
                    </div>
                </div>
            </main>
        </div>
    );
};
const GroupRoomCard = ({ room, onReserve, isReserving, isReservedByCurrentUser }) => {
    const { isAuthenticated } = useAuth();
    const { openAuthModal } = useAuthModal();
    const handleReserveClick = () => {
        const action = () => onReserve(room);
        if (isAuthenticated) { action(); } else { openAuthModal(action); }
    };
    const statusColor = room.available && !isReservedByCurrentUser ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    const statusText = isReservedByCurrentUser ? 'Bu Odayı Rezerve Ettiniz' : (room.available ? 'Müsait' : 'Dolu');
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="p-5 flex-grow"><div className="flex justify-between items-start"><h3 className="text-xl font-bold text-gray-800">{room.name}</h3><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>{statusText}</span></div><div className="flex items-center text-gray-600 mt-2"><UsersIcon className="w-5 h-5 mr-2" /><span>{room.capacity} Kişilik Kapasite</span></div><div className="flex flex-wrap gap-2 mt-4">{room.features.map(feature => <span key={feature} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">{feature}</span>)}</div></div>
            <div className="p-4 bg-gray-50"><Button onClick={handleReserveClick} isLoading={isReserving} disabled={!room.available || isReservedByCurrentUser}>Odayı Rezerve Et</Button></div>
        </div>
    );
};
const GroupReservationPage = () => {
    const [rooms, setRooms] = useState([]); const [loading, setLoading] = useState(true); const [isReserving, setIsReserving] = useState(false); const [reservationDetails, setReservationDetails] = useState({ room: null, date: null, timeSlot: null }); const [finalReservation, setFinalReservation] = useState(null); const [showSuccessModal, setShowSuccessModal] = useState(false); const [showDateTimeModal, setShowDateTimeModal] = useState(false); const [showParticipantModal, setShowParticipantModal] = useState(false); const [smsSent, setSmsSent] = useState(false); const { user } = useAuth(); const { addGroupReservation, groupReservation } = useReservation();
    useEffect(() => { kohaService.getGroupRooms().then(data => { setRooms(data); setLoading(false); }); }, []);
    const handleStartReservation = (room) => { setReservationDetails({ room, date: null, timeSlot: null }); setShowDateTimeModal(true); };
    const handleDateTimeConfirm = (date, timeSlot) => { setReservationDetails(prev => ({ ...prev, date, timeSlot })); setShowDateTimeModal(false); setShowParticipantModal(true); };
    const handleParticipantConfirm = (participants) => { setIsReserving(true); const { room, date, timeSlot } = reservationDetails; kohaService.reserveGroupRoom(room.id, user.id, participants, date, timeSlot).then(response => { if (response.success) { addGroupReservation(response.reservation); setFinalReservation(response.reservation); setShowParticipantModal(false); setShowSuccessModal(true); setRooms(rooms.map(r => r.id === room.id ? { ...r, available: false } : r)); } setIsReserving(false); }); };
    const handleSendSms = () => { setSmsSent(true); }; const handlePrint = () => { window.print(); };
    if (loading) return <div className="flex justify-center items-center h-96"><div className="loader"></div></div>;
    return (
        <>
            <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Rezervasyon Onaylandı"><GroupReservationTicketView reservation={finalReservation} user={user} onSendSms={handleSendSms} onPrint={handlePrint} onScreenshot={takeScreenshot} smsSent={smsSent} /></Modal>
            <DateTimeSelectionModal isOpen={showDateTimeModal} onClose={() => setShowDateTimeModal(false)} onConfirm={handleDateTimeConfirm} room={reservationDetails.room} />
            <GroupParticipantModal isOpen={showParticipantModal} onClose={() => setShowParticipantModal(false)} room={reservationDetails.room} onConfirm={handleParticipantConfirm} isReserving={isReserving} />
            <div className="py-10"><main className="mx-auto max-w-7xl sm:px-6 lg:px-8"><div className="bg-white shadow-lg rounded-lg p-6 sm:p-8"><h1 className="text-3xl font-bold text-gray-900 mb-2">Grup Odası Rezervasyonu</h1><p className="text-gray-600 mb-8">Ekibinizle çalışmak için müsait bir oda seçin.</p><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{rooms.map(room => <GroupRoomCard key={room.id} room={room} onReserve={handleStartReservation} isReserving={isReserving} isReservedByCurrentUser={groupReservation?.roomId === room.id} />)}</div></div></main></div>
        </>
    );
};
const DateTimeSelectionModal = ({ isOpen, onClose, onConfirm, room }) => {
    const [currentDate, setCurrentDate] = useState(new Date()); const [selectedDate, setSelectedDate] = useState(null); const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    useEffect(() => { if (isOpen) { setSelectedDate(null); setSelectedTimeSlot(null); } }, [isOpen]);
    const changeMonth = (amount) => { setCurrentDate(prev => { const newDate = new Date(prev); newDate.setMonth(newDate.getMonth() + amount); return newDate; }); };
    const renderCalendar = () => { const year = currentDate.getFullYear(); const month = currentDate.getMonth(); const firstDay = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']; const today = new Date(); today.setHours(0,0,0,0); const blanks = Array((firstDay === 0 ? 6 : firstDay - 1)).fill(null); const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        return (<div><div className="flex justify-between items-center mb-4"><button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeftIcon className="w-6 h-6" /></button><h3 className="font-semibold text-lg">{currentDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' })}</h3><button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronRightIcon className="w-6 h-6" /></button></div><div className="grid grid-cols-7 gap-2 text-center text-sm">{dayNames.map(day => <div key={day} className="font-medium text-gray-500">{day}</div>)}{blanks.map((_, i) => <div key={`blank-${i}`}></div>)}{days.map(day => { const date = new Date(year, month, day); const isSunday = date.getDay() === 0; const isPast = date < today; const isDisabled = isSunday || isPast; const isSelected = selectedDate && date.getTime() === selectedDate.getTime(); let classes = 'w-10 h-10 flex items-center justify-center rounded-full cursor-pointer'; if (isDisabled) { classes += ' text-gray-400 cursor-not-allowed'; } else if (isSelected) { classes += ' bg-main-red text-white'; } else { classes += ' hover:bg-red-50'; } return (<div key={day} className={classes} onClick={() => !isDisabled && setSelectedDate(date)}>{day}</div>); })}</div></div>);
    };
    const renderTimeSlots = () => { const slots = []; for (let i = 9; i < 18; i++) { slots.push(`${String(i).padStart(2, '0')}:00`); }
        return (<div className="mt-6"><h4 className="font-semibold mb-3">Saat Seçin</h4><div className="grid grid-cols-4 gap-3">{slots.map(slot => { const isSelected = selectedTimeSlot === slot; const classes = `p-2 rounded-lg border text-center cursor-pointer ${isSelected ? 'bg-main-red text-white border-main-red' : 'border-gray-300 hover:border-red-400'}`; return (<div key={slot} className={classes} onClick={() => setSelectedTimeSlot(slot)}>{slot}</div>); })}</div></div>);
    };
    return (<Modal isOpen={isOpen} onClose={onClose} title={`Rezervasyon Zamanı: ${room?.name || ''}`} size="lg"><div className="flex flex-col md:flex-row gap-6"><div className="flex-1">{renderCalendar()}</div><div className="md:w-1/3 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">{renderTimeSlots()}</div></div><div className="mt-8 pt-4 border-t"><Button onClick={() => onConfirm(selectedDate, selectedTimeSlot)} disabled={!selectedDate || !selectedTimeSlot}>Katılımcı Ekleme Adımına Geç</Button></div></Modal>);
};
const GroupParticipantModal = ({ isOpen, onClose, room, onConfirm, isReserving }) => {
    const { user } = useAuth(); const [participants, setParticipants] = useState([]); const [tc, setTc] = useState(''); const [name, setName] = useState(''); const [error, setError] = useState('');
    useEffect(() => { if (isOpen && user) { setParticipants([{ tc: user.id, name: user.name }]); } else if (!isOpen) { setParticipants([]); setTc(''); setName(''); setError(''); } }, [isOpen, user]);
    if (!room) return null;
    const minParticipants = Math.ceil(room.capacity * 0.75); const canConfirm = participants.length >= minParticipants;
    const addParticipant = (e) => { e.preventDefault(); if (participants.length >= room.capacity) { setError('Oda kapasitesine ulaşıldı.'); return; } if (!/^\d{11}$/.test(tc)) { setError('Geçerli bir T.C. Kimlik Numarası girin.'); return; } if (participants.some(p => p.tc === tc)) { setError('Bu katılımcı zaten eklendi.'); return; } setParticipants([...participants, { tc, name }]); setTc(''); setName(''); setError(''); };
    const removeParticipant = (tcToRemove) => { setParticipants(participants.filter(p => p.tc !== tcToRemove)); };
    return (<Modal isOpen={isOpen} onClose={onClose} title={`Katılımcı Ekle: ${room.name}`} size="lg"><div><div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 mb-4" role="alert"><p className="font-bold">Önemli Bilgi</p><p>Lütfen dikkat: Eklediğiniz tüm katılımcıların kütüphaneye aktif üye olması gerekmektedir.</p></div><p className="text-sm text-gray-600 mb-4">Bu oda için en az <span className="font-bold">{minParticipants}</span>, en fazla <span className="font-bold">{room.capacity}</span> kişi gereklidir.</p><form onSubmit={addParticipant} className="flex items-end gap-2 mb-4"><div className="flex-1"><label className="block text-sm font-medium text-gray-700">T.C. Kimlik No</label><input type="text" value={tc} onChange={e => setTc(e.target.value.replace(/\D/g, ''))} maxLength="11" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required /></div><div className="flex-1"><label className="block text-sm font-medium text-gray-700">Ad Soyad</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required /></div><Button type="submit" variant="secondary" className="w-auto px-4 py-2">Ekle</Button></form>{error && <p className="text-red-500 text-sm mb-2">{error}</p>}<div className="mt-4 border-t pt-4"><h4 className="font-semibold">Katılımcı Listesi ({participants.length}/{room.capacity})</h4><ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">{participants.map((p, index) => (<li key={p.tc} className="flex justify-between items-center bg-gray-100 p-2 rounded"><div><span className="font-medium">{p.name}</span><span className="text-sm text-gray-500 ml-2">{p.tc}</span></div>{index > 0 && <button onClick={() => removeParticipant(p.tc)}><TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700"/></button>}</li>))}</ul></div><div className="mt-6"><Button onClick={() => onConfirm(participants)} disabled={!canConfirm || isReserving} isLoading={isReserving}>{canConfirm ? 'Rezervasyonu Onayla' : `${minParticipants} Kişi Gerekli`}</Button></div></div></Modal>);
};

// --- AUTH MODAL & ONBOARDING ---
const AuthModal = () => {
    const { isAuthModalOpen, closeAuthModal, runAuthAction } = useAuthModal();
    const { login } = useAuth();
    const [step, setStep] = useState('enter_tc');
    const [tc, setTc] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthModalOpen) {
            setStep('enter_tc'); setTc(''); setPassword(''); setOtp(''); setDob(''); setError(''); setLoading(false);
        }
    }, [isAuthModalOpen]);

    const handleTcSubmit = async (e) => {
        e.preventDefault(); setLoading(true); setError('');
        try {
            const response = await kohaService.verifyUser(tc);
            if (response.userExists) {
                setStep('choose_method');
            } else {
                setStep('new_user_dob');
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };
    
    const handlePasswordLogin = async (e) => {
        e.preventDefault(); setLoading(true); setError('');
        try {
            await login(kohaService.loginWithPassword, tc, password);
            runAuthAction();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleOtpLogin = async (e) => {
        e.preventDefault(); setLoading(true); setError('');
        try {
            await login(kohaService.loginWithOtp, tc, otp);
            runAuthAction();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateAge = (birthDateString) => {
        const today = new Date(); const birthDate = new Date(birthDateString); let age = today.getFullYear() - birthDate.getFullYear(); const m = today.getMonth() - birthDate.getMonth(); if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; } return age;
    };

    const handleDobSubmit = (e) => {
        e.preventDefault(); if (!dob) { setError('Lütfen doğum tarihinizi giriniz.'); return; }
        const age = calculateAge(dob);
        if (age < 15) { setStep('new_user_redirect_under15'); } else { setStep('new_user_redirect_over15'); }
    };
    
    const handleSingleRedirect = (url) => {
        window.open(url, '_blank');
        closeAuthModal();
    };

    const handleForgotPassword = () => {
        window.open('https://koha.ekutuphane.gov.tr/cgi-bin/koha/dev_sifre.pl', '_blank');
    }

    const renderStep = () => {
        switch (step) {
            case 'enter_tc':
                return (
                    <form onSubmit={handleTcSubmit}>
                        <h3 className="text-lg font-semibold text-center mb-2">Üye Doğrulama</h3>
                        <p className="text-center text-sm text-gray-500 mb-4">T.C. Kimlik Numarası doğrulandıktan sonra, sistemde üyeliğiniz bulunmuyorsa üyelik işlemine yönlendirileceksiniz.</p>
                        <div>
                            <label htmlFor="tc" className="block text-sm font-medium leading-6 text-gray-900">Lütfen T.C. Kimlik Numaranızı giriniz:</label>
                            <div className="mt-2"><input id="tc" name="tc" type="text" value={tc} onChange={(e) => setTc(e.target.value.replace(/\D/g, ''))} required maxLength="11" className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm" /></div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        <div className="mt-6"><Button type="submit" isLoading={loading}>Devam Et</Button></div>
                         <div className="mt-4 text-xs text-gray-500 text-center">
                            <p><span className="font-bold">Demo Kullanıcı:</span> T.C. No: 11111111111</p>
                        </div>
                        <div className="mt-4 text-center"><a onClick={() => setStep('forgot_password')} className="text-sm text-red-600 hover:underline cursor-pointer">Şifremi Unuttum</a></div>
                    </form>
                );
            case 'choose_method':
                return (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Doğrulama Yöntemi</h3>
                        <p className="text-gray-600 mb-6">Lütfen giriş için bir doğrulama yöntemi seçiniz:</p>
                        <div className="space-y-3">
                            <Button onClick={() => setStep('enter_otp')}>SMS ile Tek Kullanımlık Kod Gönder</Button>
                            <Button onClick={() => setStep('enter_password')} variant="secondary">Koha Şifresi ile Giriş Yap</Button>
                        </div>
                    </div>
                );
            case 'enter_password':
                 return (
                    <form onSubmit={handlePasswordLogin}>
                        <h3 className="text-lg font-semibold text-center mb-4">Koha Şifresi ile Giriş</h3>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Koha Şifresi</label>
                            <div className="mt-2"><input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm" /></div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        <div className="mt-6"><Button type="submit" isLoading={loading}>Giriş Yap</Button></div>
                        <div className="mt-2 text-xs text-gray-500 text-center">
                            <p><span className="font-bold">Demo Koha Şifresi:</span> 123456</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <a onClick={() => setStep('choose_method')} className="text-sm text-red-600 hover:underline cursor-pointer">&larr; Geri</a>
                            <a onClick={() => setStep('forgot_password')} className="text-sm text-red-600 hover:underline cursor-pointer">Şifremi Unuttum</a>
                        </div>
                    </form>
                );
            case 'enter_otp':
                 return (
                    <form onSubmit={handleOtpLogin}>
                        <h3 className="text-lg font-semibold text-center mb-4">SMS ile Giriş</h3>
                        <p className="text-center text-sm text-gray-600 mb-4">Koha sisteminde kayıtlı telefon numaranıza gönderilen 6 haneli kodu giriniz. (Demo: 123456)</p>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">Tek Kullanımlık Kod (OTP)</label>
                            <div className="mt-2"><input id="otp" name="otp" type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} maxLength="6" required className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm" /></div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        <div className="mt-6"><Button type="submit" isLoading={loading}>Giriş Yap</Button></div>
                        <div className="mt-4 text-center"><a onClick={() => setStep('choose_method')} className="text-sm text-red-600 hover:underline cursor-pointer">&larr; Geri</a></div>
                    </form>
                );
            case 'new_user_dob':
                return (
                    <form onSubmit={handleDobSubmit}>
                        <p className="text-center text-gray-700 mb-4">Üyeliğiniz bulunmamaktadır. Üyelik işlemine devam etmek için lütfen doğum tarihinizi giriniz.</p>
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">Doğum Tarihi</label>
                            <div className="mt-2"><input id="dob" name="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm"/></div>
                        </div>
                        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        <div className="mt-6"><Button type="submit">Devam Et</Button></div>
                    </form>
                );
            case 'new_user_redirect_under15':
                 return (
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">Yaşınız 15’ten küçük olduğu için üyelik işlemleriniz Koha üyelik sayfası üzerinden tamamlanacaktır. Onaylarsanız yönlendirileceksiniz.</p>
                        <Button onClick={() => handleSingleRedirect('https://koha.ekutuphane.gov.tr/cgi-bin/koha/opac-memberentry.pl')}>Onayla ve Üyelik Ekranına Git</Button>
                    </div>
                );
            case 'new_user_redirect_over15':
                return (
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">Yaşınız 15 ve üzeri olduğu için Koha veya e-Devlet üzerinden üyelik oluşturabilirsiniz. Lütfen birini seçerek devam ediniz.</p>
                        <div className="space-y-3">
                            <Button onClick={() => handleSingleRedirect('https://koha.ekutuphane.gov.tr/cgi-bin/koha/opac-memberentry.pl')}>
                                Üyelik Ekranına Git
                            </Button>
                            <Button onClick={() => handleSingleRedirect('https://www.turkiye.gov.tr/kultur-ve-turizm-kutuphane-uyelik-bilgi-guncelleme')} variant="secondary">
                                e-Devlet ile Üye Ol
                            </Button>
                        </div>
                    </div>
                );
            case 'forgot_password':
                 return (
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">Şifrenizi mi unuttunuz? “Şifremi Unuttum” butonuna tıkladığınızda şifre sıfırlama ekranı yeni bir sekmede açılacaktır.</p>
                        <Button onClick={handleForgotPassword}>Şifremi Unuttum</Button>
                        <div className="mt-4 text-center"><a onClick={() => setStep('enter_tc')} className="text-sm text-red-600 hover:underline cursor-pointer">&larr; Geri</a></div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal} title="Üye Girişi ve Kayıt">
            {renderStep()}
        </Modal>
    );
};


// --- MAIN APP COMPONENT ---

/**
 * Geliştirici imzasını ve logosunu gösteren, tıklandığında web sitesine yönlendiren bir React bileşeni.
 * Bu bileşen ekranın sağ alt köşesinde sabit olarak konumlandırılmıştır.
 */
const DeveloperCredit = () => {
  // Stil ve içerik için Tailwind CSS sınıfları kullanılmıştır.
  return (
    <a
      href="https://www.ismailkaraca.com.tr/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      title='Frontend Prototype (Ön Yüz Prototipi) "İsmail Karaca" tarafından geliştirilmiştir.'
    >
      {/* Geliştirici Logosu */}
      <img
        src="https://www.ismailkaraca.com.tr/wp-content/uploads/2025/03/ismail1002025.svg"
        alt="İsmail Karaca Logo"
        className="w-10 h-10 mr-3 rounded-full object-cover"
        // Resim yüklenemezse fallback gösterilir.
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/40x40/1e293b/ffffff?text=IK';
          e.target.alt = 'İsmail Karaca Baş Harfleri';
        }}
      />
      {/* Geliştirici Bilgi Metni */}
      <div className="flex-col hidden sm:flex">
         <span className="text-xs font-bold text-gray-800">
          İsmail Karaca
        </span>
        <span className="text-xs text-gray-600">
          Frontend Prototype
        </span>
      </div>
    </a>
  );
};

const AppContent = () => {
  const [currentPath, setCurrentPath] = useState('/rezervasyon/salonlar');
  const { isBreakModalOpen, openBreakModal, closeBreakModal } = useBreakModal();
  
  return (
    <RouterContext.Provider value={{ currentPath, setCurrentPath }}>
        <GlobalStyles />
        <div className="min-h-screen bg-gray-100">
            <Header />
            <AppNotification />
            <AuthModal />
            <BreakManagementModal isOpen={isBreakModalOpen} onClose={closeBreakModal} />
            <Route path="/rezervasyon/salonlar" component={<HallSelectionPage/>} exact={true} />
            <Route path="/rezervasyon/salonlar/" component={<SeatSelectionPage/>} />
            <Route path="/rezervasyonlarim" component={<MyReservationsPage />} exact={true} />
            <Route path="/grup-rezervasyon" component={<GroupReservationPage />} exact={true} />
            <Route path="/etkinlikler" component={<EventsListPage />} exact={true} />
            <Route path="/etkinlikler/" component={<EventDetailPage />} />
            <DeveloperCredit />
        </div>
    </RouterContext.Provider>
  );
};

export default function App() {
  useEffect(() => {
    const scriptId = 'html2canvas-script';
    if (document.getElementById(scriptId)) return; 
    const script = document.createElement('script'); script.id = scriptId; script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"; script.async = true; document.body.appendChild(script);
    return () => { const scriptElement = document.getElementById(scriptId); if (scriptElement) { document.body.removeChild(scriptElement); } };
  }, []);

  return (<AuthProvider><AuthModalProvider><ReservationProvider><BreakModalProvider><AppContent /></BreakModalProvider></ReservationProvider></AuthModalProvider></AuthProvider>);
}
