export default function SPDBelakang({ row }) {
    
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

<body lang=EN-ID style='word-wrap:break-word'>

<div class="print-kwitansi">

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=633
 style='width:474.9pt;border-collapse:collapse;border:none'>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Berangkat dari</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Kec. ${row.asal}</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>(Tempat Kedudukan)</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Pada Tanggal</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Ke</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Kec. ${row.tujuan}</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=312 colspan=3 valign=top style='width:233.9pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>Kepala
  BPS Kabupaten Boyolali</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=312 colspan=3 valign=top style='width:233.9pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><b><u><span style='font-size:11.0pt;font-family:"Arial",sans-serif;
  color:black'>Puguh Raharjo, SST, MT</span></u></b></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  border-bottom:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=312 colspan=3 valign=top style='width:233.9pt;border:none;
  border-bottom:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>NIP.
  1980010022002121005</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Tiba di</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Kec. ${row.tujuan}</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Berangkat dari</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Kec. ${row.tujuan}</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Pada tanggal</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Ke</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Kec. ${row.asal}</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Pada tanggal</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  border-bottom:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;border-bottom:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;border-bottom:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Tiba di</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Kec. ${row.asal}</span></p>
  </td>
  <td width=312 colspan=3 rowspan=4 valign=top style='width:233.9pt;border:
  none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;text-align:justify;line-height:
  normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>Telah
  diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan
  semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya.</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>(Tempat Kedudukan)</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Pada tanggal</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=312 colspan=3 valign=top style='width:233.9pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=321 colspan=5 valign=top style='width:241.0pt;border:none;
  border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>Pejabat
  Pembuat Komitmen</span></p>
  </td>
  <td width=312 colspan=3 valign=top style='width:233.9pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>Pejabat
  Pembuat Komitmen</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=321 colspan=5 valign=top style='width:241.0pt;border:none;
  border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><b><u><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>Siti
  Taufiq Hidayati, SST, M.Ak</span></u></b></p>
  </td>
  <td width=312 colspan=3 valign=top style='width:233.9pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><b><u><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>Siti
  Taufiq Hidayati, SST, M.Ak</span></u></b></p>
  </td>
 </tr>
 <tr>
  <td width=321 colspan=5 valign=top style='width:241.0pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>NIP.
  198503292009122005</span></p>
  </td>
  <td width=312 colspan=3 valign=top style='width:233.9pt;border:none;
  border-bottom:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>NIP.
  198503292009122005</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr>
  <td width=633 colspan=8 valign=top style='width:474.9pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>Catatan Lain-lain</span></p>
  </td>
 </tr>
 <tr>
  <td width=91 valign=top style='width:68.05pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>PERHATIAN</span></p>
  </td>
  <td width=18 valign=top style='width:13.6pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>:</span></p>
  </td>
  <td width=524 colspan=6 valign=top style='width:393.25pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;text-align:justify;line-height:
  normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>Pejabat
  yang berwenang menerbitkan SPD pegawai yang melakukan perjalanan dinas para
  pejabat yang mengesahkan tanggal berangkat/tiba serta bendaharawan
  bertanggung jawab berdasarkan peraturan-peraturan keuangan Negara apabila
  Negara menderita rugi akibat kesalahan, kelalaian dan kealpaannya.</span></p>
  </td>
 </tr>
 <tr>
  <td width=144 colspan=3 valign=top style='width:108.35pt;border:none;
  padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=158 valign=top style='width:118.65pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=132 valign=top style='width:99.2pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=19 valign=top style='width:14.0pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
  <td width=161 valign=top style='width:120.7pt;border:none;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0.05cm;line-height:13pt'><span
  style='font-size:11.0pt;font-family:"Arial",sans-serif'>&nbsp;</span></p>
  </td>
 </tr>
 <tr height=20>
  <td width=91 style='border:none'></td>
  <td width=18 style='border:none'></td>
  <td width=36 style='border:none'></td>
  <td width=19 style='border:none'></td>
  <td width=158 style='border:none'></td>
  <td width=132 style='border:none'></td>
  <td width=19 style='border:none'></td>
  <td width=161 style='border:none'><p class=MsoNormal style='margin-top:3cm;line-height:13pt;text-align: right'><span
  style='font-size:10.0pt;font-family:"Arial",sans-serif;Color:#e5e7eb'>${row.nama}</span></p></td>
 </tr>
</table>

<p class=MsoNormal>&nbsp;</p>

</div>

</body>

        `,
      }}
    />
  );
}