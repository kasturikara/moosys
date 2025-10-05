import { supabase } from "./supabase";

// interface Nilai {
//   siswa_id: string;
//   kriteria_id: string;
//   skor: number;
// }

// interface Kriteria {
//   id: number;
//   bobot: number;
//   tipe: "benefit" | "cost";
// }

export async function calculateMOORA(siswaId: string) {
  const { data: nilaiData } = await supabase
    .from("nilai")
    .select("siswa_id, kriteria_id, skor")
    .eq("siswa_id", siswaId);
  const { data: kriteriaData } = await supabase
    .from("kriteria")
    .select("id, bobot, tipe");

  if (!nilaiData || !kriteriaData) return [];

  const normalized: { [mapelId: number]: number[] } = {};
  const mapelIds = [...new Set(nilaiData.map((n) => n.kriteria_id))];

  mapelIds.forEach((mapelId) => {
    const scores = nilaiData
      .filter((n) => n.kriteria_id === mapelId)
      .map((n) => n.skor);
    const sumSquared = scores.reduce((sum, score) => sum + score ** 2, 0);
    const sqrtSum = Math.sqrt(sumSquared);

    normalized[mapelId] = scores.map((score) => score / sqrtSum);
  });

  const weighted: { mapelId: number; score: number }[] = [];
  mapelIds.forEach((mapelId) => {
    const kriteria = kriteriaData.find((k) => k.id === mapelId);
    if (!kriteria) return;

    const normalizedScores = normalized[mapelId];
    const weightedScore = normalizedScores.reduce((sum, score) => {
      const weight =
        kriteria.tipe === "cost" ? -kriteria.bobot : kriteria.bobot;
      return sum + score * weight;
    }, 0);

    weighted.push({ mapelId, score: weightedScore });
  });

  return weighted.sort((a, b) => b.score - a.score);
}
