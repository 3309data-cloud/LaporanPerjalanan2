import { formatFullDate } from "../../utils/formatFullDate";
import { formatKecamatan } from "../../utils/formatKecamatan";
export default function ReportSPD({ row }) {
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

<body lang=EN-ID style='tab-interval:.5in;word-wrap:break-word'>

<div class="print-kwitansi">

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0 width=714
 style='width:535.5pt;border-collapse:collapse;border:none;mso-yfti-tbllook:
 1184;mso-padding-alt:0in 5.4pt 0in 5.4pt;mso-border-insideh:none;mso-border-insidev:
 none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:17.5pt'>
  <td width=396 style='width:396pt;padding:0in 5.4pt 0in 5.4pt;height:17.5pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=60 style='width:45.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.5pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span class=SpellE><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'>Nomor</span></span><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p></o:p></span></p>
  </td>
  <td width=258 style='width:258pt;padding:0in 5.4pt 0in 5.4pt;height:17.5pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>: ${row["NoLengkapSPD"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes;height:17.5pt'>
  <td width=396 style='width:297.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.5pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=60 style='width:45.0pt;padding:0in 5.4pt 0in 5.4pt;height:17.5pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>Lembar<o:p></o:p></span></p>
  </td>
  <td width=258 style='width:193.5pt;padding:0in 5.4pt 0in 5.4pt;height:17.5pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>:<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal style='margin-bottom:0in;tab-stops:373.5pt 382.5pt'><span
lang=EN-US style='font-size:10.0pt;line-height:115%;font-family:"Arial",sans-serif;
mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='margin-left:-4.5pt;border-collapse:collapse;border:none;mso-yfti-tbllook:
 1184;mso-padding-alt:0in 5.4pt 0in 5.4pt;mso-border-insideh:none;mso-border-insidev:
 none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:14.85pt'>
  <td width=19 valign=top style='width:.2in;padding:0in 5.4pt 0in 5.4pt;
  height:14.85pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=679 style='width:508.9pt;padding:0in 5.4pt 0in 5.4pt;height:14.85pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>Badan Pusat <span class=SpellE>Statistik</span> <span
  class=SpellE>Kabupaten</span> <span class=SpellE>Boyolali</span><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;mso-yfti-lastrow:yes;height:.25in'>
  <td width=19 valign=top style='width:.2in;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=679 valign=top style='width:508.9pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt'><span class=SpellE><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'>Jl</span></span><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'> <span class=SpellE>Boyolali</span>-Solo Km 2, <span class=SpellE>Mojosongo</span>,
  <span class=SpellE>Boyolali</span><o:p></o:p></span></p>
  </td>
 </tr>
</table>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 align=left
 width=717 style='width:537.7pt;border-collapse:collapse;border:none;
 mso-border-alt:solid windowtext .5pt;mso-table-overlap:never;mso-yfti-tbllook:
 1184;mso-table-lspace:9.0pt;margin-left:6.75pt;mso-table-rspace:9.0pt;
 margin-right:6.75pt;mso-table-anchor-vertical:paragraph;mso-table-anchor-horizontal:
 column;mso-table-left:left;mso-table-top:.05pt;mso-padding-alt:0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:.5in;mso-row-margin-right:
  2.2pt'>
  <td width=33 style='width:24.75pt;border:solid windowtext 1.0pt;border-left:
  none;mso-border-top-alt:solid windowtext .5pt;mso-border-bottom-alt:solid windowtext .5pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.5in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>1.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border:solid windowtext 1.0pt;
  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.5in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Pejabat</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'> <span class=SpellE>Pembuat</span>
  <span class=SpellE>Komitmen</span><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border-top:solid windowtext 1.0pt;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:none;
  mso-border-left-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-bottom-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.5in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Siti Taufiq Hidayati, SST, <span class=SpellE><span class=GramE>M.Ak</span></span><o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:1;height:.5in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.5in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>2.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.5in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Nama/NIP <span class=SpellE>Pegawai</span> yang <span class=SpellE>melaksanakan</span>
  <span class=SpellE>perjalanan</span> <span class=SpellE>dinas</span><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.5in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["NamaCocok"]} / ${row["NIP"]}<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:2;height:.25in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>3.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>a. </span><span lang=EN-US><span style='mso-spacerun:yes'> </span></span><span
  class=SpellE><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>Pangkat</span></span><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'> dan <span class=SpellE>Golongan</span><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;mso-border-top-alt:
  solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["Pangkat"]}<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:3;height:17.85pt;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:17.85pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:17.85pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>b. </span><span style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-fareast-font-family:"Times New Roman";color:black;mso-font-kerning:0pt;
  mso-ligatures:none;mso-fareast-language:EN-ID'><span
  style='mso-spacerun:yes'> </span><span class=SpellE>Jabatan</span>/<span
  class=SpellE>Instansi</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;mso-border-left-alt:
  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:17.85pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["Jabatan"]}<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:4;height:17.85pt;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:17.85pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:17.85pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>c. </span><span style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-fareast-font-family:"Times New Roman";color:black;mso-font-kerning:0pt;
  mso-ligatures:none;mso-fareast-language:EN-ID'><span
  style='mso-spacerun:yes'> </span>Tingkat <span class=SpellE>Biaya</span> <span
  class=SpellE>Perjalanan</span> Dinas</span><span lang=EN-US style='font-size:
  10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:EN-US'><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:17.85pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>C<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:5;height:53.35pt;mso-row-margin-right:2.2pt'>
  <td width=33 valign=top style='width:24.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:53.35pt'>
  <p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0in;
  margin-bottom:0in;margin-left:0in;text-align:center;line-height:normal;
  tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;
  mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>4.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 valign=top style='width:236.25pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:53.35pt'>
  <p class=MsoNormal style='margin-top:3.0pt;margin-right:0in;margin-bottom:
  0in;margin-left:0in;line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:
  frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:
  paragraph;mso-element-anchor-horizontal:column;mso-element-top:.05pt;
  mso-height-rule:exactly'><span lang=EN-US style='font-size:10.0pt;font-family:
  "Arial",sans-serif;mso-ansi-language:EN-US'>Maksud <span class=SpellE>perjalanan</span>
  <span class=SpellE>dinas</span><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 valign=top style='width:274.5pt;border:none;
  border-bottom:solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-bottom-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:53.35pt'>
  <p class=MsoNormal style='margin-top:3.0pt;margin-right:0in;margin-bottom:
  0in;margin-left:0in;line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:
  frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:
  paragraph;mso-element-anchor-horizontal:column;mso-element-top:.05pt;
  mso-height-rule:exactly'><span lang=EN-US style='font-size:10.0pt;font-family:
  "Arial",sans-serif;mso-ansi-language:EN-US'>${row["Tujuan Kegiatan"] || "-"} ${row["Nama Survei"] || "-"}<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:6;height:.25in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>5.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Alat <span class=SpellE>angkutan</span> yang <span class=SpellE>dipergunakan</span><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Kendaraan</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'> Umum<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:7;height:.25in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>6.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>a. <span class=SpellE>Tempat</span> <span class=SpellE>berangkat</span><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Kec</span></span><span lang=EN-US style='font-size:10.0pt;font-family:
  "Arial",sans-serif;mso-ansi-language:EN-US'>. <span class=SpellE>Mojosongo</span><o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:8;height:.25in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>b. <span class=SpellE>Tempat</span> <span class=SpellE>tujuan</span><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${formatKecamatan(row["Kecamatan(1)"])}<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:9;height:.25in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>7.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>a. </span><span style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-fareast-font-family:"Times New Roman";color:black;mso-font-kerning:0pt;
  mso-ligatures:none;mso-fareast-language:EN-ID'><span
  style='mso-spacerun:yes'> </span>Lamanya <span class=SpellE>perjalanan</span>
  Dinas</span><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>1 (<span class=SpellE>satu</span>) <span class=SpellE>hari</span><o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:10;height:.25in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>b. </span><span style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-fareast-font-family:"Times New Roman";color:black;mso-font-kerning:0pt;
  mso-ligatures:none;mso-fareast-language:EN-ID'><span
  style='mso-spacerun:yes'> </span><span class=SpellE>Tanggal</span> <span
  class=SpellE>Berangkat</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${formatFullDate(row["Tanggal Kunjungan"])}<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:11;height:18.4pt;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:18.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:18.4pt'>
  <p class=MsoNormal style='margin-top:0in;margin-right:0in;margin-bottom:0in;
  margin-left:15.8pt;text-indent:-15.8pt;line-height:normal;tab-stops:373.5pt 382.5pt;
  mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:around;
  mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:column;
  mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>c. </span><span lang=EN-US><span style='mso-spacerun:yes'> </span></span><span
  class=SpellE><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>Tanggal</span></span><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'> <span class=SpellE>harus</span> <span class=SpellE>kembali</span> / <span
  class=SpellE>tiba</span> di <span class=SpellE>tempat</span> <span
  class=SpellE>baru</span> *)<o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 valign=top style='width:274.5pt;border:none;
  border-bottom:solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-bottom-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:18.4pt'>
  <p class=MsoNormal style='margin-top:4.0pt;margin-right:0in;margin-bottom:
  0in;margin-left:0in;line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:
  frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:
  paragraph;mso-element-anchor-horizontal:column;mso-element-top:.05pt;
  mso-height-rule:exactly'><span lang=EN-US style='font-size:10.0pt;font-family:
  "Arial",sans-serif;mso-ansi-language:EN-US'>${formatFullDate(row["Tanggal Kunjungan"])}<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:12;height:40.0pt;mso-row-margin-right:2.2pt'>
  <td width=33 valign=top style='width:24.75pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:40.0pt'>
  <p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0in;
  margin-bottom:0in;margin-left:0in;text-align:center;line-height:normal;
  tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;
  mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>8.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 valign=top style='width:236.25pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:40.0pt'>
  <p class=MsoNormal style='margin-top:3.0pt;margin-right:0in;margin-bottom:
  0in;margin-left:0in;line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:
  frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:
  paragraph;mso-element-anchor-horizontal:column;mso-element-top:.05pt;
  mso-height-rule:exactly'><span class=SpellE><span class=GramE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Pengikut</span></span></span><span class=GramE><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'> :</span></span><span lang=EN-US style='font-size:10.0pt;font-family:
  "Arial",sans-serif;mso-ansi-language:EN-US'> Nama<o:p></o:p></span></p>
  </td>
  <td width=135 colspan=2 valign=top style='width:101.35pt;border-top:none;
  border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:40.0pt'>
  <p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0in;
  margin-bottom:0in;margin-left:0in;text-align:center;line-height:normal;
  tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;
  mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Umur</span></span><span lang=EN-US style='font-size:10.0pt;font-family:
  "Arial",sans-serif;mso-ansi-language:EN-US'><o:p></o:p></span></p>
  </td>
  <td width=231 valign=top style='width:173.15pt;border:none;border-bottom:
  solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:
  solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:
  solid windowtext .5pt;mso-border-bottom-alt:solid windowtext .5pt;padding:
  0in 5.4pt 0in 5.4pt;height:40.0pt'>
  <p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0in;
  margin-bottom:0in;margin-left:0in;text-align:center;line-height:normal;
  tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;
  mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Hubungan</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'> <span class=SpellE>keluarga</span>/<span
  class=SpellE>keterangan</span><o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;border-bottom:solid windowtext 1.0pt'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:13;height:30.25pt'>
  <td width=33 style='width:24.75pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:30.25pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>9.<o:p></o:p></span></p>
  </td>
  <td width=192 style='width:144.35pt;border:none;mso-border-top-alt:solid windowtext .5pt;
  mso-border-left-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:30.25pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Pembebanan</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'> <span class=SpellE>Anggaran</span><o:p></o:p></span></p>
  </td>
  <td width=123 style='width:91.9pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:30.25pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Program<o:p></o:p></span></p>
  </td>
  <td width=16 style='width:11.8pt;border:none;mso-border-top-alt:solid windowtext .5pt;
  mso-border-left-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:30.25pt'>
  <p class=MsoNormal style='margin-top:0in;margin-right:0in;margin-bottom:0in;
  margin-left:33.8pt;text-indent:-33.8pt;line-height:normal;tab-stops:33.8pt 373.5pt 382.5pt;
  mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:around;
  mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:column;
  mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["Program1"]}<o:p></o:p></span></p>
  </td>
  <td width=353 colspan=3 style='width:264.9pt;border:none;mso-border-top-alt:
  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:30.25pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  0in 373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;
  mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["Program2"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:14;height:30.4pt'>
  <td width=33 style='width:24.75pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:30.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 style='width:144.35pt;border:none;mso-border-left-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:30.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=123 style='width:91.9pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:30.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Kegiatan</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'><o:p></o:p></span></p>
  </td>
  <td width=16 style='width:11.8pt;border:none;mso-border-left-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:30.4pt'>
  <p class=MsoNormal style='margin-top:0in;margin-right:0in;margin-bottom:0in;
  margin-left:33.8pt;text-indent:-33.8pt;line-height:normal;tab-stops:33.8pt 373.5pt 382.5pt;
  mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:around;
  mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:column;
  mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["Kegiatan1"]}<o:p></o:p></span></p>
  </td>
  <td width=353 colspan=3 style='width:264.9pt;border:none;padding:0in 5.4pt 0in 5.4pt;
  height:30.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  0in 373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;
  mso-element-wrap:around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["Kegiatan2"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:15;height:30.25pt'>
  <td width=33 style='width:24.75pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:30.25pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=192 style='width:144.35pt;border:none;mso-border-left-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:30.25pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=123 style='width:91.9pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:30.25pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Komponen</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'><o:p></o:p></span></p>
  </td>
  <td width=16 style='width:11.8pt;border:none;mso-border-left-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:30.25pt'>
  <p class=MsoNormal style='margin-top:0in;margin-right:0in;margin-bottom:0in;
  margin-left:33.8pt;text-indent:-33.8pt;line-height:normal;tab-stops:33.8pt 373.5pt 382.5pt;
  mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:around;
  mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:column;
  mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["Komponen1"]}<o:p></o:p></span></p>
  </td>
  <td width=353 colspan=3 style='width:264.9pt;border:none;padding:0in 5.4pt 0in 5.4pt;
  height:30.25pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>${row["Komponen2"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:16;height:.25in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border:none;border-right:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-right-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>a. </span><span lang=EN-US><span style='mso-spacerun:yes'> </span></span><span
  class=SpellE><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>Intansi</span></span><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;mso-border-left-alt:
  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Badan Pusat <span class=SpellE>Statistik</span> <span class=SpellE>Boyolali</span><o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:17;height:.25in;mso-row-margin-right:2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>b. </span><span lang=EN-US><span style='mso-spacerun:yes'> </span></span><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Mata <span class=SpellE>anggaran</span><o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-left-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>524113<o:p></o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <tr style='mso-yfti-irow:18;mso-yfti-lastrow:yes;height:.25in;mso-row-margin-right:
  2.2pt'>
  <td width=33 style='width:24.75pt;border-top:none;border-left:none;
  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;mso-border-right-alt:solid windowtext .5pt;
  padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal;tab-stops:373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:
  9.0pt;mso-element-wrap:around;mso-element-anchor-vertical:paragraph;
  mso-element-anchor-horizontal:column;mso-element-top:.05pt;mso-height-rule:
  exactly'><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>10.<o:p></o:p></span></p>
  </td>
  <td width=315 colspan=2 style='width:236.25pt;border-top:none;border-left:
  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span class=SpellE><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>Keterangan</span></span><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'> lain-lain<o:p></o:p></span></p>
  </td>
  <td width=366 colspan=3 style='width:274.5pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;
  height:.25in'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal;tab-stops:
  373.5pt 382.5pt;mso-element:frame;mso-element-frame-hspace:9.0pt;mso-element-wrap:
  around;mso-element-anchor-vertical:paragraph;mso-element-anchor-horizontal:
  column;mso-element-top:.05pt;mso-height-rule:exactly'><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td style='mso-cell-special:placeholder;border:none;padding:0in 0in 0in 0in'
  width=3><p class='MsoNormal'>&nbsp;</td>
 </tr>
 <![if !supportMisalignedColumns]>
 <tr height=0>
  <td width=33 style='border:none'></td>
  <td width=185 style='border:none'></td>
  <td width=119 style='border:none'></td>
  <td width=44 style='border:none'></td>
  <td width=110 style='border:none'></td>
  <td width=223 style='border:none'></td>
  <td width=3 style='border:none'></td>
 </tr>
 <![endif]>
</table>

<p class=MsoNormal style='margin-bottom:0in;tab-stops:373.5pt 382.5pt'><span
lang=EN-US style='font-size:10.0pt;line-height:115%;font-family:"Arial",sans-serif;
mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>

<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0
 style='margin-left:328.5pt;border-collapse:collapse;border:none;mso-border-alt:
 solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0in 5.4pt 0in 5.4pt'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=120 valign=top style='width:89.75pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  class=SpellE><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>Dikeluarkan</span></span><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'> di<o:p></o:p></span></p>
  </td>
  <td width=139 valign=top style='width:104.55pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>: <span class=SpellE>Boyolali</span><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1;height:26.1pt'>
  <td width=120 valign=top style='width:89.75pt;border:none;padding:0in 5.4pt 0in 5.4pt;
  height:26.1pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  class=SpellE><span lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;
  mso-ansi-language:EN-US'>Tanggal</span></span><span lang=EN-US
  style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p></o:p></span></p>
  </td>
  <td width=139 valign=top style='width:104.55pt;border:none;padding:0in 5.4pt 0in 5.4pt;
  height:26.1pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'>: ${row["NoSPD"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=259 colspan=2 valign=top style='width:194.3pt;border:none;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal'><span lang=EN-US style='font-size:10.0pt;font-family:
  "Arial",sans-serif;mso-ansi-language:EN-US'>PEJABAT PEMBUAT KOMITMEN<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=120 valign=top style='width:89.75pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=139 valign=top style='width:104.55pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=120 valign=top style='width:89.75pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=139 valign=top style='width:104.55pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td width=120 valign=top style='width:89.75pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=139 valign=top style='width:104.55pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6'>
  <td width=120 valign=top style='width:89.75pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=139 valign=top style='width:104.55pt;border:none;padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0in;line-height:normal'><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:7'>
  <td width=259 colspan=2 valign=top style='width:194.3pt;border:none;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal'><b><u><span lang=EN-US style='font-size:10.0pt;
  font-family:"Arial",sans-serif;mso-ansi-language:EN-US'>Siti Taufiq Hidayati,
  SST, <span class=SpellE><span class=GramE>M.Ak</span></span></span></u></b><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:8;mso-yfti-lastrow:yes'>
  <td width=259 colspan=2 valign=top style='width:194.3pt;border:none;
  padding:0in 5.4pt 0in 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0in;text-align:center;
  line-height:normal'><b><span lang=EN-US style='font-size:10.0pt;font-family:
  "Arial",sans-serif;mso-ansi-language:EN-US'>NIP. 198503292009122005</span></b><span
  lang=EN-US style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-ansi-language:
  EN-US'><o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><span lang=EN-US style='font-size:10.0pt;line-height:115%;
font-family:"Arial",sans-serif;mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal><span lang=EN-US style='font-size:10.0pt;line-height:115%;
font-family:"Arial",sans-serif;mso-ansi-language:EN-US'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal style='margin-bottom:0in;tab-stops:center 39.25pt'><span
lang=EN-US style='font-size:10.0pt;line-height:115%;font-family:"Arial",sans-serif;
mso-ansi-language:EN-US'><br clear=all style='mso-special-character:line-break'>
<o:p></o:p></span></p>

</div>

</body>

        `,
      }}
    />
  );
}