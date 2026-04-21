import { formatFullDate } from "../../utils/formatFullDate";
import { formatKecamatan } from "../../utils/formatKecamatan";
export default function PernyataanRandis({ row }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
<body lang=EN-ID style='tab-interval:36.0pt;word-wrap:break-word'>

<div class=WordSection1>

<p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center'><span
style='font-size:16.0pt;line-height:107%;font-family:"Times New Roman",serif'>SURAT
PERNYATAAN<o:p></o:p></span></p>

<p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center'><span
style='font-size:16.0pt;line-height:107%;font-family:"Times New Roman",serif'>TIDAK
MENGGUNAKAN KENDARAAN DINAS<o:p></o:p></span></p>

<p class=MsoNormal style='margin-bottom:0cm;line-height:150%'><span
style='font-size:12.0pt;line-height:150%;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal style='margin-bottom:0cm'><span style='font-size:12.0pt;
line-height:107%;font-family:"Times New Roman",serif'>Yang <span class=SpellE>bertanda</span>
<span class=SpellE>tangan</span> di <span class=SpellE>bawah</span> <span
class=SpellE>ini</span>:<o:p></o:p></span></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:
 0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=28 valign=top style='width:21.05pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=142 valign=top style='width:106.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>Nama<o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=412 valign=top style='width:309.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>${row["NamaCocok"]}</span><o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=28 valign=top style='width:21.05pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=142 valign=top style='width:106.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>NIP<o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=412 valign=top style='width:309.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>${row["NIP"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=28 valign=top style='width:21.05pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=142 valign=top style='width:106.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Pangkat</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>/<span
  class=SpellE>Golongan</span><o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=412 valign=top style='width:309.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>${row["Pangkat"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=28 valign=top style='width:21.05pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=142 valign=top style='width:106.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  class=SpellE><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Jabatan</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=412 valign=top style='width:309.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>${row["Jabatan"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4;mso-yfti-lastrow:yes'>
  <td width=28 valign=top style='width:21.05pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=142 valign=top style='width:106.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>Unit <span
  class=SpellE>Kerja</span><o:p></o:p></span></p>
  </td>
  <td width=19 valign=top style='width:14.15pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>:<o:p></o:p></span></p>
  </td>
  <td width=412 valign=top style='width:309.3pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'>BPS <span
  class=SpellE>Kabupaten</span> Boyolali<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal style='margin-bottom:0cm'><span style='font-size:12.0pt;
line-height:107%;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal style='margin-bottom:0cm;text-align:justify'><span
class=SpellE><span style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'>Menerangkan</span></span><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'> <span
class=SpellE>bahwa</span> <span class=SpellE>dalam</span> <span class=SpellE>rangka</span>
<span class=SpellE>melaksanakan</span> <span class=SpellE>perjalanan</span> <span
class=SpellE>dinas</span> <span class=SpellE>dalam</span> <span class=SpellE>kota</span>
di <span class=SpellE>Kabupaten</span> Boyolali <span class=SpellE>untuk</span>
<span class=SpellE>melaksanakan</span> <span class=SpellE>tugas</span> <span
class=SpellE>kedinasan</span> <span class=SpellE>sesuai</span> <span
class=SpellE>surat</span> <span class=SpellE>tugas</span> <span class=SpellE>nomor</span>
${row["NoST"]} <span class=SpellE>tanggal</span> ${row["NoSPD"]}, <span class=SpellE>saya</span> <span
class=SpellE>benar-benar</span> <span class=SpellE>tidak</span> <span
class=SpellE>menggunakan</span> <span class=SpellE>kendaraan</span> <span
class=SpellE>dinas</span> pada <span class=SpellE>tanggal</span> ${formatFullDate(row["Tanggal Kunjungan"])}.<o:p></o:p></span></p>

<p class=MsoNormal style='margin-bottom:0cm;text-align:justify'><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal style='margin-bottom:0cm;text-align:justify'><span
class=SpellE><span style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'>Demikian</span></span><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'> <span
class=SpellE>pernyataan</span> <span class=SpellE>ini</span> <span
class=SpellE>saya</span> buat <span class=SpellE>dengan</span> <span
class=SpellE>sebenar-benarnya</span> <span class=SpellE>untuk</span> <span
class=SpellE>dipergunakan</span> <span class=SpellE>sebagaimana</span> <span
class=SpellE>mestinya</span>. <span class=SpellE>Apabila</span> <span
class=SpellE>terdapat</span> <span class=SpellE>kekeliruan</span> <span
class=SpellE>dalam</span> <span class=SpellE>pertanggung</span> <span
class=SpellE>jawaban</span> SPD dan <span class=SpellE>mengakibatkan</span> <span
class=SpellE>kerugian</span> negara, <span class=SpellE>saya</span> <span
class=SpellE>bersedia</span> <span class=SpellE>dituntut</span> <span
class=SpellE>sesuai</span> <span class=SpellE>peraturan</span> yang <span
class=SpellE>berlaku</span> dan <span class=SpellE>mengembalikan</span> <span
class=SpellE>biaya</span> transport yang <span class=SpellE>sudah</span> <span
class=SpellE>terlanjur</span> <span class=SpellE>saya</span> <span
class=SpellE>terima</span> <span class=SpellE>ke</span> kas negara.<o:p></o:p></span></p>

<p class=MsoNormal style='margin-bottom:0cm;text-align:justify'><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal style='margin-bottom:0cm;text-align:justify'><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<p class=MsoNormal style='margin-bottom:0cm;text-align:justify'><span
style='font-size:12.0pt;line-height:107%;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

<table class=MsoTableGrid border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;border:none;mso-yfti-tbllook:1184;mso-padding-alt:
 0cm 5.4pt 0cm 5.4pt;mso-border-insideh:none;mso-border-insidev:none'>
 <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
  <td width=600 valign=top style='width:600pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Boyolali,
  ${row["tglKwitansi"]}<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:1'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span class=SpellE><span style='font-size:12.0pt;
  font-family:"Times New Roman",serif'>Pelaksana</span></span><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'> <span
  class=SpellE>Perjalanan</span> Dinas<o:p></o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:2'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:3'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:4'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:5'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><u><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>${row["NamaCocok"]}<o:p></o:p></span></u></p>
  </td>
 </tr>
 <tr style='mso-yfti-irow:6;mso-yfti-lastrow:yes'>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal style='margin-bottom:0cm;line-height:normal'><span
  style='font-size:12.0pt;font-family:"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>
  </td>
  <td width=301 valign=top style='width:225.4pt;padding:0cm 5.4pt 0cm 5.4pt'>
  <p class=MsoNormal align=center style='margin-bottom:0cm;text-align:center;
  line-height:normal'><span style='font-size:12.0pt;font-family:"Times New Roman",serif'>Nip.
  ${row["NIP"]}<o:p></o:p></span></p>
  </td>
 </tr>
</table>

<p class=MsoNormal><span style='font-size:12.0pt;line-height:107%;font-family:
"Times New Roman",serif'><o:p>&nbsp;</o:p></span></p>

</div>

</body>

        `,
      }}
    />
  );
}