// utils/filterUtils.js
/**
 * Ambil nilai unik dari kolom tertentu dengan kriteria filter
 * @param {Array} data - seluruh dataset
 * @param {Function} filterFn - fungsi filter (baris -> boolean)
 * @param {String} key - nama kolom yang ingin diambil
 * @returns {Array} daftar nilai unik
 */
export function getUniqueValues(data, filterFn, key) {
  return [...new Set(data.filter(filterFn).map(row => row[key]).filter(Boolean))];
}
