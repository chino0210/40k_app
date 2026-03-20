"use client";

import armyData from "../database/necrons.json";
import { useState } from "react";
import NecronCard from "./NecronCard";

interface Stratagem {
  name: string;
  subname: string;
  cost: string;
  when: string;
  target: string;
  effect: string;
  restrictions?: string;
}

interface Detachment {
  name: string;
  description: string;
  stratagems: Stratagem[];
}

export default function NecronSimpleSelector() {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const currentDetachment = armyData.detachment_rules[activeTab];

  return (
    <div className="h-screen w-screen p-4 bg-[#d7dbde]">
      {/* Contenedor con bordes redondeados */}
      <div className="grid h-full w-full grid-cols-8 grid-rows-4 border border-zinc-400 rounded-3xl overflow-hidden bg-white shadow-2xl">
        {/* 1. Columna Lateral Izquierda */}
        <div className="row-span-4 border-r border-zinc-200 flex items-center justify-center bg-zinc-50">
          <span className="font-bold text-zinc-400">MENU</span>
        </div>

        {/* 3. Encabezado - INTEGRACIÓN DE CARD */}
        <div className="col-span-4 border-b border-r border-zinc-200 relative overflow-hidden group">
          <NecronCard title={armyData.name} className="h-full w-full" />
        </div>

        {/* 4. Panel Central */}
        <div className="col-span-4 row-span-3 col-start-2 row-start-2 border-r border-zinc-200 flex flex-col p-6 overflow-y-auto bg-white">
          <span className="font-bold text-zinc-300 text-4xl">UNIT CARD</span>
        </div>

        {/* 5. Bloque Superior Derecho */}
        <div className="col-span-3 col-start-6 bg-white row-start-1 border-b border-zinc-200 flex flex-col justify-baseline">
          <h2 className="font-semibold uppercase text-lg mb-1 text-white bg-[#04542b] px-5 py-2">
            ARMY RULE: {armyData.army_rules.name}
          </h2>
          <div className="text-sm leading-relaxed px-5 py-3">
            {armyData.army_rules.description}
          </div>
        </div>

        {/* 6. Bloque Medio Derecho (Selector) */}
        <div className="col-span-3 col-start-6 row-start-2 border-b border-zinc-200 p-6 relative flex flex-col bg-white">
          <div className="relative mb-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all text-white shadow-lg"
            >
              <span className="truncate">{currentDetachment.name}</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute z-50 w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto backdrop-blur-md">
                {armyData.detachment_rules.map((det: any, index: number) => (
                  <button
                    key={det.name}
                    onClick={() => {
                      setActiveTab(index);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-[10px] uppercase font-bold transition-colors ${
                      activeTab === index
                        ? "bg-green-500 text-black"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    {det.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-[11px] text-zinc-500 leading-snug overflow-y-auto italic">
            "{currentDetachment.description}"
          </div>
        </div>

        {/* 7. Bloque Inferior Derecho */}
        <div className="col-span-3 row-span-2 col-start-6 row-start-3 flex items-center justify-center bg-zinc-50">
          <span className="font-bold text-zinc-300 text-2xl">UNITS</span>
        </div>
      </div>
    </div>
  );
}
