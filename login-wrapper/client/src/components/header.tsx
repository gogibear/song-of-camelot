import DojoLogo from "../assets/DojoByExample_logo.svg";
import DojoRedLogo from "../assets/Dojo-Logo-Stylized-Red.svg";
import StarknetLogo from "../assets/SN-Linear-Gradient.svg";

export function Header() {
  return (
    <div className="text-center">
      <h1
        className="
          text-3xl md:text-5xl 
          font-bold mb-2 py-2
          bg-gradient-to-r from-red-500 via-white to-blue-600 
          bg-clip-text text-transparent 
          leading-normal
        "
      >
        Enter Avalon
      </h1>
      <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto px-4 mb-8">
        The Quest Begins
      </p>
      {/* Login button will be handled by another component */}
    </div>
  );
}