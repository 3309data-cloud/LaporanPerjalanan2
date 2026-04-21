import { formatFullDate } from "../../utils/formatFullDate";
import { formatKecamatan } from "../../utils/formatKecamatan";
export default function Kwitansi({ row }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<style>
@font-face {
  font-family: "TimesWeb";
  src: url("/fonts/nimbusroman-regular.ttf") format("truetype");
  font-weight: normal;
}
@font-face {
  font-family: "TimesWeb";
  src: url("/fonts/nimbusroman-bold.ttf") format("truetype");
  font-weight: bold;
}
@font-face {
  font-family: "TimesWeb";
  src: url("/fonts/nimbusroman-italic.ttf") format("truetype");
  font-style: italic;
}

/* paksa semua isi dokumen pakai font yg konsisten */
.print-kwitansi *{
  font-family: "TimesWeb","Times New Roman",serif !important;
}
/* teks normal rapat */
.print-kwitansi p{
  margin:0 !important;
  line-height:1.2 !important;
}

/* class Word */
.print-kwitansi .MsoNormal{
  margin:0 !important;
  line-height:1.2 !important;
}

/* ⭐ hanya sembunyikan tag o:p di paragraf yang ADA TEKS */
.print-kwitansi p:not(:empty) o\:p{
  display:none !important;
}

/* ⭐ khusus paragraf kosong → jadi spacer tanda tangan */
.print-kwitansi p:empty{
  height:14px;   /* tinggi 1 baris kosong */
}

/* Word kadang isi &nbsp; jadi tidak dianggap empty */
.print-kwitansi p:has(o\:p:only-child){
  height:14px;
}
</style>
<body lang=EN-ID style='tab-interval:36.0pt;word-wrap:break-word'>

<div class="print-kwitansi">

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0 width=709
 style='width:531.6pt;border-collapse:collapse;border:none;mso-yfti-tbllook:
 1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:
 none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=709 valign=top style='width:531.6pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>BADAN PUSAT STATISTIK<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=709 valign=top style='width:531.6pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>KABUPATEN BOYOLALI<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes'>
  <td width=709 valign=top style='width:531.6pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><o:p>&nbsp;</o:p></p>
  <table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0 width=702
   style='width:526.35pt;border-collapse:collapse;border:none;mso-yfti-tbllook:
   1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:
   none'>
   <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
    <td width=702 valign=top style='width:526.35pt;padding:0cm 5.4pt 0cm 5.4pt'>
    <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
    line-height:normal'><b><u><span style='font-size:16.0pt;font-family:"Times New Roman",serif'>KWITANSI<o:p></o:p></span></u></b></p>
    </td>
   </tr>
  </table>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><o:p></o:p></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0 width=708
 style='width:531.35pt;border-collapse:collapse;border:none;mso-yfti-tbllook:
 1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:
 none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:21.95pt'>
  <td width=217 valign=top style='width:162.65pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.95pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Sudah</span></span><span
  style='font-family:"Times New Roman",serif'> <span class=SpellE>terima</span>
  <span class=SpellE>dari</span><o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.95pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=473 colspan=2 valign=top style='width:354.55pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.95pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>Kuasa <span class=SpellE>Pengguna</span>
  <span class=SpellE>Anggaran</span> BPS <span class=SpellE>Kabupaten</span>
  Boyolali<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;height:20.85pt'>
  <td width=217 valign=top style='width:162.65pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.85pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>Uang <span class=SpellE>sebesar</span><o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.85pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=473 colspan=2 valign=top style='width:354.55pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.85pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>Rp100.<span class=GramE>000,-</span><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2;height:42.35pt'>
  <td width=217 valign=top style='width:162.65pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:42.35pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Untuk</span></span><span
  style='font-family:"Times New Roman",serif'> <span class=SpellE>pembayaran</span><o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:42.35pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=473 colspan=2 valign=top style='width:354.55pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:42.35pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal;tab-stops:
  72.0pt'><span style='font-family:"Times New Roman",serif'>Transport <span
  class=SpellE>lokal</span> <span class=SpellE>dalam</span> <span class=SpellE>rangka</span>
  <span class=SpellE>${row["Tujuan Kegiatan"] || "-"} ${row["Nama Survei"] || "-"}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3;height:20.25pt'>
  <td width=217 valign=top style='width:162.65pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.25pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Berdasarkan</span></span><span
  style='font-family:"Times New Roman",serif'> SPD<o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.25pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=67 valign=top style='width:50.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.25pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Nomor</span></span><span
  style='font-family:"Times New Roman",serif'><o:p></o:p></span></p>
  </td>
  <td width=406 valign=top style='width:304.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.25pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>: ${row["NoLengkapSPD"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4;height:20.5pt'>
  <td width=217 valign=top style='width:162.65pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.5pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.5pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=67 valign=top style='width:50.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.5pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Tanggal</span></span><span
  style='font-family:"Times New Roman",serif'><o:p></o:p></span></p>
  </td>
  <td width=406 valign=top style='width:304.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.5pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>: ${row["NoSPD"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5;height:20.8pt'>
  <td width=217 valign=top style='width:162.65pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.8pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Untuk</span></span><span
  style='font-family:"Times New Roman",serif'> <span class=SpellE>perjalanan</span>
  <span class=SpellE>dinas</span> <span class=SpellE>dari</span><o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.8pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=473 colspan=2 valign=top style='width:354.55pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:20.8pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Kecamatan</span></span><span
  style='font-family:"Times New Roman",serif'> <span class=SpellE>Mojosongo</span>
  <span class=SpellE>ke</span> <span class=SpellE>${formatKecamatan(row["Kecamatan(1)"])}</span> PP<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6;mso-yfti-lastrow:yes;height:21.15pt'>
  <td width=217 valign=top style='width:162.65pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.15pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Terbilang</span></span><span
  style='font-family:"Times New Roman",serif'><o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.15pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=473 colspan=2 valign=top style='width:354.55pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.15pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Seratus</span></span><span
  style='font-family:"Times New Roman",serif'> <span class=SpellE>Ribu</span>
  Rupiah<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0 width=699
 style='width:524.25pt;border-collapse:collapse;border:none;mso-yfti-tbllook:
 1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:
 none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-family:"Times New Roman",serif'>Bendahara</span></span><span
  style='font-family:"Times New Roman",serif'> <span class=SpellE>Pengeluaran</span><o:p></o:p></span></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-family:"Times New Roman",serif'>Setuju</span></span><span
  style='font-family:"Times New Roman",serif'> <span class=SpellE>dibayar</span><o:p></o:p></span></p>
  </td>
  <td width=217 valign=top style='width:180pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'>Yang <span
  class=SpellE>Menerima</span>,<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=217 valign=top style='width:163.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'>Lunas pada <span class=SpellE>tanggal</span>
  .........<o:p></o:p></span></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-family:"Times New Roman",serif'>Pejabat</span></span><span
  style='font-family:"Times New Roman",serif'> <span class=SpellE>Pembuat</span>
  <span class=SpellE>Komitmen</span><o:p></o:p></span></p>
  </td>
  <td width=217 valign=top style='width:163.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'>Boyolali,
  ${row["tglKwitansi"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=217 valign=top style='width:163.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=217 valign=top style='width:163.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=217 valign=top style='width:163.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=217 valign=top style='width:163.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:7'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><b><u><span style='font-family:"Times New Roman",serif'>Dwiana</span></u></b></span><b><u><span
  style='font-family:"Times New Roman",serif'> Ari <span class=SpellE>Sulistyani</span>,
  <span class=SpellE><span class=GramE>A.Md</span></span><o:p></o:p></span></u></b></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><b><u><span style='font-family:"Times New Roman",serif'>Siti
  Taufiq <span class=SpellE>Hidayati</span>, S.ST., <span class=SpellE>M.Ak</span></span></u></b><span
  style='font-family:"Times New Roman",serif'>.<o:p></o:p></span></p>
  </td>
  <td width=217 valign=top style='width:163.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><b><u><span style='font-family:"Times New Roman",serif'>${row["NamaCocok"]}</span><o:p></o:p></span></u></b></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:8;mso-yfti-lastrow:yes'>
  <td width=217 valign=top style='width:162.8pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'>NIP. 198811182011012012<o:p></o:p></span></p>
  </td>
  <td width=265 valign=top style='width:7.0cm;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'>NIP.
  198503292009122005<o:p></o:p></span></p>
  </td>
  <td width=217 valign=top style='width:163.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-family:"Times New Roman",serif'>NIP.
  ${row["NIP"]}<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

</div>

</body>

        `,
      }}
    />
  );
}
