import downloadLogo from '../assets/download.png';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <img src={downloadLogo} alt="K Logo" className="w-12 h-12" />
      <span className="text-2xl font-bold text-[#1cd8d2]">KM Labs</span>
    </div>
  );
}
