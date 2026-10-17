// src/components/DiskonKonsonan.jsx
import { useState } from 'react';
import './DiskonKonsonan.css';

const DiskonKonsonan = () => {
  const [totalHarga, setTotalHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleHitung = (e) => {
    e.preventDefault();

    const harga = parseFloat(totalHarga);

    if (isNaN(harga) || harga <= 0 || !nama.trim()) {
      alert('Masukkan total harga dan nama pelanggan dengan benar!');
      return;
    }

    // Hitung jumlah huruf konsonan (hanya huruf, selain a, e, i, o, u)
    const huruf = nama.toLowerCase().match(/[a-z]/g) || [];
    const konsonan = huruf.filter((h) => !'aeiou'.includes(h)).length;

    // Hitung jumlah kata
    const jumlahKata = nama.trim().split(/\s+/).length;

    // Hitung persentase diskon
    let diskon = konsonan * 2;
    if (jumlahKata > 2) {
      diskon += 5;
    }
    if (diskon > 20) {
      diskon = 20;
    }

    const potongan = (diskon / 100) * harga;
    const hargaAkhir = harga - potongan;

    setHasil({ konsonan, jumlahKata, diskon, potongan, hargaAkhir });
  };

  const formatRupiah = (angka) =>
    'Rp ' + angka.toLocaleString('id-ID', { maximumFractionDigits: 0 });

  return (
    <div className="container">
      <h2>Program Diskon Huruf Konsonan</h2>
      <form onSubmit={handleHitung} className="form">
        <label className="label">
          Total Harga Pembelian:
          <input
            type="number"
            className="input"
            value={totalHarga}
            onChange={(e) => setTotalHarga(e.target.value)}
            placeholder="Masukkan total harga"
          />
        </label>

        <label className="label">
          Nama Pelanggan:
          <input
            type="text"
            className="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Contoh: Budi Santoso"
          />
        </label>

        <button type="submit" className="button">Hitung Diskon</button>
      </form>

      {hasil && (
        <div className="result">
          <p><strong>Jumlah Huruf Konsonan:</strong> {hasil.konsonan}</p>
          <p><strong>Jumlah Kata:</strong> {hasil.jumlahKata}</p>
          <p><strong>Persentase Diskon:</strong> {hasil.diskon}%</p>
          <p><strong>Total Potongan Harga:</strong> {formatRupiah(hasil.potongan)}</p>
          <p><strong>Harga Setelah Diskon:</strong> {formatRupiah(hasil.hargaAkhir)}</p>
        </div>
      )}
    </div>
  );
};

export default DiskonKonsonan;