"use client";
import { useState, useMemo } from "react";

// Interfaz para el tipado (opcional pero recomendado)
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

export default function NecronArmyExplorer({ armyData }: { armyData: any }) {
  // 1. Estado para el destacamento seleccionado
  const [activeTab, setActiveTab] = useState(0);

  // 2. Selección del destacamento actual
  const currentDetachment = armyData.detachment_rules[activeTab];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-sans">
      {/* Encabezado de Facción */}
      <header className="mb-10 border-b border-green-900 pb-6">
        <h1 className="text-5xl font-black text-green-500 uppercase tracking-widest mb-2">
          {armyData.name}
        </h1>
        <div className="bg-green-950/30 border border-green-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-green-400 mb-1">
            {armyData.army_rules.name}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-300">
            {armyData.army_rules.description}
          </p>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Menú Lateral de Destacamentos */}
        <nav className="md:w-64 flex-shrink-0">
          <h3 className="text-xs font-bold text-zinc-500 uppercase mb-4 tracking-tighter">
            Destacamentos
          </h3>

        </nav>

        {/* Contenido del Destacamento Seleccionado */}
        <main className="flex-1">
          <section className="mb-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-bold mb-2">
              {currentDetachment.name}
            </h2>
            <div className="p-4 bg-zinc-900 border-l-4 border-green-600 rounded-r-lg mb-8">
              <p className="text-sm italic text-zinc-300">
                {currentDetachment.description}
              </p>
            </div>

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-green-500"></span>
              Estratagemas
            </h3>

            {/* Listado de Estratagemas */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {currentDetachment.stratagems.map((strat: Stratagem) => (
                <div
                  key={strat.name}
                  className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl hover:border-green-500/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-black text-green-400 leading-tight uppercase">
                        {strat.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        {strat.subname}
                      </p>
                    </div>
                    <span className="bg-zinc-800 text-green-400 px-3 py-1 rounded-full text-sm font-black border border-green-900">
                      {strat.cost}
                    </span>
                  </div>

                  <div className="space-y-3 mt-4 text-sm">
                    <p>
                      <strong className="text-zinc-400 uppercase text-xs">
                        Cuándo:
                      </strong>{" "}
                      {strat.when}
                    </p>
                    <p>
                      <strong className="text-zinc-400 uppercase text-xs">
                        Objetivo:
                      </strong>{" "}
                      {strat.target}
                    </p>
                    <p className="text-zinc-200 leading-relaxed bg-black/40 p-3 rounded border border-zinc-800">
                      {strat.effect}
                    </p>
                    {strat.restrictions && (
                      <p className="text-xs text-red-400 italic">
                        <strong>Restricción:</strong> {strat.restrictions}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
