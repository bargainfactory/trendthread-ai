import { NextRequest, NextResponse } from "next/server";

const STYLE_MODIFIERS: Record<string, string> = {
  y2k: "Y2K aesthetic, chrome, metallic, holographic, early 2000s digital art",
  minimalist: "minimalist, clean lines, simple shapes, white space, modern",
  retro: "retro vintage, 80s synthwave, VHS aesthetic, neon grid",
  anime: "anime style, manga art, Japanese illustration, vibrant colors",
  abstract: "abstract art, geometric shapes, fluid forms, contemporary",
  vaporwave: "vaporwave aesthetic, pastel pink purple, Greek statues, palm trees, sunset",
  cyberpunk: "cyberpunk, neon lights, futuristic city, dark sci-fi, rain",
  botanical: "botanical illustration, plants, leaves, flowers, nature art, green",
};

const PALETTE_MODIFIERS: Record<string, string> = {
  neon: "neon purple, electric pink, bright blue, cyan glow",
  sunset: "warm orange, fiery red, hot pink, deep purple",
  ocean: "deep cyan, ocean blue, indigo, violet",
  forest: "emerald green, teal, mint, aqua",
  monochrome: "black and white, grayscale, high contrast",
  pastel: "soft pastel colors, light purple, baby pink, sky blue",
};

export async function POST(request: NextRequest) {
  const { prompt, style, palette, count = 4 } = await request.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const styleModifier = STYLE_MODIFIERS[style] || "";
  const paletteModifier = PALETTE_MODIFIERS[palette] || "";

  const variations = [
    "design for print on demand merchandise, centered composition, high quality",
    "bold graphic design, t-shirt print ready, isolated on dark background",
    "artistic illustration, poster style, vibrant and eye-catching",
    "creative artwork, merch-ready design, clean edges, professional",
  ];

  const images = [];
  for (let i = 0; i < Math.min(count, 4); i++) {
    const fullPrompt = `${prompt}, ${styleModifier}, ${paletteModifier}, ${variations[i]}`;
    const encoded = encodeURIComponent(fullPrompt);
    const seed = Math.floor(Math.random() * 100000) + i * 1000;
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=512&height=512&seed=${seed}&nologo=true&model=flux`;

    images.push({
      id: `gen-${Date.now()}-${i}`,
      url,
      prompt: fullPrompt,
      title: `Design ${String.fromCharCode(65 + i)}`,
    });
  }

  return NextResponse.json({ images });
}
