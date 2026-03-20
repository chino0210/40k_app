"use client";
import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// Importaciones de assets
import monolito from "../resources/necrons/card/monolito.png";
import nubes from "../resources/necrons/card/nubes.png";
import necron_main from "../resources/necrons/card/necron.png";
import ejercito_1 from "../resources/necrons/card/ejercito.png";
import ejercito_2 from "../resources/necrons/card/ejercito2.png";
import nave_1 from "../resources/necrons/card/nave_1.png";
import nave_2 from "../resources/necrons/card/nave_2.png";
import nave_3 from "../resources/necrons/card/nave_3.png";
import portal from "../resources/necrons/card/portal.png";
import fondo from "../resources/necrons/card/fondo.png";
import estructuras from "../resources/necrons/card/estructuras.png";
import inmortal from "../resources/necrons/card/Inmortal.png";
import nubes2 from "../resources/necrons/card/nube2.png";

interface NecronCardProps {
  title: string;
  className?: string;
}

export default function NecronCard({ title, className = "" }: NecronCardProps) {
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);

  const mouseX = useSpring(xRaw, { stiffness: 120, damping: 25 });
  const mouseY = useSpring(yRaw, { stiffness: 120, damping: 25 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    xRaw.set(x);
    yRaw.set(y);
  }

  // CONFIGURACIÓN DE CAPAS
  // yOffset: Puedes usar porcentajes o pixeles (ej: "-10%", "20px"). 0% es el centro.
  const layersData = [
    { img: fondo, speed: 0.1, size: "63%", pos: "center", yOffset: "100%" },
    { img: monolito, speed: 0.6, size: "63%", pos: "center", yOffset: "0%" },
    { img: nubes, speed: 0.6, size: "66%", pos: "center", yOffset: "150%" },
    { img: nubes2, speed: 0.4, size: "66%", pos: "center", yOffset: "150%" },
    {
      img: estructuras,
      speed: 0.3,
      size: "63%",
      pos: "center",
      yOffset: "350%",
    },
    { img: inmortal, speed: 0.5, size: "65%", pos: "center", yOffset: "350%" },
    {
      img: ejercito_2,
      speed: 0.6,
      size: "65%",
      pos: "center",
      yOffset: "260%",
    },
    { img: portal, speed: 0.8, size: "63%", pos: "center", yOffset: "0%" },
    { img: nave_3, speed: 0.4, size: "63%", pos: "center", yOffset: "0%" },
    { img: nave_2, speed: 0.7, size: "63%", pos: "center", yOffset: "0%" },
    { img: nave_1, speed: 0.5, size: "63%", pos: "center", yOffset: "0%" },
    {
      img: ejercito_1,
      speed: 0.5,
      size: "65%",
      pos: "center",
      yOffset: "550%",
    },
    { img: necron_main, speed: 1, size: "63%", pos: "center", yOffset: "0%" },
  ];

  const moveX = useTransform(mouseX, [-1.4, 1.4], [140, -140]);
  const moveY = useTransform(mouseY, [-1.4, 1.4], [60, -60]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        xRaw.set(0);
        yRaw.set(0);
      }}
      className={`relative overflow-hidden bg-black border border-zinc-800 group ${className}`}
      style={{ perspective: "1200px" }}
    >
      {layersData.map((layer, index) => {
        return (
          <motion.div
            key={index}
            style={{
              x: useTransform(moveX, (v) => v * layer.speed),
              y: useTransform(moveY, (v) => v * layer.speed),
              backgroundImage: `url(${(layer.img as any).src || layer.img})`,
              // Combinamos la posición X (center) con el Y configurable
              backgroundPosition: `center calc(50% + ${layer.yOffset})`,
              backgroundSize: layer.size,
              zIndex: index + 1,
            }}
            className="absolute inset-[-30%] bg-no-repeat pointer-events-none transition-opacity duration-700"
          />
        );
      })}

      {/* CONTENIDO DE TEXTO */}
      <motion.div
        style={{ zIndex: 13 }}
        className="absolute inset-0 flex flex-col items-end text-right justify-center pointer-events-none bg-black/35 p-10"
      >
        <div className="text-white">
          <h1 className="text-5xl tracking-tighter font-semibold transition-colors duration-500">
            Faction: {title}
          </h1>
          <span className="text-xl"> NOMBRE DE ARMADA </span>
        </div>
      </motion.div>

      {/* ILUMINACIÓN Y VIÑETA */}
      <div
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] bg-linear-to-t from-black/80 via-transparent to-transparent"
        style={{ zIndex: 12 }}
      />
    </div>
  );
}
