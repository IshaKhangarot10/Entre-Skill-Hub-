export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] pt-32 pb-24 px-[24px] md:px-[64px]">
      <div className="max-w-4xl mx-auto text-center">
        <span className="material-symbols-outlined text-[64px] text-[#c4c7c7] mb-6">notifications</span>
        <h1 className="font-['Playfair_Display'] text-[40px] font-bold text-black mb-4">Notifications</h1>
        <p className="font-['Inter'] text-[16px] text-[#5e5e5e] max-w-lg mx-auto">
          Your recent alerts, messages, and platform updates will appear here.
        </p>
        <div className="mt-12 p-12 border border-dashed border-[#c4c7c7] text-[#747878]">
          You have no new notifications.
        </div>
      </div>
    </div>
  );
}
