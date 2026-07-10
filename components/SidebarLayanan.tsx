'use client';

import {
  useEffect,
  useState,
  type FormEvent,
} from 'react';

import {
  Info,
  Send,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  CircleAlert,
} from 'lucide-react';

import type { PilihanLayanan } from '@/types/layanan';

interface SidebarLayananProps {
  daftarLayanan: PilihanLayanan[];
}

interface ApiResponse {
  success?: boolean;
  valid?: boolean;
  message?: string;
}

export default function SidebarLayanan({
  daftarLayanan,
}: SidebarLayananProps) {
  const [nik, setNik] = useState('');
  const [noWa, setNoWa] = useState('');
  const [layananId, setLayananId] = useState('');

  const [isNikVerified, setIsNikVerified] =
    useState(false);

  const [isVerifying, setIsVerifying] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSuccess, setIsSuccess] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const timeout = window.setTimeout(() => {
      resetForm();
      setIsSuccess(false);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [isSuccess]);

  const formatNik = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 16);
  };

  const maskNik = (value: string) => {
    if (value.length !== 16) {
      return value;
    }

    return `${value.slice(0, 4)}********${value.slice(-4)}`;
  };

  const resetForm = () => {
    setNik('');
    setNoWa('');
    setLayananId('');
    setIsNikVerified(false);
    setErrorMessage('');
  };

  const handleVerifikasiNik = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage('');

    if (!/^\d{16}$/.test(nik)) {
      setErrorMessage(
        'NIK harus terdiri dari tepat 16 angka.'
      );
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch(
        '/api/warga/verifikasi',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nik }),
        }
      );

      const result =
        (await response.json()) as ApiResponse;

      if (!response.ok || !result.valid) {
        throw new Error(
          result.message ??
            'NIK tidak dapat diverifikasi.'
        );
      }

      setIsNikVerified(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat memverifikasi NIK.';

      setErrorMessage(message);
      setIsNikVerified(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage('');

    if (!isNikVerified) {
      setErrorMessage(
        'Verifikasi NIK terlebih dahulu.'
      );
      return;
    }

    if (!layananId) {
      setErrorMessage('Pilih layanan terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/permohonan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nik,
          noWa,
          layananId: Number(layananId),
        }),
      });

      const result =
        (await response.json()) as ApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ??
            'Permohonan gagal dikirim.'
        );
      }

      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat mengirim permohonan.';

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-24 overflow-hidden rounded-2xl border border-emerald-700 bg-emerald-800 shadow-lg">
      <div className="relative overflow-hidden bg-emerald-600 p-5 text-center">
        <h3 className="relative z-10 text-xl font-extrabold text-white">
          Layanan Cepat
        </h3>

        <div className="absolute -bottom-8 -left-4 h-12 w-[120%] rotate-3 rounded-t-[50%] bg-emerald-800" />
      </div>

      <div className="relative z-20 p-6">
        <div className="mb-6 flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-[11px] font-bold text-emerald-800 shadow-inner">
          <Info
            size={16}
            className="mt-0.5 shrink-0 text-emerald-600"
          />

          <p>
            Masukkan NIK yang terdaftar pada data warga
            Desa Keji. Setelah terverifikasi, pilih layanan
            yang ingin diajukan.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
            <CircleAlert
              size={17}
              className="mt-0.5 shrink-0"
            />

            <p>{errorMessage}</p>
          </div>
        )}

        {isSuccess ? (
          <div className="rounded-xl border border-emerald-100 bg-white px-6 py-10 text-center shadow-inner">
            <CheckCircle2
              size={48}
              className="mx-auto mb-4 text-emerald-500"
            />

            <h4 className="mb-2 text-lg font-extrabold text-emerald-800">
              Permohonan Berhasil Dikirim
            </h4>

            <p className="text-sm font-medium leading-relaxed text-gray-600">
              Permohonan sudah masuk ke sistem desa.
              Admin akan menghubungi Anda melalui nomor
              WhatsApp yang telah dimasukkan.
            </p>
          </div>
        ) : !isNikVerified ? (
          <form
            onSubmit={handleVerifikasiNik}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="nik"
                className="mb-1.5 block text-sm font-semibold text-white"
              >
                NIK Warga
              </label>

              <input
                id="nik"
                name="nik"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={16}
                required
                value={nik}
                onChange={(event) => {
                  setNik(formatNik(event.target.value));
                  setErrorMessage('');
                }}
                className="w-full rounded-lg border-none bg-white p-2.5 text-sm font-medium text-gray-800 shadow-inner outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Masukkan 16 digit NIK"
              />

              <p className="mt-1.5 text-xs text-emerald-100">
                NIK digunakan untuk memeriksa status warga
                Desa Keji.
              </p>
            </div>

            <button
              type="submit"
              disabled={
                isVerifying || nik.length !== 16
              }
              className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 font-extrabold text-white shadow-md transition-all ${
                isVerifying || nik.length !== 16
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-amber-500 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-lg'
              }`}
            >
              <ShieldCheck size={17} />

              {isVerifying
                ? 'Memverifikasi NIK...'
                : 'Verifikasi NIK'}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="rounded-lg border border-emerald-200 bg-white p-3">
              <div className="flex items-start gap-2">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />

                <div className="flex-1">
                  <p className="text-sm font-bold text-emerald-800">
                    NIK terverifikasi
                  </p>

                  <p className="mt-0.5 text-xs font-medium text-gray-500">
                    {maskNik(nik)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-1 text-xs font-bold text-gray-500 transition hover:text-emerald-700"
                >
                  <RotateCcw size={13} />
                  Ganti
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="no-wa"
                className="mb-1.5 block text-sm font-semibold text-white"
              >
                Nomor WhatsApp
              </label>

              <input
                id="no-wa"
                name="no-wa"
                type="tel"
                inputMode="tel"
                required
                value={noWa}
                onChange={(event) =>
                  setNoWa(event.target.value)
                }
                className="w-full rounded-lg border-none bg-white p-2.5 text-sm font-medium text-gray-800 shadow-inner outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Contoh: 081234567890"
              />
            </div>

            <div>
              <label
                htmlFor="layanan"
                className="mb-1.5 block text-sm font-semibold text-white"
              >
                Pilih Layanan
              </label>

              <select
                id="layanan"
                name="layanan"
                required
                value={layananId}
                onChange={(event) =>
                  setLayananId(event.target.value)
                }
                disabled={daftarLayanan.length === 0}
                className="w-full rounded-lg border-none bg-white p-2.5 text-sm font-medium text-gray-800 shadow-inner outline-none focus:ring-2 focus:ring-amber-400 disabled:cursor-not-allowed disabled:bg-gray-200"
              >
                <option value="" disabled>
                  -- Pilih Keperluan --
                </option>

                {daftarLayanan.map((layanan) => (
                  <option
                    key={layanan.id}
                    value={layanan.id}
                  >
                    {layanan.nama}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                daftarLayanan.length === 0
              }
              className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-extrabold text-white shadow-md transition-all ${
                isSubmitting ||
                daftarLayanan.length === 0
                  ? 'cursor-wait bg-gray-400'
                  : 'bg-amber-500 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-lg'
              }`}
            >
              <Send size={16} />

              {isSubmitting
                ? 'Mengirim Permohonan...'
                : 'Kirim Permohonan'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}