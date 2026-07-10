import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nik = String(body?.nik ?? '').replace(/\D/g, '');
    const layananId = Number(body?.layananId);
    const noWa = String(body?.noWa ?? '')
      .replace(/\s/g, '')
      .replace(/-/g, '');

    if (!/^\d{16}$/.test(nik)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Format NIK tidak valid.',
        },
        { status: 400 }
      );
    }

    if (!Number.isInteger(layananId) || layananId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Layanan yang dipilih tidak valid.',
        },
        { status: 400 }
      );
    }

    if (!/^(?:\+62|62|0)8\d{8,12}$/.test(noWa)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nomor WhatsApp tidak valid.',
        },
        { status: 400 }
      );
    }

    // NIK diverifikasi kembali di server.
    // Jangan hanya mengandalkan hasil verifikasi dari browser.

    const { data: warga, error: wargaError } = await supabaseAdmin
      .from('warga')
      .select('nik')
      .eq('nik', nik)
      .eq('status_aktif', true)
      .maybeSingle();

    if (wargaError) {
      console.error('Kesalahan membaca data warga:', wargaError);

      return NextResponse.json(
        {
          success: false,
          message: 'Data warga tidak dapat diverifikasi.',
        },
        { status: 500 }
      );
    }

    if (!warga) {
      return NextResponse.json(
        {
          success: false,
          message: 'NIK tidak terdaftar sebagai warga aktif.',
        },
        { status: 404 }
      );
    }

    const { data: layanan, error: layananError } =
      await supabaseAdmin
        .from('layanan')
        .select('id')
        .eq('id', layananId)
        .eq('aktif', true)
        .maybeSingle();

    if (layananError) {
      console.error('Kesalahan membaca layanan:', layananError);

      return NextResponse.json(
        {
          success: false,
          message: 'Data layanan tidak dapat diperiksa.',
        },
        { status: 500 }
      );
    }

    if (!layanan) {
      return NextResponse.json(
        {
          success: false,
          message: 'Layanan tidak tersedia atau sudah dinonaktifkan.',
        },
        { status: 404 }
      );
    }

    const { error: insertError } = await supabaseAdmin
      .from('permohonan')
      .insert({
        warga_nik: nik,
        layanan_id: layananId,
        no_wa: noWa,
        status: 'Menunggu',
      });

    if (insertError) {
      // PostgreSQL unique violation.
      if (insertError.code === '23505') {
        return NextResponse.json(
          {
            success: false,
            message:
              'Anda masih memiliki permohonan layanan yang sama dengan status Menunggu.',
          },
          { status: 409 }
        );
      }

      console.error('Kesalahan menyimpan permohonan:', insertError);

      return NextResponse.json(
        {
          success: false,
          message: 'Permohonan gagal disimpan.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Permohonan berhasil dikirim.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Kesalahan API permohonan:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Permintaan tidak dapat diproses.',
      },
      { status: 500 }
    );
  }
}