import { formatFullDate } from "../../utils/formatFullDate";
import { formatKecamatan } from "../../utils/formatKecamatan";
export default function PengeluaranRiil({ row }) {
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

.print-kwitansi table {
  width: 100% !important;
  table-layout: fixed !important;
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

<p class=MsoNormal align=center style='text-align:center'><b><u><span
style='font-size:14.0pt;line-height:107%;font-family:"Times New Roman",serif'>DAFTAR
PENGELUARAN RIIL<o:p></o:p></span></u></b></p>

<div style="height:20px;"></div>

<p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
"Times New Roman",serif'>Yang <span class=SpellE>bertanda</span> <span
class=SpellE>tangan</span> di <span class=SpellE>bawah</span> <span
class=SpellE><span class=GramE>ini</span></span><span class=GramE> :</span><o:p></o:p></span></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:
 0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:15.35pt'>
  <td width=75 valign=top style='width:56.45pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:15.35pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>Nama<o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.2pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:15.35pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=507 valign=top style='width:380.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:15.35pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>${row["NamaCocok"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;height:21.25pt'>
  <td width=75 valign=top style='width:56.45pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.25pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>NIP<o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.2pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.25pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=507 valign=top style='width:380.15pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.25pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>${row["NIP"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2;mso-yfti-lastrow:yes;height:21.25pt'>
  <td width=601 colspan=3 valign=top style='width:100%;padding:0cm 5.4pt 0cm 5.4pt;
  height:21.25pt'>
  <p class=MsoNormal style='margin-bottom:0cm;text-align:justify;line-height:normal'><span
  class=SpellE><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Berdasarkan</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'> <span
  class=SpellE>surat</span> <span class=SpellE>Perjalanan</span> Dinas (SPD) <span
  class=SpellE>tanggal</span> ${row["NoSPD"]} <span class=SpellE>nomor</span> ${row["NoLengkapSPD"]}<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><span class=SpellE><span style='font-size:12.0pt;line-height:
107%;font-family:"Times New Roman",serif'>dengan</span></span><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'> <span
class=SpellE>ini</span> <span class=SpellE>menyatakan</span> <span
class=SpellE>sesungguhnya</span> <span class=SpellE>bahwa</span>:<o:p></o:p></span></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:
 0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes;
  height:32.35pt'>
  <td width=26 valign=top style='width:19.8pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:32.35pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>1.<o:p></o:p></span></p>
  </td>
  <td width=575 valign=top style='width:100%;padding:0cm 5.4pt 0cm 5.4pt;
  height:32.35pt'>
  <p class=MsoNormal style='margin-bottom:0cm;text-align:justify;line-height:
  normal'><span class=SpellE><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Biaya</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'> transport ${row["Status"]}
  di <span class=SpellE>bawah</span> <span class=SpellE>ini</span> yang <span
  class=SpellE>tidak</span> <span class=SpellE>dapat</span> <span class=SpellE>diperoleh</span>
  <span class=SpellE>bukti</span> <span class=SpellE>bukti</span> <span
  class=SpellE>pengeluarannya</span> <span class=SpellE><span class=GramE>meliputi</span></span><span
  class=GramE> :</span><o:p></o:p></span></p>
  </td>
 </tr>
</table>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;
 mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:17.0pt'>
  <td width=37 valign=top style='width:28.1pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=38 style='width:1.0cm;border:solid windowtext 1.0pt;border-left:
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>No<o:p></o:p></span></p>
  </td>
  <td width=198 style='width:200pt;border:solid windowtext 1.0pt;border-left:
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-size:12.0pt;
  font-family:"Times New Roman",serif'>Uraian</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p></o:p></span></p>
  </td>
  <td width=207 style='width:155.3pt;border:solid windowtext 1.0pt;border-left:
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-size:12.0pt;
  font-family:"Times New Roman",serif'>Jumlah</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p></o:p></span></p>
  </td>
  <td width=120 style='width:90.2pt;border:solid windowtext 1.0pt;border-left:
  none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
  padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-size:12.0pt;
  font-family:"Times New Roman",serif'>Keterangan</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;height:11.65pt'>
  <td width=37 valign=top style='width:28.1pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:11.65pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=38 style='width:1.0cm;border-top:none;border-left:none;border-bottom:
  solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-top-alt:
  solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:11.65pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>(1)<o:p></o:p></span></p>
  </td>
  <td width=198 style='width:148.85pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:11.65pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>(2)<o:p></o:p></span></p>
  </td>
  <td width=207 style='width:155.3pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:11.65pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>(3)<o:p></o:p></span></p>
  </td>
  <td width=120 style='width:90.2pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:11.65pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>(4)<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2;height:87.9pt'>
  <td width=37 valign=top style='width:28.1pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:87.9pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=38 style='width:1.0cm;border-top:none;border-left:none;border-bottom:
  solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-top-alt:
  solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:87.9pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>1<o:p></o:p></span></p>
  </td>
  <td width=198 style='width:148.85pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:87.9pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Biaya</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'> <span
  class=SpellE>Transportasi</span><o:p></o:p></span></p>
  </td>
  <td width=207 style='width:155.3pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:87.9pt'>
  <p class=MsoNormal align=right style='margin-bottom:0cm;text-align:right;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Rp.
  <span class=GramE>100.000,-</span><o:p></o:p></span></p>
  </td>
  <td width=120 valign=top style='width:90.2pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:87.9pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3;height:17.0pt'>
  <td width=37 valign=top style='width:28.1pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=38 valign=top style='width:1.0cm;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=198 valign=top style='width:148.85pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Jumlah</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p></o:p></span></p>
  </td>
  <td width=207 style='width:155.3pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal align=right style='margin-bottom:0cm;text-align:right;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Rp.
  <span class=GramE>100.000,-</span><o:p></o:p></span></p>
  </td>
  <td width=120 valign=top style='width:90.2pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4;mso-yfti-lastrow:yes;height:17.0pt'>
  <td width=37 valign=top style='width:28.1pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=564 colspan=4 valign=top style='width:422.7pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt;height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-size:12.0pt;
  font-family:"Times New Roman",serif'>Terbilang</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'> == <span
  class=SpellE>Seratus</span> <span class=SpellE>Ribu</span> Rupiah ==<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal style='margin-bottom:0cm'><span style='font-size:5.0pt;
line-height:107%;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:
 0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes'>
  <td width=28 valign=top style='width:21.05pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>2.<o:p></o:p></span></p>
  </td>
  <td width=573 valign=top style='width:100%;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;text-align:justify;line-height:
  normal'><span class=SpellE><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Jumlah</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'> uang <span
  class=SpellE>tersebut</span> pada <span class=SpellE>angka</span> 1 di <span
  class=SpellE>atas</span> <span class=SpellE>benar-benar</span> <span
  class=SpellE>dikeluarkan</span> <span class=SpellE>untuk</span> <span
  class=SpellE>pelaksanaan</span> <span class=SpellE>Perjalanan</span> <span
  class=SpellE>dinas</span> <span class=SpellE>dimaksud</span> dan <span
  class=SpellE>apabila</span> di <span class=SpellE>kemudian</span> <span
  class=SpellE>hari</span> <span class=SpellE>terdapat</span> <span
  class=SpellE>kelebihan</span> <span class=SpellE>atas</span> <span
  class=SpellE>pembayaran</span>, kami <span class=SpellE>bersedia</span> <span
  class=SpellE>untuk</span> <span class=SpellE>menyetorkan</span> <span
  class=SpellE>kelebihan</span> <span class=SpellE>tersebut</span> <span
  class=SpellE>ke</span> Kas Negara.<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal style='text-align:justify'><span class=SpellE><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'>Demikian</span></span><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'> <span
class=SpellE>pernyataan</span> <span class=SpellE>ini</span> kami buat <span
class=SpellE>dengan</span> <span class=SpellE>sebenarnya</span> <span
class=SpellE>untuk</span> <span class=SpellE>dipergunakan</span> <span
class=SpellE>sebagaimana</span> <span class=SpellE>mestinya</span>.<o:p></o:p></span></p>

<p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:
 0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:17.0pt'>
  <td width=500 valign=top style='width:500pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-size:12.0pt;
  font-family:"Times New Roman",serif'>Mengetahui</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>/<span
  class=SpellE>menyetujui</span><o:p></o:p></span></p>
  </td>
  <td width=500 valign=top style='width:500pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Boyolali,
  ${row["tglKwitansi"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;height:17.0pt'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-size:12.0pt;
  font-family:"Times New Roman",serif'>Pejabat</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'> <span
  class=SpellE>Pembuat</span> <span class=SpellE>Komitmen</span><o:p></o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Yang
  <span class=SpellE>melakukan</span> <span class=SpellE>perjalanan</span> <span
  class=SpellE>dinas</span>,<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2;height:17.0pt'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3;height:17.0pt'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5;height:17.0pt'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><u><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Siti
  Taufiq <span class=SpellE>Hidayati</span>, S.ST., <span class=SpellE>M.Ak</span>.<o:p></o:p></span></u></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><u><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>${row["NamaCocok"]}<o:p></o:p></span></u></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6;mso-yfti-lastrow:yes;height:17.0pt'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>NIP.
  198503292009122005<o:p></o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt;
  height:17.0pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>NIP. ${row["NIP"]}<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal style='text-indent:36.0pt'><span style='font-size:12.0pt;
line-height:107%;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

</div>

</body>
        `,
      }}
    />
  );
}