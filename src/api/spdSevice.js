const API_URL =
  "https://script.google.com/macros/s/AKfycbz_K833k1EOlZ4cVl0GXX5VH9cYxCX4FLG5ft4mu5dz3GyJin-wbyPxbwME0kruFX6R/exec";

// helper encode body
const post = async (data) => {
  const formBody = new URLSearchParams();
  for (const key in data) {
    formBody.append(key, data[key]);
  }

  const res = await fetch(API_URL, {
    method: "POST",
    body: formBody,
  });

  return res.json();
};

// ================= SAVE BARU =================
export const saveSPD = async (namaSurvei, rows) => {
  await post({
    action: "saveSPD",
    namaSurvei,
    rows: JSON.stringify(rows),
  });
};

// ================= UPDATE =================
export const updateSPD = async (namaSurvei, rows) => {
  await post({
    action: "updateSPD",
    namaSurvei,
    rows: JSON.stringify(rows),
  });
};

// ================= GET =================
export const getSPDBySurvey = async (namaSurvei) => {
  const res = await fetch(`${API_URL}?action=getSPDBySurvey&namaSurvei=${encodeURIComponent(namaSurvei)}`);
  return res.json();
};

// ================= DELETE =================
export const deleteSPD = async (id) => {
  await post({
    action: "deleteSPD",
    id,
  });
};

export const fetchPegawaiMaster = async () => {
    try {
        const res = await fetch(`${API_URL}?action=getAllPegawai`);
        const text = await res.text();
        return JSON.parse(text);
    } catch (e) {
        console.error("fetchPegawaiMaster error:", e);
        return [];
    }
};

export const fetchKecamatan = async () => {
    try {
        const res = await fetch(`${API_URL}?action=getKecamatan`);
        const text = await res.text();
        return JSON.parse(text);
    } catch (e) {
        console.error("fetchKecamatan error:", e);
        return [];
    }
};

export const getSurveysWithCount = async () => {
    try {
        const res = await fetch(
            `${API_URL}?action=getSurveysWithCount`
        );

        const text = await res.text();
        return JSON.parse(text);
    } catch (e) {
        console.error("getSurveysWithCount error:", e);
        return [];
    }
};