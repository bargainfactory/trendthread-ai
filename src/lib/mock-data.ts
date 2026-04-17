export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  style: string;
  creator: string;
  salesCount: number;
  trendingScore: number;
  gradient: string;
  emoji: string;
  tags: string[];
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  productCount: number;
  creator: string;
  trendingScore: number;
  salesCount: number;
  gradient: string;
  emoji: string;
  tags: string[];
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  earnings: number;
  designs: number;
  followers: number;
  tier: "gold" | "platinum" | "diamond";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
}

export const products: Product[] = [
  { id: "p1", title: "Neon Dreams Tee", price: 29.99, category: "apparel", style: "Y2K", creator: "PixelQueen", salesCount: 1247, trendingScore: 98, gradient: "from-purple-500 via-pink-500 to-blue-500", emoji: "🌌", tags: ["trending", "y2k", "neon"] },
  { id: "p2", title: "Cyber Cat Hoodie", price: 54.99, category: "apparel", style: "Anime", creator: "NeonArtist", salesCount: 892, trendingScore: 95, gradient: "from-cyan-400 via-purple-500 to-pink-500", emoji: "🐱", tags: ["anime", "cyber", "trending"] },
  { id: "p3", title: "Retro Wave Mug", price: 18.99, category: "mugs", style: "Retro", creator: "VaporMike", salesCount: 2103, trendingScore: 87, gradient: "from-orange-400 via-pink-500 to-purple-600", emoji: "☕", tags: ["retro", "vaporwave"] },
  { id: "p4", title: "Abstract Flow Poster", price: 24.99, category: "posters", style: "Abstract", creator: "ArtFlowZ", salesCount: 567, trendingScore: 82, gradient: "from-green-400 via-cyan-500 to-blue-600", emoji: "🎨", tags: ["abstract", "minimal"] },
  { id: "p5", title: "Glitch Mode Phone Case", price: 22.99, category: "phone-cases", style: "Y2K", creator: "GlitchGuru", salesCount: 1456, trendingScore: 96, gradient: "from-red-500 via-purple-500 to-blue-500", emoji: "📱", tags: ["glitch", "y2k", "trending"] },
  { id: "p6", title: "Zen Garden Tee", price: 29.99, category: "apparel", style: "Minimalist", creator: "ZenDesigns", salesCount: 734, trendingScore: 79, gradient: "from-emerald-400 via-teal-500 to-cyan-600", emoji: "🌿", tags: ["zen", "minimal", "nature"] },
  { id: "p7", title: "Pixel Hearts Hoodie", price: 54.99, category: "apparel", style: "Retro", creator: "PixelQueen", salesCount: 1891, trendingScore: 94, gradient: "from-pink-400 via-rose-500 to-red-500", emoji: "💖", tags: ["pixel", "retro", "trending"] },
  { id: "p8", title: "Cosmic Voyage Poster", price: 24.99, category: "posters", style: "Abstract", creator: "SpaceArtX", salesCount: 445, trendingScore: 76, gradient: "from-indigo-500 via-purple-600 to-pink-500", emoji: "🚀", tags: ["space", "cosmic"] },
  { id: "p9", title: "Dragon Spirit Mug", price: 18.99, category: "mugs", style: "Anime", creator: "NeonArtist", salesCount: 1023, trendingScore: 88, gradient: "from-red-400 via-orange-500 to-yellow-500", emoji: "🐉", tags: ["anime", "dragon", "fire"] },
  { id: "p10", title: "Synthwave Sunset Case", price: 22.99, category: "phone-cases", style: "Retro", creator: "VaporMike", salesCount: 678, trendingScore: 83, gradient: "from-purple-600 via-pink-500 to-orange-400", emoji: "🌅", tags: ["synthwave", "retro", "sunset"] },
  { id: "p11", title: "AI Revolution Tee", price: 32.99, category: "apparel", style: "Y2K", creator: "TechVibes", salesCount: 2340, trendingScore: 99, gradient: "from-violet-500 via-fuchsia-500 to-pink-500", emoji: "🤖", tags: ["ai", "tech", "trending"] },
  { id: "p12", title: "Botanical Dreams Poster", price: 24.99, category: "posters", style: "Minimalist", creator: "ZenDesigns", salesCount: 389, trendingScore: 71, gradient: "from-lime-400 via-emerald-500 to-teal-600", emoji: "🌸", tags: ["botanical", "nature", "calm"] },
  { id: "p13", title: "Kawaii Cloud Mug", price: 18.99, category: "mugs", style: "Anime", creator: "KawaiiStudio", salesCount: 1567, trendingScore: 91, gradient: "from-sky-300 via-pink-300 to-purple-400", emoji: "☁️", tags: ["kawaii", "cute", "trending"] },
  { id: "p14", title: "Matrix Code Hoodie", price: 59.99, category: "apparel", style: "Y2K", creator: "GlitchGuru", salesCount: 912, trendingScore: 90, gradient: "from-green-400 via-emerald-500 to-cyan-400", emoji: "💚", tags: ["matrix", "code", "hacker"] },
  { id: "p15", title: "Holographic Vibes Case", price: 22.99, category: "phone-cases", style: "Abstract", creator: "ArtFlowZ", salesCount: 823, trendingScore: 85, gradient: "from-fuchsia-400 via-violet-500 to-cyan-400", emoji: "✨", tags: ["holographic", "abstract", "shiny"] },
  { id: "p16", title: "Sakura Wind Tee", price: 29.99, category: "apparel", style: "Anime", creator: "KawaiiStudio", salesCount: 1345, trendingScore: 93, gradient: "from-pink-300 via-rose-400 to-fuchsia-500", emoji: "🌸", tags: ["sakura", "anime", "trending"] },
];

export const collections: Collection[] = [
  { id: "c1", name: "Neon Nightlife", description: "Vibrant designs inspired by city nightlife and neon lights", productCount: 24, creator: "PixelQueen", trendingScore: 97, salesCount: 5420, gradient: "from-purple-500 via-pink-500 to-blue-500", emoji: "🌃", tags: ["neon", "nightlife", "city"] },
  { id: "c2", name: "Cyber Anime", description: "Anime-inspired cyberpunk art for the digital age", productCount: 18, creator: "NeonArtist", trendingScore: 95, salesCount: 4210, gradient: "from-cyan-400 via-blue-500 to-purple-600", emoji: "⚡", tags: ["anime", "cyber", "digital"] },
  { id: "c3", name: "Retro Revival", description: "Throwback designs with a modern twist", productCount: 31, creator: "VaporMike", trendingScore: 89, salesCount: 6789, gradient: "from-orange-400 via-pink-500 to-purple-600", emoji: "📼", tags: ["retro", "vintage", "80s"] },
  { id: "c4", name: "Minimal Zen", description: "Clean, calming designs for the mindful soul", productCount: 15, creator: "ZenDesigns", trendingScore: 78, salesCount: 2340, gradient: "from-emerald-400 via-teal-500 to-cyan-500", emoji: "🧘", tags: ["minimal", "zen", "calm"] },
  { id: "c5", name: "Glitch Art", description: "Digital distortion meets artistic expression", productCount: 22, creator: "GlitchGuru", trendingScore: 92, salesCount: 3890, gradient: "from-red-500 via-pink-500 to-purple-500", emoji: "🔮", tags: ["glitch", "digital", "art"] },
  { id: "c6", name: "AI Dreamscapes", description: "Surreal landscapes generated by artificial intelligence", productCount: 27, creator: "SpaceArtX", trendingScore: 96, salesCount: 4560, gradient: "from-indigo-400 via-violet-500 to-fuchsia-500", emoji: "🌠", tags: ["ai", "surreal", "dreams"] },
];

export const creators: Creator[] = [
  { id: "cr1", name: "PixelQueen", avatar: "👑", earnings: 12450, designs: 87, followers: 15200, tier: "diamond" },
  { id: "cr2", name: "NeonArtist", avatar: "🎨", earnings: 8920, designs: 63, followers: 11400, tier: "platinum" },
  { id: "cr3", name: "VaporMike", avatar: "🌊", earnings: 15670, designs: 124, followers: 22100, tier: "diamond" },
  { id: "cr4", name: "GlitchGuru", avatar: "⚡", earnings: 6340, designs: 45, followers: 8900, tier: "gold" },
  { id: "cr5", name: "ZenDesigns", avatar: "🧘", earnings: 4280, designs: 38, followers: 6700, tier: "gold" },
  { id: "cr6", name: "KawaiiStudio", avatar: "🌸", earnings: 9870, designs: 71, followers: 13600, tier: "platinum" },
  { id: "cr7", name: "SpaceArtX", avatar: "🚀", earnings: 7650, designs: 52, followers: 9800, tier: "platinum" },
  { id: "cr8", name: "TechVibes", avatar: "🤖", earnings: 11230, designs: 94, followers: 18400, tier: "diamond" },
];

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Sarah K.", role: "Side Hustle Creator", text: "I made $2,400 in my first month just by creating AI designs and sharing them on TikTok. This platform is absolutely insane!", avatar: "💫", rating: 5 },
  { id: "t2", name: "Marcus T.", role: "Streetwear Designer", text: "The AI design quality is mind-blowing. My customers cant tell the difference from hand-drawn art. Game changer for my brand.", avatar: "🔥", rating: 5 },
  { id: "t3", name: "Luna W.", role: "Etsy Seller", text: "Switched from traditional POD to TrendThread AI and my sales tripled. The trending algorithm literally predicts what will sell.", avatar: "✨", rating: 5 },
  { id: "t4", name: "Jake R.", role: "Content Creator", text: "I create a design in 30 seconds, post it, and it sells while I sleep. This is the future of merch.", avatar: "🎯", rating: 5 },
  { id: "t5", name: "Aria M.", role: "College Student", text: "Best side income ever. I design between classes and already earned enough to cover my textbooks this semester.", avatar: "📚", rating: 5 },
  { id: "t6", name: "Dev P.", role: "Graphic Designer", text: "As a professional designer, I was skeptical. But TrendThread AI augments my skills rather than replacing them. 10x productivity.", avatar: "🎨", rating: 5 },
];

export const styleOptions = [
  { id: "y2k", name: "Y2K", emoji: "💿", gradient: "from-purple-500 to-pink-500" },
  { id: "minimalist", name: "Minimalist", emoji: "⚪", gradient: "from-gray-400 to-slate-600" },
  { id: "retro", name: "Retro", emoji: "📼", gradient: "from-orange-400 to-pink-600" },
  { id: "anime", name: "Anime", emoji: "⚡", gradient: "from-cyan-400 to-blue-600" },
  { id: "abstract", name: "Abstract", emoji: "🎨", gradient: "from-green-400 to-purple-600" },
  { id: "vaporwave", name: "Vaporwave", emoji: "🌴", gradient: "from-pink-400 to-purple-600" },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🤖", gradient: "from-yellow-400 to-red-600" },
  { id: "botanical", name: "Botanical", emoji: "🌿", gradient: "from-emerald-400 to-teal-600" },
];

export const productTypes = [
  { id: "tshirt", name: "T-Shirt", emoji: "👕", basePrice: 29.99 },
  { id: "hoodie", name: "Hoodie", emoji: "🧥", basePrice: 54.99 },
  { id: "mug", name: "Mug", emoji: "☕", basePrice: 18.99 },
  { id: "poster", name: "Poster", emoji: "🖼️", basePrice: 24.99 },
  { id: "phonecase", name: "Phone Case", emoji: "📱", basePrice: 22.99 },
];

export const colorPalettes = [
  { id: "neon", name: "Neon Night", colors: ["#a855f7", "#ec4899", "#3b82f6", "#22d3ee"] },
  { id: "sunset", name: "Sunset Blaze", colors: ["#f97316", "#ef4444", "#ec4899", "#a855f7"] },
  { id: "ocean", name: "Ocean Deep", colors: ["#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6"] },
  { id: "forest", name: "Forest Glow", colors: ["#22c55e", "#10b981", "#14b8a6", "#06b6d4"] },
  { id: "monochrome", name: "Mono Chrome", colors: ["#f8fafc", "#94a3b8", "#475569", "#1e293b"] },
  { id: "pastel", name: "Pastel Dream", colors: ["#c4b5fd", "#f9a8d4", "#93c5fd", "#a5f3fc"] },
];

export const faqs = [
  { q: "How does the AI design generator work?", a: "Simply type a text prompt describing your design idea, choose a style and product type, and our AI generates four unique designs in seconds. You can then customize, order, or add them to your store." },
  { q: "What is the print quality like?", a: "We use premium DTG (Direct-to-Garment) printing and high-quality sublimation for all products. Colors are vibrant, durable, and wash-resistant. Every order goes through quality control before shipping." },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-8 business days within the US. Express shipping (2-3 days) is available. International orders typically arrive within 10-15 business days." },
  { q: "Can I sell designs I create on TrendThread AI?", a: "Absolutely! Join our Creator Program and earn 10-20% commission on every sale. You own the commercial rights to any design you generate on our platform." },
  { q: "Is there a limit to how many designs I can create?", a: "Free accounts can generate up to 10 designs per day. Pro Creator accounts get unlimited generations, and Business accounts include bulk generation tools." },
  { q: "Do you integrate with Shopify?", a: "Yes! Our Shopify integration lets you push designs directly to your Shopify store with one click. We handle printing, packing, and shipping automatically." },
  { q: "What if I am not happy with my order?", a: "We offer a 100% satisfaction guarantee. If there is any issue with print quality or product defects, we will reprint or refund your order within 30 days." },
  { q: "Can I use TrendThread AI for my existing brand?", a: "Yes! Business accounts include white-label options with custom branding, packaging inserts, and your own logo on packing slips." },
];
