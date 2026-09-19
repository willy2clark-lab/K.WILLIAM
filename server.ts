import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // Health check API
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API for generating festive social copy & engagement strategy
  app.post("/api/generate-copy", async (req, res) => {
    try {
      const {
        productName = "Produit Artisanal",
        productCategory = "Cadeau de fête",
        filterStyle = "Soft Cinematic",
        borderStyle = "Folk Moderne",
        tone = "chaleureux et authentique",
        targetPlatform = "Instagram",
      } = req.body || {};

      const client = getGeminiClient();

      if (!client) {
        // High quality fallback presets when no API key is provided
        const defaultCaptions = [
          {
            hook: `✨ L'esprit des fêtes s'invite à l'atelier avec ${productName}.`,
            body: `Chaque détail compte. Quand nous avons capturé cette photo brute, nous voulions préserver la texture authentique et le savoir-faire avant de lui apporter cette touche festive ${borderStyle} et notre étalonnage studio 2026 (${filterStyle}). Un cadeau pensé pour durer et illuminer les fêtes.`,
            question: `🎄 Dites-nous en commentaire : vous êtes plutôt préparation des cadeaux dès novembre ou team dernière minute ?`,
            hashtags: `#${productName.replace(/\s+/g, "")} #ArtisanatFestif #CadeauDeNoel #StudioLook2026 #AuthentiqueEtFaitMain #Tendances2026 #IdeeCadeau`,
          },
          {
            hook: `De la matière brute au visuel de fête 🎁 : zoom sur ${productName}.`,
            body: `Parce que l'authenticité ne s'invente pas : pas de rendu synthétique, juste la vraie lumière de notre création sublimée par une palette cinématographique chaleureuse. Conçu avec soin pour vos moments précieux.`,
            question: `Quelqu'un dans vos proches adorerait recevoir ceci sous le sapin ? Taguez-le discrètement en commentaire ! 👇`,
            hashtags: `#Artisanat #ProduitDeFete #StorytellingProduit #BoutiqueCreatrice #Noel2026 #DesignStudio`,
          },
        ];

        return res.json({
          success: true,
          source: "curated_template",
          captions: defaultCaptions,
        });
      }

      const prompt = `Tu es un expert en copywriting e-commerce et en engagement sur les réseaux sociaux pour les fêtes de fin d'année 2026.
Génère 2 propositions de posts captivants pour ${targetPlatform} mettant en valeur ce produit :
- Nom du produit : ${productName}
- Catégorie : ${productCategory}
- Style d'étalonnage colorimétrique : ${filterStyle}
- Style de bordure festive : ${borderStyle}
- Ton souhaité : ${tone}

IMPORTANT : En 2026, l'audience recherche l'authenticité (la vraie matière, l'envers du décor de la photo brute) contrastant avec le tout-synthétique, et l'engagement invisible (sauvegardes, partages).

Pour chaque proposition, renvoie un objet JSON avec :
- "hook" : une première ligne percutante et élégante (avec un ou deux emojis raffinés)
- "body" : 2-3 phrases parlant de la texture, de l'authenticité du produit et de l'ambiance des fêtes
- "question" : une question interactive claire pour inciter aux commentaires ou partages
- "hashtags" : 5 à 7 hashtags pertinents

Réponds STRICTEMENT en JSON avec la clé "captions" contenant un tableau de 2 objets.`;

      const response = await client.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);

      return res.json({
        success: true,
        source: "gemini",
        captions: parsed.captions || [],
      });
    } catch (error: any) {
      console.error("Error generating copy:", error);
      // Fallback gracefully on any API error
      return res.json({
        success: true,
        source: "fallback",
        captions: [
          {
            hook: `✨ L'élégance des fêtes : découvrez notre édition studio.`,
            body: `Une prise de vue authentique, sublimée par un étalonnage cinématographique doux et nos bordures artisanales festives. Conçu pour apporter poésie et chaleur à votre fin d'année.`,
            question: `🎁 Glisseriez-vous cette création sous le sapin pour vous-même ou pour offrir ?`,
            hashtags: `#StudioFestif #CadeauArtisanal #ArtisanatDArt #Noel2026 #InspirationFetes`,
          },
        ],
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
