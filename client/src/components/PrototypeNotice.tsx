import React from "react";
import { Info } from "lucide-react";

const PrototypeNotice: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm p-4 bg-white border border-yellow-300 rounded-lg shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">
          <Info className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="flex-grow">
          <p className="text-sm font-semibold text-gray-800">Este é um protótipo, não o sistema final!</p>
          <p className="text-sm text-gray-600 mt-1">Avalie sua experiência como se o sistema estivesse pronto</p>
        </div>
      </div>
    </div>
  );
};

export default PrototypeNotice;
